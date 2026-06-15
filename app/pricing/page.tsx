import type { Metadata } from "next"
import { PriceCalculator } from "../components/price-calculator"
import { PricingBackground } from "../components/pricing-background"
import { InsightsPreview } from "../components/insights-preview"
import { Clients } from "../components/clients"
import { CTA } from "../components/cta"
import { VenturesPromo } from "../components/ventures-promo"
import { Footer } from "../components/footer"
import { getBlogPosts } from "@/lib/blog-content"

export const metadata: Metadata = {
  title: "Price Calculator — Betacode",
  description:
    "Estimate the cost of your software project. Select your business type and what you want to build to get a recommended service and price range.",
  openGraph: {
    title: "Price Calculator — Betacode",
    description:
      "Estimate the cost of your software project. Select your business type and what you want to build to get a recommended service and price range.",
    images: "/images/betacode-facebook.png",
    url: "/pricing",
  },
}

export default function PricingPage() {
  const insightPosts = getBlogPosts()

  return (
    <>
      <PricingBackground>
        <PriceCalculator />
      </PricingBackground>
      <InsightsPreview posts={insightPosts} />
      <Clients />
      <VenturesPromo />
      <CTA />
      <Footer />
    </>
  )
}
