import { notFound } from 'next/navigation'
import { PageChrome } from '@/components/page-chrome'
import { OperationalModule } from '@/components/operational-module'
import { getSkillPage, skillPages } from '@/lib/skill-pages'

export function generateStaticParams() {
  return skillPages.map((page) => ({ slug: page.slug }))
}

function SkillEmptyPage({ title, number }: { title: string; number: string }) {
  return <main className="skill-page"><div className="skill-reading-shell">
    <nav className="skill-breadcrumb" aria-label="Breadcrumb"><a href="/resume">Resume</a><span>→</span><a href="/resume#top-skills">Top Skills</a><span>→</span><span>{title}</span></nav>
    <header className="skill-hero"><p className="skill-kicker">Technical reference · {number}</p><h1>{title}</h1><p className="skill-subtitle">Materi akademik sedang menunggu sumber PDF.</p></header>
    <div className="skill-layout"><article className="skill-article"><section id="material-status" className="skill-empty-state" aria-label="Materi belum tersedia"><span className="section-num">—</span><p>Halaman ini telah dikosongkan untuk menjaga struktur desain. Materi akan ditambahkan setelah PDF referensinya tersedia.</p></section></article><aside className="skill-toc"><p>Contents</p><ol><li><a href="#material-status">Material status</a></li></ol></aside></div>
  </div></main>
}

export default async function SkillDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = getSkillPage(slug)
  if (!page) notFound()
  return <PageChrome>{slug === 'operational-management' ? <OperationalModule /> : <SkillEmptyPage title={page.title} number={page.number} />}</PageChrome>
}
