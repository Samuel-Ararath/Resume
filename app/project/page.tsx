import { PageChrome, PageIntro } from '@/components/page-chrome'

type Project = { title: string; start: string; collaborator?: string; progress: string }
type ProjectGroup = { label: string; description: string; cover: string; projects: Project[] }

const projectGroups: ProjectGroup[] = [
  { label: 'Novel', description: 'Long-form fiction manuscripts currently being developed.', cover: '/projects/novel.png', projects: [
    { title: 'Overlord of the Forbidden Land', start: '2021', progress: 'In progress' },
    { title: 'Last Requiem', start: '2021', progress: 'In progress' },
    { title: 'The Legend of Seiya', start: '2020', progress: 'In progress' },
    { title: 'Spring Within You', start: '2021', progress: 'In progress' },
  ] },
  { label: 'Book', description: 'Book-length writing projects and personal manuscripts.', cover: '/projects/books.png', projects: [
    { title: 'Nine Serenities', start: '2019', progress: 'In progress' },
    { title: 'Record of a Time and Life', start: '2023', progress: 'In progress' },
  ] },
  { label: 'Research', description: 'Applied research connecting industrial systems, performance, and long-term value.', cover: '/projects/research.png', projects: [
    { title: 'Analisis Kinerja dan Biaya Siklus Hidup Mesin Produksi dengan Pendekatan Overall Equipment Effectiveness dan Life Cycle Cost sebagai Dasar Strategi Pemeliharaan di Lembaga Alkitab Indonesia', start: '2026', progress: 'In progress' },
  ] },
  { label: 'Journal', description: 'Academic writing and collaborative inquiry in religion and society.', cover: '/projects/journal.png', projects: [
    { title: 'Persepsi Pemuda Kristen terhadap Realitas Kejahatan dan Mitos Modern: Pendekatan Sosiologi Agama dalam Menjawab Krisis Eksistensial', start: '2026', collaborator: 'Y. S. L. Gaol', progress: 'In progress' },
    { title: 'Takut sebagai Instrumen Kendali: Evaluasi Mahasiswa Kristen terhadap Penggunaan Ayat Alkitab untuk Intimidasi Finansial dalam Konteks Pelayanan Gereja', start: '2026', collaborator: 'F. X. Gunawan', progress: 'In progress' },
  ] },
]

const projectCards = projectGroups.flatMap((group, groupIndex) => group.projects.map((project, projectIndex) => ({
  ...project,
  category: group.label,
  cover: group.cover,
  number: `${String(groupIndex + 1).padStart(2, '0')}.${String(projectIndex + 1).padStart(2, '0')}`,
})))

export const metadata = { title: 'Project: Samuel.', description: 'A formal index of Samuel’s ongoing creative, academic, and research projects.' }

export default function ProjectPage() {
  return <PageChrome><main>
    <PageIntro label="Projects" title={<>Work in <em>progress.</em></>} description="A structured index of creative writing, books, research, and journal projects that are being developed over time." />
    <section className="section-shell page-section project-section" aria-labelledby="project-index-title">
      <div className="project-intro"><div><p className="eyebrow">Selected work</p><h2 id="project-index-title">Ideas taking<br /><em>their own shape.</em></h2></div><p className="muted-copy">A living collection of research, writing, and creative work. Each project marks a different question I&apos;m working through.</p></div>
      <div className="project-gallery-grid">
        {projectCards.map((project) => (
          <article className="project-card" key={`${project.category}-${project.title}`}>
            <div className="project-card-art">
              <img src={project.cover} alt="" />
              <span className="project-card-category">{project.category}</span>
              <span className="project-card-number">{project.number}</span>
            </div>
            <div className="project-card-content">
              <div className="project-card-meta"><span>{project.start}</span><span>{project.collaborator ? `With ${project.collaborator}` : 'Independent'}</span></div>
              <h3>{project.title}</h3>
              <div className="project-card-footer"><span>{project.progress}</span><span className="project-card-arrow" aria-hidden="true">↗</span></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  </main></PageChrome>
}
