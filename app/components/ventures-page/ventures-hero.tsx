import type { VenturesCopy } from './types'

export function VenturesHero({ t }: { t: VenturesCopy }) {
  return (
    <section style={{ background: 'var(--band)', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" className="mono hide-sm" style={{ position: 'absolute', right: '-40px', top: '-80px', fontSize: '460px', lineHeight: '1', fontWeight: 700, color: 'rgba(255,255,255,0.04)' }}>{'}'}</div>
      <div style={{ position: 'relative', maxWidth: '1240px', margin: '0 auto', padding: '88px 24px 96px', display: 'flex', flexWrap: 'wrap', gap: '56px', alignItems: 'center' }}>
        <div style={{ flex: '999 1 500px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '26px' }}>
          <span className="mono" style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: '10px', fontSize: '13px', background: 'rgba(255,255,255,0.08)', padding: '8px 14px', borderRadius: '999px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EB5648' }}></span>
            {t.heroChip}
          </span>
          <h1 className="disp hero-h" style={{ margin: 0, fontSize: '66px', lineHeight: '1.03', fontWeight: 800, letterSpacing: '-0.035em' }}>
            {t.heroL1}
            <br />
            <span style={{ color: '#FF8A7D' }}>{t.heroL2}</span>
          </h1>
          <p style={{ margin: 0, fontSize: '19px', lineHeight: '1.6', color: '#C9CAE6', maxWidth: '560px' }}>{t.heroSub}</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a className="btn-coral" href="#candidatura">{t.apply} <span aria-hidden="true">→</span></a>
            <a className="btn-line" href="#coachid" style={{ color: '#FFFFFF' }}>{t.seeCase}</a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 26px', paddingTop: '6px' }}>
            {t.heroFacts.map((f) => (
              <div key={f.v} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="disp" style={{ fontSize: f.v.length > 10 ? '22px' : '26px', fontWeight: 800, lineHeight: 1.15, maxWidth: '12em' }}>{f.v}</span>
                {f.l ? <span style={{ fontSize: '13px', color: '#C9CAE6' }}>{f.l}</span> : null}
              </div>
            ))}
          </div>
        </div>

        <div aria-hidden="true" style={{ flex: '1 1 360px', minWidth: 0, display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '340px', maxWidth: '100%', aspectRatio: '1 / 1' }}>
            <svg viewBox="0 0 240 240" width="100%" height="100%">
              <circle cx="120" cy="120" r="105" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="14"></circle>
              <g className="hz-ring">
                <circle className="hz-arc" cx="120" cy="120" r="105" fill="none" stroke="#EB5648" strokeWidth="14" strokeLinecap="round"></circle>
              </g>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <div className="hz-pct disp" style={{ position: 'relative', width: '200px', height: '74px', fontSize: '64px', fontWeight: 800, letterSpacing: '-0.03em' }}>
                <span className="p0">0%</span><span className="p1">33%</span><span className="p2">66%</span><span className="p3">100%</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
                <span className="hz-st s1 mono" style={{ fontSize: '12px' }}>① {t.s1short}</span>
                <span className="hz-st s2 mono" style={{ fontSize: '12px' }}>② {t.s2short}</span>
                <span className="hz-st s3 mono" style={{ fontSize: '12px' }}>③ {t.s3short}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
