'use client'

import { useEffect } from 'react'

export function ScrollGradient() {
  useEffect(() => {
    const backdrop = document.querySelector<HTMLElement>('.scroll-gradient')
    if (!backdrop) return

    let frame = 0
    const update = () => {
      frame = 0
      const scrollableHeight = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const progress = scrollableHeight ? window.scrollY / scrollableHeight : 0
      backdrop.style.setProperty('--gradient-shift', `${-progress * window.innerHeight * 0.85}px`)
      backdrop.classList.toggle('is-scrolled', window.scrollY > 24)
    }
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (frame) window.cancelAnimationFrame(frame)
      backdrop.style.removeProperty('--gradient-shift')
      backdrop.classList.remove('is-scrolled')
    }
  }, [])

  return <div className="scroll-gradient" aria-hidden="true" />
}
