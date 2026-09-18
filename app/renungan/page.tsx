import { PageChrome, PageIntro } from '@/components/page-chrome'
import { ReflectionBrowser } from '@/components/reflection-browser'
import { getSyncedReflections } from '@/lib/reflection-sync'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Renungan — Samuel.', description: 'Kumpulan renungan dan catatan iman personal.' }

export default async function ReflectionsPage() {
  const { reflections } = await getSyncedReflections()
  return <PageChrome><main><PageIntro label="Reflections" title={<>Some thoughts <em>in passing.</em></>} description="Ruang tenang untuk membaca ulang iman, proses, dan hal-hal yang sering luput diperhatikan." /><section className="section-shell page-section"><div className="reflection-heading"><div><p className="section-label">Santapan rohani</p><h2>Catatan untuk hari-hari yang lebih hening.</h2></div><p className="reflection-intro-note">Tulisan yang menemani langkah kecil sehari-hari.</p></div><ReflectionBrowser entries={reflections} /></section></main></PageChrome>
}
