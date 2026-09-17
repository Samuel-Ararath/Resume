import { FilmArchive } from '@/components/film-archive'
import { PageChrome, PageIntro } from '@/components/page-chrome'
import { notionFilmsUrl } from '@/lib/content'

export default function FilmsPage() {
  return <PageChrome><main><PageIntro label="03 / On screen" title={<>Things I&apos;ve <em>watched.</em></>} description="A living archive of anime, series, and films—organized with the same database rhythm as my personal Notion list." /><section className="section-shell page-section"><div className="section-heading page-action"><span className="quiet-note">Personal viewing archive</span><a className="text-link" href={notionFilmsUrl} target="_blank" rel="noreferrer">Open Notion list <span aria-hidden="true">↗</span></a></div><FilmArchive /></section></main></PageChrome>
}
