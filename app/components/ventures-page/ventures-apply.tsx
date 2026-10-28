import { VenturesApplyForm } from './ventures-apply-form'
import type { VenturesCopy } from './types'

export function VenturesApply({ t }: { t: VenturesCopy }) {
  return (
    <section id="candidatura" aria-labelledby="apply-h" style={{ maxWidth: '1240px', margin: '0 auto', padding: '104px 24px' }}>
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '28px', overflow: 'hidden', display: 'flex', flexWrap: 'wrap', boxShadow: '0 20px 50px rgba(27,28,81,0.06)' }}>
        <div style={{ flex: '1 1 360px', minWidth: 0, background: 'var(--band)', color: '#FFFFFF', padding: '44px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <span className="mono" style={{ fontSize: '13px', color: '#FF8A7D' }}>{t.applyKicker}</span>
          <h2 id="apply-h" className="disp sec-h" style={{ margin: 0, fontSize: '40px', lineHeight: '1.08', fontWeight: 800, letterSpacing: '-0.02em' }}>{t.applyTitle}</h2>
          <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.6', color: '#C9CAE6' }}>{t.applySub}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            {t.applySteps.map((n) => (
              <div key={n.n} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span className="mono" style={{ flex: 'none', width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#FF8A7D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>{n.n}</span>
                <span style={{ fontSize: '15px', lineHeight: '1.5' }}>{n.t}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: '999 1 460px', minWidth: 0, padding: '44px', boxSizing: 'border-box' }}>
          <VenturesApplyForm />
        </div>
      </div>
    </section>
  )
}
