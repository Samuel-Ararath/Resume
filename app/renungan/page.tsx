import { PageChrome, PageIntro } from '@/components/page-chrome'
import { ReflectionBrowser } from '@/components/reflection-browser'
import { getSyncedReflections, notionReflectionsUrl } from '@/lib/reflection-sync'

export const metadata = { title: 'Renungan — Samuel.', description: 'Kumpulan renungan dan catatan iman personal yang tersinkronisasi dari Notion.' }

export default async function ReflectionsPage() {
  const { reflections, synced } = await getSyncedReflections()
  return <PageChrome><main><PageIntro label="04 / Reflections" title={<>Some thoughts <em>in passing.</em></>} description="Ruang tenang untuk membaca ulang iman, proses, dan hal-hal yang sering luput diperhatikan." /><section className="section-shell page-section"><div className="reflection-heading"><div><p className="section-label">Santapan rohani</p><h2>Catatan untuk hari-hari yang lebih hening.</h2></div><a className="text-link" href={notionReflectionsUrl} target="_blank" rel="noreferrer">Buka database Notion <span aria-hidden="true">↗</span></a></div><ReflectionBrowser entries={reflections} synced={synced} /></section></main></PageChrome>
}
