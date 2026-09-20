import { supabase } from '@/lib/supabase-client'

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

const categoryLabels: Record<string, string> = {
  book: 'Buku',
  novel: 'Novel',
  manga: 'Manga',
  manhua: 'Manhua',
  manhwa: 'Manhwa',
}

function progressFor(row: any) {
  if (row.media_type === 'book' && row.total_pages != null) return `${row.total_pages} halaman`
  if (['manga', 'manhua', 'manhwa'].includes(row.media_type) && (row.total_chapters != null || row.chapters_read != null)) {
    return `${row.chapters_read ?? 0}/${row.total_chapters ?? '—'} bab`
  }
  return undefined
}

export async function getBooks(): Promise<NotionBook[]> {
  const { data, error } = await supabase
    .from('media_books')
    .select('*')
    .order('title', { ascending: true })

  if (error || !data) return []

  return data.map((row) => ({
    id: row.id,
    title: row.title ?? 'Tanpa judul',
    author: row.author ?? '',
    category: categoryLabels[row.media_type] ?? 'Buku',
    status: row.status ?? '',
    genres: Array.isArray(row.genres) ? row.genres : [],
    progress: progressFor(row),
    url: row.source_notion_url ?? '',
  }))
}

export const getNotionBooks = getBooks
