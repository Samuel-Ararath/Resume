import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageChrome } from '@/components/page-chrome'
import { getSyncedReflections } from '@/lib/reflection-sync'

export default async function ReflectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { reflections } = await getSyncedReflections()
  const entry = reflections.find((item) => item.slug === slug)
  if (!entry) notFound()
  return <PageChrome><main><article className="section-shell reflection-detail"><Link className="back-link" href="/renungan">← Semua renungan</Link><p className="section-label">{entry.topics.join(' · ') || 'Renungan'}</p><p className="reflection-date">{formatDate(entry.date)}{entry.author ? ` · ${entry.author}` : ''}</p><h1>{entry.title}</h1>{entry.excerpt && <p className="reflection-lead">{entry.excerpt}</p>}<div className="reflection-body">{entry.body.split(/\n\n+/).filter(Boolean).map((paragraph, index) => <p key={`${entry.slug}-${index}`}>{paragraph}</p>)}</div></article></main></PageChrome>
}

function formatDate(value: string) { if (!value) return 'Tanpa tanggal'; return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(`${value}T00:00:00`)) }
