'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

export function Clients() {
  const t = useTranslations('clients')

  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg/8 font-semibold text-gray-900 dark:text-white">
          {t('title')}
        </h2>
        <div className="mx-auto mt-10 items-center gap-x-8 gap-y-10  sm:gap-x-10 lg:mx-0 lg:max-w-none grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 items-center justify-center">
          <div>
            <Image
              alt="Claranet"
              src="/images/clients/claranet.png"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:hidden filter brightness-0"
            />
            <Image
              alt="Claranet"
              src="/images/clients/claranet.png"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain not-dark:hidden lg:col-span-1 brightness-0 invert filter brightness-0"
            />
          </div>

          <div>
            <Image
              alt="Endless Loop"
              src="/images/clients/endlessloop.svg"
              width={158}
              height={48}
              className="col-span-2  w-full object-contain lg:col-span-1 dark:hidden filter brightness-0"
            />
            <Image
              alt="Endless Loop"
              src="/images/clients/endlessloop.svg"
              width={158}
              height={48}
              className="col-span-2  w-full object-contain not-dark:hidden lg:col-span-1 brightness-0 invert filter brightness-0"
            />
          </div>
          <div>
            <Image
              alt="Evolve"
              src="/images/clients/evolve.png"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:hidden filter brightness-0"
            />
            <Image
              alt="Evolve"
              src="/images/clients/evolve.png"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain not-dark:hidden lg:col-span-1 brightness-0 invert filter brightness-0"
            />
          </div>
          <div>
            <Image
              alt="Link"
              src="/images/clients/link.png"
              width={158}
              height={48}
              className="col-span-2 max-h-10 w-full object-contain sm:col-start-2 lg:col-span-1 dark:hidden filter brightness-0"
            />
            <Image
              alt="Link"
              src="/images/clients/link.png"
              width={158}
              height={48}
              className="col-span-2 max-h-10 w-full object-contain not-dark:hidden sm:col-start-2 lg:col-span-1 brightness-0 invert filter brightness-0"
            />
          </div>
          <div>
            <Image
              alt="Moongy"
              src="/images/clients/moongy.png"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1 dark:hidden filter brightness-0"
            />
            <Image
              alt="Moongy"
              src="/images/clients/moongy.png"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain not-dark:hidden sm:col-start-2 lg:col-span-1 brightness-0 invert filter brightness-0"
            />
          </div>
          <div>
            <Image
              alt="NobleProg"
              src="/images/clients/nobleprog.webp"
              width={158}
              height={48}
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1 dark:hidden filter brightness-0"
            />
            <Image
              alt="NobleProg"
              src="/images/clients/nobleprog.webp"
              width={158}
              height={48}
              className="col-span-2 col-start-2 max-h-12 w-full object-contain not-dark:hidden sm:col-start-auto lg:col-span-1 brightness-0 invert filter brightness-0"
            />
          </div>
          <div>
            <Image
              alt="Kwan"
              src="/images/clients/kwan.webp"
              width={158}
              height={48}
              className="col-span-2 col-start-2 max-h-8 w-full object-contain sm:col-start-auto lg:col-span-1 dark:hidden grayscale filter brightness-0"
            />
            <Image
              alt="Kwan"
              src="/images/clients/kwan.webp"
              width={158}
              height={48}
              className="col-span-2 col-start-2 max-h-8 w-full object-contain not-dark:hidden sm:col-start-auto lg:col-span-1 brightness-0 invert filter brightness-0"
            />
          </div>
          <div>
            <Image
              alt="UNICEF"
              src="/images/clients/unicef.png"
              width={158}
              height={48}
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1 dark:hidden filter brightness-0"
            />
            <Image
              alt="UNICEF"
              src="/images/clients/unicef.png"
              width={158}
              height={48}
              className="col-span-2 col-start-2 max-h-12 w-full object-contain not-dark:hidden sm:col-start-auto lg:col-span-1 brightness-0 invert filter brightness-0"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
