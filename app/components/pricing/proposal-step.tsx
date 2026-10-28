'use client'

import { useRef, type FormEvent, type Ref } from 'react'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { EMAIL_PATTERN, MESSAGE_MAX, WEBSITE_PATTERN, type ContactSubmission } from '@/lib/contact-validation'
import { SUCCESS_READ_SLUGS } from '@/lib/pricing/rules'
import type { PricingCopy, ServiceView } from '@/lib/pricing/services'
import { SITE_ROUTES, articleHref } from '@/lib/site-routes'
import { useContactSubmit } from '@/lib/use-contact-submit'
import { HoneypotField, SubmitErrorMessage, useFormsCopy } from '@/app/components/shared/form-status'

export type ProposalForm = { name: string; email: string; site: string; desc: string; when: number | null }
export type ProposalErrors = { name?: boolean; email?: boolean; site?: boolean }

type PriceRequest = Omit<Extract<ContactSubmission, { source: 'price-calculator' }>, 'source' | 'hp' | 'contact' | 'description' | 'when' | 'locale'>

type Props = {
  copy: PricingCopy
  locale: Locale
  sel: ServiceView
  summary: string[]
  request: PriceRequest
  form: ProposalForm
  onForm: (form: ProposalForm) => void
  err: ProposalErrors
  onErr: (err: ProposalErrors) => void
  hp: string
  onHp: (hp: string) => void
  sent: boolean
  onSent: () => void
  onReset: () => void
  headingRef: Ref<HTMLHeadingElement>
}

const optionalStyle = { fontWeight: "400", color: "var(--muted)" } as const

/** Two euro amounts stay whole. On a narrow line the join word is "a" / "to", not a dash. */
function SummaryPrice({ value }: { value: string }) {
  const parts = value.split(/\s+–\s+/)
  if (parts.length < 2 || (value.match(/€/g) || []).length < 2) {
    return /€/.test(value) ? <span className="pr-amt">{value}</span> : value
  }
  const joiner = /^\s*€/.test(parts[0]) ? 'to' : 'a'
  return (
    <>
      <span className="pr-amt">{parts[0]}</span>
      {` ${joiner} `}
      <span className="pr-amt">{parts.slice(1).join(' – ')}</span>
    </>
  )
}

export function ProposalStep({ copy, locale, sel, summary, request, form, onForm, err, onErr, hp, onHp, sent, onSent, onReset, headingRef }: Props) {
  const t = copy.form
  const s = copy.success
  const forms = useFormsCopy()
  const { submit, error, sending } = useContactSubmit()
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const siteRef = useRef<HTMLInputElement>(null)

  const upd = (k: 'name' | 'email' | 'site' | 'desc') => (e: { target: { value: string } }) => onForm({ ...form, [k]: e.target.value })
  const whenLabel = form.when != null ? t.whenOpts[form.when] : ''

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return
    const name = form.name.trim()
    const email = form.email.trim()
    const site = form.site.trim()
    const next: ProposalErrors = { name: !name, email: !EMAIL_PATTERN.test(email), site: !!site && !WEBSITE_PATTERN.test(site) }
    if (next.name || next.email || next.site) {
      onErr(next)
      ;(next.name ? nameRef : next.email ? emailRef : siteRef).current?.focus()
      return
    }
    onErr({})
    const ok = await submit({
      source: 'price-calculator',
      hp,
      contact: { name, email, website: site || undefined },
      description: form.desc.trim() || undefined,
      when: whenLabel || undefined,
      locale,
      ...request,
    })
    if (ok) onSent()
  }

  const firstName = form.name.trim().split(' ')[0]
  const thanks = s.thanks + (form.name.trim() ? ', ' + firstName : '') + '!'
  const contactLine = form.name.trim() + ' · ' + form.email.trim() + (form.site.trim() ? ' · ' + form.site.trim() : '')

  return (
    <div className="wz proposal-layout" style={{ display: "flex", flexWrap: "wrap", gap: "28px" }}>
      {!sent && (
        <details className="mini-sum">
          <summary>
            <span className="mini-sum-copy">
              <span className="mono mini-sum-kicker">{t.yourEstimate}</span>
              <span className="mini-sum-line">{sel.name}{' · '}<SummaryPrice value={sel.price} /></span>
            </span>
            <svg className="mini-chev" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 9l6 6 6-6"></path></svg>
          </summary>
          <div className="mini-sum-body">
            <span className="mini-sum-note">{sel.priceL}</span>
            <div className="mini-sum-chips">
              {summary.map((c) => (
                <span key={c} className="chip" style={{ background: "var(--card)" }}>{c}</span>
              ))}
            </div>
            <div className="mini-sum-next">
              <span className="mini-sum-next-title">{t.nextTitle}</span>
              {t.next.map((n, i) => (
                <div key={n} className="mini-sum-step">
                  <span className="dot" style={{ width: "22px", height: "22px", background: "var(--card)", color: "#EB5648", fontSize: "11px" }}>{i + 1}</span>
                  <span>{n}</span>
                </div>
              ))}
            </div>
          </div>
        </details>
      )}
      {!sent && (
        <div className="proposal-main" style={{ flex: "999 1 340px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h2 ref={headingRef} tabIndex={-1} className="disp wz-h" style={{ margin: "0", fontSize: "30px", lineHeight: "1.15", fontWeight: "800", letterSpacing: "-0.02em" }}>{t.formTitle}</h2>
            {/* TODO(betacode): confirm a real response time (IMPLEMENTATION.md §10.3) before promising one here and on the success screen. */}
            <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.55", color: "var(--muted)" }}>{t.formSub}</p>
          </div>
          <form onSubmit={onSubmit} noValidate className="proposal-form" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            <HoneypotField value={hp} onChange={onHp} />
            <div className="field">
              <label htmlFor="f-name">{t.fName}</label>
              <input ref={nameRef} id="f-name" autoComplete="name" maxLength={200} value={form.name} onChange={upd('name')} placeholder={t.phName} aria-invalid={err.name || undefined} aria-describedby={err.name ? 'f-name-err' : undefined} />
              {err.name && <span id="f-name-err" className="err">{t.eName}</span>}
            </div>
            <div className="field">
              <label htmlFor="f-email">{t.fEmail}</label>
              <input ref={emailRef} id="f-email" type="email" autoComplete="email" maxLength={320} value={form.email} onChange={upd('email')} placeholder={t.phEmail} aria-invalid={err.email || undefined} aria-describedby={err.email ? 'f-email-err' : undefined} />
              {err.email && <span id="f-email-err" className="err">{t.eEmail}</span>}
            </div>
            <div className="field" style={{ gridColumn: "1 / -1" }}>
              <label htmlFor="f-site">{t.fSite} <span style={optionalStyle}>({t.optional})</span></label>
              <input ref={siteRef} id="f-site" type="url" autoComplete="url" maxLength={500} value={form.site} onChange={upd('site')} placeholder={t.phSite} aria-invalid={err.site || undefined} aria-describedby={err.site ? 'f-site-err' : undefined} />
              {err.site && <span id="f-site-err" className="err">{t.eSite}</span>}
            </div>
            <div className="field" style={{ gridColumn: "1 / -1" }}>
              <span id="when-l" style={{ fontWeight: "600", fontSize: "14px" }}>{t.fWhen} <span style={optionalStyle}>({t.optional})</span></span>
              <div role="radiogroup" aria-labelledby="when-l" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {t.whenOpts.map((label, i) => {
                  const on = form.when === i
                  return (
                    <button key={label} type="button" className="pill" role="radio" aria-checked={on} onClick={() => onForm({ ...form, when: on ? null : i })}>{label}</button>
                  )
                })}
              </div>
            </div>
            <div className="field" style={{ gridColumn: "1 / -1" }}>
              <label htmlFor="f-desc">{t.fDesc} <span style={optionalStyle}>({t.optional})</span></label>
              <textarea id="f-desc" rows={4} maxLength={MESSAGE_MAX} value={form.desc} onChange={upd('desc')} placeholder={t.phDesc}></textarea>
            </div>
            {error && (
              <div style={{ gridColumn: "1 / -1" }}>
                <SubmitErrorMessage error={error} />
              </div>
            )}
            <div className="proposal-submit" style={{ gridColumn: "1 / -1", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px", justifyContent: "space-between" }}>
              {/* TODO(betacode): link to the privacy policy and confirm GDPR compliance (IMPLEMENTATION.md §10.6). */}
              <span style={{ fontSize: "13px", color: "var(--muted)", flex: "1 1 220px" }}>{t.privacy}</span>
              <button className="btn-coral" type="submit" disabled={sending} aria-disabled={sending}>
                {sending ? forms.sending : <>{t.send} <span aria-hidden="true">→</span></>}
              </button>
            </div>
          </form>
        </div>
      )}

      {sent && (
        <div role="status" style={{ flex: "1 1 100%", minWidth: "0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "26px", padding: "8px 0" }}>
          <div className="ok-wrap" aria-hidden="true">
            <span className="ok-ring"></span><span className="ok-ring" style={{ animationDelay: ".2s" }}></span>
            <span className="ok-disc"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path className="ok-path" d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", maxWidth: "560px" }}>
            <span className="mono" style={{ fontSize: "12px", color: "var(--kicker)" }}>{s.sentKicker}</span>
            <h2 ref={headingRef} tabIndex={-1} className="disp" style={{ margin: "0", fontSize: "34px", lineHeight: "1.1", fontWeight: "800", letterSpacing: "-0.02em" }}>{thanks}</h2>
            {/* TODO(betacode): add the committed response time here if there is one (IMPLEMENTATION.md §10.3). */}
            <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "var(--muted)" }}>{s.textBefore + form.email.trim() + s.textAfter}</p>
          </div>

          <div style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px", textAlign: "left" }}>
            <div style={{ background: "var(--surface)", borderRadius: "18px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <span className="mono" style={{ fontSize: "12px", color: "var(--kicker)" }}>{s.reqTitle}</span>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "baseline", flexWrap: "wrap" }}>
                <span className="disp" style={{ fontSize: "17px", fontWeight: "800" }}>{sel.name}</span>
                <span className="disp" style={{ fontSize: "17px", fontWeight: "800", lineHeight: 1.2, textAlign: "right" }}>{sel.price}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {summary.map((c) => (
                  <span key={c} className="chip" style={{ background: "var(--card)" }}>{c}</span>
                ))}
                {whenLabel && <span className="chip" style={{ background: "var(--card)" }}>{whenLabel}</span>}
              </div>
              <span style={{ fontSize: "13px", color: "var(--muted)", borderTop: "1px solid var(--border)", paddingTop: "10px", overflowWrap: "anywhere" }}>{contactLine}</span>
            </div>
            <div style={{ border: "1px solid var(--border)", borderRadius: "18px", padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ fontSize: "14px", fontWeight: "700" }}>{s.nextTitle}</span>
              {/* TODO(betacode): confirm these "what happens next" steps match the real process (IMPLEMENTATION.md §10.4). */}
              {s.steps.map((n, i) => (
                <div key={n.t} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span className="dot" style={{ ...(i === 0 ? { background: "#EB5648", color: "#fff" } : { border: "1.5px solid var(--border2)", color: "var(--muted)" }), width: "24px", height: "24px", fontSize: "11px" }}>{i === 0 ? '✓' : String(i + 1)}</span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontSize: "14px", lineHeight: "1.45", fontWeight: i === 0 ? "700" : "500" }}>{n.t}</span><span style={{ fontSize: "12px", color: "var(--muted)" }}>{n.s}</span></span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px", textAlign: "left" }}>
            <span style={{ fontSize: "14px", fontWeight: "700" }}>{s.readWhile}</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
              {s.reads.map((r, i) => {
                const slug = SUCCESS_READ_SLUGS[i]
                return (
                  <Link key={r.title} href={slug ? articleHref(slug) : SITE_ROUTES.insights} className="read" style={{ textDecoration: "none", border: "1px solid var(--border)", borderRadius: "14px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "92px", justifyContent: "space-between" }}>
                    <span className="mono" style={{ fontSize: "11px", color: "var(--kicker)" }}>{r.tag}</span>
                    <span style={{ fontSize: "15px", fontWeight: "700", lineHeight: "1.3" }}>{r.title} →</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="success-actions" style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link className="btn-coral" href={SITE_ROUTES.home}>{s.home}</Link>
            <Link className="btn-ghost" href={SITE_ROUTES.ventures}>Betacode Ventures</Link>
            <button type="button" className="btn-text" onClick={onReset}>{s.newEstimate}</button>
          </div>
        </div>
      )}

      {!sent && (
        <aside className="proposal-aside" style={{ flex: "1 1 260px", minWidth: "0", display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ background: "var(--surface)", borderRadius: "18px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <span className="mono" style={{ fontSize: "12px", color: "var(--kicker)" }}>{t.yourEstimate}</span>
            <span className="disp" style={{ fontSize: "18px", fontWeight: "800" }}>{sel.name}</span>
            <span className="disp" style={{ fontSize: "24px", fontWeight: "800" }}>{sel.price}</span>
            <span style={{ fontSize: "12px", color: "var(--muted)" }}>{sel.priceL}</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingTop: "4px" }}>
              {summary.map((c) => (
                <span key={c} className="chip" style={{ background: "var(--card)" }}>{c}</span>
              ))}
            </div>
          </div>
          <div style={{ border: "1px solid var(--border)", borderRadius: "18px", padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <span style={{ fontSize: "14px", fontWeight: "700" }}>{t.nextTitle}</span>
            {/* TODO(betacode): confirm these steps match the real proposal process (IMPLEMENTATION.md §10.4). */}
            {t.next.map((n, i) => (
              <div key={n} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span className="dot" style={{ width: "24px", height: "24px", background: "var(--surface)", color: "#EB5648", fontSize: "11px" }}>{i + 1}</span>
                <span style={{ fontSize: "14px", lineHeight: "1.45" }}>{n}</span>
              </div>
            ))}
          </div>
        </aside>
      )}
    </div>
  )
}
