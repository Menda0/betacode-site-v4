'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'
import { ThemeToggle } from './theme-toggle'
import { LanguageSelector } from './language-selector'
import Image from 'next/image'
import { Link, usePathname } from '@/i18n/navigation'

const navigation = [
  { key: 'home' as const, href: '/' },
  { key: 'pricing' as const, href: '/pricing' },
  { key: 'betacodeVentures' as const, href: '/betacode-ventures' },
  { key: 'insights' as const, href: '/insights' },
  { key: 'contact' as const, href: '/contact' },
]

function isNavActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const t = useTranslations('nav')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/75 backdrop-blur-lg dark:border-white/10 dark:bg-[#111828]/95">
      <nav aria-label="Global" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <span className="sr-only">Betacode</span>
          <Image src="/images/logo-light.svg" alt="Betacode" width={200} height={200} className="h-8 w-auto dark:hidden" />
          <Image src="/images/logo-dark.svg" alt="Betacode" width={200} height={200} className="h-8 w-auto not-dark:hidden" />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`text-sm/6 font-semibold ${
                isNavActive(pathname, item.href)
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
          <LanguageSelector />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSelector />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-200"
          >
            <span className="sr-only">{t('openMenu')}</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-gray-900/20 backdrop-blur-sm dark:bg-black/40" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white/95 p-6 backdrop-blur-lg sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-[#111828]/95 dark:sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Betacode</span>
              <Image src="/images/logo-light.svg" alt="Betacode" width={200} height={200} className="h-8 w-auto dark:hidden" />
              <Image src="/images/logo-dark.svg" alt="Betacode" width={200} height={200} className="h-8 w-auto not-dark:hidden" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-200"
            >
              <span className="sr-only">{t('closeMenu')}</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-gray-50 dark:hover:bg-white/5 ${
                      isNavActive(pathname, item.href)
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {t(item.key)}
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
