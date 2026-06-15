import type { Metadata } from 'next'
import { VenturesHero } from '../components/ventures/ventures-hero'
import { VenturesOverview } from '../components/ventures/ventures-overview'
import { CoachidCaseStudy } from '../components/ventures/coachid-case-study'
import { VenturesCTA } from '../components/ventures/ventures-cta'
import { Testimonials } from '../components/testimonials'
import { Footer } from '../components/footer'
import { coachidTestimonials } from '@/lib/ventures-content'

export const metadata: Metadata = {
  title: 'Betacode Ventures — Your Technical Co-Founder',
  description:
    'Betacode Ventures partners with startups as a technical co-founder — from idea validation through launch and scale. See our work with Coachid and apply today.',
  openGraph: {
    title: 'Betacode Ventures — Your Technical Co-Founder',
    description:
      'Betacode Ventures partners with startups as a technical co-founder — from idea validation through launch and scale.',
    images: '/images/betacode-facebook.png',
    url: '/betacode-ventures',
  },
}

export default function BetacodeVenturesPage() {
  return (
    <>
      <VenturesHero />
      <VenturesOverview />
      <CoachidCaseStudy />
      <Testimonials items={coachidTestimonials} />
      <VenturesCTA />
      <Footer />
    </>
  )
}
