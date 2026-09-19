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

export async function getSyncedReflections(): Promise<{ reflections: ReflectionEntry[]; synced: boolean }> {
  const { data, error } = await supabase
    .from('reflections')
    .select('id, title, slug, excerpt, body, theme, topics, tags, author, date, source_url')
    .order('created_at', { ascending: true })

  if (error || !data) return { reflections: [], synced: true }

  const reflections: ReflectionEntry[] = data.map((row) => ({
    number: row.date ? new Date(row.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) : '—',
    title: row.title,
    excerpt: row.excerpt ?? '',
    theme: (row.topics?.[0]) ?? row.theme ?? 'Renungan',
    slug: row.slug ?? slugify(row.title),
    date: row.date ?? '',
    author: row.author ?? '',
    topics: row.topics ?? [],
    tags: row.tags ?? [],
    body: row.body ?? '',
    sourceUrl: row.source_url ?? undefined,
  }))

  return { reflections, synced: true }
}

export type { ReflectionEntry }
export { slugify }
