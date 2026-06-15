import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { VenturesHero } from '@/app/components/ventures/ventures-hero'
import { VenturesOverview } from '@/app/components/ventures/ventures-overview'
import { VenturesPartnership } from '@/app/components/ventures/ventures-partnership'
import { CoachidCaseStudy } from '@/app/components/ventures/coachid-case-study'
import { VenturesCTA } from '@/app/components/ventures/ventures-cta'
import { Testimonials } from '@/app/components/testimonials'
import { Footer } from '@/app/components/footer'
import type { Testimonial } from '@/lib/ventures-content'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.ventures' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: '/images/betacode-facebook.png',
      url: `/${locale}/betacode-ventures`,
    },
  }
}

export default async function BetacodeVenturesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'ventures' })
  const rawTestimonials = t.raw('testimonials') as Pick<Testimonial, 'quote' | 'name' | 'role'>[]
  const testimonials: Testimonial[] = rawTestimonials.map((item) => ({
    ...item,
    companyLogo: '/images/clients/coachid.png',
  }))

  return (
    <>
      <VenturesHero />
      <VenturesOverview />
      <VenturesPartnership />
      <CoachidCaseStudy />
      <Testimonials items={testimonials} />
      <VenturesCTA />
      <Footer />
    </>
  )
}
