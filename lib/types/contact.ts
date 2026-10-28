export type OutcomeId =
  | "self-managed-tech-teams"
  | "team-augmentation"
  | "support"
  | "training"
  | "betacode-ventures"

export type AnswerSummaryItem = {
  questionId: string
  label: string
  value: string
}

export type ContactSource = "general" | "betacode-ventures" | "price-calculator"

export type ContactTopic = "project" | "legacy" | "team" | "ventures" | "other"

export type ContactRecord = {
  name: string
  email: string
  website?: string
  phone?: string
  company?: string
  message?: string
  topic?: ContactTopic
  stage?: string
  when?: string
  selectedService?: OutcomeId
  source: ContactSource
  answers: Record<string, string>
  outcomes: OutcomeId[]
  answerSummary: AnswerSummaryItem[]
  priceSummary: string
  locale: "en" | "pt"
  createdAt: Date
}
