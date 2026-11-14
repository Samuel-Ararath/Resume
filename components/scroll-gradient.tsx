'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const revealSelector = [
  '.page-intro-inner > *',
  '.portfolio-intro-copy',
  '.portfolio-scroll',
  '.portfolio-section-heading',
  '.portfolio-card',
  '.project-intro > *',
  '.project-group',
  '.project-table-wrap',
  '.resume-detail-grid > div',
  '.detail-item',
  '.education-item',
  '.honor-item',
  '.about-hero-grid > *',
  '.about-copy > *',
  '.about-archive-link',
  '.contact-main > *',
  '.reflection-card',
  '.reflection-feature',
  '.bible-finder',
  '.bookshelf-toolbar',
  '.bookshelf-table-wrap',
  '.film-database-panel',
  '.skill-hero',
  '.skill-section',
  '.skill-figure',
].join(',')

export function ScrollGradient() {
  const pathname = usePathname()

  useEffect(() => {
    const backdrop = document.querySelector<HTMLElement>('.scroll-gradient')
    const revealTargets = [...document.querySelectorAll<HTMLElement>(revealSelector)]
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    revealTargets.forEach((target, index) => {
      target.classList.add('reveal-on-scroll')
      target.style.setProperty('--reveal-delay', `${(index % 4) * 75}ms`)
    })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -44px 0px' })

    revealTargets.forEach((target) => observer.observe(target))

    let frame = 0
    const update = () => {
      frame = 0
      const scrollableHeight = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const progress = scrollableHeight ? window.scrollY / scrollableHeight : 0
      backdrop?.style.setProperty('--gradient-progress', `${progress * 100}%`)
      backdrop?.classList.toggle('is-scrolled', window.scrollY > 24)
    }
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    if (reducedMotion) revealTargets.forEach((target) => target.classList.add('is-visible'))
    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      observer.disconnect()
      revealTargets.forEach((target) => {
        target.classList.remove('reveal-on-scroll', 'is-visible')
        target.style.removeProperty('--reveal-delay')
      })
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (frame) window.cancelAnimationFrame(frame)
      backdrop?.style.removeProperty('--gradient-progress')
      backdrop?.classList.remove('is-scrolled')
    }
  }, [pathname])

  return <div className="scroll-gradient" aria-hidden="true" />
}
