import type { Metadata } from 'next'
import { routing, type Locale } from '@/i18n/routing'

export const SITE_NAME = 'Betacode'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://betacode.tech'
export const TWITTER_HANDLE = '@betacode_tech'
export const FACEBOOK_URL = 'https://www.facebook.com/betacode.tech/'
export const INSTAGRAM_URL = 'https://www.instagram.com/betacode.tech'
export const GITHUB_URL = 'https://github.com/BetacodeTech'

export const DEFAULT_OG_IMAGE = {
  url: '/images/betacode-facebook.png',
  width: 1200,
  height: 630,
  alt: 'Betacode — Dedicated software teams for businesses and startups',
} as const

const OPEN_GRAPH_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  pt: 'pt_PT',
}

function resolveLocale(locale: string): Locale {
  return routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale
}

function getAlternateLanguages(path: string): Record<string, string> {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, `/${locale}${path}`])
  )
}

function getTwitterImages(
  image: NonNullable<Metadata['openGraph']>['images']
): string[] {
  const images = image ?? DEFAULT_OG_IMAGE

  if (typeof images === 'string') {
    return [images]
  }

  if (images instanceof URL) {
    return [images.toString()]
  }

  if (!Array.isArray(images)) {
    return [images.url.toString()]
  }

  return images.map((item) => {
    if (typeof item === 'string') return item
    if (item instanceof URL) return item.toString()
    return item.url.toString()
  })
}

type CreatePageMetadataOptions = {
  locale: string
  path: string
  title: string
  description: string
  ogTitle?: string
  image?: NonNullable<Metadata['openGraph']>['images']
  ogType?: 'website' | 'article'
  publishedTime?: string
  authors?: string[]
}

export function createPageMetadata({
  locale,
  path,
  title,
  description,
  ogTitle,
  image = DEFAULT_OG_IMAGE,
  ogType = 'website',
  publishedTime,
  authors,
}: CreatePageMetadataOptions): Metadata {
  const resolvedLocale = resolveLocale(locale)
  const canonicalPath = `/${resolvedLocale}${path}`
  const alternateLocales = routing.locales.filter(
    (entry) => entry !== resolvedLocale
  ) as Locale[]
  const socialTitle = ogTitle ?? title

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: getAlternateLanguages(path),
    },
    openGraph: {
      type: ogType,
      siteName: SITE_NAME,
      locale: OPEN_GRAPH_LOCALE[resolvedLocale],
      alternateLocale: alternateLocales.map((entry) => OPEN_GRAPH_LOCALE[entry]),
      title: socialTitle,
      description,
      url: canonicalPath,
      images: image,
      ...(ogType === 'article' && publishedTime
        ? {
            publishedTime,
            authors,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: socialTitle,
      description,
      images: getTwitterImages(image),
    },
  }
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Betacode — Dedicated software teams for businesses and startups',
    template: '%s',
  },
  description:
    'Custom software, dedicated engineering teams, and technical co-founder partnerships. From MVPs in three months to long-term team augmentation.',
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'technology',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: OPEN_GRAPH_LOCALE.en,
    alternateLocale: [OPEN_GRAPH_LOCALE.pt],
    title: SITE_NAME,
    description:
      'Custom software, dedicated engineering teams, and technical co-founder partnerships. From MVPs in three months to long-term team augmentation.',
    url: '/en',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    images: [DEFAULT_OG_IMAGE.url],
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
}
