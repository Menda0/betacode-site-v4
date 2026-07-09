'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { IconArrowRight, IconCalculator, IconPhone, IconRocket } from '@tabler/icons-react'
import { CONTACT_FORM_HREF } from '@/lib/site-routes'

export function BlogArticleSidebar() {
  const t = useTranslations('blog.sidebar')

  return (
    <aside className="flex flex-col gap-4" aria-label={t('ariaLabel')}>
      <div className="rounded-xl border border-purple-200/80 bg-white/95 p-5 shadow-sm backdrop-blur-sm dark:border-purple-900/40 dark:bg-gray-900/95">
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-900 ring-1 ring-purple-200 dark:bg-purple-900/60 dark:text-purple-100 dark:ring-purple-800/50">
          <IconRocket className="size-3.5" aria-hidden="true" />
          {t('ventures.badge')}
        </div>
        <h2 className="mt-3 text-base font-semibold text-gray-900 dark:text-white">
          {t('ventures.title')}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {t('ventures.description')}
        </p>
        <Link
          href="/betacode-ventures"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
        >
          {t('ventures.link')}
          <IconArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="rounded-xl border border-secondary-200/80 bg-white/95 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-gray-900/95">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-800 ring-1 ring-primary-200 dark:bg-primary-900/40 dark:text-primary-200 dark:ring-primary-800/50">
          <IconCalculator className="size-3.5" aria-hidden="true" />
          {t('calculator.badge')}
        </div>
        <h2 className="mt-3 text-base font-semibold text-gray-900 dark:text-white">
          {t('calculator.title')}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {t('calculator.description')}
        </p>
        <Link
          href="/pricing"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
        >
          {t('calculator.link')}
          <IconArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="rounded-xl border border-secondary-200/80 bg-white/95 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-gray-900/95">
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary-100 px-3 py-1 text-xs font-semibold text-secondary-800 ring-1 ring-secondary-200 dark:bg-secondary-900/40 dark:text-secondary-200 dark:ring-secondary-800/50">
          <IconPhone className="size-3.5" aria-hidden="true" />
          {t('bookCall.badge')}
        </div>
        <h2 className="mt-3 text-base font-semibold text-gray-900 dark:text-white">
          {t('bookCall.title')}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {t('bookCall.description')}
        </p>
        <Link
          href={CONTACT_FORM_HREF}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
        >
          {t('bookCall.link')}
          <IconArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  )
}
