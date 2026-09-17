"use client"

import { useMemo, useState } from 'react'
import type { Film } from '@/lib/content'

const types = ['Semua', 'Anime', 'TV Series', 'Film'] as const
const databaseTypes = ['Anime', 'TV Series', 'Film'] as const
const sortOptions = ['Terbaru', 'Judul A–Z', 'Rating pribadi', 'Rating umum', 'Populer'] as const

function RatingValue({ value }: { value: string }) {
  const stars = value.match(/⭐️?/g)?.filter(Boolean) ?? []
  if (!stars.length) return <span>{value}</span>
  return <span className="rating-stars" aria-label={`${stars.length} dari 5 bintang`}>{stars.join('')}</span>
}

function FilmTable({ title, films }: { title: string; films: Film[] }) {
  const isSearchResult = title === 'Hasil pencarian'
  return (
    <section className="film-database-panel" aria-labelledby={`film-panel-${title.toLowerCase().replaceAll(' ', '-')}`}>
      <div className="film-panel-heading">
        <div>
          <span className="film-panel-index">{isSearchResult ? '⌕' : title === 'Anime' ? '01' : title === 'TV Series' ? '02' : '03'}</span>
          <h2 id={`film-panel-${title.toLowerCase().replaceAll(' ', '-')}`}>{title}</h2>
        </div>
        <span className="film-panel-count">{films.length} judul</span>
      </div>
      <div className="film-panel-scroll">
        <table className="film-table">
          <thead><tr><th>Title</th><th>Rating pribadi</th><th>Status</th><th>Genre</th><th>Rating umum</th></tr></thead>
          <tbody>
            {films.map((film, index) => (
              <tr key={`${title}-${film.title}-${index}`}>
                <th scope="row">{film.title}</th>
                <td><RatingValue value={film.rating} /></td>
                <td><span className={`status-pill status-${film.watchStatus.replaceAll(' ', '-').toLowerCase()}`}>{film.watchStatus}</span></td>
                <td><div className="genre-list">{film.genres.map((genre) => <span key={genre}>{genre}</span>)}</div></td>
                <td>{film.generalRating ?? film.malRating}{film.generalRating ? ' TMDB' : film.malRating !== '—' ? ' MAL' : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {films.length === 0 && <p className="empty-film">Tidak ada judul dalam database ini.</p>}
      </div>
    </section>
  )
}

export function FilmArchive({ films, synced, notionUrl }: { films: Film[]; synced: boolean; notionUrl: string }) {
  const [type, setType] = useState<(typeof types)[number]>('Semua')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('Semua status')
  const [genre, setGenre] = useState('Semua genre')
  const [sort, setSort] = useState<(typeof sortOptions)[number]>('Terbaru')

  const genres = useMemo(() => [...new Set(films.flatMap((film) => film.genres))].sort((a, b) => a.localeCompare(b)), [films])
  const filteredFilms = useMemo(() => {
    const result = films.filter((film) => {
      const matchesType = type === 'Semua' || film.type === type
      const matchesStatus = status === 'Semua status' || film.watchStatus === status
      const matchesGenre = genre === 'Semua genre' || film.genres.includes(genre)
      const haystack = `${film.title} ${film.genres.join(' ')}`.toLowerCase()
      return matchesType && matchesStatus && matchesGenre && haystack.includes(query.toLowerCase())
    })
    return [...result].sort((a, b) => {
      if (sort === 'Judul A–Z') return a.title.localeCompare(b.title)
      if (sort === 'Rating pribadi') return ratingNumber(b.rating) - ratingNumber(a.rating)
      if (sort === 'Rating umum') return ratingNumber(b.generalRating ?? b.malRating) - ratingNumber(a.generalRating ?? a.malRating)
      if (sort === 'Populer') return ratingNumber(b.generalRating ?? b.malRating) - ratingNumber(a.generalRating ?? a.malRating)
      return 0
    })
  }, [films, genre, query, sort, status, type])

  const isSearching = query.trim().length > 0
  const visibleGroups = type === 'Semua' ? databaseTypes : [type]
  const groupedFilms = isSearching
    ? [{ type: 'Hasil pencarian', films: filteredFilms }]
    : visibleGroups.map((databaseType) => ({ type: databaseType, films: filteredFilms.filter((film) => film.type === databaseType) }))

  return (
    <section className="film-database" aria-label="Personal viewing database">
      <div className="database-sync-status" data-live={synced}><span>{synced ? 'Live dari Notion' : 'Preview lokal · hubungkan database Notion untuk data live'}</span><a className="text-link" href={notionUrl} target="_blank" rel="noreferrer">Open Notion list <span aria-hidden="true">↗</span></a></div>
      <div className="film-database-head"><div className="database-title"><span aria-hidden="true">▣</span><strong>Anime / TV Series / Film</strong></div></div>
      <div className="film-toolbar"><div className="film-filters" role="tablist" aria-label="Pilih kategori">{types.map((item) => <button key={item} type="button" role="tab" aria-selected={type === item} className={type === item ? 'is-selected' : ''} onClick={() => setType(item)}>{item}</button>)}</div><div className="film-controls"><label className="sr-only" htmlFor="film-search">Search titles or genres</label><input id="film-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari judul atau genre" /><label className="sr-only" htmlFor="film-status">Filter watch status</label><select id="film-status" value={status} onChange={(event) => setStatus(event.target.value)}><option>Semua status</option><option>Sudah selesai</option><option>Belum nonton</option><option>Sedang nonton</option></select><label className="sr-only" htmlFor="film-genre">Filter genre</label><select id="film-genre" value={genre} onChange={(event) => setGenre(event.target.value)}><option>Semua genre</option>{genres.map((item) => <option key={item}>{item}</option>)}</select><label className="sr-only" htmlFor="film-sort">Urutkan</label><select id="film-sort" value={sort} onChange={(event) => setSort(event.target.value as (typeof sortOptions)[number])}>{sortOptions.map((item) => <option key={item}>{item}</option>)}</select></div></div>
      <div className="film-database-grid">{groupedFilms.map((group) => <FilmTable key={group.type} title={group.type} films={group.films} />)}</div>
      <p className="database-footnote">Menampilkan {filteredFilms.length} dari {films.length} judul · {synced ? 'data live dari Notion.' : 'data fallback lokal sementara.'}</p>
    </section>
  )
}

function ratingNumber(value: string) {
  const number = Number.parseFloat(value.replace(',', '.'))
  if (Number.isFinite(number)) return number
  return (value.match(/⭐/g) ?? []).length
}

