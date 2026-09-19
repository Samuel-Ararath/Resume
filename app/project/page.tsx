import { PageChrome, PageIntro } from '@/components/page-chrome'

type Project = { title: string; start: string; collaborator?: string; progress: string }

const projectGroups: { label: string; description: string; projects: Project[] }[] = [
  { label: 'Novel', description: 'Long-form fiction manuscripts currently being developed.', projects: [
    { title: 'Overlord of the Forbidden Land', start: '2021', progress: 'In progress' },
    { title: 'Last Requiem', start: '2021', progress: 'In progress' },
    { title: 'The Legend of Seiya', start: '2020', progress: 'In progress' },
    { title: 'Spring Within You', start: '2021', progress: 'In progress' },
  ] },
  { label: 'Book', description: 'Book-length writing projects and personal manuscripts.', projects: [
    { title: 'Nine Serenities', start: '2019', progress: 'In progress' },
    { title: 'Record of a Time and Life', start: '2023', progress: 'In progress' },
  ] },
  { label: 'Research', description: 'Applied research connecting industrial systems, performance, and long-term value.', projects: [
    { title: 'Analisis Kinerja dan Biaya Siklus Hidup Mesin Produksi dengan Pendekatan Overall Equipment Effectiveness dan Life Cycle Cost sebagai Dasar Strategi Pemeliharaan di Lembaga Alkitab Indonesia', start: '2026', progress: 'In progress' },
  ] },
  { label: 'Journal', description: 'Academic writing and collaborative inquiry in religion and society.', projects: [
    { title: 'Persepsi Pemuda Kristen terhadap Realitas Kejahatan dan Mitos Modern: Pendekatan Sosiologi Agama dalam Menjawab Krisis Eksistensial', start: '2026', collaborator: 'Y. S. Lumban Gaol', progress: 'In progress' },
    { title: 'Takut sebagai Instrumen Kendali: Evaluasi Mahasiswa Kristen terhadap Penggunaan Ayat Alkitab untuk Intimidasi Finansial dalam Konteks Pelayanan Gereja', start: '2026', progress: 'In progress' },
  ] },
]

export const metadata = { title: 'Project — Samuel.', description: 'A formal index of Samuel’s ongoing creative, academic, and research projects.' }

export default function ProjectPage() {
  return <PageChrome><main>
    <PageIntro label="Projects" title={<>Work in <em>progress.</em></>} description="A structured index of creative writing, books, research, and journal projects that are being developed over time." />
    <section className="section-shell page-section project-section" aria-labelledby="project-index-title">
      <div className="project-intro"><div><p className="eyebrow">Project register</p><h2 id="project-index-title">An ongoing body of <em>work.</em></h2></div><p className="muted-copy">This register records the projects, their starting points, collaborators, and current stage of development.</p></div>
      <div className="project-groups">{projectGroups.map((group, groupIndex) => <section className="project-group" key={group.label} aria-labelledby={`project-group-${group.label.toLowerCase()}`}>
        <div className="project-group-heading"><div><span className="project-group-number">{String(groupIndex + 1).padStart(2, '0')}</span><h2 id={`project-group-${group.label.toLowerCase()}`}>{group.label}</h2></div><p>{group.description}</p></div>
        <div className="project-table-wrap"><table className="project-table"><caption className="sr-only">Daftar project {group.label}</caption><thead><tr><th scope="col">Project title</th><th scope="col">Start</th><th scope="col">Collaborator</th><th scope="col">Progress</th></tr></thead><tbody>{group.projects.map((project) => <tr key={project.title}><th scope="row">{project.title}</th><td>{project.start}</td><td>{project.collaborator ?? '—'}</td><td><span className="project-progress">{project.progress}</span></td></tr>)}</tbody></table></div>
      </section>)}</div>
    </section>
  </main></PageChrome>
}
