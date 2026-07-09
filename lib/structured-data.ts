import {
  FACEBOOK_URL,
  GITHUB_URL,
  INSTAGRAM_URL,
  SITE_NAME,
  SITE_URL,
} from '@/lib/metadata'
import type { BlogPost } from '@/lib/blog-types'
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
    sameAs: [FACEBOOK_URL, INSTAGRAM_URL, GITHUB_URL],
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

export function createBlogSchema(locale: Locale, posts: BlogPost[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Betacode Insights',
    description:
      'Insights on software development, startups, and building products.',
    url: `${SITE_URL}/${locale}/insights`,
    inLanguage: locale,
    publisher: organizationSchema(),
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      url: `${SITE_URL}/${locale}/insights/${post.slug}`,
      author: {
        '@type': 'Person',
        name: post.author.name,
      },
    })),
  }
}

export function createBlogPostSchema(
  locale: Locale,
  post: BlogPost
): JsonLd {
  const pageUrl = `${SITE_URL}/${locale}/insights/${post.slug}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema(),
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        inLanguage: locale,
        url: pageUrl,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': pageUrl,
        },
        author: {
          '@type': 'Person',
          name: post.author.name,
        },
        publisher: organizationSchema(),
        articleSection: post.category,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_URL}/${locale}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Insights',
            item: `${SITE_URL}/${locale}/insights`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: pageUrl,
          },
        ],
      },
    ],
  }
}
