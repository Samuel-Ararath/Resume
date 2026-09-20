import type { Film } from '@/lib/content'
import { supabase } from '@/lib/supabase-client'

const typeLabels: Record<string, Film['type']> = {
  anime: 'Anime',
  tv_series: 'TV Series',
  movie: 'Film',
}

function asGenres(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean)
  if (typeof value !== 'string') return []
  return value.split(/[,|]/).map((item) => item.trim()).filter(Boolean)
}

function ratingText(value: unknown): string {
  if (value == null || value === '') return '—'
  return String(value)
}

function watchStatus(value: unknown): Film['watchStatus'] {
  const normalized = String(value ?? '').trim().toLowerCase()
  if (normalized === 'completed' || normalized === 'complete' || normalized === 'selesai' || normalized === 'sudah selesai') return 'Sudah selesai'
  if (normalized === 'ongoing' || normalized === 'watching' || normalized === 'sedang nonton') return 'Sedang nonton'
  return 'Belum nonton'
}

export async function getSyncedFilms(): Promise<{ films: Film[]; synced: boolean }> {
  const { data, error } = await supabase
    .from('media_film')
    .select('*')
    .order('title', { ascending: true })

  if (error || !data) return { films: [], synced: false }

  const films: Film[] = data.map((row) => ({
    title: row.title ?? 'Tanpa judul',
    type: typeLabels[row.media_type] ?? 'Anime',
    rating: ratingText(row['my valutation'] ?? row.rating),
    watchStatus: watchStatus(row['status tonton'] ?? row.status),
    genres: asGenres(row.genre),
    progress: row['total episodes'] == null ? '—' : `${row['total episodes']} episode`,
    malRating: ratingText(row.external_rating),
    generalRating: undefined,
    poster: undefined,
    source: row.source_notion_url ?? undefined,
  }))

  return { films, synced: true }
}
