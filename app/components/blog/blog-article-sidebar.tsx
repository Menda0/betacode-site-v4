import Link from 'next/link'
import { IconArrowRight, IconCalculator, IconPhone, IconRocket } from '@tabler/icons-react'
import { CALENDAR_URL } from '@/lib/ventures-content'

export function BlogArticleSidebar() {
  return (
    <aside className="flex flex-col gap-4" aria-label="Explore Betacode services">
      <div className="rounded-xl border border-purple-200/80 bg-white/95 p-5 shadow-sm backdrop-blur-sm dark:border-purple-900/40 dark:bg-gray-900/95">
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-900 ring-1 ring-purple-200 dark:bg-purple-900/60 dark:text-purple-100 dark:ring-purple-800/50">
          <IconRocket className="size-3.5" aria-hidden="true" />
          Betacode Ventures
        </div>
        <h2 className="mt-3 text-base font-semibold text-gray-900 dark:text-white">
          Need a technical co-founder?
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          We partner with founders to build MVPs in ~3 months — equity-based, no dev fees upfront.
        </p>
        <Link
          href="/betacode-ventures"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Explore the program
          <IconArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="rounded-xl border border-secondary-200/80 bg-white/95 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-gray-900/95">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-800 ring-1 ring-primary-200 dark:bg-primary-900/40 dark:text-primary-200 dark:ring-primary-800/50">
          <IconCalculator className="size-3.5" aria-hidden="true" />
          Price calculator
        </div>
        <h2 className="mt-3 text-base font-semibold text-gray-900 dark:text-white">
          Get a price estimate
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Answer a few questions and we&apos;ll suggest the right services and price ranges for your project.
        </p>
        <Link
          href="/pricing"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Start the calculator
          <IconArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="rounded-xl border border-secondary-200/80 bg-white/95 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-gray-900/95">
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary-100 px-3 py-1 text-xs font-semibold text-secondary-800 ring-1 ring-secondary-200 dark:bg-secondary-900/40 dark:text-secondary-200 dark:ring-secondary-800/50">
          <IconPhone className="size-3.5" aria-hidden="true" />
          Book a call
        </div>
        <h2 className="mt-3 text-base font-semibold text-gray-900 dark:text-white">
          Let&apos;s talk about your project
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Schedule a free call to discuss your goals, timeline, and how we can help.
        </p>
        <Link
          href={CALENDAR_URL}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Book a call
          <IconArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  )
}
