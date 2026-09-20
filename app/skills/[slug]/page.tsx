import { notFound } from 'next/navigation'
import { PageChrome } from '@/components/page-chrome'
import { SkillPageView } from '@/components/skill-page'
import { OperationalModule } from '@/components/operational-module'
import { getSkillPage, skillPages } from '@/lib/skill-pages'

export function generateStaticParams() {
  return skillPages.map((page) => ({ slug: page.slug }))
}

export default async function SkillDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = getSkillPage(slug)
  if (!page) notFound()
  return <PageChrome>{slug === 'operational-management' ? <OperationalModule /> : <SkillPageView page={page} />}</PageChrome>
}
