import Hero from "../components/hero";
import { Services } from "../components/services";
import { VenturesPromo } from "../components/ventures-promo";
import { Feature } from "../components/feature";
import { CTA } from "../components/cta";
import { TraditionalBusinessIcon, TechCocampaniesIcon, StartupsIcon } from "../components/icons";
import { Clients } from "../components/clients";
import { Footer } from "../components/footer";
import { InsightsPreview } from "../components/insights-preview";
import { getBlogPosts, resolveBlogLocale } from "@/lib/blog-content";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/app/components/json-ld";
import { createWebsiteSchema } from "@/lib/structured-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });

  return createPageMetadata({
    locale,
    path: "",
    title: t("title"),
    description: t("description"),
    ogTitle: "Betacode",
  });
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "homeServices" });
  const tf = await getTranslations({ locale, namespace: "features" });
  const insightPosts = getBlogPosts(locale);

  const services = {
    "external-tech-team": {
      name: t("externalTechTeam.name"),
      description: t("externalTechTeam.description"),
    },
    "tech-consulting": {
      name: t("techConsulting.name"),
      description: t("techConsulting.description"),
    },
    "tech-support": {
      name: t("techSupport.name"),
      description: t("techSupport.description"),
    },
    "tech-training": {
      name: t("techTraining.name"),
      description: t("techTraining.description"),
    },
    "team-augmentation": {
      name: t("teamAugmentation.name"),
      description: t("teamAugmentation.description"),
    },
    internalization: {
      name: t("teamInternalization.name"),
      description: t("teamInternalization.description"),
    },
    "mvp-development": {
      name: t("mvpDevelopment.name"),
      description: t("mvpDevelopment.description"),
    },
  };

  const features = [
    {
      id: "traditional-business",
      title: tf("traditionalBusiness.title"),
      subtitle: tf("traditionalBusiness.subtitle"),
      description: tf("traditionalBusiness.description"),
      icon: <TraditionalBusinessIcon />,
      color: "orange",
      side: "left" as const,
      services: [
        services["external-tech-team"],
        services["tech-consulting"],
        services["tech-support"],
        services["tech-training"],
      ],
      benefits: tf.raw("traditionalBusiness.benefits") as string[],
    },
    {
      id: "tech-companies",
      title: tf("techCompanies.title"),
      subtitle: tf("techCompanies.subtitle"),
      description: tf("techCompanies.description"),
      icon: <TechCocampaniesIcon />,
      color: "indigo",
      side: "right" as const,
      services: [
        services["team-augmentation"],
        services.internalization,
        services["tech-consulting"],
        services["tech-training"],
      ],
      benefits: tf.raw("techCompanies.benefits") as string[],
    },
    {
      id: "startups",
      title: tf("startups.title"),
      subtitle: tf("startups.subtitle"),
      description: tf("startups.description"),
      icon: <StartupsIcon />,
      color: "green",
      side: "left" as const,
      services: [
        services["external-tech-team"],
        services.internalization,
        services["tech-consulting"],
        services["mvp-development"],
      ],
      benefits: tf.raw("startups.benefits") as string[],
    },
  ];

  return (
    <>
      <JsonLd data={createWebsiteSchema(resolveBlogLocale(locale))} />
      <Hero />
      <Services />
      {features.map((feature, index) => (
        <Feature key={feature.id} feature={feature} variant={index % 2 === 0 ? "light" : "muted"} />
      ))}
      <VenturesPromo />
      <InsightsPreview posts={insightPosts} />
      <Clients />
      <CTA />
      <Footer />
    </>
  );
}
