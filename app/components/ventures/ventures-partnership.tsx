'use client'

import { useTranslations } from 'next-intl'
import { IconCircleCheck, IconHeartHandshake } from '@tabler/icons-react'

function PartnershipList({
  title,
  subtitle,
  items,
  icon: Icon,
  iconClassName,
}: {
  title: string
  subtitle?: string
  items: string[]
  icon: typeof IconCircleCheck
  iconClassName: string
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-8 ring-1 ring-gray-200 sm:p-10 dark:bg-gray-900 dark:ring-gray-700">
      <div className="min-h-[5.5rem] lg:min-h-[6rem]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {subtitle && (
          <p className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">{subtitle}</p>
        )}
      </div>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="relative pl-9 text-base/7">
            <Icon
              aria-hidden="true"
              className={`absolute top-0.5 left-1 size-5 ${iconClassName}`}
            />
            <span className="font-medium text-gray-900 dark:text-white">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function VenturesPartnership() {
  const t = useTranslations('ventures.partnership')

  return (
    <div id="partnership" className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-950">
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
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2 lg:items-stretch lg:gap-10">
          <PartnershipList
            title={t('whatYouGet.title')}
            subtitle={t('whatYouGet.subtitle')}
            items={t.raw('whatYouGet.items') as string[]}
            icon={IconCircleCheck}
            iconClassName="text-purple-600 dark:text-purple-400"
          />
          <PartnershipList
            title={t('partnershipAsk.title')}
            subtitle={t('partnershipAsk.subtitle')}
            items={t.raw('partnershipAsk.items') as string[]}
            icon={IconHeartHandshake}
            iconClassName="text-indigo-600 dark:text-indigo-400"
          />
        </div>
      </div>
    </div>
  )
}
