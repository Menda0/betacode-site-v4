import type { AnswerSummaryItem } from "@/lib/pricing-calculator"
import type { OutcomeId } from "@/lib/pricing-calculator"

export type ContactRecord = {
  name: string
  email: string
  website?: string
  answers: Record<string, string>
  outcomes: OutcomeId[]
  answerSummary: AnswerSummaryItem[]
  priceSummary: string
  locale: "en" | "pt"
  createdAt: Date
}
