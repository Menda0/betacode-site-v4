import Link from 'next/link'
import { IconArrowBigDown } from '@tabler/icons-react'
import { CALENDAR_URL, venturesHero } from '@/lib/ventures-content'

export function VenturesHero() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="relative isolate">
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-256 w-full mask-[radial-gradient(32rem_32rem_at_center,white,transparent)] stroke-gray-200 dark:stroke-white/10"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="ventures-grid"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50 dark:fill-gray-800">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#ventures-grid)" width="100%" height="100%" strokeWidth={0} />
        </svg>
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48 animate-pulse"
        >
          <div
            style={{
              clipPath:
                'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
            }}
            className="aspect-801/1036 w-200.25 bg-linear-to-tr from-[#9d4edd] to-[#c77dff] opacity-30"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 sm:pt-20 lg:px-8 lg:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base/7 font-semibold text-purple-600 uppercase dark:text-purple-400">
              {venturesHero.eyebrow}
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl dark:text-white">
              {venturesHero.headline}
            </h1>
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-400">
              {venturesHero.subheadline}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href={CALENDAR_URL}
                className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400 dark:focus-visible:outline-primary-500"
              >
                {venturesHero.primaryCta}
              </Link>
              <Link
                href="#coachid"
                className="text-sm/6 font-semibold text-gray-900 dark:text-white flex items-center gap-2"
              >
                <span>{venturesHero.secondaryCta}</span>
                <IconArrowBigDown className="size-6 animate-bounce" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
