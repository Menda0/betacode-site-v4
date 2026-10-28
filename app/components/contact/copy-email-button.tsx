'use client'

import { useEffect, useRef, useState } from 'react'
import { CONTACT_EMAIL } from '@/lib/site-routes'

export function CopyEmailButton({ label, copiedLabel }: { label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = () => {
    try {
      void navigator.clipboard.writeText(CONTACT_EMAIL).catch(() => {})
    } catch {
      // Clipboard API unavailable (insecure context); the label still confirms like the prototype.
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1800)
  }

  return (
    <button type="button" className="copy" onClick={copy} aria-live="polite">
      {copied ? copiedLabel : label}
    </button>
  )
}
