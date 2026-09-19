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

export async function getBooks(): Promise<NotionBook[]> {
  const { data, error } = await supabase
    .from('media_books')
    .select('*')

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

// Kept as an alias for existing imports while the archive moves away from its
// old Notion-backed name.
export const getNotionBooks = getBooks
