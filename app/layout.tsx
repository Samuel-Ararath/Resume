import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Samuel — Personal Notes & Work',
  description: 'A considered collection of work, books, films, and reflections by Samuel Simanjuntak.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
