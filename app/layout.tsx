import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'SYCESIMA — Samuel Simanjuntak',
  description: 'Personal academic homepage and knowledge archive of Samuel Simanjuntak: industrial engineering, systems, books, films, and reflections.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
