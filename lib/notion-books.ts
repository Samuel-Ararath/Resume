export type NotionBook = {
  id: string
  title: string
  author: string
  category: string
  status: string
  genres: string[]
  progress?: string
  url: string
}

const databases = [
  { id: 'bdae1b5a-551f-464f-b769-965de0fcb63d', category: 'Buku', title: 'Judul', author: 'Penulis', genre: 'Genre', read: 'Chapter Dibaca', total: 'Total Chapter' },
  { id: 'b8362b20-2c70-4790-b70d-8f042588a953', category: 'Novel', title: 'Judul', author: 'Penulis', genre: 'Genre' },
  { id: 'c2ef184a-00bb-4891-8d36-8dcfc690bc5c', category: 'Manga', title: 'Title', author: 'mangaka', genre: 'genre', read: 'chapters read', total: 'total chapters' },
  { id: '4d733323-0947-42a3-b0c8-8069713a72a7', category: 'Manhua', title: 'Title', author: 'mangaka', genre: 'genre', read: 'chapters read', total: 'total chapters' },
  { id: 'c02083cc-bc18-42fc-8453-9d8d0ddc8ecd', category: 'Manhwa', title: 'Title', author: 'mangaka', genre: 'genre', read: 'chapters read', total: 'total chapters' },
] as const

function textProperty(value: any): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value.map((item) => item?.plain_text ?? item?.name ?? '').filter(Boolean).join(', ')
  return value.title?.map((item: any) => item.plain_text).join('') || value.rich_text?.map((item: any) => item.plain_text).join('') || value.name || value.number?.toString() || value.select?.name || value.status?.name || ''
}

function propertyValue(property: any): string | number | null {
  if (!property) return null
  if (property.type === 'title') return textProperty(property.title)
  if (property.type === 'rich_text') return textProperty(property.rich_text)
  if (property.type === 'number') return property.number
  if (property.type === 'select') return property.select?.name ?? null
  if (property.type === 'status') return property.status?.name ?? null
  if (property.type === 'multi_select') return property.multi_select?.map((item: any) => item.name) ?? []
  return null
}

export async function getNotionBooks(): Promise<NotionBook[]> {
  const token = process.env.NOTION_TOKEN
  if (!token) return []

  const responses = await Promise.all(databases.map(async (database) => {
    const headers = { Authorization: `Bearer ${token}`, 'Notion-Version': '2025-09-03', 'Content-Type': 'application/json' }
    let response = await fetch(`https://api.notion.com/v1/data_sources/${database.id}/query`, { method: 'POST', headers, body: JSON.stringify({ page_size: 100, sorts: [{ timestamp: 'created_time', direction: 'ascending' }] }), next: { revalidate: 300 } })
    if (!response.ok) response = await fetch(`https://api.notion.com/v1/databases/${database.id}/query`, { method: 'POST', headers, body: JSON.stringify({ page_size: 100 }), next: { revalidate: 300 } })
    if (!response.ok) return []
    const payload = await response.json()
    return (payload.results ?? []).map((row: any) => {
      const properties = row.properties ?? {}
      const title = String(propertyValue(properties[database.title]) ?? '').trim()
      const author = String(propertyValue(properties[database.author]) ?? '').trim()
      const genres = (propertyValue(properties[database.genre]) ?? []) as string[]
      const read = 'read' in database ? propertyValue(properties[database.read]) : null
      const total = 'total' in database ? propertyValue(properties[database.total]) : null
      return {
        id: row.id,
        title,
        author,
        category: database.category,
        status: String(propertyValue(properties.Status) ?? '').trim(),
        genres: Array.isArray(genres) ? genres : [],
        progress: read !== null && total !== null ? `${read || 0} / ${total} chapter` : undefined,
        url: row.url,
      }
    }).filter((book: NotionBook) => book.title)
  }))

  return responses.flat()
}
