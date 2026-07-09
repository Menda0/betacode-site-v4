'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger
        id="language-select"
        size="sm"
        aria-label={t('languageSelector')}
        className="w-[4.5rem] font-semibold uppercase"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {routing.locales.map((code) => (
          <SelectItem key={code} value={code} className="uppercase">
            {code.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
