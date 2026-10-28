import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { getArticles } from '@/lib/insights/articles'
import { SITE_URL } from '@/lib/metadata'

const STATIC_PATHS = [
  '',
  '/pricing',
  '/insights',
  '/betacode-ventures',
  '/contact',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const buildDate = new Date()

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: buildDate,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
      })
    }

    for (const article of getArticles(locale)) {
      entries.push({
        url: `${SITE_URL}/${locale}/insights/${article.slug}`,
        lastModified: new Date(`${article.date}T00:00:00Z`),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  }

  return entries
}
