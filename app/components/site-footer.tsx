/* eslint-disable @next/next/no-img-element */
import { Link } from '@/i18n/navigation'
import type { ChromeCopy } from '@/lib/copy'
import { FACEBOOK_URL, GITHUB_URL, INSTAGRAM_URL, TWITTER_URL } from '@/lib/metadata'
import { SITE_ROUTES } from '@/lib/site-routes'

const FUNDING = [
  { id: 'iefp', alt: 'IEFP', height: 48 },
  { id: 'pessoas2030', alt: 'Pessoas 2030', height: 40 },
  { id: 'portugal2030', alt: 'Portugal 2030', height: 44 },
  // TODO(betacode): the EU logo file is FEDER co-funding but the funding text mentions FSE+. Confirm which is correct.
  { id: 'ue', alt: null, height: 44 },
] as const

function ThemedImg({ base, alt, height }: { base: string; alt: string; height: number }) {
  return (
    <>
      <img className="f-light" src={`${base}-light.png`} alt={alt} style={{ height, width: 'auto' }} />
      <img className="f-dark" src={`${base}-dark.png`} alt={alt} style={{ height, width: 'auto' }} />
    </>
  )
}

export function SiteFooter({ copy: c }: { copy: ChromeCopy }) {
  return (
    <footer className="bc-chrome bc-footer">
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '64px 24px 36px', display: 'flex', flexDirection: 'column', gap: 44 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 36 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
            <img className="f-light" src="/assets/brand/logo.png" alt="Betacode" style={{ height: 36, width: 'auto', alignSelf: 'flex-start' }} />
            <img className="f-dark" src="/assets/brand/logo-white.png" alt="Betacode" style={{ height: 36, width: 'auto', alignSelf: 'flex-start' }} />
            <p style={{ margin: 0, color: 'var(--fm)', fontSize: 15, lineHeight: 1.6 }}>{c.footTag}</p>
          </div>
          <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="mono" style={{ fontSize: 12, color: 'var(--fk)', marginBottom: 10 }}>{c.footNav}</span>
              <Link className="flink" href={SITE_ROUTES.pricing}>{c.navPricing}</Link>
              <Link className="flink" href={SITE_ROUTES.ventures}>{c.navVentures}</Link>
              <Link className="flink" href={SITE_ROUTES.insights}>{c.navInsights}</Link>
              <Link className="flink" href={SITE_ROUTES.contact}>{c.navContact}</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="mono" style={{ fontSize: 12, color: 'var(--fk)', marginBottom: 10 }}>{c.footSocial}</span>
              <a className="flink" href={FACEBOOK_URL}>Facebook</a>
              <a className="flink" href={INSTAGRAM_URL}>Instagram</a>
              <a className="flink" href={TWITTER_URL}>X / Twitter</a>
              <a className="flink" href={GITHUB_URL}>GitHub</a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--fb)', borderBottom: '1px solid var(--fb)', padding: '28px 0', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px 40px' }}>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center' }}>
            {FUNDING.map((f) => (
              <ThemedImg key={f.id} base={`/assets/funding/${f.id}`} alt={f.alt ?? c.altEu} height={f.height} />
            ))}
          </div>
          <p style={{ margin: 0, flex: '1 1 300px', fontSize: 13, lineHeight: 1.55, color: 'var(--fm)' }}>{c.funding}</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, color: 'var(--fm)', fontSize: 13 }}>
          <span>{c.copy}</span>
          <span className="mono brace">{c.made}</span>
        </div>
      </div>
    </footer>
  )
}
