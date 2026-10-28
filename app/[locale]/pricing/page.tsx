import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { getCopy } from '@/lib/copy'
import { createPageMetadata } from '@/lib/metadata'
import { PricingWizard } from '@/app/components/pricing/pricing-wizard'
import type ptPricing from '@/messages/pt/pricing.json'
import type ptMetadata from '@/messages/pt/metadata.json'
import '@/app/styles/pages/pricing.css'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const meta = await getCopy<typeof ptMetadata>(locale as Locale, 'metadata')

  return createPageMetadata({
    locale,
    path: '/pricing',
    title: meta.pricing.title,
    description: meta.pricing.description,
  })
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const { intro } = await getCopy<typeof ptPricing>(locale as Locale, 'pricing')

  return (
    <main className="site pg-pricing">
      <section className="pr-intro" style={{ maxWidth: "860px", margin: "0 auto", padding: "56px 24px 28px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "14px" }}>
        <span className="mono" style={{ fontSize: "13px", color: "var(--kicker)" }}>{intro.kicker}</span>
        <h1 className="disp hero-h" style={{ margin: "0", fontSize: "46px", lineHeight: "1.08", fontWeight: "800", letterSpacing: "-0.03em" }}>{intro.title}</h1>
        <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.6", color: "var(--muted)", maxWidth: "640px" }}>{intro.sub}</p>
        <div className="pr-promises" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 20px", paddingTop: "4px" }}>
          {intro.promises.map((p) => (
            <span key={p} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "500" }}><span className="mono" aria-hidden="true" style={{ color: "#EB5648", fontWeight: "700" }}>{'{'} {'}'}</span>{p}</span>
          ))}
        </div>
      </section>

      <PricingWizard />
    </main>
  )
}
