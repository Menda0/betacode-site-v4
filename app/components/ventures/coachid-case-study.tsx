import Link from 'next/link'
import { IconCircleCheck, IconExternalLink } from '@tabler/icons-react'
import { coachidCaseStudy } from '@/lib/ventures-content'
import { CoachidLogo } from '../coachid-logo'

export function CoachidCaseStudy() {
  return (
    <div id={coachidCaseStudy.id} className="relative isolate overflow-hidden bg-purple-50 py-24 sm:py-32 dark:bg-gray-950">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-purple-200/60 to-transparent dark:from-purple-900/30 dark:to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(ellipse_at_top_right,var(--color-purple-200),transparent)] opacity-60 dark:bg-[radial-gradient(ellipse_at_top_right,var(--color-purple-900),transparent)] dark:opacity-40"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-purple-100 sm:p-10 dark:bg-gray-900 dark:ring-purple-900/40">
          <p className="text-base/7 font-semibold text-purple-700 uppercase dark:text-purple-300">
            {coachidCaseStudy.tagline}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <CoachidLogo />
            <Link
              href={coachidCaseStudy.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-700 hover:text-purple-600 dark:text-purple-300 dark:hover:text-purple-200"
            >
              coachidapp.com
              <IconExternalLink className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            {coachidCaseStudy.headline}
          </h2>
          <p className="mt-4 max-w-3xl text-lg/8 text-gray-700 dark:text-gray-200">
            {coachidCaseStudy.description}
          </p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {coachidCaseStudy.highlights.map((item) => (
              <li
                key={item}
                className="rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-900 dark:bg-purple-900/60 dark:text-purple-100"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-16 grid grid-cols-1 gap-8 rounded-2xl bg-white p-8 ring-1 ring-purple-100 lg:max-w-none lg:grid-cols-2 dark:bg-gray-900 dark:ring-purple-900/40 sm:p-10">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">What we built</h3>
            <ul className="mt-4 space-y-3">
              {coachidCaseStudy.built.map((item) => (
                <li key={item} className="relative pl-9 text-base/7 text-gray-700 dark:text-gray-300">
                  <IconCircleCheck
                    aria-hidden="true"
                    className="absolute top-1 left-1 size-5 text-purple-600 dark:text-purple-400"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Results</h3>
            <ul className="mt-4 space-y-3">
              {coachidCaseStudy.results.map((item) => (
                <li key={item} className="relative pl-9 text-base/7 text-gray-700 dark:text-gray-300">
                  <IconCircleCheck
                    aria-hidden="true"
                    className="absolute top-1 left-1 size-5 text-green-600 dark:text-green-400"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
