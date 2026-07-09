import type { AnswerSummaryItem } from "@/lib/pricing-calculator"
import type { OutcomeId } from "@/lib/pricing-calculator"

export type ContactSource = "general" | "betacode-ventures" | "price-calculator"

export type ContactRecord = {
  name: string
  email: string
  website?: string
  phone?: string
  message?: string
  source: ContactSource
  answers: Record<string, string>
  outcomes: OutcomeId[]
  answerSummary: AnswerSummaryItem[]
  priceSummary: string
  locale: "en" | "pt"
  createdAt: Date
}
