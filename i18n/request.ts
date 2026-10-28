import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing, type Locale } from './routing'

export const MESSAGE_NAMESPACES = [
  'chrome',
  'metadata',
  'home',
  'pricing',
  'ventures',
  'insights',
  'article',
  'contact',
  'forms',
  'notFound',
] as const

export type MessageNamespace = (typeof MESSAGE_NAMESPACES)[number]

export async function loadMessages(locale: Locale) {
  const entries = await Promise.all(
    MESSAGE_NAMESPACES.map(async (ns) => [
      ns,
      (await import(`../messages/${locale}/${ns}.json`)).default,
    ])
  )
  return Object.fromEntries(entries) as Record<MessageNamespace, unknown>
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  return {
    locale,
    messages: await loadMessages(locale),
  }
})
