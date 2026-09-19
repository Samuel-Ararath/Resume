'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/resume', label: 'Resume' },
  { href: '/project', label: 'Project' },
  { href: '/about', label: 'About Me' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <a className="wordmark" href="/" aria-label="Samuel, kembali ke Home">
        <span className="wordmark-mark">S</span>
        <span>Samuel<span className="wordmark-dot">.</span><small>Academic portfolio</small></span>
      </a>
      <nav className="desktop-nav" aria-label="Navigasi utama">
        {links.map((link) => {
          const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
          return <a key={link.href} href={link.href} className={active ? 'nav-link active' : 'nav-link'}>{link.label}</a>
        })}
      </nav>
      <a className="header-note" href="/contact">Contact office <span aria-hidden="true">↗</span></a>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
        <span className="sr-only">Buka menu</span>
        <span className="menu-line" />
        <span className="menu-line" />
      </button>
      {open && <nav id="mobile-nav" className="mobile-nav" aria-label="Navigasi mobile">{links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}</nav>}
    </header>
  )
}
