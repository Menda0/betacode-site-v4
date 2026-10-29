/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { getCopy } from '@/lib/copy'
import { createPageMetadata } from '@/lib/metadata'
import { createWebsiteSchema } from '@/lib/structured-data'
import { getArticles } from '@/lib/insights/articles'
import { CONTACT_FORM_HREF, SERVICES_ANCHOR, SITE_ROUTES, VENTURES_CASE_HREF, articleHref } from '@/lib/site-routes'
import { JsonLd } from '@/app/components/json-ld'
import { HeroTerminal } from '@/app/components/home/hero-terminal'
import { ServicesTabs } from '@/app/components/home/services-tabs'
import type ptHome from '@/messages/pt/home.json'
import type ptMetadata from '@/messages/pt/metadata.json'
import '@/app/styles/pages/home.css'

type HomeCopy = typeof ptHome
type Props = { params: Promise<{ locale: string }> }

const CLIENTS = [
  { name: 'UNICEF', src: '/assets/clients/unicef.png', h: '34px' },
  { name: 'Evolve', src: '/assets/clients/evolve.png', h: '30px' },
  { name: 'Tymber', src: '/assets/clients/tymber.png', h: '30px' },
  { name: 'Rupeal Group', src: '/assets/clients/rupeal.png', h: '38px' },
  { name: 'Coach ID', src: '/assets/clients/coach-id.png', h: '40px' },
]

/** Slugs for the teaser cards, in the same order as `articles` in home.json. */
const TEASER_SLUGS = [
  'why-lean-startup-is-the-rosetta-stone-of-betacode',
  'how-to-build-an-mvp-in-3-months',
  'building-applications-with-javascript-typescript-as-the-backbone',
  'how-ai-can-help-you-create-your-next-project',
  'how-to-transform-legacy-software-into-a-modern-product',
  'why-startups-need-a-technical-co-founder',
]

const BRACE = { color: '#EB5648', fontWeight: 700 } as const

/** Navy phrase size; Equity and the team value use the same computed size. */
const VEN_STAT_VALUE_SIZE = 'clamp(26px, 4vw, 36px)'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale
  const meta = await getCopy<typeof ptMetadata>(locale, 'metadata')

  return createPageMetadata({
    locale,
    path: '',
    title: meta.home.title,
    description: meta.home.description,
    ogTitle: 'Betacode',
  })
}

export default async function Home({ params }: Props) {
  const locale = (await params).locale as Locale
  setRequestLocale(locale)

  const { t, tracks, an, articles, sessions } = await getCopy<HomeCopy>(locale, 'home')
  const publishedSlugs = new Set(getArticles(locale).map((a) => a.slug))
  const teaser = articles.map((a, i) => {
    const slug = TEASER_SLUGS[i]
    return {
      ...a,
      num: String(i + 1).padStart(2, '0'),
      href: slug && publishedSlugs.has(slug) ? articleHref(slug) : SITE_ROUTES.insights,
    }
  })

  return (
    <main className="site pg-home">
      <JsonLd data={createWebsiteSchema(locale)} />

      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" className="mono hide-sm" style={{ position: 'absolute', left: '-40px', top: '40px', fontSize: '520px', lineHeight: '1', fontWeight: 700, color: 'var(--ghost)' }}>{'{'}</div>
        <div className="hero-row" style={{ position: 'relative', maxWidth: '1240px', margin: '0 auto', padding: '80px 24px 88px', display: 'flex', flexWrap: 'wrap', gap: '56px', alignItems: 'center' }}>
          <div className="hero-copy" style={{ flex: '999 1 500px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div className="mono hero-chip hero-chip-single" style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text)', background: 'var(--surface)', padding: '8px 14px', borderRadius: '999px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EB5648', flex: 'none' }}></span>
              {t.heroChip}
            </div>
            <div className="hero-chips">
              {t.heroChips.map((label) => (
                <div key={label} className="mono hero-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text)', background: 'var(--surface)', padding: '7px 12px', borderRadius: '999px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EB5648', flex: 'none' }}></span>
                  {label}
                </div>
              ))}
            </div>
            <h1 className="disp hero-h" style={{ margin: 0, fontSize: '74px', lineHeight: '1.03', fontWeight: 800, letterSpacing: '-0.035em' }}>
              <span className="mono" style={BRACE}>{'{'}</span>Software<span className="mono" style={BRACE}>{'}'}</span> {t.heroL1}
            </h1>
            <p className="hero-sub" style={{ margin: 0, fontSize: '20px', lineHeight: '1.6', color: 'var(--muted)', maxWidth: '560px' }}>{t.heroSub}</p>
            <div className="hero-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link className="btn-coral" href={SITE_ROUTES.contact} style={{ fontSize: '16px', padding: '0 26px', minHeight: '54px' }}>{t.heroCta} <span aria-hidden="true">→</span></Link>
              <Link className="btn-ghost" href={SITE_ROUTES.pricing} style={{ fontSize: '16px', padding: '0 26px', minHeight: '54px' }}>{t.heroCta2}</Link>
              <a className="hero-more" href={SERVICES_ANCHOR} style={{ textUnderlineOffset: '5px', fontWeight: 500, fontSize: '16px', padding: '0 10px', minHeight: '54px', display: 'flex', alignItems: 'center' }}>{t.heroCta3}</a>
            </div>
          </div>

          <div style={{ flex: '1 1 420px', minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HeroTerminal sessions={sessions} />
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section aria-labelledby="clientes-h" style={{ background: 'var(--surface)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '44px 24px', display: 'flex', flexWrap: 'wrap', gap: '24px 48px', alignItems: 'center' }}>
          <h2 id="clientes-h" className="disp" style={{ margin: 0, fontSize: '16px', fontWeight: 700, flex: '0 0 auto', maxWidth: '220px', lineHeight: '1.4' }}>{t.clientsTitle}</h2>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, flex: '1 1 640px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
            {CLIENTS.map((c) => (
              <li key={c.name} className="logo-cell" style={{ height: '76px', background: 'var(--card)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 18px', boxSizing: 'border-box' }}>
                <img src={c.src} alt={c.name} style={{ maxWidth: '100%', maxHeight: c.h, objectFit: 'contain', display: 'block' }} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SERVICES / AUDIENCE TABS */}
      <section id="servicos" aria-labelledby="servicos-h" style={{ background: 'var(--band)', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" className="mono hide-sm" style={{ position: 'absolute', right: '-30px', top: '-60px', fontSize: '420px', lineHeight: '1', fontWeight: 700, color: 'rgba(255,255,255,0.04)' }}>{'}'}</div>
        <div style={{ position: 'relative', maxWidth: '1240px', margin: '0 auto', padding: '112px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '700px', marginBottom: '40px' }}>
            <span className="mono" style={{ fontSize: '13px', color: '#FF8A7D', letterSpacing: '0.04em' }}>{t.svcKicker}</span>
            <h2 id="servicos-h" className="disp sec-h" style={{ margin: 0, fontSize: '52px', lineHeight: '1.06', fontWeight: 800, letterSpacing: '-0.03em' }}>{t.svcTitle}</h2>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: '1.6', color: '#C9CAE6' }}>{t.svcSub}</p>
          </div>
          <ServicesTabs tracks={tracks} an={an} tabsLabel={t.svcTabsLabel} />
        </div>
      </section>

      {/* VENTURES */}
      <section aria-labelledby="ventures-h" style={{ background: '#EB5648', color: '#13143A' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '104px 24px', display: 'flex', flexWrap: 'wrap', gap: '56px', alignItems: 'center' }}>
          <div style={{ flex: '999 1 520px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <span className="mono" style={{ fontSize: '13px', letterSpacing: '0.04em', fontWeight: 500 }}>{'// betacode ventures'}</span>
            <h2 id="ventures-h" className="disp sec-h" style={{ margin: 0, fontSize: '64px', lineHeight: '1.02', fontWeight: 800, letterSpacing: '-0.035em' }}>{t.venTitle}</h2>
            <p style={{ margin: 0, fontSize: '19px', lineHeight: '1.55', maxWidth: '560px', fontWeight: 500 }}>{t.venText}</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link className="btn-navy" href={SITE_ROUTES.ventures} style={{ fontSize: '16px', padding: '0 26px', minHeight: '54px' }}>{t.venCta} <span aria-hidden="true">→</span></Link>
              <Link href={VENTURES_CASE_HREF} style={{ border: '1.5px solid #13143A', color: '#13143A', textDecoration: 'none', fontWeight: 600, fontSize: '16px', padding: '0 26px', minHeight: '54px', display: 'flex', alignItems: 'center', borderRadius: '12px' }}>{t.venCta2}</Link>
            </div>
          </div>
          <div style={{ flex: '1 1 520px', minWidth: 'min(100%, 500px)', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
            <div style={{ background: '#1B1C51', color: '#FFFFFF', borderRadius: '22px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '10px', gridColumn: 'span 2' }}>
              <span className="mono" style={{ fontSize: '12px', color: '#FF8A7D' }}>{t.venStat1}</span>
              <span className="disp" style={{ fontSize: VEN_STAT_VALUE_SIZE, lineHeight: '1.08', fontWeight: 800, letterSpacing: '-0.03em', maxWidth: '12em' }}>{t.venStatValue}</span>
            </div>
            <div style={{ background: '#FFFFFF', borderRadius: '22px', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span className="mono" style={{ fontSize: '12px', color: '#4A4B7A' }}>{t.venStat2}</span>
              <span className="disp" style={{ fontSize: VEN_STAT_VALUE_SIZE, lineHeight: '1', fontWeight: 800, color: '#1B1C51' }}>Equity</span>
            </div>
            <div style={{ background: '#FFFFFF', borderRadius: '22px', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span className="mono" style={{ fontSize: '12px', color: '#4A4B7A' }}>{t.venStat3L}</span>
              <span className="disp" style={{ fontSize: VEN_STAT_VALUE_SIZE, lineHeight: '1', fontWeight: 800, color: '#1B1C51' }}>{t.venStat3}</span>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section aria-labelledby="equipa-h" style={{ maxWidth: '1240px', margin: '0 auto', padding: '112px 24px 0' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '36px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '640px' }}>
            <span className="mono" style={{ fontSize: '13px', color: 'var(--kicker)', letterSpacing: '0.04em' }}>{t.teamKicker}</span>
            <h2 id="equipa-h" className="disp sec-h" style={{ margin: 0, fontSize: '52px', lineHeight: '1.06', fontWeight: 800, letterSpacing: '-0.03em' }}>{t.teamTitle}</h2>
          </div>
          <p style={{ margin: 0, fontSize: '18px', lineHeight: '1.6', color: 'var(--muted)', maxWidth: '440px' }}>{t.teamText}</p>
        </div>
        <div className="team-grid">
          <img className="span2 tall" src="/assets/team/tshirts.jpg" alt={t.altTshirts} loading="lazy" style={{ objectPosition: 'center 70%' }} />
          <img src="/assets/team/portrait-1.jpg" alt={t.altPortrait} loading="lazy" style={{ objectPosition: 'center 30%' }} />
          <img src="/assets/team/portrait-2.jpg" alt={t.altPortrait} loading="lazy" style={{ objectPosition: 'center 30%' }} />
          <img src="/assets/team/portrait-3.jpg" alt={t.altPortrait} loading="lazy" style={{ objectPosition: 'center 35%' }} />
          <img src="/assets/team/beagle.jpg" alt={t.altBeagle} loading="lazy" style={{ objectPosition: 'center 35%' }} />
          <img className="span2" src="/assets/team/team.jpg" alt={t.altTeam} loading="lazy" style={{ objectPosition: 'center 30%' }} />
          <img src="/assets/team/duo.jpg" alt={t.altDuo} loading="lazy" style={{ objectPosition: 'center 25%' }} />
          <img src="/assets/team/portrait-4.jpg" alt={t.altPortrait} loading="lazy" style={{ objectPosition: 'center 25%' }} />
        </div>
      </section>

      {/* INSIGHTS */}
      <section aria-labelledby="insights-h" style={{ maxWidth: '1240px', margin: '0 auto', padding: '112px 24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '640px' }}>
            <span className="mono" style={{ fontSize: '13px', color: 'var(--kicker)', letterSpacing: '0.04em' }}>{'// insights'}</span>
            <h2 id="insights-h" className="disp sec-h" style={{ margin: 0, fontSize: '52px', lineHeight: '1.06', fontWeight: 800, letterSpacing: '-0.03em' }}>{t.insTitle}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex' }} aria-hidden="true">
              <img src="/assets/avatars/pedro-gorrao.jpg" alt="" loading="lazy" style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', objectPosition: '60% 20%', border: '3px solid var(--bg)', display: 'block' }} />
              <img src="/assets/avatars/marco-mendao.jpg" alt="" loading="lazy" style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--bg)', marginLeft: '-14px', display: 'block' }} />
            </div>
            <div style={{ fontSize: '14px', lineHeight: '1.45', color: 'var(--muted)' }}>{t.insBy1}<br />{t.insBy2}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {teaser.map((a) => (
            <Link key={a.num} className="card" href={a.href} style={{ background: 'var(--surface)', borderRadius: '22px', padding: '28px', gap: '44px', minHeight: '220px', boxSizing: 'border-box', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="mono" style={{ fontSize: '12px', background: 'var(--card)', padding: '6px 10px', borderRadius: '999px' }}>{a.tag}</span>
                <span className="mono" style={{ fontSize: '12px', color: 'var(--muted)' }}>{a.num}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 className="disp" style={{ margin: 0, fontSize: '24px', lineHeight: '1.2', fontWeight: 700, letterSpacing: '-0.015em' }}>{a.title}</h3>
                <span style={{ fontWeight: 600, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>{t.insRead} <span className="arrow" aria-hidden="true">→</span></span>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: '28px' }}>
          <Link href={SITE_ROUTES.insights} style={{ fontWeight: 600, fontSize: '16px', textUnderlineOffset: '5px', display: 'inline-flex', minHeight: '44px', alignItems: 'center' }}>{t.insAll}</Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section aria-labelledby="cta-h" style={{ padding: '0 24px 112px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', background: 'var(--band)', color: '#FFFFFF', borderRadius: '32px', overflow: 'hidden', display: 'flex', flexWrap: 'wrap', border: '1px solid var(--border)' }}>
          <div className="pad-sm" style={{ flex: '999 1 520px', minWidth: 0, padding: '72px 56px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '26px', alignItems: 'flex-start' }}>
            <span className="mono" style={{ fontSize: '13px', color: '#FF8A7D' }}>{t.ctaKicker}</span>
            <h2 id="cta-h" className="disp sec-h" style={{ margin: 0, fontSize: '60px', lineHeight: '1.02', fontWeight: 800, letterSpacing: '-0.035em' }}>{t.ctaTitle}</h2>
            <p style={{ margin: 0, fontSize: '20px', lineHeight: '1.5', color: '#C9CAE6', maxWidth: '520px' }}>{t.ctaText}</p>
            <Link className="btn-coral" href={CONTACT_FORM_HREF} style={{ fontSize: '17px', padding: '0 30px', minHeight: '56px' }}>{t.ctaBtn} <span aria-hidden="true">→</span></Link>
          </div>
          <div style={{ flex: '1 1 360px', minHeight: '340px', position: 'relative' }}>
            <img src="/assets/photos/hoodies.jpg" alt={t.altHoodies} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 45%', display: 'block' }} />
          </div>
        </div>
      </section>
    </main>
  )
}
