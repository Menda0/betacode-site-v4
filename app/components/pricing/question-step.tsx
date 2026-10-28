'use client'

import type { Ref } from 'react'
import type { IconId, QuestionDef } from '@/lib/pricing/rules'
import type { PricingCopy } from '@/lib/pricing/services'

type OptionCopy = { label: string; desc: string }

export function questionCopy(copy: PricingCopy, q: QuestionDef) {
  const c = copy.questions[q.key]
  return { ...c, opts: c.opts as Record<string, OptionCopy> }
}

const svg = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' } as const

function OptionIcon({ id }: { id: IconId }) {
  switch (id) {
    case 'rocket':
      return <svg {...svg} strokeWidth="2"><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 15l-3-3c2-6 7-9 14-9 0 7-3 12-9 14l-2-2zM15 9h.01"></path></svg>
    case 'building':
      return <svg {...svg} strokeWidth="2"><rect x="4" y="3" width="16" height="18" rx="2"></rect><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"></path></svg>
    case 'yes':
      return <svg {...svg} strokeWidth="2.2"><path d="M5 12l5 5L20 7"></path></svg>
    case 'no':
      return <svg {...svg} strokeWidth="2.2"><path d="M6 6l12 12M18 6L6 18"></path></svg>
    case 'box':
      return <svg {...svg} strokeWidth="2"><path d="M21 8l-9-5-9 5v8l9 5 9-5V8z"></path><path d="M3 8l9 5 9-5M12 13v8"></path></svg>
    case 'users':
      return <svg {...svg} strokeWidth="2"><circle cx="9" cy="8" r="3.5"></circle><path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5M16 4.6a3.5 3.5 0 0 1 0 6.8M18 13.8c2 .8 3.5 3 3.5 6.2"></path></svg>
    case 'plus':
      return <svg {...svg} strokeWidth="2"><circle cx="10" cy="8" r="4"></circle><path d="M3 21c0-3.9 3.1-7 7-7 1.5 0 2.9.5 4 1.3M19 14v6M16 17h6"></path></svg>
    case 'refresh':
      return <svg {...svg} strokeWidth="2"><path d="M20 11a8 8 0 0 0-14.9-3.5M4 4v4h4M4 13a8 8 0 0 0 14.9 3.5M20 20v-4h-4"></path></svg>
    case 'wrench':
      return <svg {...svg} strokeWidth="2"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5z"></path></svg>
    case 'compass':
      return <svg {...svg} strokeWidth="2"><circle cx="12" cy="12" r="9"></circle><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z"></path></svg>
  }
}

type Props = {
  question: QuestionDef
  copy: PricingCopy
  value: string | null
  onPick: (value: string) => void
  headingRef: Ref<HTMLHeadingElement>
}

export function QuestionStep({ question, copy, value, onPick, headingRef }: Props) {
  const q = questionCopy(copy, question)
  return (
    <div className="wz wz-q" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <h2 ref={headingRef} tabIndex={-1} className="disp wz-h" style={{ margin: "0", fontSize: "30px", lineHeight: "1.15", fontWeight: "800", letterSpacing: "-0.02em" }}>{q.title}</h2>
        <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.55", color: "var(--muted)" }}>{q.why}</p>
      </div>
      <div role="radiogroup" aria-label={q.title} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {question.opts.map((o) => {
          const on = value === o.v
          const oc = q.opts[o.v]
          return (
            <button
              key={o.v}
              type="button"
              className="opt"
              role="radio"
              aria-checked={on}
              onClick={() => onPick(o.v)}
              style={o.wide ? { borderStyle: "dashed", marginTop: "4px" } : undefined}
            >
              <span className="opt-ico" aria-hidden="true">
                <OptionIcon id={o.i} />
              </span>
              <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "4px" }}>
                <span className="opt-label" style={{ fontWeight: "700", fontSize: "16px" }}>{oc.label}</span>
                <span className="opt-desc" style={{ fontSize: "14px", lineHeight: "1.5", color: "var(--muted)" }}>{oc.desc}</span>
              </span>
              <svg className="chev" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"></path></svg>
            </button>
          )
        })}
      </div>
    </div>
  )
}
