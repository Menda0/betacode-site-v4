import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { PriceCalculator } from "@/app/components/price-calculator"
import { InsightsPreview } from "@/app/components/insights-preview"
import { Clients } from "@/app/components/clients"
import { CTA } from "@/app/components/cta"
import { VenturesPromo } from "@/app/components/ventures-promo"
import { Footer } from "@/app/components/footer"
import { getBlogPosts } from "@/lib/blog-content"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata.pricing" })

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: "/images/betacode-facebook.png",
      url: `/${locale}/pricing`,
    },
  }
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const insightPosts = getBlogPosts(locale)

  return (
    <>
      <PriceCalculator suggestedPosts={insightPosts.slice(0, 3)} />
      <InsightsPreview posts={insightPosts} />
      <Clients />
      <VenturesPromo />
      <CTA />
      <Footer />
    </>
  )
}
