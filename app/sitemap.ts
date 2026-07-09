import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { getBlogPosts } from '@/lib/blog-content'
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

    for (const post of getBlogPosts(locale)) {
      entries.push({
        url: `${SITE_URL}/${locale}/insights/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  }

  return entries
}
