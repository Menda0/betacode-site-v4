'use client'

import { useMessages } from 'next-intl'
import type { MessageNamespace } from '@/i18n/request'

export function useCopy<T>(ns: MessageNamespace): T {
  const messages = useMessages() as Record<string, unknown>
  return messages[ns] as T
}
