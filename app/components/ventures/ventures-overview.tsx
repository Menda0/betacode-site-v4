'use client'

import { useTranslations } from 'next-intl'

export function VenturesOverview() {
  const t = useTranslations('ventures.overview')
  const steps = t.raw('steps') as { title: string; description: string }[]

  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-purple-600 uppercase dark:text-purple-400">
            {t('title')}
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
            {t('subtitle')}
          </p>
          <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
            {t('description')}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-lg font-semibold text-gray-900 dark:text-white">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    {index + 1}
                  </span>
                  {step.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base/7 text-gray-600 dark:text-gray-400">
                  <p>{step.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
