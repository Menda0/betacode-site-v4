import { ImageResponse } from 'next/og'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import { getArticle } from '@/lib/insights/articles'
import { CATEGORIES } from '@/lib/insights/taxonomy'

export const alt = 'Betacode Insights'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function Image({ params }: Props) {
  const { locale, slug } = await params
  const article = hasLocale(routing.locales, locale) ? getArticle(slug, locale) : undefined
  const category = article ? CATEGORIES[article.category] : undefined

  const title = article?.title ?? 'Betacode Insights'
  const label = category && hasLocale(routing.locales, locale) ? category.label[locale] : 'Insights'
  const cover = category?.cover ?? '#1B1C51'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: cover,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1.2px, transparent 1.6px)',
          backgroundSize: '16px 16px',
          padding: '64px',
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.9)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            maxWidth: '1000px',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.95)',
          }}
        >
          Betacode
        </div>
      </div>
    ),
    { ...size }
  )
}
