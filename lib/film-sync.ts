import type { Film } from '@/lib/content'
import { supabase } from '@/lib/supabase-client'

export async function getSyncedFilms(): Promise<{ films: Film[]; synced: boolean }> {
  const { data, error } = await supabase
    .from('media_movies')
    .select('*')

  if (error || !data) return { films: [], synced: false }

  const films: Film[] = data.map((row) => ({
    title: row.title,
    type: (row.type as Film['type']) ?? 'Anime',
    rating: row.rating ?? '—',
    watchStatus: (row.watch_status as Film['watchStatus']) ?? 'Sudah selesai',
    genres: row.genres ?? [],
    progress: row.progress ?? '—',
    malRating: row.mal_rating ?? '—',
    generalRating: row.general_rating || undefined,
    poster: row.poster || undefined,
    source: row.source || undefined,
  }))

  return { films, synced: true }
}
