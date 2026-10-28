/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { getCopy } from '@/lib/copy'
import { createPageMetadata, SITE_NAME, SITE_URL } from '@/lib/metadata'
import { articleHref, SITE_ROUTES, VENTURES_CASE_HREF } from '@/lib/site-routes'
import { getArticles } from '@/lib/insights/articles'
import { AUTHORS, CATEGORIES, CATEGORY_IDS } from '@/lib/insights/taxonomy'
import { InsightsBrowser, type InsightCard } from '@/app/components/insights/insights-browser'
import type ptInsights from '@/messages/pt/insights.json'
import type ptMetadata from '@/messages/pt/metadata.json'
import '@/app/styles/pages/insights.css'

type InsightsCopy = typeof ptInsights
type MetadataCopy = typeof ptMetadata

type Props = {
  params: Promise<{ locale: string }>
}

function resolveLocale(locale: string): Locale {
  if (!hasLocale(routing.locales, locale)) notFound()
  return locale
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  const meta = await getCopy<MetadataCopy>(locale, 'metadata')

  return createPageMetadata({
    locale,
    path: SITE_ROUTES.insights,
    title: meta.insights.title,
    description: meta.insights.description,
  })
}

export default async function InsightsPage({ params }: Props) {
  const locale = resolveLocale((await params).locale)
  setRequestLocale(locale)

  const [t, meta] = await Promise.all([
    getCopy<InsightsCopy>(locale, 'insights'),
    getCopy<MetadataCopy>(locale, 'metadata'),
  ])
  const articles = getArticles(locale)

  const cards: InsightCard[] = articles.map((a) => {
    const author = AUTHORS[a.author]
    return {
      slug: a.slug,
      href: articleHref(a.slug),
      cat: a.category,
      catLabel: CATEGORIES[a.category].label[locale],
      cover: CATEGORIES[a.category].cover,
      mins: `${a.readingTime} min`,
      title: a.title,
      ex: a.excerpt,
      glyph: a.glyph,
      code: a.coverCode,
      author: author.name,
      role: author.role,
      av: author.avatar,
      avPos: author.position,
    }
  })
  const categories = CATEGORY_IDS.map((id) => ({ id, label: CATEGORIES[id].label[locale] }))

  const pageUrl = `${SITE_URL}/${locale}${SITE_ROUTES.insights}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${pageUrl}#blog`,
    name: meta.insights.title,
    description: meta.insights.description,
    url: pageUrl,
    inLanguage: locale === 'pt' ? 'pt-PT' : 'en-US',
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    blogPost: articles.map((a) => ({
      '@type': 'BlogPosting',
      headline: a.title,
      description: a.excerpt,
      datePublished: a.date,
      url: `${SITE_URL}/${locale}${articleHref(a.slug)}`,
      author: { '@type': 'Person', name: AUTHORS[a.author].name },
    })),
  }

  return (
    <main className="site pg-insights">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      {/* HERO */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '72px 24px 40px', display: 'flex', flexWrap: 'wrap', gap: '28px 56px', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '720px' }}>
          <span className="mono" style={{ fontSize: '13px', color: 'var(--kicker)' }}>{'// insights'}</span>
          <h1 className="disp hero-h" style={{ margin: '0', fontSize: '60px', lineHeight: '1.04', fontWeight: '800', letterSpacing: '-0.035em' }}>{t.title}</h1>
          <p style={{ margin: '0', fontSize: '19px', lineHeight: '1.6', color: 'var(--muted)' }}>{t.sub}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex' }} aria-hidden="true">
            <img src={AUTHORS.pedro.avatar} alt="" style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', objectPosition: '60% 20%', border: '3px solid var(--bg)', display: 'block' }} />
            <img src={AUTHORS.marco.avatar} alt="" style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--bg)', marginLeft: '-14px', display: 'block' }} />
          </div>
          <span style={{ fontSize: '14px', lineHeight: '1.45', color: 'var(--muted)' }}>{t.byLine1}<br />{t.byLine2}</span>
        </div>
      </section>

      <InsightsBrowser articles={cards} categories={categories} />

      {/* CTAs */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px 104px', display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
        <div style={{ flex: '1 1 440px', minWidth: '0', background: 'var(--band)', color: '#fff', borderRadius: '26px', padding: '40px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
          <span className="mono" style={{ fontSize: '13px', color: '#FF8A7D' }}>{'// betacode ventures'}</span>
          <h2 className="disp" style={{ margin: '0', fontSize: '30px', lineHeight: '1.12', fontWeight: '800', letterSpacing: '-0.02em' }}>{t.venTitle}</h2>
          <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.6', color: '#C9CAE6' }}>{t.venText}</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '4px' }}>
            <Link className="btn-coral" href={SITE_ROUTES.ventures}>{t.venCta} <span aria-hidden="true">→</span></Link>
            <Link className="btn-line" href={VENTURES_CASE_HREF} style={{ color: '#fff' }}>{t.venCase}</Link>
          </div>
        </div>
        <div style={{ flex: '1 1 440px', minWidth: '0', background: '#EB5648', color: '#13143A', borderRadius: '26px', padding: '40px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
          <span className="mono" style={{ fontSize: '13px', fontWeight: '500' }}>{'// '}{t.nextStep}</span>
          <h2 className="disp" style={{ margin: '0', fontSize: '30px', lineHeight: '1.12', fontWeight: '800', letterSpacing: '-0.02em' }}>{t.ctaTitle}</h2>
          <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.6', fontWeight: '500' }}>{t.ctaText}</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '4px' }}>
            <Link href={SITE_ROUTES.contact} style={{ background: '#1B1C51', color: '#fff', textDecoration: 'none', fontWeight: '600', fontSize: '15px', borderRadius: '12px', minHeight: '52px', padding: '0 24px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>{t.ctaContact} <span aria-hidden="true">→</span></Link>
            <Link href={SITE_ROUTES.pricing} style={{ border: '1.5px solid #13143A', color: '#13143A', textDecoration: 'none', fontWeight: '600', fontSize: '15px', borderRadius: '12px', minHeight: '52px', padding: '0 22px', display: 'inline-flex', alignItems: 'center' }}>{t.ctaPrice}</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
