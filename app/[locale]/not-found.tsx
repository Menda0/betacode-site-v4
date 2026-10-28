import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getCopy } from '@/lib/copy'
import { SITE_ROUTES } from '@/lib/site-routes'
import type { Locale } from '@/i18n/routing'
import type ptNotFound from '@/messages/pt/notFound.json'
import type ptMetadata from '@/messages/pt/metadata.json'

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale
  const meta = await getCopy<typeof ptMetadata>(locale, 'metadata')
  return { title: meta.notFound.title, robots: { index: false, follow: true } }
}

export default async function NotFound() {
  const locale = (await getLocale()) as Locale
  const t = await getCopy<typeof ptNotFound>(locale, 'notFound')

  return (
    <main
      className="site"
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '96px 24px',
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
      }}
    >
      <p style={{ margin: 0, font: '700 14px/1 var(--font-jetbrains), monospace', color: '#EB5648' }}>
        {'{ 404 }'}
      </p>
      <h1
        style={{
          margin: '20px 0 0',
          fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(32px, 5vw, 48px)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        {t.title}
      </h1>
      <p style={{ margin: '16px 0 0', maxWidth: 520, fontSize: 18, lineHeight: 1.6, color: 'var(--muted)' }}>
        {t.description}
      </p>
      <div style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
        <Link
          href={SITE_ROUTES.home}
          className="bc-404-btn"
          style={{ background: '#D8402F', color: '#FFFFFF', borderColor: '#D8402F' }}
        >
          {t.home}
        </Link>
        <Link href={SITE_ROUTES.insights} className="bc-404-btn">
          {t.insights}
        </Link>
      </div>
    </main>
  )
}
