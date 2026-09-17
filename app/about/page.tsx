import { FilmArchive } from '@/components/film-archive'
import { PageChrome, SectionLabel } from '@/components/page-chrome'
import { ReflectionBrowser } from '@/components/reflection-browser'
import { books } from '@/lib/content'
import { getSyncedFilms } from '@/lib/film-sync'
import { getSyncedReflections } from '@/lib/reflection-sync'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'About Me — Samuel.', description: 'A personal profile and living archive of the things Samuel reads, watches, and returns to.' }

export default async function AboutPage() {
  const [{ films, synced: filmsSynced }, { reflections }] = await Promise.all([getSyncedFilms(), getSyncedReflections()])

  return <PageChrome><main>
    <section className="about-hero section-shell">
      <SectionLabel>03 / About me</SectionLabel>
      <div className="about-hero-grid"><h1>The person behind the <em>archive.</em></h1><p>I am Samuel. This is the quieter side of the work: the questions I carry, the stories I return to, and the small observations that help me make sense of things.</p></div>
    </section>

    <section className="about-introduction section-shell section-rule"><div className="about-section-index">01 <span>Introduction</span></div><div className="about-copy"><h2>A place to leave a few things <em>unfinished.</em></h2><div><p>I have always been more interested in what stays with a person than what can be listed about them. A book that changes the way I notice a room. A film that makes an ordinary feeling easier to name. A thought that keeps returning after the day is over.</p><p>This page gathers those traces alongside the more visible parts of my life. Not as a complete portrait, but as an honest one in progress.</p></div></div></section>

    <section className="about-thoughts section-shell section-rule"><div className="about-section-index">02 <span>How I think</span></div><div className="about-copy"><h2>Curiosity, with a preference for <em>depth.</em></h2><div><p>I tend to move slowly at first. I like to understand how things are put together, where the friction is, and what a simpler version might look like. I value clear thinking, but not certainty for its own sake.</p><p>The principles I return to are simple: curiosity over certainty, depth over noise, and consistency over urgency. They are less like rules and more like a way to find my footing again.</p></div></div></section>

    <section id="books" className="about-archive section-shell section-rule"><div className="about-archive-heading"><SectionLabel>03 / Books</SectionLabel><p>Ideas I keep close, and the reasons they remain worth returning to.</p></div><div className="card-list">{books.map((book, index) => <article className="editorial-card" key={book.title}><span className="card-number">0{index + 1}</span><div><p className="card-meta">{book.category}</p><h3>{book.title}</h3><p>{book.author} · {book.note}</p></div><span className="card-arrow" aria-hidden="true">↗</span></article>)}</div></section>

    <section id="film" className="about-archive section-shell section-rule"><div className="about-archive-heading"><SectionLabel>04 / Film</SectionLabel><p>A personal viewing archive: not a ranking, just a record of what I have spent time with.</p></div><FilmArchive films={films} synced={filmsSynced} embedded /></section>

    <section id="renungan" className="about-archive section-shell section-rule"><div className="about-archive-heading"><SectionLabel>05 / Renungan</SectionLabel><p>Notes on faith, attention, and the things that become clearer when given enough quiet.</p></div><ReflectionBrowser entries={reflections} /></section>

    <section className="about-closing section-shell section-rule"><div className="about-section-index">06 <span>Why this website exists</span></div><div className="about-closing-copy"><h2>A record of what I am <em>becoming.</em></h2><p>This website exists because a life can be easier to understand when it has somewhere to collect its fragments. It is part workspace, part shelf, part notebook. I hope it stays useful to me—and, occasionally, to someone who happens to find it.</p></div></section>
  </main></PageChrome>
}
