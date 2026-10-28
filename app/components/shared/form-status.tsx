'use client'

import type { SubmitError } from '@/lib/use-contact-submit'
import { useCopy } from '@/lib/use-copy'

type FormsCopy = { sending: string; errorGeneric: string; errorRateLimit: string; honeypotLabel: string }

export function useFormsCopy() {
  return useCopy<FormsCopy>('forms')
}

/** Off-screen field that only bots fill in. */
export function HoneypotField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const c = useFormsCopy()
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
      <label>
        {c.honeypotLabel}
        <input type="text" name="website_url" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  )
}

export function SubmitErrorMessage({ error }: { error: SubmitError }) {
  const c = useFormsCopy()
  if (!error) return null
  return (
    <p role="alert" style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: '#D8402F', fontWeight: 500 }}>
      {error === 'rate' ? c.errorRateLimit : c.errorGeneric}
    </p>
  )
}
