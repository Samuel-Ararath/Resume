import { SiteHeader } from '@/components/site-header'

export default function HomePage() {
  return <main className="home-page">
    <SiteHeader />
    <section className="hero section-shell">
      <div className="hero-intro reveal">
        <p className="eyebrow">Industrial engineering · academic portfolio · 2024—now</p>
        <h1>Ideas in <em>practice,</em><br />work with purpose.</h1>
        <p className="hero-copy">The academic portfolio of Samuel Simanjuntak — a record of research, projects, reading, and the questions that shape a life of continuous learning.</p>
        <div className="hero-actions"><a className="button button-dark" href="/resume">View curriculum vitae <span aria-hidden="true">↘</span></a><a className="text-link" href="/contact">Contact office <span aria-hidden="true">↗</span></a></div>
      </div>
      <div className="hero-aside reveal delay-1"><div className="portrait-frame" aria-label="Monogram Samuel"><div className="portrait-initial">S<span>.</span></div><p>Jakarta / Indonesia</p></div><div className="hero-caption"><span>Current focus</span><strong>Systems thinking, human<br />stories, and useful work.</strong></div></div>
    </section>
    <section className="manifesto section-shell section-rule"><p className="manifesto-label">A little about me</p><div className="manifesto-copy"><h2>Not everything needs to be <em>loud</em> to matter.</h2><p>I believe in the enduring value of craft, a clear point of view, and showing up consistently. This site is a living record of that belief.</p></div></section>
    <section className="home-note section-shell section-rule"><p className="section-label"><span />Keep in touch</p><div className="home-note-layout"><h2>Good things often<br /><em>begin with hello.</em></h2><div><p>For thoughtful collaborations, conversations, or a good book recommendation.</p><a className="email-link" href="/contact">Visit contact <span aria-hidden="true">↗</span></a></div></div></section>
    <footer className="site-footer section-shell"><span>© 2024—now Samuel Simanjuntak</span><span>Made with intention.</span><a href="/resume">Explore resume →</a></footer>
  </main>
}
