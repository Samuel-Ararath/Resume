import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sycesima.web.id'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/about',
    '/project',
    '/resume',
    '/contact',
    '/skills/operational-management',
    '/skills/risk-performance-management',
    '/skills/industrial-management',
    '/skills/industrial-economics-finance',
    '/skills/quality-efficiency-improvement',
    '/skills/green-industry',
    '/skills/technology-valuation-management',
  ]

  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/resume' || route === '/project' ? 0.8 : 0.6,
  }))
}
