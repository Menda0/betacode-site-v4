'use client'

import { useCallback, useState } from 'react'
import { sendGAEvent } from '@next/third-parties/google'
import type { ContactSubmission } from '@/lib/contact-validation'

export type SubmitStatus = 'idle' | 'sending' | 'error'
export type SubmitError = 'rate' | 'generic' | null

/** Posts a form to /api/contacts and tracks a conversion event on success. */
export function useContactSubmit() {
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [error, setError] = useState<SubmitError>(null)

  const submit = useCallback(async (payload: ContactSubmission): Promise<boolean> => {
    setStatus('sending')
    setError(null)
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        setError(res.status === 429 ? 'rate' : 'generic')
        setStatus('error')
        return false
      }
      trackEvent('form_submit', { form: payload.source, locale: payload.locale })
      setStatus('idle')
      return true
    } catch {
      setError('generic')
      setStatus('error')
      return false
    }
  }, [])

  return { submit, status, error, sending: status === 'sending' }
}

export function trackEvent(name: string, params: Record<string, string | number>) {
  try {
    sendGAEvent('event', name, params)
  } catch {
    // Analytics must never break the UI.
  }
}
