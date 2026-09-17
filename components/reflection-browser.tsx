'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { ReflectionEntry } from '@/lib/reflection-sync'

export function ReflectionBrowser({ entries }: { entries: ReflectionEntry[] }) {
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState('Semua topik')
  const [author, setAuthor] = useState('Semua penulis')
  const topics = [...new Set(entries.flatMap((entry) => entry.topics))].sort()
  const authors = [...new Set(entries.map((entry) => entry.author).filter(Boolean))].sort()
  const filtered = useMemo(() => entries.filter((entry) => {
    const normalizedQuery = query.trim().toLowerCase()
    const matchesQuery = !normalizedQuery || `${entry.title} ${entry.excerpt} ${entry.body} ${entry.topics.join(' ')}`.toLowerCase().includes(normalizedQuery)
    return matchesQuery && (topic === 'Semua topik' || entry.topics.includes(topic)) && (author === 'Semua penulis' || entry.author === author)
  }), [author, entries, query, topic])
  const featured = filtered[0]
  const hasFilters = Boolean(query.trim()) || topic !== 'Semua topik' || author !== 'Semua penulis'
  const clearFilters = () => { setQuery(''); setTopic('Semua topik'); setAuthor('Semua penulis') }

  return <div className="reflection-browser">
    <div className="reflection-toolbar"><div><span className="reflection-kicker">Arsip renungan</span><span className="reflection-count">{filtered.length} tulisan</span></div>{hasFilters && <button className="clear-filters" type="button" onClick={clearFilters}>Hapus filter</button>}</div>
    <div className="reflection-controls"><label className="search-field"><span className="sr-only">Cari renungan</span><input id="reflection-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari judul, topik, atau isi" /></label><label className="sr-only" htmlFor="reflection-topic">Filter topik</label><select id="reflection-topic" value={topic} onChange={(event) => setTopic(event.target.value)}><option>Semua topik</option>{topics.map((item) => <option key={item}>{item}</option>)}</select><label className="sr-only" htmlFor="reflection-author">Filter penulis</label><select id="reflection-author" value={author} onChange={(event) => setAuthor(event.target.value)}><option>Semua penulis</option>{authors.map((item) => <option key={item}>{item}</option>)}</select></div>
    {featured && <article className="reflection-feature"><div className="reflection-feature-meta"><span className="reflection-kicker">Renungan pilihan</span><span className="reflection-date">{formatDate(featured.date)}</span></div><h2>{featured.title}</h2><p>{featured.excerpt}</p><Link className="text-link" href={`/renungan/${featured.slug}`}>Baca renungan <span aria-hidden="true">↗</span></Link></article>}
    <div className="reflection-grid">{filtered.slice(featured ? 1 : 0).map((entry) => <article className="reflection-card" key={entry.slug}><div className="reflection-card-top"><span>{entry.number}</span><span>{formatDate(entry.date)}</span></div><p className="card-meta">{entry.topics.join(' · ') || 'Renungan'}</p><h2>{entry.title}</h2><p>{entry.excerpt}</p><div className="reflection-card-footer"><span>{entry.author || 'Catatan pribadi'}</span><Link className="text-link" href={`/renungan/${entry.slug}`} aria-label={`Baca ${entry.title}`}>Baca <span aria-hidden="true">↗</span></Link></div></article>)}</div>
    {!filtered.length && <div className="reflection-empty"><h2>Belum ada yang cocok.</h2><p>Coba kata kunci, topik, atau penulis lain.</p>{hasFilters && <button className="button button-dark" type="button" onClick={clearFilters}>Tampilkan semua <span aria-hidden="true">↗</span></button>}</div>}
  </div>
}

function formatDate(value: string) { if (!value) return 'Tanpa tanggal'; return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(`${value}T00:00:00`)) }
