'use client'

import { useEffect, useState } from 'react'
import type { TocEntry } from '@/lib/insights/mdx'

/** Slightly more than the headings' `scroll-margin-top` (90px), so a clicked entry becomes active. */
const ACTIVE_OFFSET = 100

export function ArticleToc({ label, entries }: { label: string; entries: TocEntry[] }) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null)
    if (headings.length === 0) return

    let frame = 0
    const update = () => {
      frame = 0
      const doc = document.documentElement
      const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 2
      let current: string | null = null
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= Math.max(ACTIVE_OFFSET, window.innerHeight * 0.35)) current = heading.id
      }
      if (atBottom && current) current = headings[headings.length - 1].id
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [entries])

  return (
    <nav className="toc" aria-label={label} style={{ display: 'flex', flexDirection: 'column' }}>
      <span className="mono" style={{ fontSize: 12, color: 'var(--kicker)', paddingBottom: 6 }}>
        {label}
      </span>
      {entries.map((entry) => (
        <a key={entry.id} href={`#${entry.id}`} aria-current={active === entry.id ? 'location' : undefined}>
          <span className="mono" style={{ color: '#EB5648', fontSize: 12, paddingTop: 2 }}>
            {entry.n}
          </span>
          {entry.text}
        </a>
      ))}
    </nav>
  )
}
