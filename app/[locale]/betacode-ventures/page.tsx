import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { createPageMetadata } from '@/lib/metadata'
import { VenturesHero } from '@/app/components/ventures/ventures-hero'
import { VenturesOverview } from '@/app/components/ventures/ventures-overview'
import { VenturesPartnership } from '@/app/components/ventures/ventures-partnership'
import { CoachidCaseStudy } from '@/app/components/ventures/coachid-case-study'
import { VenturesCTA } from '@/app/components/ventures/ventures-cta'
import { Footer } from '@/app/components/footer'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.ventures' })

  return createPageMetadata({
    locale,
    path: '/betacode-ventures',
    title: t('title'),
    description: t('description'),
  })
}

export default async function BetacodeVenturesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <VenturesHero />
      <VenturesOverview />
      <VenturesPartnership />
      <CoachidCaseStudy />
      <VenturesCTA />
      <Footer />
    </>
  )
}
