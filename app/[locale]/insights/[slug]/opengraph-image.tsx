import { ImageResponse } from 'next/og'
import { getBlogPost } from '@/lib/blog-content'

export const alt = 'Betacode Insights'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function Image({ params }: Props) {
  const { locale, slug } = await params
  const post = getBlogPost(slug, locale)

  const title = post?.title ?? 'Betacode Insights'
  const category = post?.category ?? 'Insights'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#eb5648',
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
          {category}
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.15,
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
