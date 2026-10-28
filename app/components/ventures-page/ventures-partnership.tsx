import type { VenturesCopy } from './types'

const itemStyle = { display: 'flex', gap: '12px', alignItems: 'flex-start' } as const
const itemBodyStyle = { display: 'flex', flexDirection: 'column', gap: '3px' } as const
const listStyle = { margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' } as const

export function VenturesPartnership({ t }: { t: VenturesCopy }) {
  return (
    <section aria-labelledby="parc-h" style={{ maxWidth: '1240px', margin: '0 auto', padding: '72px 24px 104px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '680px' }}>
          <span className="mono" style={{ fontSize: '13px', color: 'var(--kicker)' }}>{t.parKicker}</span>
          <h2 id="parc-h" className="disp sec-h" style={{ margin: 0, fontSize: '48px', lineHeight: '1.06', fontWeight: 800, letterSpacing: '-0.03em' }}>{t.parTitle}</h2>
        </div>
        <p style={{ margin: 0, fontSize: '17px', lineHeight: '1.6', color: 'var(--muted)', maxWidth: '420px' }}>{t.parSub}</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'stretch' }}>
        <div style={{ flex: '1 1 360px', minWidth: 0, background: 'var(--band)', color: '#fff', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="hs-r" style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#EB5648', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 15px/1 var(--font-jetbrains), monospace' }}>{'{B}'}</span>
            <h3 className="disp" style={{ margin: 0, fontSize: '22px', fontWeight: 800 }}>{t.weBring}</h3>
          </div>
          <ul style={listStyle}>
            {t.we.map((w) => (
              <li key={w.t} style={itemStyle}>
                <span className="mono" aria-hidden="true" style={{ color: '#FF8A7D', fontWeight: 700, paddingTop: '2px' }}>{'{ }'}</span>
                <span style={itemBodyStyle}>
                  <span style={{ fontWeight: 700, fontSize: '15px' }}>{w.t}</span>
                  <span style={{ fontSize: '14px', lineHeight: '1.5', color: '#C9CAE6' }}>{w.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hide-sm" aria-hidden="true" style={{ flex: '0 0 96px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '72px', height: '72px' }}>
            <span className="hs-ring"></span>
            <span className="hs-ring" style={{ animationDelay: '.18s' }}></span>
            <div className="hs-c" style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#EB5648', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m11 17 2 2a1 1 0 1 0 3-3"></path>
                <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"></path>
                <path d="m21 3 1 11h-2"></path>
                <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path>
                <path d="M3 4h8"></path>
              </svg>
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 360px', minWidth: 0, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="hs-l" style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--surface)', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4"></circle>
                <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path>
              </svg>
            </span>
            <h3 className="disp" style={{ margin: 0, fontSize: '22px', fontWeight: 800 }}>{t.youBring}</h3>
          </div>
          <ul style={listStyle}>
            {t.you.map((w) => (
              <li key={w.t} style={itemStyle}>
                <span className="mono" aria-hidden="true" style={{ color: '#EB5648', fontWeight: 700, paddingTop: '2px' }}>{'{ }'}</span>
                <span style={itemBodyStyle}>
                  <span style={{ fontWeight: 700, fontSize: '15px' }}>{w.t}</span>
                  <span style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--muted)' }}>{w.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
