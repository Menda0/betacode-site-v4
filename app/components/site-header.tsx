'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ThemeToggle } from './theme-toggle'
import Image from 'next/image'
import Link from 'next/link'

const navigation = [
  { name: 'Betacode Ventures', href: '/betacode-ventures' },
]

type SiteHeaderProps = {
  activePath?: string
}

export function SiteHeader({ activePath }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Betacode</span>
            <Image src="/images/logo-light.svg" alt="Betacode" width={200} height={200} className="h-8 w-auto dark:hidden" />
            <Image src="/images/logo-dark.svg" alt="Betacode" width={200} height={200} className="h-8 w-auto not-dark:hidden" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 ml-2 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm/6 font-semibold ${
                activePath === item.href
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <ThemeToggle />
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Betacode</span>
              <Image src="/images/logo-light.svg" alt="Betacode" width={200} height={200} className="h-8 w-auto dark:hidden" />
              <Image src="/images/logo-dark.svg" alt="Betacode" width={200} height={200} className="h-8 w-auto not-dark:hidden" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-gray-50 dark:hover:bg-white/5 ${
                      activePath === item.href
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
