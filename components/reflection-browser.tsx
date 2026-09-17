'use client'

import { useMemo, useState } from 'react'
import type { ReflectionEntry } from '@/lib/reflection-sync'

export function ReflectionBrowser({ entries, synced }: { entries: ReflectionEntry[]; synced: boolean }) {
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState('Semua topik')
  const [author, setAuthor] = useState('Semua penulis')
  const topics = [...new Set(entries.flatMap((entry) => entry.topics))].sort()
  const authors = [...new Set(entries.map((entry) => entry.author).filter(Boolean))].sort()
  const filtered = useMemo(() => entries.filter((entry) => {
    const matchesQuery = `${entry.title} ${entry.excerpt} ${entry.body}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (topic === 'Semua topik' || entry.topics.includes(topic)) && (author === 'Semua penulis' || entry.author === author)
  }), [author, entries, query, topic])
  const featured = filtered[0]

  return <div className="reflection-browser">
    <div className="reflection-source"><span>{synced ? 'Live dari Notion' : 'Preview lokal'}</span><span className="reflection-count">{filtered.length} tulisan</span></div>
    <div className="reflection-controls"><label className="sr-only" htmlFor="reflection-search">Cari renungan</label><input id="reflection-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari judul atau isi" /><label className="sr-only" htmlFor="reflection-topic">Filter topik</label><select id="reflection-topic" value={topic} onChange={(event) => setTopic(event.target.value)}><option>Semua topik</option>{topics.map((item) => <option key={item}>{item}</option>)}</select><label className="sr-only" htmlFor="reflection-author">Filter penulis</label><select id="reflection-author" value={author} onChange={(event) => setAuthor(event.target.value)}><option>Semua penulis</option>{authors.map((item) => <option key={item}>{item}</option>)}</select></div>
    {featured && <article className="reflection-feature"><span className="reflection-kicker">Renungan pilihan</span><p className="reflection-date">{formatDate(featured.date)}</p><h2>{featured.title}</h2><p>{featured.excerpt}</p><a className="text-link" href={`/renungan/${featured.slug}`}>Baca renungan <span aria-hidden="true">↗</span></a></article>}
    <div className="reflection-grid">{filtered.slice(featured ? 1 : 0).map((entry) => <article className="reflection-card" key={entry.slug}><div className="reflection-card-top"><span>{entry.number}</span><span>{formatDate(entry.date)}</span></div><p className="card-meta">{entry.topics.join(' · ') || 'Renungan'}</p><h2>{entry.title}</h2><p>{entry.excerpt}</p><div className="reflection-card-footer"><span>{entry.author || 'Catatan pribadi'}</span><a className="text-link" href={`/renungan/${entry.slug}`} aria-label={`Baca ${entry.title}`}>Baca <span aria-hidden="true">↗</span></a></div></article>)}</div>
    {!filtered.length && <div className="reflection-empty"><h2>Belum ada yang cocok.</h2><p>Coba kata kunci, topik, atau penulis lain.</p></div>}
  </div>
}

function formatDate(value: string) { if (!value) return 'Tanpa tanggal'; return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(`${value}T00:00:00`)) }
