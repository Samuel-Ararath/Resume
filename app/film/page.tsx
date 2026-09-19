import { FilmArchive } from '@/components/film-archive'
import { PageChrome, PageIntro } from '@/components/page-chrome'
import { getSyncedFilms } from '@/lib/film-sync'

export const dynamic = 'force-dynamic'

export default async function FilmsPage() {
  const { films, synced } = await getSyncedFilms()
  return <PageChrome><main><PageIntro label="On screen" title={<>Things I&apos;ve <em>watched.</em></>} description="A living archive that reads from your database and enriches each title with public ratings." /><section className="section-shell page-section"><div className="section-heading page-action"><span className="quiet-note">Personal viewing archive</span></div><FilmArchive films={films} synced={synced} /></section></main></PageChrome>
}
