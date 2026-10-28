/* eslint-disable @next/next/no-img-element */
import type { VenturesCopy } from './types'

export function VenturesCase({ t }: { t: VenturesCopy }) {
  return (
    <section id="coachid" aria-labelledby="case-h" style={{ background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '104px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '720px' }}>
          <span className="mono" style={{ fontSize: '13px', color: 'var(--kicker)' }}>{t.caseKicker}</span>
          <h2 id="case-h" className="disp sec-h" style={{ margin: 0, fontSize: '48px', lineHeight: '1.06', fontWeight: 800, letterSpacing: '-0.03em' }}>{t.caseTitle}</h2>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ flex: '999 1 520px', minWidth: 0, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ background: '#FFFFFF', border: '1px solid #E6E6EF', borderRadius: '14px', padding: '12px 18px', display: 'flex', alignItems: 'center' }}>
                <img src="/assets/clients/coach-id.png" alt="Coach ID" loading="lazy" style={{ height: '40px', width: 'auto', display: 'block' }} />
              </div>
              <a href="https://coachidapp.com" style={{ fontWeight: 600, fontSize: '15px', textUnderlineOffset: '4px', minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>coachidapp.com ↗</a>
            </div>
            <p style={{ margin: 0, fontSize: '17px', lineHeight: '1.6' }}>{t.caseDesc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {t.caseTags.map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700 }}>{t.builtTitle}</span>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                {t.built.map((b) => (
                  <li key={b} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '14px', fontWeight: 500 }}>
                    <span aria-hidden="true" style={{ color: '#EB5648', fontWeight: 700 }}>✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ flex: '1 1 320px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#EB5648', color: '#13143A', borderRadius: '24px', padding: '28px', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '20px' }}>
              <span className="mono" style={{ gridColumn: '1 / -1', fontSize: '12px', fontWeight: 500 }}>{t.resultsKicker}</span>
              {t.stats.map((s) => (
                <div key={s.v} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span className="disp" style={{ fontSize: '40px', lineHeight: '1', fontWeight: 800, letterSpacing: '-0.03em' }}>{s.v}</span>
                  <span style={{ fontSize: '13px', lineHeight: '1.4', fontWeight: 500 }}>{s.l}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700 }}>{t.alsoTitle}</span>
              {t.also.map((a) => (
                <span key={a} style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: '1.5' }}>
                  <span className="mono" aria-hidden="true" style={{ color: '#EB5648', fontWeight: 700 }}>{'{ }'}</span>
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
