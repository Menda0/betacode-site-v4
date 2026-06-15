import type { Metadata } from "next"
import { PriceCalculator } from "../components/price-calculator"
import { Footer } from "../components/footer"

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
  return (
    <>
      <PriceCalculator />
      <Footer />
    </>
  )
}
