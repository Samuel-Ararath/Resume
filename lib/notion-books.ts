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

export async function getNotionBooks(): Promise<NotionBook[]> {
  const { data, error } = await supabase
    .from('media_books')
    .select('id, title, author, category, status, genres, progress, url')
    .order('created_at', { ascending: true })

  if (error || !data) return []

  return data.map((row) => ({
    id: row.id,
    title: row.title,
    author: row.author ?? '',
    category: row.category ?? '',
    status: row.status ?? '',
    genres: row.genres ?? [],
    progress: row.progress ?? undefined,
    url: row.url ?? '',
  }))
}
