import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/site-header'

export function SectionLabel({ children }: { children: string }) {
  return <p className="section-label"><span />{children}</p>
}

export function PageIntro({ label, title, description }: { label: string; title: ReactNode; description: string }) {
  return <section className="page-intro section-shell"><SectionLabel>{label}</SectionLabel><div className="page-intro-copy"><h1>{title}</h1><p>{description}</p></div></section>
}

export function PageChrome({ children }: { children: ReactNode }) {
  return <><SiteHeader />{children}<footer className="site-footer section-shell"><span>© 2024—now Samuel Simanjuntak</span><span>Made with intention.</span><a href="/">Back to home ↑</a></footer></>
}
