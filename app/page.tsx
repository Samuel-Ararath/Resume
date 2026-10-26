import { SiteHeader } from '@/components/site-header'

const destinations = [
  {
    number: '01',
    title: 'Selected work',
    description: 'Projects shaped by curiosity, structure, and a bias for useful outcomes.',
    href: '/project',
    type: 'Projects',
  },
  {
    number: '02',
    title: 'Experience & study',
    description: 'A closer look at the roles, education, and experiences behind my work.',
    href: '/resume',
    type: 'Resume',
  },
  {
    number: '03',
    title: 'Notes on me',
    description: 'The interests, principles, and small details that shape my point of view.',
    href: '/about',
    type: 'About',
  },
]

export default function HomePage() {
  return (
    <main className="home-page">
      <SiteHeader />

      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <p className="home-overline"><span /> Industrial engineering · Jakarta, Indonesia</p>
            <h1>Samuel<br /><em>Simanjuntak.</em></h1>
            <p className="home-intro">I find clarity in complex systems, and meaning in the people who make them work.</p>
            <div className="home-hero-actions">
              <a className="home-primary-link" href="/project">Explore selected work <span aria-hidden="true">↗</span></a>
              <a className="home-secondary-link" href="/about">A little about me</a>
            </div>
          </div>

          <div className="home-art" aria-label="Abstract watercolor artwork in the site's signature colors">
            <div className="home-art-orbit home-art-orbit-one" />
            <div className="home-art-orbit home-art-orbit-two" />
            <div className="home-art-wash" />
            <div className="home-art-monogram">S<span>.</span></div>
            <p className="home-art-caption">Curiosity, with intention <span>01 — 04</span></p>
          </div>
          <div className="home-hero-bottom"><span>Personal portfolio & knowledge archive</span><span>Scroll to explore ↓</span></div>
        </div>
      </section>

      <section className="home-work" aria-labelledby="home-work-title">
        <div className="home-section-heading">
          <div><p className="home-section-kicker">A few ways in</p><h2 id="home-work-title">Work, ideas <em>&amp; everything between.</em></h2></div>
          <p>One place for the work I do, the things I learn, and the interests I return to.</p>
        </div>
        <div className="home-destinations">
          {destinations.map((item) => (
            <a className="home-destination" href={item.href} key={item.number}>
              <div className="home-destination-top"><span>{item.number}</span><span>{item.type}</span></div>
              <div className="home-destination-bottom"><div><h3>{item.title}</h3><p>{item.description}</p></div><span className="home-destination-arrow" aria-hidden="true">↗</span></div>
            </a>
          ))}
        </div>
      </section>

      <section className="home-note">
        <div className="home-note-inner">
          <p className="home-section-kicker">The thread through it all</p>
          <p className="home-note-quote">“Good work begins with <em>attention</em> — to the system, to the people, and to what could be better.”</p>
          <div className="home-note-foot"><span>Samuel Simanjuntak</span><a href="/contact">Have something in mind? <span aria-hidden="true">↗</span></a></div>
        </div>
      </section>

      <footer className="home-footer"><span>© 2024—now · Samuel Simanjuntak</span><a href="/contact">Get in touch ↗</a><span>Made with intention.</span></footer>
    </main>
  )
}
