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
    <div className="bookshelf-grid">
      {filtered.map((book, index) => <a className="bookshelf-card" href={book.url} target="_blank" rel="noreferrer" key={book.id}>
        <div className="bookshelf-card-top"><span>{String(index + 1).padStart(2, '0')}</span><span>{book.category}</span></div>
        <div><h3>{book.title}</h3><p className="bookshelf-author">{book.author || 'Penulis tidak dicatat'}</p></div>
        <div className="bookshelf-card-bottom"><span>{book.status || 'Belum dibaca'}</span><span>{book.progress || book.genres.slice(0, 2).join(' · ') || '—'}</span></div>
      </a>)}
    </div>
    {!filtered.length && <p className="empty-state">Tidak ada judul yang cocok di rak ini.</p>}
  </section>
}
