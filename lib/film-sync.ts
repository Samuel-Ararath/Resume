import { films as fallbackFilms, type Film } from '@/lib/content'

type NotionProperty = { type?: string; title?: Array<{ plain_text?: string }>; rich_text?: Array<{ plain_text?: string }>; select?: { name?: string } | null; status?: { name?: string } | null; number?: number | null; multi_select?: Array<{ name?: string }>; checkbox?: boolean }
type NotionPage = { id: string; properties?: Record<string, NotionProperty> }

const notionHeaders = {
  Authorization: `Bearer ${process.env.NOTION_TOKEN ?? ''}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json',
}

function plain(property?: NotionProperty) {
  if (!property) return ''
  if (property.title?.[0]?.plain_text) return property.title.map((item) => item.plain_text ?? '').join('')
  if (property.rich_text?.[0]?.plain_text) return property.rich_text.map((item) => item.plain_text ?? '').join('')
  return property.select?.name ?? property.status?.name ?? ''
}

function findProperty(properties: Record<string, NotionProperty>, names: string[]) {
  const entry = Object.entries(properties).find(([name]) => names.some((candidate) => name.toLowerCase().includes(candidate)))
  return entry?.[1]
}

function asType(value: string): Film['type'] {
  const normalized = value.toLowerCase()
  if (normalized.includes('tv') || normalized.includes('series')) return 'TV Series'
  if (normalized.includes('film') || normalized.includes('movie')) return 'Film'
  return 'Anime'
}

function asStatus(value: string): Film['watchStatus'] {
  const normalized = value.toLowerCase()
  if (normalized.includes('watch') || normalized.includes('progress') || normalized.includes('ongoing')) return 'Sedang nonton'
  if (normalized.includes('belum') || normalized.includes('plan') || normalized.includes('want')) return 'Belum nonton'
  return 'Sudah selesai'
}

function toFilm(page: NotionPage): Film | null {
  const properties = page.properties ?? {}
  const title = plain(findProperty(properties, ['title', 'name', 'judul']))
  if (!title) return null
  const type = asType(plain(findProperty(properties, ['type', 'tipe', 'category', 'kategori'])))
  const ratingValue = findProperty(properties, ['rating pribadi', 'personal rating', 'my rating', 'rating'])
  const rating = ratingValue?.number != null ? String(ratingValue.number) : plain(ratingValue)
  const genres = (findProperty(properties, ['genre', 'genres'])?.multi_select ?? []).map((item) => item.name ?? '').filter(Boolean)
  const progress = plain(findProperty(properties, ['episode', 'progress', 'status anime', 'status tamat']))
  return { title, type, rating: rating || '—', watchStatus: asStatus(plain(findProperty(properties, ['status tonton', 'watch status', 'watch', 'status']))), genres, progress: progress || '—', malRating: '—', source: 'Notion' }
}

async function queryDatabase(databaseId: string) {
  const databaseResponse = await fetch(`https://api.notion.com/v1/databases/${databaseId}`, { headers: notionHeaders, cache: 'no-store' })
  if (!databaseResponse.ok) return []
  const database = await databaseResponse.json() as { data_sources?: Array<{ id: string }> }
  const dataSourceId = database.data_sources?.[0]?.id
  const endpoint = dataSourceId ? `https://api.notion.com/v1/data_sources/${dataSourceId}/query` : `https://api.notion.com/v1/databases/${databaseId}/query`
  const response = await fetch(endpoint, { method: 'POST', headers: { ...notionHeaders, ...(dataSourceId ? { 'Notion-Version': '2025-09-03' } : {}) }, body: JSON.stringify({ page_size: 100 }), cache: 'no-store' })
  if (!response.ok) return []
  const data = await response.json() as { results?: NotionPage[] }
  return (data.results ?? []).map(toFilm).filter((film): film is Film => Boolean(film))
}

async function discoverChildDatabases(blockId: string, depth = 0): Promise<string[]> {
  if (depth > 4) return []
  const response = await fetch(`https://api.notion.com/v1/blocks/${blockId}/children?page_size=100`, { headers: notionHeaders, cache: 'no-store' })
  if (!response.ok) return []
  const data = await response.json() as { results?: Array<{ id: string; type?: string; has_children?: boolean }> }
  const ids: string[] = []
  for (const block of data.results ?? []) {
    if (block.type === 'child_database') ids.push(block.id)
    if (block.has_children) ids.push(...await discoverChildDatabases(block.id, depth + 1))
  }
  return ids
}

async function notionPages() {
  const databaseId = process.env.NOTION_DATABASE_ID
  if (!databaseId || !process.env.NOTION_TOKEN) return []
  const directFilms = await queryDatabase(databaseId)
  if (directFilms.length) return directFilms
  const childDatabaseIds = await discoverChildDatabases(databaseId)
  const childFilms = await Promise.all(childDatabaseIds.map(queryDatabase))
  return childFilms.flat()
}

async function enrichFilm(film: Film): Promise<Film> {
  try {
    if (film.type === 'Anime') {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(film.title)}&limit=1`, { next: { revalidate: 3600 } })
      const data = await response.json() as { data?: Array<{ score?: number; episodes?: number; status?: string; genres?: Array<{ name?: string }> }> }
      const match = data.data?.[0]
      return { ...film, malRating: match?.score != null ? String(match.score) : '—', progress: film.progress !== '—' ? film.progress : `${match?.status ?? '—'} · ${match?.episodes ?? '—'} eps`, genres: film.genres.length ? film.genres : (match?.genres ?? []).map((genre) => genre.name ?? '').filter(Boolean), source: 'MAL / Jikan' }
    }
    const key = process.env.TMDB_API_KEY
    if (!key) return film
    const endpoint = film.type === 'Film' ? 'movie' : 'tv'
    const response = await fetch(`https://api.themoviedb.org/3/search/${endpoint}?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(film.title)}&language=en-US`, { next: { revalidate: 3600 } })
    const data = await response.json() as { results?: Array<{ vote_average?: number; poster_path?: string; genre_ids?: number[] }> }
    const match = data.results?.[0]
    return { ...film, generalRating: match?.vote_average != null ? String(match.vote_average.toFixed(1)) : '—', poster: match?.poster_path ? `https://image.tmdb.org/t/p/w342${match.poster_path}` : undefined, source: 'TMDB' }
  } catch {
    return film
  }
}

export async function getSyncedFilms() {
  try {
    const liveFilms = await notionPages()
    if (!liveFilms.length) return { films: fallbackFilms, synced: false }
    return { films: await Promise.all(liveFilms.map(enrichFilm)), synced: true }
  } catch {
    return { films: fallbackFilms, synced: false }
  }
}
