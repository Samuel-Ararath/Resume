'use client'

import { useMemo, useState } from 'react'
import type { NotionBook } from '@/lib/notion-books'

const tabs = ['Semua', 'Buku', 'Novel', 'Manga', 'Manhua', 'Manhwa']

export function Bookshelf({ books }: { books: NotionBook[] }) {
  const [activeTab, setActiveTab] = useState('Semua')
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => books.filter((book) => {
    const matchesTab = activeTab === 'Semua' || book.category === activeTab
    const haystack = `${book.title} ${book.author} ${book.genres.join(' ')}`.toLowerCase()
    return matchesTab && haystack.includes(query.toLowerCase())
  }), [activeTab, books, query])

  return <section className="section-shell page-section bookshelf-section" aria-labelledby="bookshelf-title">
    <div className="bookshelf-toolbar">
      <div>
        <p className="eyebrow">The personal index</p>
        <h2 id="bookshelf-title">A shelf of <em>ongoing stories.</em></h2>
      </div>
      <label className="bookshelf-search"><span className="sr-only">Cari koleksi</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the shelf" /></label>
    </div>
    <div className="bookshelf-tabs" role="tablist" aria-label="Filter koleksi">
      {tabs.map((tab) => <button key={tab} className={activeTab === tab ? 'is-selected' : ''} onClick={() => setActiveTab(tab)} role="tab" aria-selected={activeTab === tab}>{tab}</button>)}
    </div>
    <div className="bookshelf-table-wrap">
      <table className="bookshelf-table">
        <caption className="sr-only">Daftar koleksi buku</caption>
        <thead><tr><th scope="col">Judul</th><th scope="col">Penulis</th><th scope="col">Genre</th><th scope="col">Status</th><th scope="col">Progress</th><th scope="col"><span className="sr-only">Buka</span></th></tr></thead>
        <tbody>{filtered.map((book, index) => <tr key={book.id}>
          <td><a className="table-title" href={book.url} target="_blank" rel="noreferrer"><span className="table-index">{String(index + 1).padStart(2, '0')}</span><strong>{book.title}</strong></a></td>
          <td>{book.author || '—'}</td>
          <td><span className="table-genres">{book.genres.slice(0, 2).join(' · ') || '—'}</span></td>
          <td><span className="table-status">{book.status || 'Belum dibaca'}</span></td>
          <td>{book.progress || '—'}</td>
          <td><a className="table-arrow" href={book.url} target="_blank" rel="noreferrer" aria-label={`Buka ${book.title}`}>↗</a></td>
        </tr>)}</tbody>
      </table>
    </div>
    {!filtered.length && <p className="empty-state">Tidak ada judul yang cocok di rak ini.</p>}
  </section>
}
