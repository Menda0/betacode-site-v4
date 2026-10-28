'use client'

import { useState, type FormEvent } from 'react'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { useCopy } from '@/lib/use-copy'
import { useContactSubmit } from '@/lib/use-contact-submit'
import { EMAIL_PATTERN, MESSAGE_MIN, WEBSITE_PATTERN } from '@/lib/contact-validation'
import { SITE_ROUTES } from '@/lib/site-routes'
import { HoneypotField, SubmitErrorMessage, useFormsCopy } from '@/app/components/shared/form-status'
import type { VenturesCopy } from './types'
import { fill } from '@/lib/fill'

type Form = { name: string; email: string; site: string; desc: string; stage: number | null }
type Errors = { name?: boolean; email?: boolean; site?: boolean; desc?: boolean }

const EMPTY: Form = { name: '', email: '', site: '', desc: '', stage: null }
const optionalStyle = { fontWeight: 400, color: 'var(--muted)' } as const

export function VenturesApplyForm() {
  const t = useCopy<VenturesCopy>('ventures')
  const forms = useFormsCopy()
  const locale = useLocale() as Locale
  const { submit, error, sending } = useContactSubmit()
  const [form, setForm] = useState<Form>(EMPTY)
  const [err, setErr] = useState<Errors>({})
  const [hp, setHp] = useState('')
  const [sent, setSent] = useState(false)

  const upd = (k: 'name' | 'email' | 'site' | 'desc') => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return
    const next: Errors = {
      name: !form.name.trim(),
      email: !EMAIL_PATTERN.test(form.email.trim()),
      site: !!form.site.trim() && !WEBSITE_PATTERN.test(form.site.trim()),
      desc: form.desc.trim().length < MESSAGE_MIN,
    }
    if (next.name || next.email || next.site || next.desc) {
      setErr(next)
      return
    }
    setErr({})
    const website = form.site.trim()
    const ok = await submit({
      source: 'betacode-ventures',
      hp,
      stage: form.stage === null ? undefined : t.stagesL[form.stage],
      contact: {
        name: form.name.trim(),
        email: form.email.trim(),
        website: website || undefined,
        message: form.desc.trim(),
      },
      locale,
    })
    if (ok) setSent(true)
  }

  if (sent) {
    const first = form.name.trim().split(' ')[0]
    return (
      <div role="status" style={{ display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'flex-start' }}>
        <div className="ok-wrap" aria-hidden="true">
          <span className="ok-disc">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path className="ok-path" d="M5 12.5l4.5 4.5L19 7.5"></path>
            </svg>
          </span>
        </div>
        <span className="mono" style={{ fontSize: '12px', color: 'var(--kicker)' }}>{t.sentKicker}</span>
        <h3 className="disp" style={{ margin: 0, fontSize: '32px', lineHeight: '1.1', fontWeight: 800 }}>
          {t.thanks + (first ? ', ' + first : '') + '!'}
        </h3>
        <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.6', color: 'var(--muted)' }}>
          {fill(t.sentText, { email: form.email.trim() })}
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link className="btn-coral" href={SITE_ROUTES.home}>{t.home}</Link>
          <Link className="btn-ghost" href={SITE_ROUTES.insights}>{t.readInsights}</Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', position: 'relative' }}>
      <HoneypotField value={hp} onChange={setHp} />
      <div className="field">
        <label htmlFor="v-name">{t.fName}</label>
        <input id="v-name" autoComplete="name" value={form.name} onChange={upd('name')} placeholder={t.phName} aria-invalid={err.name || undefined} aria-describedby={err.name ? 'v-name-err' : undefined} />
        {err.name && <span id="v-name-err" className="err" role="alert">{t.eName}</span>}
      </div>
      <div className="field">
        <label htmlFor="v-email">{t.fEmail}</label>
        <input id="v-email" type="email" autoComplete="email" value={form.email} onChange={upd('email')} placeholder={t.phEmail} aria-invalid={err.email || undefined} aria-describedby={err.email ? 'v-email-err' : undefined} />
        {err.email && <span id="v-email-err" className="err" role="alert">{t.eEmail}</span>}
      </div>
      <div className="field" style={{ gridColumn: '1 / -1' }}>
        <span id="stage-l" style={{ fontWeight: 600, fontSize: '14px' }}>
          {t.fStage} <span style={optionalStyle}>({t.optional})</span>
        </span>
        <div role="radiogroup" aria-labelledby="stage-l" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {t.stagesL.map((label, i) => {
            const on = form.stage === i
            return (
              <button
                key={label}
                type="button"
                className="pill"
                role="radio"
                aria-checked={on}
                onClick={() => setForm((f) => ({ ...f, stage: f.stage === i ? null : i }))}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>
      <div className="field" style={{ gridColumn: '1 / -1' }}>
        <label htmlFor="v-site">
          {t.fSite} <span style={optionalStyle}>({t.optional})</span>
        </label>
        <input id="v-site" type="url" value={form.site} onChange={upd('site')} placeholder="https://" aria-invalid={err.site || undefined} aria-describedby={err.site ? 'v-site-err' : undefined} />
        {err.site && <span id="v-site-err" className="err" role="alert">{t.eSite}</span>}
      </div>
      <div className="field" style={{ gridColumn: '1 / -1' }}>
        <label htmlFor="v-desc">{t.fDesc}</label>
        <textarea id="v-desc" rows={5} value={form.desc} onChange={upd('desc')} placeholder={t.phDesc} aria-invalid={err.desc || undefined} aria-describedby={err.desc ? 'v-desc-err' : undefined} />
        {err.desc && <span id="v-desc-err" className="err" role="alert">{t.eDesc}</span>}
      </div>
      {error && (
        <div style={{ gridColumn: '1 / -1' }}>
          <SubmitErrorMessage error={error} />
        </div>
      )}
      <div style={{ gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px', justifyContent: 'space-between' }}>
        {/* TODO(betacode): link this privacy note to the privacy policy and confirm GDPR compliance (IMPLEMENTATION.md §10.6). */}
        <span style={{ fontSize: '13px', color: 'var(--muted)', flex: '1 1 220px' }}>{t.privacy}</span>
        <button className="btn-coral" type="submit" disabled={sending} aria-busy={sending || undefined}>
          {sending ? forms.sending : <>{t.applyBtn} <span aria-hidden="true">→</span></>}
        </button>
      </div>
    </form>
  )
}
