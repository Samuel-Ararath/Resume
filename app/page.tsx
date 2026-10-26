import { SiteHeader } from '@/components/site-header'

export default function HomePage() {
  return <main className="home-page">
    <SiteHeader />
    <section className="hero section-shell">
      <div className="hero-intro reveal">
        <div className="hero-kicker"><span className="status-dot" /> Open to thoughtful work <span className="hero-kicker-year">2024—now</span></div>
        <h1>Ideas in <em>practice,</em><br />work with purpose.</h1>
        <p className="hero-copy">The personal portfolio of Samuel Simanjuntak — where systems thinking meets human stories, useful work, and a life of continuous learning.</p>
        <div className="hero-actions"><a className="button button-dark" href="/resume">Explore my work <span aria-hidden="true">↘</span></a><a className="text-link" href="/contact">Start a conversation <span aria-hidden="true">↗</span></a></div>
      </div>
      <div className="hero-aside reveal delay-1"><div className="portrait-frame" aria-label="Monogram Samuel"><div className="portrait-initial">S<span>.</span></div><p>Jakarta / Indonesia</p></div><div className="hero-caption"><span>Current focus</span><strong>Systems thinking, human<br />stories, and useful work.</strong></div></div>
      <div className="hero-footer"><span>Scroll to explore</span><span className="hero-line" /><span>01 / 04</span></div>
    </section>
    <section className="home-index section-shell">
      <div className="section-heading"><p className="section-label"><span /> Explore the archive</p><p className="quiet-note">A living record of the things I care about.</p></div>
      <div className="home-index-grid">
        <a href="/resume"><span>01</span><h2>Resume</h2><p>Experience, education, and the work behind the work.</p><strong>↗</strong></a>
        <a href="/project"><span>02</span><h2>Projects</h2><p>Ideas made tangible through research and practice.</p><strong>↗</strong></a>
        <a href="/about"><span>03</span><h2>About</h2><p>A little context about how I think and work.</p><strong>↗</strong></a>
      </div>
    </section>
    <section className="manifesto section-shell section-rule"><p className="manifesto-label">A little about me</p><div className="manifesto-copy"><h2>Not everything needs to be <em>loud</em> to matter.</h2><p>I believe in the enduring value of craft, a clear point of view, and showing up consistently. This site is a living record of that belief.</p></div></section>
    <section className="home-note section-shell section-rule"><p className="section-label"><span />Keep in touch</p><div className="home-note-layout"><h2>Good things often<br /><em>begin with hello.</em></h2><div><p>For thoughtful collaborations, conversations, or a good book recommendation.</p><a className="email-link" href="/contact">Visit contact <span aria-hidden="true">↗</span></a></div></div></section>
    <footer className="site-footer section-shell"><span>© 2024—now Samuel Simanjuntak</span><span>Made with intention.</span><a href="/resume">Explore resume →</a></footer>
  </main>
}
