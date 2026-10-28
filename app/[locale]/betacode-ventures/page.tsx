import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { createPageMetadata } from '@/lib/metadata'
import { getCopy } from '@/lib/copy'
import { SITE_ROUTES } from '@/lib/site-routes'
import type { Locale } from '@/i18n/routing'
import type ptMetadata from '@/messages/pt/metadata.json'
import { VenturesHero } from '@/app/components/ventures-page/ventures-hero'
import { VenturesSteps } from '@/app/components/ventures-page/ventures-steps'
import { VenturesPartnership } from '@/app/components/ventures-page/ventures-partnership'
import { VenturesCase } from '@/app/components/ventures-page/ventures-case'
import { VenturesApply } from '@/app/components/ventures-page/ventures-apply'
import type { VenturesCopy } from '@/app/components/ventures-page/types'
import '@/app/styles/pages/ventures.css'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const meta = await getCopy<typeof ptMetadata>(locale as Locale, 'metadata')

  return createPageMetadata({
    locale,
    path: SITE_ROUTES.ventures,
    title: meta.ventures.title,
    description: meta.ventures.description,
  })
}

export default async function BetacodeVenturesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getCopy<VenturesCopy>(locale as Locale, 'ventures')

  return (
    <main className="site pg-ventures">
      <VenturesHero t={t} />
      <VenturesSteps t={t} />
      <VenturesPartnership t={t} />
      <VenturesCase t={t} />
      <VenturesApply t={t} />
    </main>
  )
}
