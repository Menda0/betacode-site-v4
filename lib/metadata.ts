import type { Metadata } from 'next'
import { routing, type Locale } from '@/i18n/routing'
import enMetadata from '@/messages/en/metadata.json'

export const SITE_NAME = 'Betacode'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://betacode.tech'
export const TWITTER_HANDLE = '@betacode_tech'
export const FACEBOOK_URL = 'https://www.facebook.com/betacode.tech/'
export const INSTAGRAM_URL = 'https://www.instagram.com/betacode.tech'
export const GITHUB_URL = 'https://github.com/BetacodeTech'
export const TWITTER_URL = 'https://twitter.com/betacode_tech'

const SITE_DESCRIPTION = enMetadata.siteDescription

const OG_IMAGE_BY_LOCALE = {
  en: {
    url: '/og/betacode-og-en.jpg',
    width: 1200,
    height: 630,
    alt: 'Betacode: Software that transforms your business. Digital transformation and custom software for businesses and startups.',
    type: 'image/jpeg',
  },
  pt: {
    url: '/og/betacode-og-pt.jpg',
    width: 1200,
    height: 630,
    alt: 'Betacode: Software que transforma o seu negócio. Transformação digital e software à medida para empresas e startups.',
    type: 'image/jpeg',
  },
} as const satisfies Record<
  Locale,
  {
    url: string
    width: number
    height: number
    alt: string
    type: 'image/jpeg'
  }
>

export function ogImageForLocale(locale: string) {
  return OG_IMAGE_BY_LOCALE[resolveLocale(locale)]
}

/** Absolute share-image URL on the metadata site origin. */
export function ogImageAbsoluteUrl(locale: string) {
  return new URL(ogImageForLocale(locale).url, SITE_URL).href
}

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
  return {
    'x-default': `/${routing.defaultLocale}${path}`,
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, `/${locale}${path}`])
    ),
  }
}

function getTwitterImages(
  image: NonNullable<Metadata['openGraph']>['images']
): string[] {
  const images = image ?? ogImageForLocale(routing.defaultLocale)

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
  section?: string
}

export function createPageMetadata({
  locale,
  path,
  title,
  description,
  ogTitle,
  image,
  ogType = 'website',
  publishedTime,
  authors,
  section,
}: CreatePageMetadataOptions): Metadata {
  const resolvedLocale = resolveLocale(locale)
  const socialImage = image ?? ogImageForLocale(resolvedLocale)
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
      images: socialImage,
      ...(ogType === 'article' && publishedTime
        ? {
            publishedTime,
            authors,
            ...(section ? { section } : {}),
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: socialTitle,
      description,
      images: getTwitterImages(socialImage),
    },
  }
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Betacode | Software that transforms your business',
    template: '%s',
  },
  description: SITE_DESCRIPTION,
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
    description: SITE_DESCRIPTION,
    url: '/en',
    images: [ogImageForLocale('en')],
  },
  twitter: {
    card: 'summary_large_image',
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    images: [ogImageForLocale('en').url],
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
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
}
