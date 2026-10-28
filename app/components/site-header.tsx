'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import type { ChromeCopy } from '@/lib/copy'
import { useCopy } from '@/lib/use-copy'
import { useMounted } from '@/lib/use-mounted'
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, SITE_ROUTES, VENTURES_APPLY_ANCHOR } from '@/lib/site-routes'

const NAV = [
  { key: 'navHome', href: SITE_ROUTES.home },
  { key: 'navPricing', href: SITE_ROUTES.pricing },
  { key: 'navVentures', href: SITE_ROUTES.ventures },
  { key: 'navInsights', href: SITE_ROUTES.insights },
] as const

const MENU = [
  { n: '01', label: 'navHome', href: SITE_ROUTES.home },
  { n: '02', label: 'navPricing', href: SITE_ROUTES.pricing },
  { n: '03', label: 'navVenturesShort', href: SITE_ROUTES.ventures },
  { n: '04', label: 'navInsights', href: SITE_ROUTES.insights },
  { n: '05', label: 'navContact', href: SITE_ROUTES.contact },
] as const

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function Logo() {
  return (
    <Link href={SITE_ROUTES.home} aria-label="Betacode" className="bc-logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-anim" src="/assets/brand/logo-animated.gif" alt="Betacode" width={146} height={38} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-static only-light" src="/assets/brand/logo.png" alt="Betacode" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-static only-dark" src="/assets/brand/logo-white.png" alt="Betacode" />
    </Link>
  )
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function SiteHeader() {
  const c = useCopy<ChromeCopy>('chrome')
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)

  const dark = mounted && resolvedTheme === 'dark'
  const onVentures = pathname === SITE_ROUTES.ventures

  const switchLocale = (next: Locale) => {
    if (next === locale) return
    router.replace(pathname, { locale: next, scroll: false })
  }

  useEffect(() => {
    if (!open) return
    const root = menuRef.current
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusable = () => {
      if (!root) return []
      return [...root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])')]
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }
      if (event.key !== 'Tab' || !root) return
      const items = focusable()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (event.shiftKey && (active === first || !root.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (active === last || !root.contains(active))) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
      menuBtnRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    const query = window.matchMedia('(min-width: 981px)')
    const close = () => {
      if (query.matches) setOpen(false)
    }
    query.addEventListener('change', close)
    return () => query.removeEventListener('change', close)
  }, [])

  const cta = onVentures ? (
    <a className="btn-coral bc-cta" href={VENTURES_APPLY_ANCHOR}>{c.navApply}</a>
  ) : (
    <Link
      className="btn-coral bc-cta"
      href={SITE_ROUTES.contact}
      aria-current={pathname === SITE_ROUTES.contact ? 'page' : undefined}
    >
      {c.navContact}
    </Link>
  )

  return (
    <header className="bc-chrome bc-header">
      <nav aria-label={c.navLabel} className="bc-nav">
        <Logo />
        <div className="bc-links">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.key}
                className={active ? 'navlink on' : 'navlink'}
                href={item.href}
                aria-current={active ? 'page' : undefined}
              >
                {c[item.key]}
              </Link>
            )
          })}
        </div>
        <div className="bc-controls">
          <div className="seg" role="group" aria-label={c.langLabel}>
            <button type="button" aria-pressed={locale === 'pt'} onClick={() => switchLocale('pt')}>PT</button>
            <button type="button" aria-pressed={locale === 'en'} onClick={() => switchLocale('en')}>EN</button>
          </div>
          <button
            type="button"
            className="iconbtn"
            aria-label={dark ? c.themeToLight : c.themeToDark}
            onClick={() => setTheme(dark ? 'light' : 'dark')}
          >
            <svg className="only-dark" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
            <svg className="only-light" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
          </button>
          {cta}
          <button
            ref={menuBtnRef}
            type="button"
            className="bc-menu-btn"
            aria-label={c.menuOpen}
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      {open && (
        <div
          ref={menuRef}
          className="bc-menu"
          role="dialog"
          aria-modal="true"
          aria-label={c.navLabel}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false)
          }}
        >
          <div className="bc-menu-top">
            <Logo />
            <button type="button" className="bc-menu-btn" style={{ display: 'flex' }} aria-label={c.menuClose} onClick={() => setOpen(false)} autoFocus>
              <CloseIcon />
            </button>
          </div>
          <p className="mono bc-menu-kicker">{c.menuKicker}</p>
          <ul className="bc-menu-list">
            {MENU.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.n}>
                  <Link
                    href={item.href}
                    className={active ? 'on' : undefined}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span className="n">{item.n}</span>
                    {c[item.label]}
                    <span className="arr" aria-hidden="true">→</span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="bc-menu-foot">
            <div className="bc-menu-tools">
              <div className="seg" role="group" aria-label={c.langLabel}>
                <button type="button" aria-pressed={locale === 'pt'} onClick={() => switchLocale('pt')}>PT</button>
                <button type="button" aria-pressed={locale === 'en'} onClick={() => switchLocale('en')}>EN</button>
              </div>
              <button
                type="button"
                className="bc-theme-pill"
                aria-label={dark ? c.themeToLight : c.themeToDark}
                onClick={() => setTheme(dark ? 'light' : 'dark')}
              >
                <svg className="only-light" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
                <svg className="only-dark" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
                <span className="only-light">{c.themeDark}</span>
                <span className="only-dark">{c.themeLight}</span>
              </button>
            </div>
            <div className="bc-menu-contact">
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <a href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE_DISPLAY}</a>
            </div>
            <div className="bc-menu-actions">
              <Link className="bc-menu-ghost" href={SITE_ROUTES.pricing} onClick={() => setOpen(false)}>{c.menuEstimate}</Link>
              <Link className="btn-coral" href={SITE_ROUTES.contact} onClick={() => setOpen(false)}>{c.menuStart}</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
