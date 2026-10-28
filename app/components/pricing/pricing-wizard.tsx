'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { fill } from '@/lib/copy'
import {
  OUTCOME_IDS,
  getOutcomes,
  getQuestions,
  type QuestionDef,
  type ServiceId,
  type WizardAnswers,
} from '@/lib/pricing/rules'
import { buildService, type PricingCopy, type TeamConfig } from '@/lib/pricing/services'
import { SITE_ROUTES } from '@/lib/site-routes'
import { trackEvent } from '@/lib/use-contact-submit'
import { useCopy } from '@/lib/use-copy'
import { EstimatePanel } from './estimate-panel'
import { ProposalStep, type ProposalErrors, type ProposalForm } from './proposal-step'
import { QuestionStep, questionCopy } from './question-step'

const TOTAL = 5
const ADVANCE_MS = 260
const NO_ANSWERS: WizardAnswers = { biz: null, q2: null, goal: null }
const EMPTY_FORM: ProposalForm = { name: '', email: '', site: '', desc: '', when: null }

/** Answers kept when returning to question `step`: that answer and every later one are cleared. */
function answersBefore(a: WizardAnswers, step: number): WizardAnswers {
  if (step <= 0) return NO_ANSWERS
  if (step === 1) return { biz: a.biz, q2: null, goal: null }
  if (step === 2) return { ...a, goal: null }
  return a
}

export function PricingWizard() {
  const copy = useCopy<PricingCopy>('pricing')
  const locale = useLocale() as Locale
  const ui = copy.ui

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<WizardAnswers>(NO_ANSWERS)
  const [pick, setPick] = useState<ServiceId | null>(null)
  const [cfg, setCfg] = useState<TeamConfig>('small')
  const [form, setForm] = useState<ProposalForm>(EMPTY_FORM)
  const [err, setErr] = useState<ProposalErrors>({})
  const [hp, setHp] = useState('')
  const [sent, setSent] = useState(false)

  const advance = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const stepRef = useRef(0)
  const depthRef = useRef(0)
  const answersRef = useRef(answers)
  const focusKey = useRef(`${step}:${sent}`)
  answersRef.current = answers

  const applyRef = useRef<(target: number, sentFlag?: boolean) => void>(() => {})
  applyRef.current = (target: number, sentFlag = false) => {
    clearTimeout(advance.current)
    const current = answersRef.current
    let next = target
    if (next >= 3 && !(current.biz && current.q2 && current.goal)) {
      next = !current.biz ? 0 : !current.q2 ? 1 : 2
    }
    next = Math.max(0, Math.min(TOTAL - 1, next))
    if (next < 3) {
      setAnswers((prev) => answersBefore(prev, next))
      setPick(null)
    }
    setStep(next)
    stepRef.current = next
    setSent(sentFlag && next >= 4)
  }

  const pushWizard = (target: number, sentFlag = false) => {
    const depth = depthRef.current + 1
    depthRef.current = depth
    window.history.pushState({ ...(window.history.state ?? {}), wizardStep: target, wizardDepth: depth, wizardSent: sentFlag }, '')
  }

  /** Forward pushes a history entry. Back uses the browser stack so the phone back button matches the wizard. */
  const go = (target: number) => {
    clearTimeout(advance.current)
    const from = stepRef.current
    if (target === from && !sent) return
    if (target < from || sent) {
      const delta = target - depthRef.current
      if (delta >= 0) return
      stepRef.current = target
      depthRef.current = target
      window.history.go(delta)
      return
    }
    pushWizard(target)
    applyRef.current(target, false)
  }

  const markSent = () => {
    pushWizard(stepRef.current, true)
    setSent(true)
  }

  useEffect(() => () => clearTimeout(advance.current), [])

  useEffect(() => {
    window.history.replaceState({ ...(window.history.state ?? {}), wizardStep: 0, wizardDepth: 0, wizardSent: false }, '')
    const onPop = (event: PopStateEvent) => {
      const state = event.state as { wizardStep?: unknown; wizardDepth?: unknown; wizardSent?: unknown } | null
      if (!state || typeof state.wizardStep !== 'number') return
      if (typeof state.wizardDepth === 'number') depthRef.current = state.wizardDepth
      applyRef.current(state.wizardStep, state.wizardSent === true)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    const key = `${step}:${sent}`
    if (focusKey.current === key) return
    focusKey.current = key
    const narrow = window.matchMedia('(max-width: 760px)').matches
    if (!narrow) {
      headingRef.current?.focus()
      return
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    headingRef.current?.focus({ preventScroll: true })
    cardRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }, [step, sent])

  const { biz, q2, goal } = answers
  const questions = getQuestions(biz)
  const [Q1, Q2, Q3] = questions
  const done = !!(biz && q2 && goal)
  const reach = !biz ? 0 : !q2 ? 1 : !goal ? 2 : 4
  const list = getOutcomes(answers)
  const pickId = pick && list.includes(pick) ? pick : list[0]
  const sel = buildService(pickId ?? 'E', { biz, q2, cfg }, copy)
  const isResult = step === 3 && done
  const isContact = step === 4 && done
  const recommended = list[0]

  useEffect(() => {
    if (isResult && recommended) trackEvent('wizard_result', { outcome: OUTCOME_IDS[recommended] })
  }, [isResult, recommended])

  const answer = (q: QuestionDef, v: string, i: number) => {
    clearTimeout(advance.current)
    if (q.id === 'biz') {
      if (biz !== v) {
        setAnswers({ biz: v as WizardAnswers['biz'], q2: null, goal: null })
        setPick(null)
      }
    } else {
      setAnswers((a) => ({ ...a, [q.id]: v }))
      setPick(null)
    }
    setSent(false)
    trackEvent('wizard_step', { step: i + 1, answer: v })
    advance.current = setTimeout(() => go(i + 1), ADVANCE_MS)
  }

  const reset = () => {
    clearTimeout(advance.current)
    setAnswers(NO_ANSWERS)
    setPick(null)
    setCfg('small')
    setForm(EMPTY_FORM)
    setErr({})
    setHp('')
    setSent(false)
    setStep(0)
    stepRef.current = 0
    const depth = depthRef.current
    depthRef.current = 0
    if (depth > 0) window.history.go(-depth)
  }

  const valOf = (q: QuestionDef) => {
    const v = answers[q.id]
    return v ? questionCopy(copy, q).opts[v]?.label ?? '' : ''
  }

  const railDefs = [
    { label: copy.questions[Q1.key].rail, value: valOf(Q1) },
    { label: biz ? copy.questions[Q2.key].rail : ui.railContext, value: biz ? valOf(Q2) : '' },
    { label: copy.questions[Q3.key].rail, value: biz ? valOf(Q3) : '' },
    { label: ui.railEstimate, value: '' },
    { label: ui.railProposal, value: '' },
  ]

  const startup = biz === 'startup'
  const yes = q2 === 'yes'
  const summary = done
    ? [valOf(Q1), startup ? (yes ? copy.summary.funded : copy.summary.notFunded) : (yes ? copy.summary.hasTeam : copy.summary.noTeam), valOf(Q3)]
    : []
  const answerChips = [valOf(Q1), biz ? valOf(Q2) : '', biz ? valOf(Q3) : ''].filter((x) => !!x)

  const tabs = list.map((id) => {
    const s = buildService(id, { biz, q2, cfg }, copy)
    return { id, name: s.name, price: s.price }
  })

  const request = {
    selectedService: pickId ? OUTCOME_IDS[pickId] : undefined,
    outcomes: list.map((id) => OUTCOME_IDS[id]),
    answers: {
      biz: biz ?? '',
      [Q2.key]: q2 ?? '',
      goal: goal ?? '',
      ...(pickId === 'E' ? { teamSetup: cfg } : {}),
    },
    answerSummary: questions.map((q) => ({ questionId: q.key, label: copy.questions[q.key].title, value: valOf(q) })),
    priceSummary:
      `${sel.name}${pickId === 'E' ? ` (${cfg === 'base' ? copy.result.baseTeam : copy.result.small})` : ''}: ${sel.price} · ${sel.priceL}`,
  }

  const canBack = step > 0 && !sent
  const liveText = isResult ? `${list.length > 1 ? fill(copy.result.titleMany, { n: list.length }) : copy.result.titleOne} ${sel.name}: ${sel.price}` : ''
  const stepLabel = fill(ui.stepLabel, { n: step + 1, total: TOTAL })
  const curRail = railDefs[step]?.label ?? ''

  return (
    <section className="pr-wizard" aria-label={copy.intro.kicker} style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px 80px", display: "flex", flexDirection: "column", gap: "18px" }}>
      <p className="sr-only" aria-live="polite" aria-atomic="true">{liveText}</p>

      <div className="pr-progress">
        <span className="pr-progress-name">{curRail}</span>
        <div className="prog" role="progressbar" aria-label={`${curRail}. ${stepLabel}`} aria-valuemin={1} aria-valuemax={TOTAL} aria-valuenow={step + 1}>
          {railDefs.map((r, i) => (
            <span key={i} className={i < step ? 'pg-done' : i === step ? 'pg-cur' : undefined}></span>
          ))}
        </div>
      </div>

      {/* Stepper */}
      <nav className="pr-steps" aria-label={ui.railLabel} style={{ display: "flex", alignItems: "flex-start", padding: "0 4px" }}>
        {railDefs.map((r, i) => {
          const cur = i === step
          const ok = i <= reach && !cur
          const isDone = (i < 3 && !!r.value) || (i === 3 && step === 4) || (i === 4 && sent)
          const lineStyle: CSSProperties = i === 4 ? { display: "none" } : { background: i < Math.max(step, 0) ? "#EB5648" : "var(--border)" }
          const dotStyle: CSSProperties = cur
            ? { background: "#EB5648", color: "#fff" }
            : isDone
              ? { background: "var(--band)", color: "#fff" }
              : { border: "1.5px solid var(--border2)", color: "var(--muted)" }
          return (
            <button
              key={i}
              type="button"
              className="step"
              data-go={ok ? 'true' : 'false'}
              disabled={!ok && !cur}
              onClick={() => { if (ok) go(i) }}
              aria-current={cur ? 'step' : undefined}
              aria-label={r.label}
            >
              <span className="step-line" aria-hidden="true" style={lineStyle}></span>
              <span className="dot" aria-hidden="true" style={{ ...dotStyle, position: "relative" }}>{isDone && !cur ? '✓' : String(i + 1)}</span>
              <span className="hide-sm" style={{ fontSize: "13px", fontWeight: "600", color: i > reach && !cur ? "var(--muted)" : "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>{r.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Stage */}
      <div ref={cardRef} className="wz-pad" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "24px", padding: "36px 40px", boxSizing: "border-box", minHeight: "480px", display: "flex", flexDirection: "column", boxShadow: "0 20px 50px rgba(27,28,81,0.06)" }}>
        <div className="wz-top" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "22px", minHeight: "44px" }}>
          {canBack ? (
            <button type="button" className="btn-text" onClick={() => go(Math.max(0, step - 1))} style={{ marginLeft: "-6px" }}><span aria-hidden="true">←</span> {ui.back}</button>
          ) : (
            <span></span>
          )}
          <span className="mono" style={{ fontSize: "12px", color: "var(--muted)" }}>{stepLabel}</span>
        </div>

        {step < 3 && (
          <QuestionStep
            question={questions[step]}
            copy={copy}
            value={answers[questions[step].id]}
            onPick={(v) => answer(questions[step], v, step)}
            headingRef={headingRef}
          />
        )}

        {isResult && (
          <EstimatePanel
            copy={copy}
            tabs={tabs}
            sel={sel}
            isBest={pickId === list[0]}
            cfg={cfg}
            onPick={setPick}
            onCfg={setCfg}
            onContinue={() => go(4)}
            headingRef={headingRef}
          />
        )}

        {isContact && (
          <ProposalStep
            copy={copy}
            locale={locale}
            sel={sel}
            summary={summary}
            request={request}
            form={form}
            onForm={setForm}
            err={err}
            onErr={setErr}
            hp={hp}
            onHp={setHp}
            sent={sent}
            onSent={markSent}
            onReset={reset}
            headingRef={headingRef}
          />
        )}
      </div>

      {/* below card: answers + direct contact */}
      <div className="pr-below" style={{ display: "flex", flexWrap: "wrap", gap: "12px 20px", alignItems: "center", justifyContent: "space-between", padding: "0 4px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", minWidth: "0" }}>
          {answerChips.length > 0 && (
            <>
              <span style={{ fontSize: "13px", color: "var(--muted)" }}>{ui.yourAnswers}</span>
              {answerChips.map((a, i) => (
                <span key={i} className="chip" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>{a}</span>
              ))}
            </>
          )}
        </div>
        <span className="talk-desk" style={{ fontSize: "14px", color: "var(--muted)" }}>{ui.railHelp} <Link href={SITE_ROUTES.contact} style={{ fontWeight: "600", textUnderlineOffset: "4px" }}>{ui.railTalk}</Link></span>
        <Link className="talk-mob" href={SITE_ROUTES.contact}>{ui.railHelp} {ui.railTalk}</Link>
      </div>
    </section>
  )
}
