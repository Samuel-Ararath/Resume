"use client"

import { useMemo, useState } from 'react'
import type { Film } from '@/lib/content'

const views = ['Tabel', 'Upcoming', 'Katalog', 'Semua'] as const
const types = ['Semua', 'Anime', 'TV Series', 'Film'] as const
const databaseTypes = ['Anime', 'TV Series', 'Film'] as const

function FilmTable({ title, films }: { title: string; films: Film[] }) {
  return (
    <section className="film-database-panel" aria-labelledby={`film-panel-${title.toLowerCase().replaceAll(' ', '-')}`}>
      <div className="film-panel-heading">
        <div>
          <span className="film-panel-index">{title === 'Anime' ? '01' : title === 'TV Series' ? '02' : '03'}</span>
          <h2 id={`film-panel-${title.toLowerCase().replaceAll(' ', '-')}`}>{title}</h2>
        </div>
        <span className="film-panel-count">{films.length} judul</span>
      </div>
      <div className="film-panel-scroll">
        <table className="film-table">
          <thead><tr><th>Title</th><th>Rating pribadi</th><th>Status</th><th>Genre</th><th>Rating umum</th></tr></thead>
          <tbody>
            {films.map((film) => (
              <tr key={`${title}-${film.title}`}>
                <th scope="row">{film.title}</th>
                <td>{film.rating}</td>
                <td><span className={`status-pill status-${film.watchStatus.replaceAll(' ', '-').toLowerCase()}`}>{film.watchStatus}</span></td>
                <td><div className="genre-list">{film.genres.slice(0, 2).map((genre) => <span key={genre}>{genre}</span>)}</div></td>
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

export function FilmArchive({ films, synced }: { films: Film[]; synced: boolean }) {
  const [view, setView] = useState<(typeof views)[number]>('Tabel')
  const [type, setType] = useState<(typeof types)[number]>('Semua')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('Semua status')

  const filteredFilms = useMemo(() => films.filter((film) => {
    const matchesType = type === 'Semua' || film.type === type
    const matchesStatus = status === 'Semua status' || film.watchStatus === status
    const haystack = `${film.title} ${film.genres.join(' ')}`.toLowerCase()
    return matchesType && matchesStatus && haystack.includes(query.toLowerCase())
  }), [films, query, status, type])

  const groupedFilms = databaseTypes.map((databaseType) => ({ type: databaseType, films: filteredFilms.filter((film) => film.type === databaseType) }))

  return (
    <section className="film-database" aria-label="Personal viewing database">
      <div className="database-sync-status" data-live={synced}>{synced ? 'Live dari Notion · rating diperbarui otomatis' : 'Preview lokal · hubungkan database Notion untuk data live'}</div>
      <div className="film-database-head"><div className="database-title"><span aria-hidden="true">▣</span><strong>Anime / TV Series / Film</strong></div><div className="database-actions"><button type="button" aria-label="Filter database">≡</button><button type="button" aria-label="Sort database">↕</button><button type="button" aria-label="Search database">⌕</button></div></div>
      <div className="film-tabs" role="tablist" aria-label="Database views">{views.map((item) => <button key={item} type="button" role="tab" aria-selected={view === item} className={view === item ? 'is-selected' : ''} onClick={() => setView(item)}>{item}</button>)}</div>
      <div className="film-toolbar"><div className="film-filters" aria-label="Filter by type">{types.map((item) => <button key={item} type="button" className={type === item ? 'is-selected' : ''} onClick={() => setType(item)}>{item}</button>)}</div><div className="film-controls"><label className="sr-only" htmlFor="film-search">Search titles or genres</label><input id="film-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" /><label className="sr-only" htmlFor="film-status">Filter watch status</label><select id="film-status" value={status} onChange={(event) => setStatus(event.target.value)}><option>Semua status</option><option>Sudah selesai</option><option>Belum nonton</option><option>Sedang nonton</option></select></div></div>
      {view === 'Katalog' ? <div className="film-catalog">{filteredFilms.map((film) => <article key={film.title}>{film.poster ? <img src={film.poster} alt="" className="film-cover-image" /> : <span className="film-cover" aria-hidden="true">{film.title.slice(0, 1)}</span>}<h3>{film.title}</h3><p>{film.type} · {film.generalRating ? `TMDB ${film.generalRating}` : `MAL ${film.malRating}`}</p></article>)}</div> : <div className="film-database-grid">{groupedFilms.map((group) => <FilmTable key={group.type} title={group.type} films={group.films} />)}</div>}
      <p className="database-footnote">Menampilkan {filteredFilms.length} dari {films.length} judul · {synced ? 'data live dari Notion.' : 'data fallback lokal sementara.'}</p>
    </section>
  )
}

