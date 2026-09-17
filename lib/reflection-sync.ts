import { reflections as fallbackReflections, type Reflection } from '@/lib/content'

const sourceId = '2f176e13-d86f-80de-a236-d607135f05a9'
const notionHeaders = { Authorization: `Bearer ${process.env.NOTION_TOKEN ?? ''}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' }

type NotionProperty = { title?: Array<{ plain_text?: string }>; rich_text?: Array<{ plain_text?: string }>; select?: { name?: string } | null; multi_select?: Array<{ name?: string }>; date?: { start?: string | null } | null }
type NotionPage = { id: string; url?: string; properties?: Record<string, NotionProperty> }
type NotionBlock = { type?: string; paragraph?: { rich_text?: Array<{ plain_text?: string }> }; heading_1?: { rich_text?: Array<{ plain_text?: string }> }; heading_2?: { rich_text?: Array<{ plain_text?: string }> }; heading_3?: { rich_text?: Array<{ plain_text?: string }> }; quote?: { rich_text?: Array<{ plain_text?: string }> }; bulleted_list_item?: { rich_text?: Array<{ plain_text?: string }> }; numbered_list_item?: { rich_text?: Array<{ plain_text?: string }> } }
type ReflectionEntry = Reflection & { slug: string; date: string; author: string; topics: string[]; tags: string[]; body: string; sourceUrl?: string }

function text(property?: NotionProperty) { return property?.title?.map((item) => item.plain_text ?? '').join('').trim() || property?.rich_text?.map((item) => item.plain_text ?? '').join('').trim() || property?.select?.name?.trim() || '' }
function list(property?: NotionProperty) { return property?.multi_select?.map((item) => item.name ?? '').filter(Boolean) ?? [] }
function slugify(value: string) { return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }
function stripMarkdown(value: string) { return value.replace(/\*\*|__|~~|`/g, '').replace(/^#+\s*/gm, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').trim() }

async function queryRows() {
  const pages: NotionPage[] = []
  let cursor: string | undefined
  do {
    const response = await fetch(`https://api.notion.com/v1/databases/${sourceId}/query`, { method: 'POST', headers: notionHeaders, body: JSON.stringify({ page_size: 100, ...(cursor ? { start_cursor: cursor } : {}) }), cache: 'no-store' })
    if (!response.ok) return []
    const data = await response.json() as { results?: NotionPage[]; has_more?: boolean; next_cursor?: string | null }
    pages.push(...(data.results ?? []))
    cursor = data.has_more ? data.next_cursor ?? undefined : undefined
  } while (cursor)
  return pages
}

async function pageBody(pageId: string) {
  const response = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children?page_size=100`, { headers: notionHeaders, cache: 'no-store' })
  if (!response.ok) return ''
  const data = await response.json() as { results?: NotionBlock[] }
  return (data.results ?? []).map((block) => { const content = block[block.type as keyof NotionBlock] as { rich_text?: Array<{ plain_text?: string }> } | undefined; return content?.rich_text?.map((item) => item.plain_text ?? '').join('') ?? '' }).filter(Boolean).join('\n\n').trim()
}

async function toReflection(page: NotionPage): Promise<ReflectionEntry | null> {
  const properties = page.properties ?? {}
  const title = text(properties.Nama)
  if (!title) return null
  const body = await pageBody(page.id)
  const excerpt = text(properties.Cuplikan) || stripMarkdown(body).slice(0, 180)
  const date = properties.Tanggal?.date?.start ?? ''
  return { number: date ? new Date(date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) : '—', title: stripMarkdown(title), excerpt, theme: list(properties.Topik)[0] || 'Renungan', slug: slugify(title), date, author: text(properties.Penulis), topics: list(properties.Topik), tags: list(properties.Tag), body, sourceUrl: page.url }
}

export async function getSyncedReflections(): Promise<{ reflections: ReflectionEntry[]; synced: boolean }> {
  if (!process.env.NOTION_TOKEN) return { reflections: fallbackReflections.map((item) => ({ ...item, slug: slugify(item.title), date: '', author: '', topics: [], tags: [], body: item.excerpt })), synced: false }
  try {
    const entries = (await Promise.all((await queryRows()).map(toReflection))).filter((entry): entry is ReflectionEntry => Boolean(entry))
    return entries.length ? { reflections: entries, synced: true } : { reflections: [], synced: true }
  } catch { return { reflections: fallbackReflections.map((item) => ({ ...item, slug: slugify(item.title), date: '', author: '', topics: [], tags: [], body: item.excerpt })), synced: false } }
}

export type { ReflectionEntry }
export { slugify }
export const notionReflectionsUrl = 'https://app.notion.com/p/Santapan-Rohani-79966c1aadc4489cb5fe7e843d80bcec'
export { pageBody }
