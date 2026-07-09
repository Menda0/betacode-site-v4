'use client'

import { useTranslations } from 'next-intl'
import { ContactForm } from '@/app/components/contact-form'

export function VenturesCTA() {
  const t = useTranslations('ventures.cta')
  const formT = useTranslations('ventures.contactForm')

  const fields = [
    {
      id: 'name',
      type: 'text' as const,
      label: formT('name'),
      placeholder: formT('namePlaceholder'),
    },
    {
      id: 'email',
      type: 'email' as const,
      label: formT('email'),
      placeholder: formT('emailPlaceholder'),
    },
    {
      id: 'website',
      type: 'url' as const,
      label: formT('website'),
      placeholder: formT('websitePlaceholder'),
      optional: true,
    },
    {
      id: 'message',
      type: 'textarea' as const,
      label: formT('message'),
      placeholder: formT('messagePlaceholder'),
    },
  ]

  return (
    <div className="bg-primary-600">
      <div className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
            {t('headline')}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-primary-200">
            {t('description')}
          </p>
          <div className="mx-auto mt-10 max-w-lg text-left">
            <ContactForm
              source="betacode-ventures"
              fields={fields}
              submitLabel={t('buttonLabel')}
              variant="ventures"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
