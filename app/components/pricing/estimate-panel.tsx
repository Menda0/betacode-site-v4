'use client'

import { useRef, type KeyboardEvent, type Ref } from 'react'
import { fill } from '@/lib/copy'
import type { ServiceId } from '@/lib/pricing/rules'
import type { PricingCopy, ServiceView, TeamConfig } from '@/lib/pricing/services'
import { ServiceAnimation } from './service-animation'

type Tab = { id: ServiceId; name: string; price: string }

/** Two currency amounts joined by an en dash, e.g. "20.000 € – 30.000 €" or "€20,000 – €30,000". */
function euroRange(value: string): { low: string; high: string; joiner: string } | null {
  const parts = value.split(/\s+–\s+/)
  if (parts.length < 2 || (value.match(/€/g) || []).length < 2) return null
  const low = parts[0]
  return { low, high: parts.slice(1).join(' – '), joiner: /^\s*€/.test(low) ? 'to' : 'a' }
}

export function FigureValue({ value }: { value: string }) {
  const range = euroRange(value)
  if (!range) {
    return <span className={`disp pr-fig${/€/.test(value) ? ' pr-fig-single' : ''}`}>{value}</span>
  }
  return (
    <span className="pr-range">
      <span className="disp pr-fig pr-fig-single pr-range-inline">{value}</span>
      <span className="disp pr-fig pr-range-stack">
        <span className="pr-amt">{range.low}</span>
        <span className="pr-range-to">{range.joiner}</span>
        <span className="pr-amt">{range.high}</span>
      </span>
    </span>
  )
}

type Props = {
  copy: PricingCopy
  tabs: Tab[]
  sel: ServiceView
  isBest: boolean
  cfg: TeamConfig
  onPick: (id: ServiceId) => void
  onCfg: (cfg: TeamConfig) => void
  onContinue: () => void
  headingRef: Ref<HTMLHeadingElement>
}

export function EstimatePanel({ copy, tabs, sel, isBest, cfg, onPick, onCfg, onContinue, headingRef }: Props) {
  const t = copy.result
  const hasAlts = tabs.length > 1
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const small = cfg !== 'base'

  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const cur = tabs.findIndex((b) => b.id === sel.id)
    const next = (cur + dir + tabs.length) % tabs.length
    onPick(tabs[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className="wz" style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <span className="mono" style={{ fontSize: "12px", color: "var(--kicker)" }}>{t.kicker}</span>
        <h2 ref={headingRef} tabIndex={-1} className="disp wz-h" style={{ margin: "0", fontSize: "30px", lineHeight: "1.15", fontWeight: "800", letterSpacing: "-0.02em" }}>
          {hasAlts ? fill(t.titleMany, { n: tabs.length }) : t.titleOne}
        </h2>
      </div>

      {hasAlts && (
        <div className="svc-scroll" role="tablist" aria-label={t.tabsLabel} onKeyDown={onTabKey} style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {tabs.map((b, i) => {
            const on = b.id === sel.id
            return (
              <button
                key={b.id}
                ref={(el) => { tabRefs.current[i] = el }}
                type="button"
                className="svc-tab"
                role="tab"
                id={`svc-tab-${b.id}`}
                aria-selected={on}
                aria-controls="svc-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => onPick(b.id)}
              >
                <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", width: "100%" }}>
                  <span style={{ fontWeight: "700", fontSize: "14px", lineHeight: "1.25", minWidth: "0" }}>{b.name}</span>
                  {i === 0 && (
                    <span className="mono" style={{ flex: "none", fontSize: "10px", fontWeight: "700", color: "#fff", background: "#EB5648", padding: "4px 6px", borderRadius: "6px" }}>{t.bestShort}</span>
                  )}
                </span>
                <span className="mono svc-tab-price">
                  {euroRange(b.price) || /€/.test(b.price) ? <FigureValue value={b.price} /> : <span className="svc-tab-plain">{b.price}</span>}
                </span>
              </button>
            )
          })}
        </div>
      )}

      <article
        id="svc-panel"
        className="svc-card"
        role={hasAlts ? "tabpanel" : undefined}
        aria-labelledby={hasAlts ? `svc-tab-${sel.id}` : undefined}
        style={{ border: "2px solid #EB5648", borderRadius: "20px", overflow: "hidden" }}
      >
        <div className="svc-band" style={{ background: "var(--band)", color: "#FFFFFF", padding: "22px 24px", display: "flex", flexWrap: "wrap", gap: "14px 28px", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
              <span className="disp svc-name" style={{ fontSize: "24px", fontWeight: "800" }}>{sel.name}</span>
              <span className="chip" style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}>{sel.model}</span>
              {isBest && (
                <span className="chip" style={{ background: "#EB5648", color: "#13143A", fontWeight: "700" }}>{t.best}</span>
              )}
            </div>
            <span className="svc-desc" style={{ fontSize: "14px", lineHeight: "1.5", color: "#C9CAE6", maxWidth: "460px", minHeight: "42px" }}>{sel.desc}</span>
          </div>
          <div className="svc-price" style={{ display: "flex", flexDirection: "column", gap: "4px", textAlign: "right" }}>
            <span style={{ fontSize: "12px", color: "#C9CAE6" }}>{sel.priceL}</span>
            <span className="disp pr-price pr-price-desk" style={{ fontSize: sel.id === "V" ? "22px" : "30px", fontWeight: "800", whiteSpace: sel.id === "V" ? "normal" : "nowrap", lineHeight: sel.id === "V" ? 1.15 : undefined, maxWidth: sel.id === "V" ? "12em" : undefined }}>{sel.price}</span>
            <span className="pr-price-mob"><FigureValue value={sel.price} /></span>
          </div>
        </div>

        <div className="svc-body" style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: "18px", minHeight: "auto", boxSizing: "border-box" }}>
          <ServiceAnimation id={sel.id} cfg={cfg} an={copy.anim} />
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ fontSize: "14px", fontWeight: "700" }}>{t.why}</span>
            <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", minHeight: "72px" }}>
              {sel.why.map((w) => (
                <li key={w} style={{ display: "flex", gap: "10px", fontSize: "14px", lineHeight: "1.5" }}><span className="mono" aria-hidden="true" style={{ color: "#EB5648", fontWeight: "700" }}>{'{'} {'}'}</span>{w}</li>
              ))}
            </ul>
          </div>

          <div style={{ minHeight: "44px", display: "flex", alignItems: "center" }}>
            {sel.id === 'E' ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
                <div className="tgl" role="group" aria-label={t.cfgLabel}>
                  <button type="button" aria-pressed={small} onClick={() => onCfg('small')}>{t.small}</button>
                  <button type="button" aria-pressed={!small} onClick={() => onCfg('base')}>{t.baseTeam}</button>
                </div>
                <span style={{ fontSize: "13px", color: "var(--muted)" }}>{small ? t.cfgSmallDesc : t.cfgBaseDesc}</span>
              </div>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {sel.inc.map((c) => (
                  <span key={c} className="chip" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 12px" }}><span aria-hidden="true" style={{ color: "#EB5648" }}>✓</span>{c}</span>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "10px" }}>
            {sel.figs.map((f) => (
              <div key={f.label} className="pr-figcard">
                <span style={{ fontSize: "13px", color: "var(--muted)" }}>{f.label}</span>
                <FigureValue value={f.value} />
              </div>
            ))}
          </div>

          <details style={{ border: "1px solid var(--border)", borderRadius: "14px", padding: "0 16px" }}>
            <summary style={{ cursor: "pointer", minHeight: "48px", display: "flex", alignItems: "center", fontSize: "14px", fontWeight: "600" }}>{t.how}</summary>
            <div style={{ paddingBottom: "12px" }}>
              {sel.rows.map((r) => (
                <div key={r.who} style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.3fr) minmax(0, 1fr)", gap: "10px", padding: "10px 0", borderTop: "1px solid var(--border)", fontSize: "14px" }}>
                  <span style={{ fontWeight: "500" }}>{r.who}</span>
                  <span style={{ color: "var(--muted)" }}>{r.time}</span>
                  <span className="mono" style={{ textAlign: "right", fontSize: "13px" }}>{r.rate}</span>
                </div>
              ))}
            </div>
          </details>

          <p style={{ margin: "0", fontSize: "12px", lineHeight: "1.5", color: "var(--muted)" }}>{sel.note}</p>
        </div>
      </article>

      <div className="est-next" style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
        <span className="est-hint" style={{ fontSize: "14px", color: "var(--muted)", flex: "1 1 260px" }}>{t.nextHint}</span>
        <button type="button" className="btn-coral est-cta" onClick={onContinue}>{t.toContact} <span aria-hidden="true">→</span></button>
      </div>
      <div className="pr-dock">
        <span className="pr-dock-copy">
          <span className="pr-dock-name">{sel.name}</span>
          <span className="pr-dock-price"><FigureValue value={sel.price} /></span>
        </span>
        <button type="button" className="btn-coral" onClick={onContinue}>{t.toContactShort} <span aria-hidden="true">→</span></button>
      </div>
    </div>
  )
}
