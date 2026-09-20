import { supabase } from '@/lib/supabase-client'

export type Reflection = { number: string; title: string; excerpt: string; theme: string }

type ReflectionEntry = Reflection & {
  slug: string
  date: string
  author: string
  topics: string[]
  tags: string[]
  body: string
  sourceUrl?: string
}

function slugify(value: string) {
  return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function asList(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String).filter(Boolean) : []
}

function plainText(value: string) {
  return value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/^>\s?/gm, '')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function excerptFrom(content: string) {
  const candidate = content
    .split(/\n\s*\n/)
    .map((part) => plainText(part))
    .find((part) => part.length > 40)
  return candidate ? `${candidate.slice(0, 220)}${candidate.length > 220 ? '…' : ''}` : ''
}

export async function getSyncedReflections(): Promise<{ reflections: ReflectionEntry[]; synced: boolean }> {
  const { data, error } = await supabase
    .from('reflections')
    .select('*')
    .order('devotional_date', { ascending: false })

  if (error || !data) return { reflections: [], synced: false }

  const reflections: ReflectionEntry[] = data.map((row) => {
    const body = row.content ?? ''
    const topics = asList(row.topics)
    return {
      number: row.devotional_date ? new Date(`${row.devotional_date}T00:00:00`).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) : '—',
      title: row.title ?? 'Tanpa judul',
      excerpt: excerptFrom(body),
      theme: topics[0] ?? row.category ?? 'Renungan',
      slug: slugify(row.title ?? row.id),
      date: row.devotional_date ?? '',
      author: row.author ?? '',
      topics,
      tags: asList(row.tags),
      body,
      sourceUrl: row.source_notion_url ?? undefined,
    }
  })

  return { reflections, synced: true }
}

export type { ReflectionEntry }
export { slugify }
