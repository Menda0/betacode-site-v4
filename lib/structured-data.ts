import {
  FACEBOOK_URL,
  GITHUB_URL,
  INSTAGRAM_URL,
  SITE_NAME,
  SITE_URL,
  TWITTER_URL,
  ogImageAbsoluteUrl,
} from '@/lib/metadata'
import type { ArticleMeta } from '@/lib/insights/articles'
import { AUTHORS, CATEGORIES } from '@/lib/insights/taxonomy'
import type { Locale } from '@/i18n/routing'

type JsonLd = Record<string, unknown>

const ORGANIZATION_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`

function organizationSchema(): JsonLd {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/android-chrome-512x512.png`,
    sameAs: [FACEBOOK_URL, INSTAGRAM_URL, TWITTER_URL, GITHUB_URL],
  }
}

export function createWebsiteSchema(locale: Locale): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema(),
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: SITE_NAME,
        url: `${SITE_URL}/${locale}`,
        inLanguage: ['en', 'pt'],
        publisher: { '@id': ORGANIZATION_ID },
      },
    ],
  }
}

export function createBlogSchema(locale: Locale, articles: ArticleMeta[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Betacode Insights',
    url: `${SITE_URL}/${locale}/insights`,
    inLanguage: locale,
    publisher: organizationSchema(),
    blogPost: articles.map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      datePublished: article.date,
      url: `${SITE_URL}/${locale}/insights/${article.slug}`,
      author: { '@type': 'Person', name: AUTHORS[article.author].name },
    })),
  }
}

export function createArticleSchema(locale: Locale, article: ArticleMeta): JsonLd {
  const pageUrl = `${SITE_URL}/${locale}/insights/${article.slug}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema(),
      {
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.lead,
        datePublished: article.date,
        inLanguage: locale === 'pt' ? 'pt-PT' : 'en-US',
        url: pageUrl,
        image: ogImageAbsoluteUrl(locale),
        mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
        author: {
          '@type': 'Person',
          name: AUTHORS[article.author].name,
          jobTitle: AUTHORS[article.author].role,
        },
        publisher: { '@id': ORGANIZATION_ID },
        articleSection: CATEGORIES[article.category].label[locale],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Betacode', item: `${SITE_URL}/${locale}` },
          { '@type': 'ListItem', position: 2, name: 'Insights', item: `${SITE_URL}/${locale}/insights` },
          { '@type': 'ListItem', position: 3, name: article.title, item: pageUrl },
        ],
      },
    ],
  }
}
