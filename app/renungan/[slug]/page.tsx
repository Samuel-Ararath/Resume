import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageChrome } from '@/components/page-chrome'
import { ReflectionReader } from '@/components/reflection-reader'
import { getSyncedReflections } from '@/lib/reflection-sync'

export const dynamic = 'force-dynamic'

export default async function ReflectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { reflections } = await getSyncedReflections()
  const entry = reflections.find((item) => item.slug === slug)
  if (!entry) notFound()

  return <PageChrome><main><article className="section-shell reflection-detail">
    <Link className="back-link" href="/renungan">← Semua renungan</Link>
    <header className="reflection-document-head">
      <div className="reflection-document-icon" aria-hidden="true">📖</div>
      <p className="section-label">Santapan rohani</p>
      <h1>{entry.title}</h1>
      <div className="reflection-properties" aria-label="Informasi renungan">
        <div><span className="reflection-property-label">Tanggal</span><strong>{formatDate(entry.date)}</strong></div>
        <div><span className="reflection-property-label">Tag</span><strong>{entry.tags.join(' · ') || '—'}</strong></div>
        <div><span className="reflection-property-label">Penulis</span><strong>{entry.author || '—'}</strong></div>
        <div><span className="reflection-property-label">Topik</span><strong>{entry.topics.join(' · ') || '—'}</strong></div>
      </div>
    </header>
    <div className="reflection-document-rule" />
    <section className="reflection-document-body" aria-label="Isi renungan"><ReflectionReader body={entry.body} /></section>
  </article></main></PageChrome>
}

function formatDate(value: string) {
  if (!value) return 'Tanpa tanggal'
  return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(`${value}T00:00:00`))
}
