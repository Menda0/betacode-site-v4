import Link from 'next/link'
import { CALENDAR_URL, venturesCta } from '@/lib/ventures-content'

export function VenturesCTA() {
  return (
    <div className="bg-primary-600">
      <div className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
            {venturesCta.headline}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-primary-200">
            {venturesCta.description}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={CALENDAR_URL}
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-xs hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:shadow-none animate-bounce"
            >
              {venturesCta.buttonLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
