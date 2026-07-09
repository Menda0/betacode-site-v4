import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { ContactPageContent } from "@/app/components/contact-page-content"
import { Footer } from "@/app/components/footer"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata.contact" })

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: "/images/betacode-facebook.png",
      url: `/${locale}/contact`,
    },
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <ContactPageContent />
      <Footer />
    </>
  )
}
