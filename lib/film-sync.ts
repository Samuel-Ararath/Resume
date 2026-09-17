import { films as fallbackFilms, type Film } from '@/lib/content'

type NotionProperty = { type?: string; title?: Array<{ plain_text?: string }>; rich_text?: Array<{ plain_text?: string }>; select?: { name?: string } | null; status?: { name?: string } | null; number?: number | null; multi_select?: Array<{ name?: string }>; checkbox?: boolean }
type NotionPage = { id: string; properties?: Record<string, NotionProperty> }
type NotionDatabase = { id: string; title: string; properties?: Record<string, NotionProperty> }

const notionHeaders = { Authorization: `Bearer ${process.env.NOTION_TOKEN ?? ''}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' }

function plain(property?: NotionProperty) {
  if (!property) return ''
  if (property.title) return property.title.map((item) => item.plain_text ?? '').join('').trim()
  if (property.rich_text) return property.rich_text.map((item) => item.plain_text ?? '').join('').trim()
  if (property.multi_select) return property.multi_select.map((item) => item.name ?? '').filter(Boolean).join(', ').trim()
  return property.select?.name?.trim() ?? property.status?.name?.trim() ?? ''
}

function numberValue(property?: NotionProperty) { return property?.number == null ? '' : String(property.number) }
function findProperty(properties: Record<string, NotionProperty>, names: string[]) {
  const normalized = names.map((name) => name.toLowerCase())
  return Object.entries(properties).find(([name]) => normalized.includes(name.toLowerCase()) || normalized.some((candidate) => name.toLowerCase().includes(candidate)))?.[1]
}
function propertyValue(properties: Record<string, NotionProperty>, names: string[]) {
  const property = findProperty(properties, names)
  return plain(property) || numberValue(property)
}
function asStatus(value: string): Film['watchStatus'] {
  const normalized = value.toLowerCase()
  if (normalized.includes('watch') || normalized.includes('progress') || normalized.includes('ongoing') || normalized.includes('watching')) return 'Sedang nonton'
  if (normalized.includes('belum') || normalized.includes('plan') || normalized.includes('want') || normalized.includes('pending')) return 'Belum nonton'
  return 'Sudah selesai'
}
function asType(databaseTitle: string): Film['type'] {
  const normalized = databaseTitle.toLowerCase()
  if (normalized.includes('film') || normalized.includes('movie')) return 'Film'
  if (normalized.includes('tv') || normalized.includes('series')) return 'TV Series'
  return 'Anime'
}
function toFilm(page: NotionPage, databaseTitle: string): Film | null {
  const properties = page.properties ?? {}
  const title = propertyValue(properties, ['Title', 'Name', 'Judul'])
  if (!title) return null
  const type = asType(databaseTitle)
  const rating = propertyValue(properties, ['valutation', 'valuation', 'rating pribadi', 'personal rating', 'my rating'])
  const genreProperty = findProperty(properties, ['Genre', 'Genres'])
  const genres = genreProperty?.multi_select?.map((item) => item.name?.trim() ?? '').filter(Boolean) ?? plain(genreProperty).split(',').map((genre) => genre.trim()).filter(Boolean)
  const episodes = propertyValue(properties, ['Final episodes', 'Current episodes', 'Episodes'])
  const finalStatus = propertyValue(properties, ['Final status', 'Status Anime'])
  const progress = [finalStatus, episodes ? `${episodes} eps` : ''].filter(Boolean).join(' · ')
  const general = propertyValue(properties, ['Rating MAL', 'Rating general', 'TMDB rating'])
  const watchStatus = propertyValue(properties, ['Status Tonton', 'Watch status', 'Status'])
  return { title, type, rating: rating || '—', watchStatus: asStatus(watchStatus), genres, progress: progress || '—', malRating: type === 'Anime' ? general || '—' : '—', generalRating: type !== 'Anime' ? general || undefined : undefined, source: 'Notion' }
}

async function queryDatabase(database: NotionDatabase) {
  const pages: NotionPage[] = []
  let cursor: string | undefined
  do {
    const response = await fetch(`https://api.notion.com/v1/databases/${database.id}/query`, { method: 'POST', headers: notionHeaders, body: JSON.stringify({ page_size: 100, ...(cursor ? { start_cursor: cursor } : {}) }), cache: 'no-store' })
    if (!response.ok) return []
    const data = await response.json() as { results?: NotionPage[]; has_more?: boolean; next_cursor?: string | null }
    pages.push(...(data.results ?? []))
    cursor = data.has_more ? data.next_cursor ?? undefined : undefined
  } while (cursor)
  return pages.map((page) => toFilm(page, database.title)).filter((film): film is Film => Boolean(film))
}

async function discoverChildDatabases(blockId: string, depth = 0): Promise<NotionDatabase[]> {
  if (depth > 5) return []
  const response = await fetch(`https://api.notion.com/v1/blocks/${blockId}/children?page_size=100`, { headers: notionHeaders, cache: 'no-store' })
  if (!response.ok) return []
  const data = await response.json() as { results?: Array<{ id: string; type?: string; has_children?: boolean; child_database?: { title?: string } }> }
  const databases: NotionDatabase[] = []
  for (const block of data.results ?? []) {
    if (block.type === 'child_database') {
      const databaseResponse = await fetch(`https://api.notion.com/v1/databases/${block.id}`, { headers: notionHeaders, cache: 'no-store' })
      if (databaseResponse.ok) {
        const database = await databaseResponse.json() as { id: string; title?: Array<{ plain_text?: string }>; properties?: Record<string, NotionProperty> }
        databases.push({ id: database.id, title: database.title?.map((item) => item.plain_text ?? '').join('').trim() || block.child_database?.title || '' , properties: database.properties })
      }
    }
    if (block.has_children) databases.push(...await discoverChildDatabases(block.id, depth + 1))
  }
  return databases
}

function isWantedDatabase(database: NotionDatabase) {
  const title = database.title.toLowerCase()
  const propertyNames = Object.keys(database.properties ?? {}).map((name) => name.toLowerCase())
  return title.includes('tv series') || title === 'film' || title.includes('new database') || propertyNames.includes('status anime') || propertyNames.includes('rating mal')
}

async function notionPages() {
  const rootId = process.env.NOTION_DATABASE_ID
  if (!rootId || !process.env.NOTION_TOKEN) return []
  const databases = (await discoverChildDatabases(rootId)).filter(isWantedDatabase)
  const preferred = databases.filter((database) => /total anime|new database|tv series|film/i.test(database.title))
  const unique = [...new Map((preferred.length ? preferred : databases).map((database) => [database.id, database])).values()]
  const grouped = await Promise.all(unique.map(queryDatabase))
  return grouped.flat()
}

async function enrichFilm(film: Film): Promise<Film> {
  try {
    if (film.type === 'Anime') {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(film.title)}&limit=1`, { next: { revalidate: 3600 } })
      const data = await response.json() as { data?: Array<{ score?: number; episodes?: number; status?: string; genres?: Array<{ name?: string }> }> }
      const match = data.data?.[0]
      return { ...film, malRating: film.malRating !== '—' ? film.malRating : match?.score != null ? String(match.score) : '—', progress: film.progress !== '—' ? film.progress : `${match?.status ?? '—'} · ${match?.episodes ?? '—'} eps`, genres: film.genres.length ? film.genres : (match?.genres ?? []).map((genre) => genre.name ?? '').filter(Boolean), source: 'MAL / Jikan' }
    }
    const key = process.env.TMDB_API_KEY
    if (!key) return film
    const endpoint = film.type === 'Film' ? 'movie' : 'tv'
    const response = await fetch(`https://api.themoviedb.org/3/search/${endpoint}?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(film.title)}&language=en-US`, { next: { revalidate: 3600 } })
    const data = await response.json() as { results?: Array<{ vote_average?: number; poster_path?: string }> }
    const match = data.results?.[0]
    return { ...film, generalRating: film.generalRating ?? (match?.vote_average != null ? String(match.vote_average.toFixed(1)) : '—'), poster: match?.poster_path ? `https://image.tmdb.org/t/p/w342${match.poster_path}` : undefined, source: 'TMDB' }
  } catch { return film }
}

export async function getSyncedFilms() {
  try {
    const liveFilms = await notionPages()
    if (!liveFilms.length) return { films: fallbackFilms, synced: false }
    return { films: await Promise.all(liveFilms.map(enrichFilm)), synced: true }
  } catch { return { films: fallbackFilms, synced: false } }
}
