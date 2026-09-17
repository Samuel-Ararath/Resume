import { FilmArchive } from '@/components/film-archive'
import { PageChrome, PageIntro } from '@/components/page-chrome'
import { getSyncedFilms } from '@/lib/film-sync'
import { notionFilmsUrl } from '@/lib/content'

export const dynamic = 'force-dynamic'

export default async function FilmsPage() {
  const { films, synced } = await getSyncedFilms()
  return <PageChrome><main><PageIntro label="03 / On screen" title={<>Things I&apos;ve <em>watched.</em></>} description="A living archive that reads from your Notion database and enriches each title with public ratings." /><section className="section-shell page-section"><div className="section-heading page-action"><span className="quiet-note">Personal viewing archive</span><a className="text-link" href={notionFilmsUrl} target="_blank" rel="noreferrer">Open Notion list <span aria-hidden="true">↗</span></a></div><FilmArchive films={films} synced={synced} /></section></main></PageChrome>
}
