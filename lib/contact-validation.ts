import { z } from "zod"

export function isValidOptionalWebsite(value: string) {
  if (!value.trim()) return true
  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const contactFieldsSchema = z.object({
  name: z.string().trim().min(1),
  email: z.email(),
  website: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
})

const localeSchema = z.enum(["en", "pt"])

export const priceCalculatorContactSchema = z.object({
  source: z.literal("price-calculator"),
  contact: z.object({
    name: z.string().trim().min(1),
    email: z.email(),
    website: z.string().optional(),
  }),
  answers: z.record(z.string(), z.string()),
  outcomes: z.array(z.string()),
  answerSummary: z.array(
    z.object({
      questionId: z.string(),
      label: z.string(),
      value: z.string(),
    })
  ),
  priceSummary: z.string(),
  locale: localeSchema,
})

export const generalContactSchema = z.object({
  source: z.literal("general"),
  contact: z.object({
    name: z.string().trim().min(1),
    email: z.email(),
    phone: z.string().optional(),
    message: z.string().trim().min(1),
  }),
  locale: localeSchema,
})

export const venturesContactSchema = z.object({
  source: z.literal("betacode-ventures"),
  contact: z.object({
    name: z.string().trim().min(1),
    email: z.email(),
    website: z
      .string()
      .optional()
      .refine((value) => !value || isValidOptionalWebsite(value), {
        message: "Invalid website",
      }),
    message: z.string().trim().min(1),
  }),
  locale: localeSchema,
})

export const contactSubmissionSchema = z.discriminatedUnion("source", [
  priceCalculatorContactSchema,
  generalContactSchema,
  venturesContactSchema,
])

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>

export { contactFieldsSchema }
