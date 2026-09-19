import { PageChrome, PageIntro } from '@/components/page-chrome'

const projects = [
  {
    number: '01',
    kind: 'Novel',
    title: 'A story still finding its shape.',
    description: 'A long-form fiction manuscript in progress — collecting fragments, characters, and the questions that keep returning.',
    status: 'Writing',
    meta: 'Manuscript · Ongoing',
  },
  {
    number: '02',
    kind: 'Book',
    title: 'A book of gathered thoughts.',
    description: 'An evolving collection of essays, observations, and personal notes about work, faith, attention, and becoming.',
    status: 'Developing',
    meta: 'Non-fiction · Ongoing',
  },
  {
    number: '03',
    kind: 'Research',
    title: 'Making systems work more thoughtfully.',
    description: 'Research notes on production systems, operational efficiency, maintenance, and the human decisions inside industrial work.',
    status: 'Researching',
    meta: 'Industrial engineering · Ongoing',
  },
  {
    number: '04',
    kind: 'Journal',
    title: 'Notes from the field.',
    description: 'A working journal for ideas, experiments, reading notes, and questions that deserve more time before they become conclusions.',
    status: 'Collecting',
    meta: 'Working archive · Ongoing',
  },
]

export const metadata = { title: 'Project — Samuel.', description: 'A living index of Samuel’s creative, academic, and research projects.' }

export default function ProjectPage() {
  return <PageChrome><main>
    <PageIntro label="Projects" title={<>Things I am <em>still making.</em></>} description="A living index of creative work, books, research, and journals that are taking shape over time." />
    <section className="section-shell page-section project-section" aria-labelledby="project-index-title">
      <div className="project-intro"><div><p className="eyebrow">The workbench</p><h2 id="project-index-title">Nothing here is <em>finished.</em></h2></div><p className="muted-copy">Some projects move by pages, some by questions, and some by the quiet discipline of returning to them.</p></div>
      <div className="project-list">{projects.map((project) => <article className="project-item" key={project.number}>
        <div className="project-meta"><span>{project.number}</span><span>{project.kind}</span></div>
        <div className="project-content"><div><p className="project-status">{project.status}</p><h2>{project.title}</h2><p>{project.description}</p></div><span className="project-type">{project.meta}</span></div>
      </article>)}</div>
    </section>
  </main></PageChrome>
}
