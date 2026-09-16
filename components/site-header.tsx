'use client'

import { useState } from 'react'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#resume', label: 'Resume' },
  { href: '#books', label: 'Buku' },
  { href: '#films', label: 'Film' },
  { href: '#reflections', label: 'Renungan' },
  { href: '#contact', label: 'Contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Samuel, kembali ke Home">
        <span className="wordmark-mark">S</span>
        <span>Samuel<span className="wordmark-dot">.</span></span>
      </a>
      <nav className="desktop-nav" aria-label="Navigasi utama">
        {links.map((link, index) => (
          <a key={link.href} href={link.href} className={index === 0 ? 'nav-link active' : 'nav-link'}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="header-note" href="#contact">Let&apos;s connect <span aria-hidden="true">↗</span></a>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
        <span className="sr-only">Buka menu</span>
        <span className="menu-line" />
        <span className="menu-line" />
      </button>
      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Navigasi mobile">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
          ))}
        </nav>
      )}
    </header>
  )
}
