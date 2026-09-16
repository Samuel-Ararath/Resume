import { SiteHeader } from '@/components/site-header'
import { books, films, principles, reflections } from '@/lib/content'

function SectionLabel({ children }: { children: string }) {
  return <p className="section-label"><span />{children}</p>
}

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <section id="home" className="hero section-shell">
        <div className="hero-intro reveal">
          <p className="eyebrow">Personal archive · 2024—now</p>
          <h1>A life in <em>progress,</em><br />collected with intention.</h1>
          <p className="hero-copy">A quiet corner on the internet for the work I do, the stories I return to, and the ideas I&apos;m still learning to name.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#resume">Explore my work <span aria-hidden="true">↘</span></a>
            <a className="text-link" href="#contact">Say hello <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="hero-aside reveal delay-1">
          <div className="portrait-frame" aria-label="Area foto profil Samuel">
            <div className="portrait-initial">S<span>.</span></div>
            <p>Jakarta / Indonesia</p>
          </div>
          <div className="hero-caption"><span>Currently</span><strong>Building meaningful things<br />with thoughtful people.</strong></div>
        </div>
      </section>

      <section className="manifesto section-shell section-rule">
        <p className="manifesto-label">01 / A little about me</p>
        <div className="manifesto-copy"><h2>Not everything needs to be <em>loud</em> to matter.</h2><p>I believe in the enduring value of craft, a clear point of view, and showing up consistently. This site is a living record of that belief.</p></div>
      </section>

      <section id="resume" className="resume section-shell section-rule">
        <div className="section-heading"><SectionLabel>02 / Resume</SectionLabel><a className="text-link" href="https://www.linkedin.com/in/samuel-simanjuntak-b9b98b2b0/" target="_blank" rel="noreferrer">View LinkedIn <span aria-hidden="true">↗</span></a></div>
        <div className="resume-grid">
          <div><h2>Experience<br /><em>with a point of view.</em></h2><p className="muted-copy">Resume lengkap akan ditambahkan setelah PDF tersedia. Struktur ini disiapkan untuk menampilkan perjalanan profesional dengan lebih jernih dan personal.</p></div>
          <div className="timeline"><article><span className="timeline-year">NOW</span><div><h3>Current chapter</h3><p>Work, learning, and building what comes next.</p></div></article><article><span className="timeline-year">PAST</span><div><h3>Previous chapters</h3><p>Selected roles, projects, and the lessons they left behind.</p></div></article><article><span className="timeline-year">ALWAYS</span><div><h3>Principles I return to</h3><p>{principles.join(' · ')}</p></div></article></div>
        </div>
      </section>

      <section id="books" className="collection section-shell section-rule">
        <div className="section-heading"><SectionLabel>03 / Bookshelf</SectionLabel><a className="text-link" href="#contact">Suggest a book <span aria-hidden="true">↗</span></a></div>
        <div className="collection-intro"><h2>Books I keep<br /><em>coming back to.</em></h2><p>A curated shelf of ideas that made me pause, question, or see the familiar differently.</p></div>
        <div className="card-list">{books.map((book, index) => <article className="editorial-card" key={book.title}><span className="card-number">0{index + 1}</span><div><p className="card-meta">{book.category}</p><h3>{book.title}</h3><p>{book.author} · {book.note}</p></div><span className="card-arrow" aria-hidden="true">↗</span></article>)}</div>
      </section>

      <section id="films" className="films section-shell section-rule">
        <div className="section-heading"><SectionLabel>04 / On screen</SectionLabel><a className="text-link" href="https://app.notion.com/p/Anime-TV-Series-Film-2f176e13d86f8063bf59d0234d318095" target="_blank" rel="noreferrer">Open Notion list <span aria-hidden="true">↗</span></a></div>
        <div className="film-layout"><div><h2>Things I&apos;ve<br /><em>watched.</em></h2><p className="muted-copy">A personal log of films, anime, and series. Data from the Notion archive will be folded into this space.</p></div><div className="film-list">{films.map((film, index) => <article key={film.title}><span>0{index + 1}</span><div><h3>{film.title}</h3><p>{film.type}</p></div><small>{film.status}</small></article>)}</div></div>
      </section>

      <section id="reflections" className="reflections section-shell section-rule"><div className="section-heading"><SectionLabel>05 / Reflections</SectionLabel><span className="quiet-note">Notes for slower days</span></div><div className="reflection-grid"><h2>Some thoughts<br /><em>in passing.</em></h2><div>{reflections.map((item) => <article className="reflection-card" key={item.number}><span>{item.number}</span><div><p className="card-meta">{item.theme}</p><h3>{item.title}</h3><p>{item.excerpt}</p></div></article>)}</div></div></section>

      <section id="contact" className="contact section-shell section-rule"><SectionLabel>06 / Contact</SectionLabel><div className="contact-layout"><h2>Have something<br /><em>in mind?</em></h2><div><p>For thoughtful collaborations, conversations, or a good book recommendation.</p><a className="email-link" href="mailto:hello@samuel.space">hello@samuel.space <span aria-hidden="true">↗</span></a></div></div></section>

      <footer className="site-footer section-shell"><span>© 2024—now Samuel Simanjuntak</span><span>Made with intention.</span><a href="#home">Back to top ↑</a></footer>
    </main>
  )
}
