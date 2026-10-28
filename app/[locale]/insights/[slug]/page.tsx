/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { getCopy, fill } from '@/lib/copy'
import { createPageMetadata, SITE_NAME } from '@/lib/metadata'
import { createArticleSchema } from '@/lib/structured-data'
import { SITE_ROUTES, articleHref } from '@/lib/site-routes'
import {
  formatArticleDate,
  getArticle,
  getArticleSlugs,
  getRelatedArticles,
} from '@/lib/insights/articles'
import { getToc, renderArticleBody } from '@/lib/insights/mdx'
import { AUTHORS, CATEGORIES, usesVenturesCta } from '@/lib/insights/taxonomy'
import { JsonLd } from '@/app/components/json-ld'
import { ArticleToc } from '@/app/components/article/article-toc'
import { articleBodyComponents } from '@/app/components/article/article-body-components'
import type ptArticle from '@/messages/pt/article.json'
import type ptMetadata from '@/messages/pt/metadata.json'
import '@/app/styles/pages/article.css'

type ArticleCopy = typeof ptArticle
type MetadataCopy = typeof ptMetadata

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getArticleSlugs().map((slug) => ({ locale, slug })))
}

function resolve(locale: string, slug: string) {
  if (!hasLocale(routing.locales, locale)) return undefined
  const article = getArticle(slug, locale)
  return article ? { locale, article } : undefined
}

const ogImagePath = (locale: Locale, slug: string) => `/${locale}${articleHref(slug)}/opengraph-image`

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const found = resolve(locale, slug)

  if (!found) {
    const meta = await getCopy<MetadataCopy>(hasLocale(routing.locales, locale) ? locale : routing.defaultLocale, 'metadata')
    return createPageMetadata({
      locale,
      path: articleHref(slug),
      title: meta.articleNotFound.title,
      description: meta.articleNotFound.description,
    })
  }

  const { article } = found
  return createPageMetadata({
    locale,
    path: articleHref(article.slug),
    title: `${article.title} | ${SITE_NAME}`,
    ogTitle: article.title,
    description: article.lead,
    image: { url: ogImagePath(found.locale, article.slug), width: 1200, height: 630, alt: article.title },
    ogType: 'article',
    publishedTime: article.date,
    authors: [AUTHORS[article.author].name],
    section: CATEGORIES[article.category].label[found.locale],
  })
}

export default async function ArticlePage({ params }: Props) {
  const { locale: rawLocale, slug } = await params
  const found = resolve(rawLocale, slug)
  if (!found) notFound()

  const { locale, article } = found
  setRequestLocale(locale)

  const t = await getCopy<ArticleCopy>(locale, 'article')
  const au = AUTHORS[article.author]
  const cat = CATEGORIES[article.category]
  const toc = getToc(article.body)
  const body = await renderArticleBody(article.body, articleBodyComponents)
  const related = getRelatedArticles(article, locale)
  const ventures = usesVenturesCta(article.category)
  const cta = ventures ? t.cta.ventures : t.cta.contact
  const ctaHref = ventures ? SITE_ROUTES.ventures : SITE_ROUTES.contact

  return (
    <main className="site pg-article">
      <JsonLd data={createArticleSchema(locale, article)} />

      {/* ARTICLE HEADER */}
      <article>
        <header style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px 0', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <nav aria-label={t.crumbs} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14, color: 'var(--muted)' }}>
            <Link href={SITE_ROUTES.insights} style={{ color: 'var(--muted)', textDecoration: 'none', minHeight: 32, display: 'inline-flex', alignItems: 'center' }}>
              {t.back}
            </Link>
            <span aria-hidden="true">/</span>
            <span>{cat.label[locale]}</span>
          </nav>
          <h1 className="disp hero-h" style={{ margin: 0, fontSize: 52, lineHeight: 1.08, fontWeight: 800, letterSpacing: '-0.03em', maxWidth: 900 }}>
            {article.title}
          </h1>
          <p style={{ margin: 0, fontSize: 21, lineHeight: 1.55, color: 'var(--muted)', maxWidth: 820 }}>{article.lead}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 24px', alignItems: 'center', paddingTop: 4 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src={au.avatar} alt="" width={48} height={48} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', objectPosition: au.position, display: 'block' }} />
              <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>{au.name}</span>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>{au.role}</span>
              </span>
            </span>
            <span className="mono" style={{ fontSize: 13, color: 'var(--muted)' }}>
              <time dateTime={article.date}>{formatArticleDate(article.date, locale)}</time> · {fill(t.mins, { n: article.readingTime })}
            </span>
          </div>
          <div className="cover" aria-hidden="true" style={{ backgroundColor: cat.cover, height: 320, borderRadius: 26, marginTop: 10 }}>
            <span className="mono" style={{ position: 'absolute', right: -10, top: -50, fontSize: 300, lineHeight: 1, fontWeight: 700, color: 'rgba(255,255,255,0.07)' }}>
              {article.glyph}
            </span>
            <span className="cover-code">{article.coverCode}</span>
          </div>
        </header>

        {/* BODY */}
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px 72px', display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'flex-start' }}>
          <aside className="art-aside" style={{ flex: '1 1 220px', minWidth: 0, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <ArticleToc label={t.toc} entries={toc} />
            <div style={{ background: 'var(--surface)', borderRadius: 18, padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span className="mono" style={{ fontSize: 12, color: 'var(--kicker)' }}>{t.keyTake}</span>
              {article.takeaways.map((k) => (
                <span key={k} style={{ display: 'flex', gap: 8, fontSize: 14, lineHeight: 1.5 }}>
                  <span className="mono" aria-hidden="true" style={{ color: '#EB5648', fontWeight: 700 }}>{'{ }'}</span>
                  {k}
                </span>
              ))}
            </div>
          </aside>

          <div className="prose" style={{ flex: '999 1 560px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {body}

            {/* author card */}
            <div style={{ marginTop: 24, border: '1px solid var(--border)', borderRadius: 22, padding: 24, display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
              <img src={au.avatar} alt={au.name} width={72} height={72} loading="lazy" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', objectPosition: au.position, display: 'block' }} />
              <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span className="mono" style={{ fontSize: 12, color: 'var(--kicker)' }}>{t.writtenBy}</span>
                <span className="disp" style={{ fontSize: 19, fontWeight: 800 }}>{au.name}</span>
                <span style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--muted)' }}>{au.bio[locale]}</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px 72px' }}>
        <div style={{ background: 'var(--band)', color: '#fff', borderRadius: 26, padding: 40, display: 'flex', flexWrap: 'wrap', gap: '20px 32px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 380px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span className="mono" style={{ fontSize: 13, color: '#FF8A7D' }}>{cta.k}</span>
            <h2 className="disp" style={{ margin: 0, fontSize: 30, lineHeight: 1.12, fontWeight: 800, letterSpacing: '-0.02em' }}>{cta.h}</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: '#C9CAE6' }}>{cta.p}</p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link className="btn-coral" href={ctaHref}>
              {cta.btn} <span aria-hidden="true">→</span>
            </Link>
            <Link className="btn-line" href={SITE_ROUTES.pricing} style={{ color: '#fff' }}>
              {t.estimate}
            </Link>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section aria-labelledby="rel-h" style={{ background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '72px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
            <h2 id="rel-h" className="disp" style={{ margin: 0, fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em' }}>{t.related}</h2>
            <Link href={SITE_ROUTES.insights} style={{ fontWeight: 600, fontSize: 15, textUnderlineOffset: 4, minHeight: 44, display: 'inline-flex', alignItems: 'center' }}>
              {t.all} →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {related.map((r) => (
              <Link key={r.slug} className="rel" href={articleHref(r.slug)}>
                <div className="cover" aria-hidden="true" style={{ backgroundColor: CATEGORIES[r.category].cover, height: 130, padding: 20 }}>
                  <span className="cover-code" style={{ fontSize: 14 }}>{r.coverCode}</span>
                </div>
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <span className="chip">{CATEGORIES[r.category].label[locale]}</span>
                    <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{fill(t.mins, { n: r.readingTime })}</span>
                  </div>
                  <span className="disp" style={{ fontSize: 19, lineHeight: 1.25, fontWeight: 800 }}>{r.title}</span>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{t.read} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
