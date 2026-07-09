import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export const metadata: Metadata = {
  title: 'Page not found — Betacode',
  robots: {
    index: false,
    follow: true,
  },
}

export default async function NotFound() {
  const t = await getTranslations('notFound')

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-semibold text-secondary-600 uppercase dark:text-secondary-400">
        404
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {t('title')}
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        {t('description')}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-md bg-secondary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-secondary-500"
        >
          {t('home')}
        </Link>
        <Link
          href="/insights"
          className="rounded-md border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
        >
          {t('insights')}
        </Link>
      </div>
    </main>
  )
}
