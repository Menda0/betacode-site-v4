'use client'

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from 'react'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { fill } from '@/lib/fill'
import { useCopy } from '@/lib/use-copy'
import { useContactSubmit } from '@/lib/use-contact-submit'
import { isValidEmail, MESSAGE_MAX, MESSAGE_MIN, type ContactSubmission } from '@/lib/contact-validation'
import { SITE_ROUTES } from '@/lib/site-routes'
import type { ContactTopic } from '@/lib/types/contact'
import { HoneypotField, SubmitErrorMessage, useFormsCopy } from '@/app/components/shared/form-status'
import type ptContact from '@/messages/pt/contact.json'

type ContactCopy = typeof ptContact
type Fields = { name: string; email: string; phone: string; company: string; msg: string }

const EMPTY: Fields = { name: '', email: '', phone: '', company: '', msg: '' }
const TOPIC_IDS: readonly ContactTopic[] = ['project', 'legacy', 'team', 'ventures', 'other']

const noopSubscribe = () => () => {}

function readTopicParam(): ContactTopic | null {
  const q = new URLSearchParams(window.location.search).get('topic')
  return TOPIC_IDS.includes(q as ContactTopic) ? (q as ContactTopic) : null
}

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

const dot = (background: string) => <span style={{ width: 10, height: 10, borderRadius: '50%', background }}></span>

export function ContactFormCard() {
  const t = useCopy<ContactCopy>('contact')
  const forms = useFormsCopy()
  const locale = useLocale() as Locale
  const { submit, error, sending } = useContactSubmit()

  const urlTopic = useSyncExternalStore(noopSubscribe, readTopicParam, () => null)
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false
  )

  const [picked, setPicked] = useState<ContactTopic | null>(null)
  const [f, setF] = useState<Fields>(EMPTY)
  const [hp, setHp] = useState('')
  const [tried, setTried] = useState(false)
  const [sent, setSent] = useState(false)
  const [tick, setTick] = useState(0)

  const okHeading = useRef<HTMLHeadingElement>(null)
  const nameInput = useRef<HTMLInputElement>(null)
  const emailInput = useRef<HTMLInputElement>(null)
  const msgInput = useRef<HTMLTextAreaElement>(null)
  const focusNameAfterReset = useRef(false)

  useEffect(() => {
    if (reduced) return
    const iv = setInterval(() => setTick((n) => n + 1), 90)
    return () => clearInterval(iv)
  }, [reduced])

  useEffect(() => {
    if (sent) okHeading.current?.focus()
    else if (focusNameAfterReset.current) {
      focusNameAfterReset.current = false
      nameInput.current?.focus()
    }
  }, [sent])

  const topic = picked ?? urlTopic ?? 'project'
  const cur = t.topics.find((x) => x.id === topic) ?? t.topics[0]

  const bad = { name: !f.name.trim(), email: !isValidEmail(f.email), msg: f.msg.trim().length < MESSAGE_MIN }
  const er = { name: tried && bad.name, email: tried && bad.email, msg: tried && bad.msg }
  const set = (k: keyof Fields) => (e: { target: { value: string } }) => setF((prev) => ({ ...prev, [k]: e.target.value }))

  const full = sent ? '$ betacode send --ok' : '$ betacode contact --topic "' + cur.cmd + '"'
  const termLine = reduced ? full : full.slice(0, Math.min(full.length, tick % 90))
  const first = f.name.trim().split(' ')[0]

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return
    if (bad.name || bad.email || bad.msg) {
      setTried(true)
      ;(bad.name ? nameInput : bad.email ? emailInput : msgInput).current?.focus()
      return
    }
    const payload: ContactSubmission = {
      source: 'general',
      hp,
      topic,
      contact: {
        name: f.name.trim(),
        email: f.email.trim(),
        phone: f.phone.trim() || undefined,
        company: f.company.trim() || undefined,
        message: f.msg.trim(),
      },
      locale,
    }
    if (await submit(payload)) {
      setSent(true)
      setTick(0)
    }
  }

  const reset = () => {
    focusNameAfterReset.current = true
    setSent(false)
    setTried(false)
    setF(EMPTY)
    setHp('')
  }

  return (
    <div id="contact-form" className="contact-form" style={{ flex: '1 1 520px', minWidth: 0, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 28, boxShadow: '0 30px 70px rgba(27,28,81,.10)', overflow: 'hidden' }}>
      <div className="termbar" style={{ background: '#1B1C51', color: '#fff', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span aria-hidden="true" style={{ display: 'flex', gap: 6, flex: 'none' }}>{dot('#EB5648')}{dot('#FFC24B')}{dot('#3DDC97')}</span>
        <span className="mono termbar-cmd" style={{ fontSize: 13, color: '#C9CAE6' }}>{termLine}<span className="caret" aria-hidden="true"></span></span>
      </div>

      {!sent && (
        <form onSubmit={onSubmit} noValidate style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <h2 className="disp" style={{ margin: 0, fontSize: 28, lineHeight: 1.15, fontWeight: 800, letterSpacing: '-0.02em' }}>{t.formTitle}</h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--muted)' }}>{t.formSub}</p>
          </div>

          <fieldset style={{ border: 0, margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <legend className="lbl" style={{ padding: 0, marginBottom: 10 }}>{t.topicLabel}</legend>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {/* TODO(betacode): confirm the "Reforçar a equipa" topic (id 'team') should exist. */}
              {t.topics.map((tp) => (
                <button key={tp.id} type="button" className="topic" aria-pressed={tp.id === topic} onClick={() => setPicked(tp.id as ContactTopic)}>
                  <span className="ic" aria-hidden="true">{tp.ic}</span>{tp.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <div className="field" style={{ flex: '1 1 220px' }}>
              <label htmlFor="c-name">{t.name}</label>
              <input ref={nameInput} id="c-name" className="inp" autoComplete="name" maxLength={200} value={f.name} onChange={set('name')} placeholder={t.namePh} aria-invalid={er.name} aria-describedby={er.name ? 'c-name-err' : undefined} />
              {er.name && <span id="c-name-err" className="err" role="alert">{t.errName}</span>}
            </div>
            <div className="field" style={{ flex: '1 1 220px' }}>
              <label htmlFor="c-email">{t.email}</label>
              <input ref={emailInput} id="c-email" className="inp" type="email" autoComplete="email" maxLength={320} value={f.email} onChange={set('email')} placeholder={t.emailPh} aria-invalid={er.email} aria-describedby={er.email ? 'c-email-err' : undefined} />
              {er.email && <span id="c-email-err" className="err" role="alert">{t.errEmail}</span>}
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <div className="field" style={{ flex: '1 1 220px' }}>
              <label htmlFor="c-phone">{t.phoneL}<span className="opt">{t.optional}</span></label>
              <input id="c-phone" className="inp" type="tel" autoComplete="tel" maxLength={50} value={f.phone} onChange={set('phone')} placeholder="+351 9XX XXX XXX" />
            </div>
            <div className="field" style={{ flex: '1 1 220px' }}>
              <label htmlFor="c-company">{t.company}<span className="opt">{t.optional}</span></label>
              <input id="c-company" className="inp" autoComplete="organization" maxLength={200} value={f.company} onChange={set('company')} placeholder={t.companyPh} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="c-msg">{t.msg}</label>
            <textarea ref={msgInput} id="c-msg" className="inp" maxLength={MESSAGE_MAX} onChange={set('msg')} value={f.msg} placeholder={cur.ph} aria-invalid={er.msg} aria-describedby={er.msg ? 'c-msg-err c-msg-count' : 'c-msg-count'}></textarea>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              {er.msg && <span id="c-msg-err" className="err" role="alert">{t.errMsg}</span>}
              <span id="c-msg-count" className="mono" style={{ fontSize: 12, color: 'var(--muted)', marginLeft: 'auto' }}>{f.msg.length + ' / ' + MESSAGE_MAX}</span>
            </div>
          </div>

          <HoneypotField value={hp} onChange={setHp} />
          <SubmitErrorMessage error={error} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', paddingTop: 4 }}>
            {/* TODO(betacode): link this sentence to the privacy policy and confirm GDPR compliance. */}
            <span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--muted)', flex: '1 1 240px' }}>{t.privacy}</span>
            <button type="submit" className="btn-coral" disabled={sending} style={{ minWidth: 200 }}>
              {sending ? forms.sending : <>{t.send} <span aria-hidden="true">→</span></>}
            </button>
          </div>
        </form>
      )}

      {sent && (
        <div role="status" style={{ padding: '44px 32px', display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'flex-start' }}>
          <span className="pop" aria-hidden="true" style={{ width: 64, height: 64, borderRadius: 20, background: '#EB5648', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* TODO(betacode): add the promised response time (e.g. "até 1 dia útil") here and in the intro once confirmed. */}
            <h2 ref={okHeading} tabIndex={-1} className="disp" style={{ margin: 0, fontSize: 30, lineHeight: 1.15, fontWeight: 800, letterSpacing: '-0.02em' }}>{first ? fill(t.okTitleName, { first }) : t.okTitle}</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: 'var(--muted)' }}>{fill(t.okText, { email: f.email || t.okEmailFallback })}</p>
          </div>
          {/* TODO(betacode): confirm the real follow-up process behind these 3 steps. */}
          <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0, width: '100%' }}>
            {t.steps.map((st) => (
              <li key={st.n} style={{ display: 'flex', gap: 16, padding: '16px 0', borderTop: '1px solid var(--border)' }}>
                <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--kicker)', whiteSpace: 'nowrap', paddingTop: 2 }}>{st.n}</span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><span style={{ fontWeight: 600, fontSize: 15 }}>{st.h}</span><span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--muted)' }}>{st.x}</span></span>
              </li>
            ))}
          </ol>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link className="btn-coral" href={SITE_ROUTES.insights}>{t.okRead} <span aria-hidden="true">→</span></Link>
            <button type="button" className="btn-line" onClick={reset} style={{ color: 'var(--text)' }}>{t.okAgain}</button>
          </div>
        </div>
      )}
    </div>
  )
}
