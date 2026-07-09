import calculatorEn from "@/data/pricing-calculator.json"
import calculatorPt from "@/data/pricing-calculator.pt.json"
import type { Locale } from "@/i18n/routing"

export type PricingTranslator = (key: string) => string

export type OutcomeId =
  | "self-managed-tech-teams"
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

export type TeamConfiguration = {
  id: string
  label: string
  summary?: string
  description?: string
  teamComposition: TeamMember[]
  estimates: PriceEstimate[]
}

export type CalculatorOutcome = {
  id: OutcomeId
  label: string
  description: string
  summary?: string
  serviceGroup?: string
  pricingModel: PricingModel
  teamComposition: TeamMember[]
  teamConfigurations?: TeamConfiguration[]
  rate?: OutcomeRate
  estimates: PriceEstimate[]
  cta: OutcomeCta
}

export type ServiceGroup = {
  label: string
  description?: string
}

export type ServiceDisplayGroup = {
  id: string
  label: string
  description?: string
  outcomes: CalculatorOutcome[]
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
  serviceGroups?: Record<string, ServiceGroup>
  questions: CalculatorQuestion[]
  contact: ContactConfig
  rules: CalculatorRule[]
}

export type CalculatorAnswers = Record<string, string>

export type PricingUiLabels = {
  summaryLabels: Record<string, string>
  fundingWith: string
  fundingWithout: string
  hasTechTeamYes: string
  hasTechTeamNo: string
  briefPrice: {
    model: string
    equityPartnership: string
    hourlyRate: string
    mvpEstimate: string
    priceRange: string
    hourlyRates: string
    contactForQuote: string
    pricing: string
  }
  pricingNotes: {
    hourly: string
    project: string
    partnership: string
  }
}

const calculatorByLocale: Record<Locale, CalculatorConfig> = {
  en: calculatorEn as unknown as CalculatorConfig,
  pt: calculatorPt as unknown as CalculatorConfig,
}

export function getPricingCalculatorConfig(locale: Locale = "en"): CalculatorConfig {
  return calculatorByLocale[locale] ?? calculatorByLocale.en
}

export function createPricingUiLabels(t: PricingTranslator): PricingUiLabels {
  return {
    summaryLabels: {
      businessStage: t("summaryLabels.businessStage"),
      startupFunding: t("summaryLabels.startupFunding"),
      teamDimensions: t("summaryLabels.teamDimensions"),
      hasTechTeam: t("summaryLabels.hasTechTeam"),
      productHelpStartup: t("summaryLabels.productHelpStartup"),
      productHelpEstablished: t("summaryLabels.productHelpEstablished"),
    },
    fundingWith: t("summaryLabels.fundingWith"),
    fundingWithout: t("summaryLabels.fundingWithout"),
    hasTechTeamYes: t("summaryLabels.hasTechTeamYes"),
    hasTechTeamNo: t("summaryLabels.hasTechTeamNo"),
    briefPrice: {
      model: t("briefPrice.model"),
      equityPartnership: t("briefPrice.equityPartnership"),
      hourlyRate: t("briefPrice.hourlyRate"),
      mvpEstimate: t("briefPrice.mvpEstimate"),
      priceRange: t("briefPrice.priceRange"),
      hourlyRates: t("briefPrice.hourlyRates"),
      contactForQuote: t("briefPrice.contactForQuote"),
      pricing: t("briefPrice.pricing"),
    },
    pricingNotes: {
      hourly: t("pricingNotes.hourly"),
      project: t("pricingNotes.project"),
      partnership: t("pricingNotes.partnership"),
    },
  }
}

export const pricingCalculatorConfig = getPricingCalculatorConfig("en")

const SELF_MANAGED_TEAM_ID: OutcomeId = "self-managed-tech-teams"

function getProductHelpAnswer(answers: CalculatorAnswers): string | undefined {
  if (answers["business-stage"] === "startup") {
    return answers["product-help-startup"]
  }
  if (answers["business-stage"] === "established") {
    return answers["product-help-established"]
  }
  return undefined
}

function resolveEstablishedOutcomeIds(answers: CalculatorAnswers, productHelp: string): OutcomeId[] {
  const hasTechTeam = answers["has-tech-team"]

  if (productHelp === "technical-support") {
    return ["support"]
  }

  if (productHelp === "team-augmentation") {
    if (hasTechTeam === "yes") {
      return ["team-augmentation", "training"]
    }
    return [SELF_MANAGED_TEAM_ID, "team-augmentation"]
  }

  if (productHelp === "modernize") {
    if (hasTechTeam === "yes") {
      return [SELF_MANAGED_TEAM_ID, "team-augmentation", "training"]
    }
    return [SELF_MANAGED_TEAM_ID]
  }

  if (productHelp === "new-product") {
    if (hasTechTeam === "yes") {
      return [SELF_MANAGED_TEAM_ID, "team-augmentation"]
    }
    return [SELF_MANAGED_TEAM_ID]
  }

  if (productHelp === "help-me-decide") {
    if (hasTechTeam === "no") {
      return [SELF_MANAGED_TEAM_ID]
    }
    return [SELF_MANAGED_TEAM_ID, "team-augmentation", "training"]
  }

  return []
}

function resolveStartupOutcomeIds(answers: CalculatorAnswers, productHelp: string): OutcomeId[] {
  const hasFunding = answers["startup-funding"]

  if (productHelp === "technical-support") {
    return ["support"]
  }

  if (productHelp === "develop-mvp") {
    if (hasFunding === "no") {
      return ["betacode-ventures", SELF_MANAGED_TEAM_ID]
    }
    return [SELF_MANAGED_TEAM_ID]
  }

  if (productHelp === "create-tech-team") {
    if (hasFunding === "no") {
      return ["betacode-ventures", SELF_MANAGED_TEAM_ID]
    }
    return ["betacode-ventures", SELF_MANAGED_TEAM_ID, "team-augmentation"]
  }

  if (productHelp === "help-me-decide") {
    if (hasFunding === "no") {
      return ["betacode-ventures"]
    }
    return ["betacode-ventures", SELF_MANAGED_TEAM_ID, "training", "team-augmentation"]
  }

  return []
}

export function resolveOutcomeIds(answers: CalculatorAnswers): OutcomeId[] {
  const productHelp = getProductHelpAnswer(answers)
  if (!productHelp) return []

  const businessStage = answers["business-stage"]

  if (businessStage === "established") {
    return resolveEstablishedOutcomeIds(answers, productHelp)
  }

  if (businessStage === "startup") {
    return resolveStartupOutcomeIds(answers, productHelp)
  }

  return []
}

export function groupOutcomesForDisplay(outcomes: CalculatorOutcome[]): ServiceDisplayGroup[] {
  return outcomes.map((outcome) => ({
    id: outcome.id,
    label: outcome.label,
    description: outcome.description,
    outcomes: [outcome],
  }))
}

export function getQuestionById(
  questionId: string,
  config: CalculatorConfig = pricingCalculatorConfig
): CalculatorQuestion | undefined {
  return config.questions.find((question) => question.id === questionId)
}

export function getStartQuestion(config: CalculatorConfig = pricingCalculatorConfig): CalculatorQuestion {
  const question = getQuestionById(config.startQuestionId, config)
  if (!question) {
    throw new Error(`Start question "${config.startQuestionId}" not found`)
  }
  return question
}

function getNextQuestionIdForAnswer(question: CalculatorQuestion, optionId: string): string | undefined {
  const selectedOption = question.options.find((option) => option.id === optionId)
  if (selectedOption?.nextQuestionId) return selectedOption.nextQuestionId
  if (question.nextQuestionId) return question.nextQuestionId
  return undefined
}

export type AnswerSummaryItem = {
  questionId: string
  label: string
  value: string
}

const QUESTION_SUMMARY_LABEL_KEYS: Record<string, keyof PricingUiLabels["summaryLabels"] | string> = {
  "business-stage": "businessStage",
  "startup-funding": "startupFunding",
  "team-dimensions": "teamDimensions",
  "has-tech-team": "hasTechTeam",
  "product-help-startup": "productHelpStartup",
  "product-help-established": "productHelpEstablished",
}

function formatSummaryAnswerLabel(
  questionId: string,
  optionId: string,
  optionLabel: string,
  ui?: PricingUiLabels
): string {
  if (questionId === "startup-funding" && ui) {
    return optionId === "yes" ? ui.fundingWith : ui.fundingWithout
  }

  if (questionId === "has-tech-team" && ui) {
    return optionId === "yes" ? ui.hasTechTeamYes : ui.hasTechTeamNo
  }

  return optionLabel
}

export function getAnswersSummary(
  answers: CalculatorAnswers,
  config: CalculatorConfig = pricingCalculatorConfig,
  ui?: PricingUiLabels
): AnswerSummaryItem[] {
  const path = getQuestionPath(answers, config)

  return path
    .filter((question) => question.type !== "textarea")
    .map((question) => {
      const selectedOptionId = answers[question.id]
      if (!selectedOptionId) return null

      const selectedOption = question.options.find((option) => option.id === selectedOptionId)
      if (!selectedOption) return null

      const labelKey = QUESTION_SUMMARY_LABEL_KEYS[question.id]
      const label =
        ui && labelKey && labelKey in ui.summaryLabels
          ? ui.summaryLabels[labelKey as keyof typeof ui.summaryLabels]
          : ui?.summaryLabels[question.id] ?? question.title

      return {
        questionId: question.id,
        label,
        value: formatSummaryAnswerLabel(question.id, selectedOption.id, selectedOption.label, ui),
      }
    })
    .filter((item): item is AnswerSummaryItem => item !== null)
}

export function getProductDescriptionQuestion(
  config: CalculatorConfig = pricingCalculatorConfig
): CalculatorQuestion {
  const question = getQuestionById("product-description", config)
  if (!question) {
    throw new Error('Question "product-description" not found')
  }
  return question
}

export function getExpectedBranchingQuestionCount(answers: CalculatorAnswers, config: CalculatorConfig = pricingCalculatorConfig): number {
  if (isQuestionFlowComplete(answers, config)) {
    return getQuestionPath(answers, config).length
  }

  const stage = answers["business-stage"]
  if (stage === "startup") return 3
  if (stage === "established") return 4
  return 1
}

export function getQuestionPath(
  answers: CalculatorAnswers,
  config: CalculatorConfig = pricingCalculatorConfig
): CalculatorQuestion[] {
  const path: CalculatorQuestion[] = []
  let currentQuestionId: string | undefined = config.startQuestionId

  while (currentQuestionId) {
    const question = getQuestionById(currentQuestionId, config)
    if (!question) break

    path.push(question)

    const answer = answers[question.id]
    if (!answer) break

    if (question.type === "textarea") break

    currentQuestionId = getNextQuestionIdForAnswer(question, answer)
  }

  return path
}

export function isQuestionFlowComplete(
  answers: CalculatorAnswers,
  config: CalculatorConfig = pricingCalculatorConfig
): boolean {
  const path = getQuestionPath(answers, config)
  return path.length > 0 && path.every((question) => Boolean(answers[question.id]))
}

export function resolveOutcomes(
  answers: CalculatorAnswers,
  config: CalculatorConfig = pricingCalculatorConfig
): CalculatorOutcome[] {
  const directOutcomeId = findDirectOutcomeId(answers, config)
  if (directOutcomeId) {
    const outcome = config.outcomes[directOutcomeId]
    return outcome ? [outcome] : []
  }

  const matchedOutcomeIds = new Set<OutcomeId>(resolveOutcomeIds(answers))

  for (const rule of config.rules) {
    const matches = Object.entries(rule.conditions).every(
      ([questionId, optionId]) => answers[questionId] === optionId
    )
    if (matches) {
      for (const outcomeId of rule.outcomeIds) {
        matchedOutcomeIds.add(outcomeId)
      }
    }
  }

  return Array.from(matchedOutcomeIds)
    .map((outcomeId) => config.outcomes[outcomeId])
    .filter(Boolean)
}

function findDirectOutcomeId(
  answers: CalculatorAnswers,
  config: CalculatorConfig = pricingCalculatorConfig
): OutcomeId | null {
  for (const question of config.questions) {
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
    return ["startup-funding"]
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
    delete nextAnswers["product-help-established"]
  } else if (businessStage === "established") {
    delete nextAnswers["startup-funding"]
    delete nextAnswers["product-help-startup"]
  }

  delete nextAnswers["product-help"]
  delete nextAnswers["product-description"]

  return nextAnswers
}

export function getOutcomeSummary(outcome: CalculatorOutcome): string {
  return outcome.summary ?? outcome.description
}

export type BriefPriceSummary = {
  label: string
  value: string
}

export function getBriefPriceSummary(
  outcome: CalculatorOutcome,
  ui?: PricingUiLabels
): BriefPriceSummary {
  const labels = ui?.briefPrice

  if (outcome.pricingModel === "partnership") {
    return {
      label: labels?.model ?? "Model",
      value: labels?.equityPartnership ?? "Equity partnership",
    }
  }

  if (outcome.rate) {
    return {
      label: labels?.hourlyRate ?? "Hourly rate",
      value: `${formatHourlyRange(outcome.rate.rateMin, outcome.rate.rateMax)}/h`,
    }
  }

  const allEstimates = [
    ...outcome.estimates,
    ...(outcome.teamConfigurations?.flatMap((config) => config.estimates) ?? []),
  ]

  const mvpEstimates = allEstimates.filter((estimate) =>
    estimate.label.toLowerCase().includes("mvp")
  )
  if (mvpEstimates.length > 0) {
    const min = Math.min(...mvpEstimates.map((estimate) => estimate.min))
    const max = Math.max(...mvpEstimates.map((estimate) => estimate.max))
    return {
      label: labels?.mvpEstimate ?? "MVP estimate",
      value: formatEuroRange(min, max),
    }
  }

  if (allEstimates.length > 0) {
    const min = Math.min(...allEstimates.map((estimate) => estimate.min))
    const max = Math.max(...allEstimates.map((estimate) => estimate.max))
    return {
      label: allEstimates.length === 1 ? allEstimates[0].label : (labels?.priceRange ?? "Price range"),
      value: formatEuroRange(min, max),
    }
  }

  const allTeamMembers = [
    ...outcome.teamComposition,
    ...(outcome.teamConfigurations?.flatMap((config) => config.teamComposition) ?? []),
  ]

  if (allTeamMembers.length > 0) {
    const rateMin = Math.min(...allTeamMembers.map((member) => member.rateMin))
    const rateMax = Math.max(...allTeamMembers.map((member) => member.rateMax))
    return {
      label: labels?.hourlyRates ?? "Hourly rates",
      value: `${formatHourlyRange(rateMin, rateMax)}/h`,
    }
  }

  return {
    label: labels?.pricing ?? "Pricing",
    value: labels?.contactForQuote ?? "Contact for quote",
  }
}

export const OUTCOME_DISPLAY_ORDER: OutcomeId[] = [
  "betacode-ventures",
  "self-managed-tech-teams",
  "team-augmentation",
  "training",
  "support",
]

export function sortOutcomesForDisplay(outcomes: CalculatorOutcome[]): CalculatorOutcome[] {
  const order = new Map(OUTCOME_DISPLAY_ORDER.map((id, index) => [id, index]))
  return [...outcomes].sort(
    (a, b) => (order.get(a.id) ?? 99) - (order.get(b.id) ?? 99)
  )
}

export function getServiceGroupLabel(
  serviceGroupId: string | undefined,
  config: CalculatorConfig = pricingCalculatorConfig
): string | null {
  if (!serviceGroupId) return null
  return config.serviceGroups?.[serviceGroupId]?.label ?? null
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

export function getPricingModelNote(
  pricingModel: PricingModel,
  ui?: PricingUiLabels
): string | null {
  switch (pricingModel) {
    case "hourly":
      return ui?.pricingNotes.hourly ?? "Hourly rates above. Project ranges shown as a reference where applicable."
    case "project":
      return ui?.pricingNotes.project ?? "Ranges based on our standard team configurations. Final pricing depends on scope and requirements."
    case "partnership":
      return ui?.pricingNotes.partnership ?? "Betacode Ventures is an equity partnership—pricing is tailored to your stage and product."
    default:
      return null
  }
}
