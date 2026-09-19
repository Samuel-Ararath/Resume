import { createClient } from '@supabase/supabase-js'

export type MediaBook = {
  id: string
  title: string
  author: string | null
  category: string
  cover_url: string | null
  status: string
  rating: number | null
  review_notes: string | null
  created_at: string
}

export type MediaMovie = {
  id: string
  title: string
  type: string
  cover_url: string | null
  status: string
  rating: number | null
  review_notes: string | null
  created_at: string
}

export type Reflection = {
  id: string
  title: string
  content: string
  category: string
  is_published: boolean
  created_at: string
}

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Supabase environment variables are missing.')
  return createClient(url, key, { auth: { persistSession: false } })
}

export async function getMediaBooks() {
  const { data, error } = await getClient().from('media_books').select('*').order('created_at', { ascending: false })
  if (error) throw new Error(`Unable to load books: ${error.message}`)
  return data as MediaBook[]
}

export async function getMediaMovies() {
  const { data, error } = await getClient().from('media_movies').select('*').order('created_at', { ascending: false })
  if (error) throw new Error(`Unable to load movies: ${error.message}`)
  return data as MediaMovie[]
}

export async function getReflections() {
  const { data, error } = await getClient().from('reflections').select('*').eq('is_published', true).order('created_at', { ascending: false })
  if (error) throw new Error(`Unable to load reflections: ${error.message}`)
  return data as Reflection[]
}
