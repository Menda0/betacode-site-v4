"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLocale, useTranslations } from "next-intl"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { isValidOptionalWebsite } from "@/lib/contact-validation"
import type { ContactSource } from "@/lib/types/contact"

type ContactFormField = {
  id: string
  type: "text" | "email" | "tel" | "url" | "textarea"
  label: string
  placeholder?: string
  optional?: boolean
}

type ContactFormProps = {
  source: Extract<ContactSource, "general" | "betacode-ventures">
  fields: ContactFormField[]
  submitLabel: string
  className?: string
  variant?: "default" | "ventures"
  onSuccess?: () => void
}

type GeneralFormValues = {
  name: string
  email: string
  phone: string
  message: string
}

type VenturesFormValues = {
  name: string
  email: string
  website: string
  message: string
}

type FormValues = GeneralFormValues | VenturesFormValues

function useContactFormSchema(source: ContactFormProps["source"]) {
  const t = useTranslations("contactForm")

  return useMemo(() => {
    const baseFields = {
      name: z.string().trim().min(1, t("validation.nameRequired")),
      email: z
        .string()
        .trim()
        .min(1, t("validation.emailRequired"))
        .pipe(z.email(t("validation.emailInvalid"))),
      message: z.string().trim().min(1, t("validation.messageRequired")),
    }

    if (source === "general") {
      return z.object({
        ...baseFields,
        phone: z.string(),
      })
    }

    return z.object({
      ...baseFields,
      website: z
        .string()
        .trim()
        .refine(isValidOptionalWebsite, {
          message: t("validation.websiteInvalid"),
        }),
    })
  }, [source, t])
}

export function ContactForm({
  source,
  fields,
  submitLabel,
  className,
  variant = "default",
  onSuccess,
}: ContactFormProps) {
  const locale = useLocale()
  const t = useTranslations("contactForm")
  const formSchema = useContactFormSchema(source)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValues = useMemo(
    () =>
      Object.fromEntries(fields.map((field) => [field.id, ""])) as FormValues,
    [fields]
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onTouched",
  })

  async function onSubmit(values: FormValues) {
    setSubmitError(null)
    setIsSubmitting(true)

    const contact: Record<string, string | undefined> = {}
    for (const field of fields) {
      const value = values[field.id as keyof FormValues]?.trim()
      if (value) {
        contact[field.id] = value
      }
    }

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source,
          contact,
          locale,
        }),
      })

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string
        } | null
        throw new Error(data?.error ?? t("submitError"))
      }

      setIsSuccess(true)
      reset(defaultValues)
      onSuccess?.()
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : t("submitError")
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const isVentures = variant === "ventures"

  if (isSuccess) {
    return (
      <div
        className={cn(
          "rounded-lg border px-4 py-6 text-center",
          isVentures
            ? "border-white/20 bg-white/10 text-white"
            : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900",
          className
        )}
      >
        <p
          className={cn(
            "text-base font-medium",
            isVentures ? "text-white" : "text-gray-900 dark:text-white"
          )}
        >
          {t("successTitle")}
        </p>
        <p
          className={cn(
            "mt-2 text-sm",
            isVentures ? "text-primary-100" : "text-gray-600 dark:text-gray-400"
          )}
        >
          {t("successDescription")}
        </p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className={cn(
            "mt-4 text-sm font-semibold underline-offset-4 hover:underline",
            isVentures ? "text-white" : "text-primary-600 dark:text-primary-400"
          )}
        >
          {t("sendAnother")}
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-4", className)}
      noValidate
    >
      {submitError && (
        <p
          className={cn(
            "rounded-lg border px-3 py-2 text-sm",
            isVentures
              ? "border-red-300/50 bg-red-950/40 text-red-100"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
          )}
          role="alert"
        >
          {submitError}
        </p>
      )}

      {fields.map((field) => {
        const error = errors[field.id as keyof FormValues]
        const inputClassName = cn(
          "block w-full rounded-lg border px-3 py-2.5 text-sm shadow-xs focus:outline-none focus:ring-2",
          isVentures
            ? "border-white/20 bg-white/10 text-white placeholder:text-primary-200 focus:border-white focus:ring-white/20"
            : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500",
          error &&
            (isVentures
              ? "border-red-300 focus:border-red-300 focus:ring-red-300/20"
              : "border-red-400 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500")
        )

        return (
          <div key={field.id} className="space-y-2">
            <label
              htmlFor={`${source}-${field.id}`}
              className={cn(
                "text-sm font-medium leading-none",
                isVentures ? "text-white" : "text-gray-900 dark:text-white"
              )}
            >
              {field.label}
              {field.optional && (
                <span
                  className={cn(
                    "ml-1 font-normal",
                    isVentures ? "text-primary-200" : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  ({t("optional")})
                </span>
              )}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={`${source}-${field.id}`}
                rows={5}
                placeholder={field.placeholder}
                disabled={isSubmitting}
                aria-invalid={Boolean(error)}
                className={inputClassName}
                {...register(field.id as keyof FormValues)}
              />
            ) : (
              <input
                id={`${source}-${field.id}`}
                type={field.type}
                placeholder={field.placeholder}
                disabled={isSubmitting}
                aria-invalid={Boolean(error)}
                className={inputClassName}
                {...register(field.id as keyof FormValues)}
              />
            )}

            {error?.message && (
              <p
                className={cn(
                  "text-xs",
                  isVentures ? "text-red-200" : "text-red-600 dark:text-red-400"
                )}
                role="alert"
              >
                {error.message}
              </p>
            )}
          </div>
        )
      })}

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
          isVentures
            ? "bg-white text-primary-600 hover:bg-primary-50 focus-visible:outline-white"
            : "bg-primary-600 text-white hover:bg-primary-500 focus-visible:outline-primary-600 dark:shadow-none"
        )}
      >
        {isSubmitting ? t("submitting") : submitLabel}
      </button>
    </form>
  )
}
