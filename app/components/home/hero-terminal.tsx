'use client'

import { useEffect, useState } from 'react'

/** Each line is `[kind, text]`; kind is 'c' (command), 'k' (code), 'o' (output) or 'ok' (success). */
export type TermSession = { title: string; lines: string[][] }

type Anim = {
  s: number
  l: number
  c: number
  done: string[][]
  hold?: boolean
  still?: boolean
}

type LineStyle = { p: string; pc: string; color: string }

function lineStyle(kind: string): LineStyle {
  if (kind === 'c') return { p: '$ ', pc: '#FF8A7D', color: '#F2F2FA' }
  if (kind === 'k') return { p: '› ', pc: '#8F90B8', color: '#C9D4FF' }
  if (kind === 'ok') return { p: '', pc: '#7EE2A8', color: '#7EE2A8' }
  return { p: '', pc: '#A9AAD0', color: '#A9AAD0' }
}

export function HeroTerminal({ sessions }: { sessions: TermSession[] }) {
  const [A, setAnim] = useState<Anim>({ s: 0, l: 0, c: 0, done: [] })

  useEffect(() => {
    let reduce = false
    try {
      reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {}

    let timer: ReturnType<typeof setTimeout>
    if (reduce) {
      const S = sessions[0]
      timer = setTimeout(() => setAnim({ s: 0, l: S.lines.length, c: 0, done: S.lines.slice(), still: true }), 0)
      return () => clearTimeout(timer)
    }

    let cur: Anim = { s: 0, l: 0, c: 0, done: [] }
    const step = () => {
      const S = sessions[cur.s % sessions.length]
      let wait = 40
      if (cur.l >= S.lines.length) {
        if (cur.hold) {
          cur = { s: (cur.s + 1) % sessions.length, l: 0, c: 0, done: [] }
          wait = 500
        } else {
          cur = { ...cur, hold: true }
          wait = 2600
        }
      } else {
        const ln = S.lines[cur.l]
        if (ln[0] === 'o' || ln[0] === 'ok') {
          cur = { ...cur, done: [...cur.done, ln], l: cur.l + 1 }
          wait = 260
        } else if (cur.c < ln[1].length) {
          cur = { ...cur, c: cur.c + 1 }
          wait = 22 + Math.random() * 70
          if (ln[1][cur.c - 1] === ' ' && Math.random() < 0.15) wait += 180
        } else {
          cur = { ...cur, done: [...cur.done, ln], l: cur.l + 1, c: 0 }
          wait = ln[0] === 'k' ? 200 : 520
        }
      }
      setAnim(cur)
      timer = setTimeout(step, wait)
    }
    timer = setTimeout(step, 600)
    return () => clearTimeout(timer)
  }, [sessions])

  const S = sessions[A.s % sessions.length]
  const termLines = A.done.map((ln) => ({ ...lineStyle(ln[0]), t: ln[1] }))
  let typing: LineStyle & { t: string } = { p: '$ ', pc: '#FF8A7D', color: '#F2F2FA', t: '' }
  if (!A.still && A.l < S.lines.length) {
    const ln = S.lines[A.l]
    if (ln[0] === 'c' || ln[0] === 'k') typing = { ...lineStyle(ln[0]), t: ln[1].slice(0, A.c) }
  }

  return (
    <div className="mono" aria-hidden="true" style={{ width: '100%', maxWidth: '500px', background: 'var(--term)', color: '#E6E6F4', borderRadius: '20px', padding: '22px 26px 26px', boxShadow: '0 30px 70px rgba(0,0,0,0.28)', fontSize: '14px', lineHeight: '1.85', boxSizing: 'border-box', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EB5648' }}></span>
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4A4B7A' }}></span>
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4A4B7A' }}></span>
        <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#8F90B8' }}>{S.title}</span>
      </div>
      <div style={{ height: '280px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {termLines.map((ln, i) => (
          <div key={i} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: ln.color }}>
            <span style={{ color: ln.pc }}>{ln.p}</span>
            {ln.t}
          </div>
        ))}
        <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: typing.color }}>
          <span style={{ color: typing.pc }}>{typing.p}</span>
          {typing.t}
          <span className="cursor">▍</span>
        </div>
      </div>
    </div>
  )
}
