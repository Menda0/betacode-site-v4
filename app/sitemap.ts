import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { getArticles } from '@/lib/insights/articles'
import { SITE_URL } from '@/lib/metadata'

/** Stable across rebuilds. Article entries use each post's publication date instead. */
const STATIC_LAST_MODIFIED = '2026-10-29'

const STATIC_PATHS = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/insights', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/betacode-ventures', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
] as const

function languageAlternates(path: string): Record<string, string> {
  return {
    'x-default': `${SITE_URL}/${routing.defaultLocale}${path}`,
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`]),
    ),
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of routing.locales) {
    for (const page of STATIC_PATHS) {
      entries.push({
        url: `${SITE_URL}/${locale}${page.path}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages: languageAlternates(page.path) },
      })
    }

    for (const article of getArticles(locale)) {
      const path = `/insights/${article.slug}`
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: article.date,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: { languages: languageAlternates(path) },
      })
    }
  }

  return entries
}
