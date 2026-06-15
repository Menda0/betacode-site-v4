'use client'

import { useTranslations } from 'next-intl'
import { IconArrowRight, IconRocket } from '@tabler/icons-react'
import { Link } from '@/i18n/navigation'

export function VenturesPromo() {
  const t = useTranslations('venturesPromo')

  return (
    <div className="relative isolate overflow-hidden bg-purple-50 py-16 sm:py-20 dark:bg-gray-950">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-purple-200/60 to-transparent dark:from-purple-900/30 dark:to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(ellipse_at_top_right,var(--color-purple-200),transparent)] opacity-60 dark:bg-[radial-gradient(ellipse_at_top_right,var(--color-purple-900),transparent)] dark:opacity-40"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1.5 text-sm font-semibold text-purple-900 ring-1 ring-purple-200 dark:bg-purple-900/60 dark:text-purple-100 dark:ring-purple-800/50">
              <IconRocket className="size-4" aria-hidden="true" />
              {t('badge')}
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              {t('title')}
            </h2>
            <p className="mt-4 text-lg/8 text-gray-700 dark:text-gray-200">
              {t('description')}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/betacode-ventures"
              className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-white dark:text-purple-900 dark:hover:bg-purple-50 dark:focus-visible:outline-white"
            >
              {t('explore')}
              <IconArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/betacode-ventures#coachid"
              className="text-sm font-semibold text-purple-700 hover:text-purple-600 dark:text-purple-300 dark:hover:text-purple-200"
            >
              {t('seeProject')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
