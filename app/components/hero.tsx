'use client'

import { useTranslations } from 'next-intl'
import { HeroCarousel } from './hero-carousel'
import Image from 'next/image'
import { IconArrowBigDown } from '@tabler/icons-react'
import { Link } from '@/i18n/navigation'
import { CALENDAR_URL } from '@/lib/ventures-content'

export default function Example() {
  const tHero = useTranslations('hero')
  const t = useTranslations('common')

  return (
    <div className="bg-white dark:bg-gray-900">
      <main>
        <div className="relative isolate">
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-256 w-full mask-[radial-gradient(32rem_32rem_at_center,white,transparent)] stroke-gray-200 dark:stroke-white/10"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
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
            <rect fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" width="100%" height="100%" strokeWidth={0} />
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
              className="aspect-801/1036 w-200.25 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            />
          </div>
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pt-16 pb-32 sm:pt-20 lg:px-8 lg:pt-24">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <HeroCarousel />
                  <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none dark:text-gray-400">
                    {tHero('subheadline')}
                  </p>
                  <div className="mt-10 flex flex-col items-center gap-4 md:flex-row md:gap-6">
                    <a
                      href={CALENDAR_URL}
                      className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400 dark:focus-visible:outline-primary-500"
                    >
                      {t('bookCall')}
                    </a>
                    <Link
                      href="/pricing"
                      className="rounded-md border border-gray-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus-visible:outline-primary-500"
                    >
                      {t('getPriceEstimate')}
                    </Link>
                    <Link href="#services" className="text-sm/6 font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <span>{t('seeHowWeCanHelp')}</span>
                      <IconArrowBigDown className=" size-6 animate-bounce" />
                    </Link>
                  </div>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-0 xl:pt-80">
                    <div className="relative">
                      <Image src="/images/hero1.jpg" alt="Betacode" width={500} height={500}
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5" />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <Image src="/images/hero2.jpg" alt="Betacode" width={500} height={500}
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5" />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
                    </div>
                    <div className="relative">
                      <Image src="/images/hero3.jpg" alt="Betacode" width={500} height={500}
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5" />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <Image src="/images/hero4.jpg" alt="Betacode" width={500} height={500}
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5" />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
                    </div>
                    <div className="relative">
                      <Image src="/images/hero5.jpg" alt="Betacode" width={500} height={500}
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5" />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
