import calculatorData from "@/data/pricing-calculator.json"

export type OutcomeId =
  | "small-team"
  | "base-team"
  | "team-augmentation"
  | "support"
  | "training"
  | "betacode-ventures"

export type PricingModel = "project" | "hourly" | "partnership"

export type QuestionType = "choice" | "dropdown" | "textarea"

export type TeamMember = {
  profile: string
  regime: string
  rateMin: number
  rateMax: number
}

export type PriceEstimate = {
  label: string
  min: number
  max: number
}

export type OutcomeCta = {
  label: string
  href: string
}

export type OutcomeRate = {
  label: string
  regime?: string
  rateMin: number
  rateMax: number
}

export type CalculatorOutcome = {
  id: OutcomeId
  label: string
  description: string
  pricingModel: PricingModel
  teamComposition: TeamMember[]
  rate?: OutcomeRate
  estimates: PriceEstimate[]
  cta: OutcomeCta
}

export type CalculatorOption = {
  id: string
  label: string
  description?: string
  nextQuestionId?: string
  outcomeId?: OutcomeId
}

export type CalculatorQuestion = {
  id: string
  type: QuestionType
  title: string
  description?: string
  optional?: boolean
  placeholder?: string
  nextQuestionId?: string
  options: CalculatorOption[]
}

export type ContactField = {
  id: string
  label: string
  description?: string
  type: "text" | "email" | "url"
  placeholder?: string
  optional?: boolean
}

export type ContactConfig = {
  title: string
  description?: string
  fields: ContactField[]
}

export type CalculatorRule = {
  id: string
  conditions: Record<string, string>
  outcomeIds: OutcomeId[]
}

export type CalculatorConfig = {
  version: number
  startQuestionId: string
  outcomes: Record<OutcomeId, CalculatorOutcome>
  questions: CalculatorQuestion[]
  contact: ContactConfig
  rules: CalculatorRule[]
}

export type CalculatorAnswers = Record<string, string>

export const pricingCalculatorConfig = calculatorData as unknown as CalculatorConfig

export function getQuestionById(questionId: string): CalculatorQuestion | undefined {
  return pricingCalculatorConfig.questions.find((question) => question.id === questionId)
}

export function getStartQuestion(): CalculatorQuestion {
  const question = getQuestionById(pricingCalculatorConfig.startQuestionId)
  if (!question) {
    throw new Error(`Start question "${pricingCalculatorConfig.startQuestionId}" not found`)
  }
  return question
}

function getNextQuestionIdForAnswer(question: CalculatorQuestion, optionId: string): string | undefined {
  const selectedOption = question.options.find((option) => option.id === optionId)
  if (selectedOption?.nextQuestionId) return selectedOption.nextQuestionId
  if (question.nextQuestionId) return question.nextQuestionId
  return undefined
}

export function getQuestionPath(answers: CalculatorAnswers): CalculatorQuestion[] {
  const path: CalculatorQuestion[] = []
  let currentQuestionId: string | undefined = pricingCalculatorConfig.startQuestionId

  while (currentQuestionId) {
    const question = getQuestionById(currentQuestionId)
    if (!question) break

    path.push(question)

    const answer = answers[question.id]
    if (!answer) break

    if (question.type === "textarea") break

    currentQuestionId = getNextQuestionIdForAnswer(question, answer)
  }

  return path
}

export function isQuestionFlowComplete(answers: CalculatorAnswers): boolean {
  const path = getQuestionPath(answers)
  const lastQuestion = path[path.length - 1]
  if (!lastQuestion) return false

  if (lastQuestion.type === "textarea") {
    return path.slice(0, -1).every((question) => Boolean(answers[question.id]))
  }

  return path.every((question) => Boolean(answers[question.id]))
}

export function resolveOutcomes(answers: CalculatorAnswers): CalculatorOutcome[] {
  const directOutcomeId = findDirectOutcomeId(answers)
  if (directOutcomeId) {
    const outcome = pricingCalculatorConfig.outcomes[directOutcomeId]
    return outcome ? [outcome] : []
  }

  const matchedOutcomeIds = new Set<OutcomeId>()

  for (const rule of pricingCalculatorConfig.rules) {
    const matches = Object.entries(rule.conditions).every(
      ([questionId, optionId]) => answers[questionId] === optionId
    )
    if (matches) {
      for (const outcomeId of rule.outcomeIds) {
        matchedOutcomeIds.add(outcomeId)
      }
    }
  }

  if (matchedOutcomeIds.size === 0) {
    const fallback = getFallbackOutcomeIds(answers)
    for (const outcomeId of fallback) {
      matchedOutcomeIds.add(outcomeId)
    }
  }

  return Array.from(matchedOutcomeIds)
    .map((outcomeId) => pricingCalculatorConfig.outcomes[outcomeId])
    .filter(Boolean)
}

function getFallbackOutcomeIds(answers: CalculatorAnswers): OutcomeId[] {
  const productHelp = answers["product-help"]
  switch (productHelp) {
    case "punctual-support":
      return ["support"]
    case "team-augmentation":
      return ["team-augmentation"]
    case "modernize":
      return answers["business-stage"] === "startup" ? ["small-team"] : ["base-team"]
    case "new-product":
      return answers["business-stage"] === "startup" ? ["small-team"] : ["base-team"]
    default:
      return []
  }
}

function findDirectOutcomeId(answers: CalculatorAnswers): OutcomeId | null {
  for (const question of pricingCalculatorConfig.questions) {
    const selectedOptionId = answers[question.id]
    if (!selectedOptionId) continue

    const selectedOption = question.options.find((option) => option.id === selectedOptionId)
    if (selectedOption?.outcomeId) {
      return selectedOption.outcomeId
    }
  }

  return null
}

export function getBranchQuestionIds(businessStage: string | undefined): string[] {
  if (businessStage === "startup") {
    return ["startup-funding", "startup-mvp"]
  }
  if (businessStage === "established") {
    return ["team-dimensions", "has-tech-team"]
  }
  return []
}

export function clearBranchAnswers(
  answers: CalculatorAnswers,
  businessStage: string | undefined
): CalculatorAnswers {
  const nextAnswers = { ...answers }
  const branchIds = getBranchQuestionIds(businessStage)

  for (const questionId of branchIds) {
    delete nextAnswers[questionId]
  }

  if (businessStage === "startup") {
    delete nextAnswers["team-dimensions"]
    delete nextAnswers["has-tech-team"]
  } else if (businessStage === "established") {
    delete nextAnswers["startup-funding"]
    delete nextAnswers["startup-mvp"]
  }

  return nextAnswers
}

export function formatEuro(amount: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatEuroRange(min: number, max: number): string {
  return `${formatEuro(min)} – ${formatEuro(max)}`
}

export function formatHourlyRange(min: number, max: number): string {
  return `${min} – ${max} €`
}

export function getPricingModelNote(pricingModel: PricingModel): string | null {
  switch (pricingModel) {
    case "hourly":
      return "Hourly rates above. Project ranges shown as a reference where applicable."
    case "project":
      return "Ranges based on our standard team configurations. Final pricing depends on scope and requirements."
    case "partnership":
      return "Betacode Ventures is an equity partnership—pricing is tailored to your stage and product."
    default:
      return null
  }
}
