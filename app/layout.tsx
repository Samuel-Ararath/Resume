import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sycesima.web.id'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'SYCESIMA — Samuel Simanjuntak',
  description: 'Situs personal Samuel Simanjuntak, mahasiswa Teknik Industri di Institut Teknologi Sumatera. Jelajahi pengalaman, proyek, keahlian, dan arsip pribadinya.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: 'SYCESIMA',
    title: 'SYCESIMA — Samuel Simanjuntak',
    description: 'Situs personal Samuel Simanjuntak: Teknik Industri, pengalaman, proyek, dan arsip pengetahuan.',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
