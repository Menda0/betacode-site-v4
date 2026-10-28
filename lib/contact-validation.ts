import { z } from "zod"

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const WEBSITE_PATTERN = /^https?:\/\/[^\s.]+\.[^\s]+$/i
export const MESSAGE_MIN = 10
export const MESSAGE_MAX = 2000

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim())
}

export function isValidOptionalWebsite(value: string) {
  const v = value.trim()
  return !v || WEBSITE_PATTERN.test(v)
}

const localeSchema = z.enum(["en", "pt"])
const outcomeSchema = z.enum([
  "self-managed-tech-teams",
  "team-augmentation",
  "support",
  "training",
  "betacode-ventures",
])
const nameSchema = z.string().trim().min(1).max(200)
const emailSchema = z.string().trim().max(320).regex(EMAIL_PATTERN)
const websiteSchema = z
  .string()
  .trim()
  .max(500)
  .optional()
  .refine((value) => !value || WEBSITE_PATTERN.test(value), { message: "Invalid website" })
/** Honeypot: real users never see or fill this field. */
const honeypotSchema = z.string().optional()

export const priceCalculatorContactSchema = z.object({
  source: z.literal("price-calculator"),
  hp: honeypotSchema,
  contact: z.object({
    name: nameSchema,
    email: emailSchema,
    website: websiteSchema,
  }),
  description: z.string().trim().max(MESSAGE_MAX).optional(),
  when: z.string().trim().max(200).optional(),
  selectedService: outcomeSchema.optional(),
  answers: z.record(z.string(), z.string().max(100)),
  outcomes: z.array(outcomeSchema).max(5),
  answerSummary: z
    .array(
      z.object({
        questionId: z.string().max(100),
        label: z.string().max(200),
        value: z.string().max(300),
      })
    )
    .max(20),
  priceSummary: z.string().max(500),
  locale: localeSchema,
})

export const generalContactSchema = z.object({
  source: z.literal("general"),
  hp: honeypotSchema,
  topic: z.enum(["project", "legacy", "team", "ventures", "other"]),
  contact: z.object({
    name: nameSchema,
    email: emailSchema,
    phone: z.string().trim().max(50).optional(),
    company: z.string().trim().max(200).optional(),
    message: z.string().trim().min(MESSAGE_MIN).max(MESSAGE_MAX),
  }),
  locale: localeSchema,
})

export const venturesContactSchema = z.object({
  source: z.literal("betacode-ventures"),
  hp: honeypotSchema,
  stage: z.string().trim().max(200).optional(),
  contact: z.object({
    name: nameSchema,
    email: emailSchema,
    website: websiteSchema,
    message: z.string().trim().min(MESSAGE_MIN).max(MESSAGE_MAX),
  }),
  locale: localeSchema,
})

export const contactSubmissionSchema = z.discriminatedUnion("source", [
  priceCalculatorContactSchema,
  generalContactSchema,
  venturesContactSchema,
])

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>
