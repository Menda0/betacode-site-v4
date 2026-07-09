"use client"

import type { ReactNode } from "react"
import { useTranslations } from "next-intl"
import {
  IconArrowRight,
  IconCalculator,
  IconMail,
  IconMapPin,
  IconPhone,
  IconRocket,
} from "@tabler/icons-react"
import { ContactForm } from "@/app/components/contact-form"
import { Link } from "@/i18n/navigation"
import { SITE_CONTACT } from "@/lib/site-contact"

function ContactHeroBackground() {
  return (
    <>
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-256 w-full mask-[radial-gradient(32rem_32rem_at_center,white,transparent)] stroke-gray-200 dark:stroke-white/10"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="contact-hero-grid"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-50 dark:fill-gray-800">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect fill="url(#contact-hero-grid)" width="100%" height="100%" strokeWidth={0} />
      </svg>
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
      >
        <div
          style={{
            clipPath:
              "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
          }}
          className="aspect-801/1036 w-200.25 bg-linear-to-tr from-primary-400 to-primary-600 opacity-30 dark:from-primary-600 dark:to-primary-800 dark:opacity-25"
        />
      </div>
    </>
  )
}

function ContactCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border border-gray-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-8 dark:border-white/10 dark:bg-gray-900/80 ${className ?? ""}`}
    >
      {children}
    </div>
  )
}

export function ContactPageContent() {
  const t = useTranslations("contact")

  const fields = [
    {
      id: "name",
      type: "text" as const,
      label: t("form.name"),
      placeholder: t("form.namePlaceholder"),
    },
    {
      id: "email",
      type: "email" as const,
      label: t("form.email"),
      placeholder: t("form.emailPlaceholder"),
    },
    {
      id: "phone",
      type: "tel" as const,
      label: t("form.phone"),
      placeholder: t("form.phonePlaceholder"),
      optional: true,
    },
    {
      id: "message",
      type: "textarea" as const,
      label: t("form.message"),
      placeholder: t("form.messagePlaceholder"),
    },
  ]

  return (
    <>
      <div className="relative isolate bg-white dark:bg-gray-900">
        <ContactHeroBackground />

        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-base/7 font-semibold text-primary-600 uppercase dark:text-primary-400">
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {t("description")}
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-stretch">
            <ContactCard>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("form.title")}
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {t("form.description")}
              </p>
              <ContactForm
                source="general"
                fields={fields}
                submitLabel={t("form.submit")}
                className="mt-6"
              />
            </ContactCard>

            <ContactCard>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("info.title")}
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {t("info.description")}
              </p>

              <dl className="mt-6 flex flex-1 flex-col justify-center space-y-6">
                <div className="flex gap-3">
                  <IconMail
                    className="mt-0.5 size-5 shrink-0 text-primary-600 dark:text-primary-400"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-sm font-medium text-gray-900 dark:text-white">
                      {t("info.email")}
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${SITE_CONTACT.email}`}
                        className="text-sm text-primary-600 hover:underline dark:text-primary-400"
                      >
                        {SITE_CONTACT.email}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex gap-3">
                  <IconPhone
                    className="mt-0.5 size-5 shrink-0 text-primary-600 dark:text-primary-400"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-sm font-medium text-gray-900 dark:text-white">
                      {t("info.phone")}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      <a
                        href={`tel:${SITE_CONTACT.phone.replace(/\s/g, "")}`}
                        className="hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {SITE_CONTACT.phone}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex gap-3">
                  <IconMapPin
                    className="mt-0.5 size-5 shrink-0 text-primary-600 dark:text-primary-400"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-sm font-medium text-gray-900 dark:text-white">
                      {t("info.address")}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {SITE_CONTACT.address}
                    </dd>
                  </div>
                </div>
              </dl>
            </ContactCard>
          </div>
        </div>
      </div>

      <section className="relative isolate overflow-hidden border-t border-gray-200/80 bg-gray-50 py-16 sm:py-20 dark:border-border dark:bg-[#111828]">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-primary-100/40 to-transparent dark:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary-100),transparent)] opacity-50 dark:hidden"
        />
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 hidden h-full w-full stroke-gray-200 dark:block dark:stroke-white/[0.06]"
        >
          <defs>
            <pattern
              id="contact-cta-grid"
              width={32}
              height={32}
              patternUnits="userSpaceOnUse"
            >
              <path d="M0 32V0H32" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-cta-grid)" strokeWidth={0} />
        </svg>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent dark:block"
        />

        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {t("ctas.title")}
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {t("ctas.description")}
            </p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Link
              href="/betacode-ventures"
              className="group flex flex-col rounded-2xl border border-gray-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition hover:border-primary-300 hover:bg-primary-50/50 sm:p-8 dark:border-white/10 dark:bg-[#030713]/60 dark:hover:border-white/20 dark:hover:bg-[#030713]/80"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                <IconRocket className="size-5" aria-hidden="true" />
              </span>
              <span className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                {t("ctas.ventures.title")}
              </span>
              <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {t("ctas.ventures.description")}
              </span>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:underline dark:text-primary-400">
                {t("ctas.ventures.link")}
                <IconArrowRight className="size-4" aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/pricing"
              className="group flex flex-col rounded-2xl border border-gray-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition hover:border-primary-300 hover:bg-primary-50/50 sm:p-8 dark:border-white/10 dark:bg-[#030713]/60 dark:hover:border-white/20 dark:hover:bg-[#030713]/80"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
                <IconCalculator className="size-5" aria-hidden="true" />
              </span>
              <span className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                {t("ctas.pricing.title")}
              </span>
              <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {t("ctas.pricing.description")}
              </span>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:underline dark:text-primary-400">
                {t("ctas.pricing.link")}
                <IconArrowRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
