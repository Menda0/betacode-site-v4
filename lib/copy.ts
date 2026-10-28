import type { Locale } from '@/i18n/routing'
import { loadMessages, type MessageNamespace } from '@/i18n/request'
import type ptChrome from '@/messages/pt/chrome.json'

// Copy is stored as plain data and read raw: it contains literal braces such as
// "{ feito em Portugal }" that ICU message syntax would treat as arguments.

export type ChromeCopy = typeof ptChrome

export { fill } from './fill'

export async function getCopy<T>(locale: Locale, ns: MessageNamespace): Promise<T> {
  const messages = await loadMessages(locale)
  return messages[ns] as T
}
