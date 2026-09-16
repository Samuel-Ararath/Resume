import { PageChrome, PageIntro } from '@/components/page-chrome'
import { reflections } from '@/lib/content'

export default function ReflectionsPage() { return <PageChrome><main><PageIntro label="04 / Reflections" title={<>Some thoughts <em>in passing.</em></>} description="Notes for slower days: short reflections on faith, work, process, and the things that often go unnoticed." /><section className="section-shell page-section"><div className="reflection-list">{reflections.map((item) => <article className="reflection-card" key={item.number}><span>{item.number}</span><div><p className="card-meta">{item.theme}</p><h2>{item.title}</h2><p>{item.excerpt}</p></div></article>)}</div></section></main></PageChrome> }
