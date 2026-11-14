import { SiteHeader } from '@/components/site-header'

const workItems = [
  {
    number: '01',
    category: 'Research & systems',
    title: 'Making complex systems work better.',
    description: 'Industrial engineering, operations, and practical ways to improve how work gets done.',
    href: '/project',
    visual: 'systems',
    mark: '01 / SYSTEMS',
  },
  {
    number: '02',
    category: 'Writing & ideas',
    title: 'Questions worth staying with.',
    description: 'Essays, academic writing, and longer-form ideas in progress.',
    href: '/renungan',
    visual: 'writing',
    mark: 'NOTES & IDEAS',
  },
  {
    number: '03',
    category: 'Experience',
    title: 'A record of learning by doing.',
    description: 'The roles, teams, and studies that have shaped the way I work.',
    href: '/resume',
    visual: 'experience',
    mark: 'FIELD NOTES',
  },
  {
    number: '04',
    category: 'Reading',
    title: 'A bookshelf in progress.',
    description: 'Books read, ideas collected, and stories I keep returning to.',
    href: '/buku',
    visual: 'reading',
    mark: 'READING LIST',
  },
  {
    number: '05',
    category: 'Film',
    title: 'Stories, seen and remembered.',
    description: 'A personal archive of films and the impressions they leave behind.',
    href: '/film',
    visual: 'film',
    mark: 'SCREENING ROOM',
  },
  {
    number: '06',
    category: 'About',
    title: 'The person behind the work.',
    description: 'A little more about my interests, values, and point of view.',
    href: '/about',
    visual: 'about',
    mark: 'SAMUEL SIMANJUNTAK',
  },
]

export default function HomePage() {
  return (
    <main className="portfolio-page">
      <SiteHeader />

      <section className="portfolio-intro" aria-labelledby="portfolio-title">
        <div className="portfolio-intro-copy">
          <p className="portfolio-eyebrow"><span /> Portfolio · Jakarta, Indonesia</p>
          <h1 id="portfolio-title">A collection of<br /><em>work in progress.</em></h1>
          <p className="portfolio-description">I&apos;m Samuel, a student of industrial engineering, a writer, and a curious observer. This is where I bring together the things I make, study, and keep learning from.</p>
        </div>
        <a className="portfolio-scroll" href="#selected-work">Explore the collection <span aria-hidden="true">↓</span></a>
      </section>

      <section className="portfolio-work" id="selected-work" aria-labelledby="work-title">
        <div className="portfolio-section-heading">
          <div>
            <p className="portfolio-eyebrow">Selected work & interests</p>
            <h2 id="work-title">Different threads,<br /><em>one point of view.</em></h2>
          </div>
          <p>Not just a list of projects, but a living archive of the work and ideas that matter to me.</p>
        </div>

        <div className="portfolio-grid">
          {workItems.map((item) => (
            <a className={`portfolio-card portfolio-card-${item.visual}`} href={item.href} key={item.number}>
              <div className="portfolio-card-art" aria-hidden="true">
                <span className="portfolio-card-mark">{item.mark}</span>
                <span className="portfolio-card-symbol">{item.number}</span>
                <span className="portfolio-card-art-label">Samuel Simanjuntak</span>
              </div>
              <div className="portfolio-card-info">
                <div>
                  <p className="portfolio-card-category">{item.category}</p>
                  <h3>{item.title}</h3>
                  <p className="portfolio-card-description">{item.description}</p>
                </div>
                <span className="portfolio-card-arrow" aria-hidden="true">↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="portfolio-footer">
        <span>© 2024 to now · Samuel Simanjuntak</span>
        <span>Industrial engineering · writing · ideas</span>
        <a href="/contact">Have something in mind? <span aria-hidden="true">↗</span></a>
      </footer>
    </main>
  )
}
