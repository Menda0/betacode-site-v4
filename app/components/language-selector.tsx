'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'

export function LanguageSelector() {
  const t = useTranslations('nav')
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  function handleChange(nextLocale: string) {
    if (nextLocale === locale) return
    router.replace(pathname, { locale: nextLocale as Locale })
  }

  return (
    <div className="relative">
      <label htmlFor="language-select" className="sr-only">
        {t('languageSelector')}
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={(event) => handleChange(event.target.value)}
        className="rounded-md border border-gray-300 bg-white py-1.5 pl-2 pr-7 text-sm font-semibold uppercase text-gray-900 shadow-xs focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      >
        {routing.locales.map((code) => (
          <option key={code} value={code}>
            {code.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  )
}
