import type { VenturesCopy } from './types'

export function VenturesSteps({ t }: { t: VenturesCopy }) {
  return (
    <section aria-labelledby="como-h" style={{ maxWidth: '1240px', margin: '0 auto', padding: '104px 24px 40px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '680px', marginBottom: '40px' }}>
        <span className="mono" style={{ fontSize: '13px', color: 'var(--kicker)' }}>{t.howKicker}</span>
        <h2 id="como-h" className="disp sec-h" style={{ margin: 0, fontSize: '48px', lineHeight: '1.06', fontWeight: 800, letterSpacing: '-0.03em' }}>{t.howTitle}</h2>
      </div>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {t.steps.map((s) => (
          <li key={s.n} className="step-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="disp" style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#EB5648', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 800 }}>{s.n}</span>
              <span className="mono" style={{ fontSize: '12px', color: 'var(--muted)' }}>{s.tag}</span>
            </div>
            <h3 className="disp" style={{ margin: 0, fontSize: '22px', fontWeight: 800 }}>{s.t}</h3>
            <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6', color: 'var(--muted)' }}>{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
