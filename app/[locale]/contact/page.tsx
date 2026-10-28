import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { getCopy } from '@/lib/copy'
import { createPageMetadata } from '@/lib/metadata'
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, SITE_ROUTES } from '@/lib/site-routes'
import { ContactFormCard } from '@/app/components/contact/contact-form-card'
import { ContactMap } from '@/app/components/contact/contact-map'
import { CopyEmailButton } from '@/app/components/contact/copy-email-button'
import type ptContact from '@/messages/pt/contact.json'
import type ptMetadata from '@/messages/pt/metadata.json'
import '@/app/styles/pages/contact.css'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const meta = await getCopy<typeof ptMetadata>(locale as Locale, 'metadata')

  return createPageMetadata({
    locale,
    path: SITE_ROUTES.contact,
    title: meta.contact.title,
    description: meta.contact.description,
  })
}

const [emailLocal, emailDomain] = CONTACT_EMAIL.split('@')

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getCopy<typeof ptContact>(locale as Locale, 'contact')

  return (
    <main className="site pg-contact">
      {/* HERO + FORM */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '72px 24px 88px', display: 'flex', flexWrap: 'wrap', gap: '48px 56px', alignItems: 'flex-start' }}>
        {/* LEFT: intro + direct contacts */}
        <div style={{ flex: '1 1 400px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span className="mono" style={{ fontSize: 13, color: 'var(--kicker)' }}>{'// '}{t.kicker}</span>
            <h1 className="disp hero-h" style={{ margin: 0, fontSize: 58, lineHeight: 1.04, fontWeight: 800, letterSpacing: '-0.035em' }}>{t.title}</h1>
            {/* TODO(betacode): confirm a real response-time commitment (e.g. "até 1 dia útil") and add it here and to the success screen. */}
            <p style={{ margin: 0, fontSize: 19, lineHeight: 1.6, color: 'var(--muted)' }}>{t.sub}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="ccard">
              <span className="cic" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 7l9 6 9-6"></path></svg></span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 0 }}>
                <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{t.emailLabel}</span>
                <a href={`mailto:${CONTACT_EMAIL}`} style={{ fontSize: 18, fontWeight: 600, textDecoration: 'none' }}>{emailLocal}@<wbr />{emailDomain}</a>
              </span>
              <CopyEmailButton label={t.copy} copiedLabel={t.copied} />
            </div>
            <a className="ccard" href={`tel:${CONTACT_PHONE_TEL}`}>
              <span className="cic" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"></path></svg></span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{t.phone}</span>
                <span style={{ fontSize: 18, fontWeight: 600 }}>{CONTACT_PHONE_DISPLAY}</span>
              </span>
            </a>
          </div>

          {/* MAP */}
          <ContactMap t={t} />
        </div>

        {/* RIGHT: form / success */}
        <ContactFormCard />
      </section>

      {/* OTHER WAYS */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px 104px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span className="mono" style={{ fontSize: 13, color: 'var(--kicker)' }}>{'// '}{t.otherK}</span>
          <h2 className="disp sec-h" style={{ margin: 0, fontSize: 38, lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.025em' }}>{t.otherTitle}</h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
          <Link href={SITE_ROUTES.ventures} style={{ flex: '1 1 440px', minWidth: 0, background: 'var(--band)', color: '#fff', borderRadius: 26, padding: 36, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 14, textDecoration: 'none' }}>
            <span className="mono" style={{ fontSize: 13, color: '#FF8A7D' }}>{'// '}{t.venK}</span>
            <span className="disp" style={{ fontSize: 26, lineHeight: 1.15, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>{t.venTitle}</span>
            <span style={{ fontSize: 16, lineHeight: 1.6, color: '#C9CAE6' }}>{t.venText}</span>
            <span style={{ fontWeight: 700, fontSize: 15, color: '#FF8A7D', paddingTop: 4 }}>{t.venCta} →</span>
          </Link>
          <Link href={SITE_ROUTES.pricing} style={{ flex: '1 1 440px', minWidth: 0, background: '#EB5648', color: '#13143A', borderRadius: 26, padding: 36, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 14, textDecoration: 'none' }}>
            <span className="mono" style={{ fontSize: 13, fontWeight: 500, color: '#13143A' }}>{'// '}{t.calcK}</span>
            <span className="disp" style={{ fontSize: 26, lineHeight: 1.15, fontWeight: 800, letterSpacing: '-0.02em', color: '#13143A' }}>{t.calcTitle}</span>
            <span style={{ fontSize: 16, lineHeight: 1.6, fontWeight: 500, color: '#13143A' }}>{t.calcText}</span>
            <span style={{ fontWeight: 700, fontSize: 15, color: '#13143A', paddingTop: 4 }}>{t.calcCta} →</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
