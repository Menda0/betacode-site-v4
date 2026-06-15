"use client"

import { useMemo, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { IconArrowLeft, IconArrowRight, IconCheck, IconChevronDown, IconRocket, IconSchool, IconTool, IconUserPlus, IconUsersGroup } from "@tabler/icons-react"
import {
  clearBranchAnswers,
  formatEuroRange,
  formatHourlyRange,
  getAnswersSummary,
  getBriefPriceSummary,
  getOutcomeSummary,
  getPricingModelNote,
  getExpectedBranchingQuestionCount,
  getPricingCalculatorConfig,
  getProductDescriptionQuestion,
  getQuestionPath,
  getServiceGroupLabel,
  getStartQuestion,
  isQuestionFlowComplete,
  resolveOutcomes,
  sortOutcomesForDisplay,
  type CalculatorAnswers,
  type CalculatorConfig,
  type CalculatorOutcome,
  type CalculatorQuestion,
  type OutcomeId,
  type PricingUiLabels,
  type TeamConfiguration,
  type TeamMember,
} from "@/lib/pricing-calculator"
import { CALENDAR_URL } from "@/lib/ventures-content"
import { cn } from "@/lib/utils"

type Phase = "questions" | "results" | "product" | "contact" | "submitted"

const POST_BRANCHING_STEPS = 3

type CalculatorCopy = {
  back: string
  continue: string
  skip: string
  submit: string
  startOver: string
  thankYou: string
  thankYouMessage: string
  bookCall: string
  optional: string
  selectOption: string
  getEstimate: string
  subtitle: string
  title: string
  description: string
  noMatch: string
  recommendedService: string
  recommendedServices: string
  basedOnAnswers: string
  compareOptions: string
  compareOptionsExpanded: string
  talkToUs: string
  seeFullPricing: string
  hide: string
  otherServices: string
  teamConfiguration: string
  profile: string
  regime: string
  rate: string
  pricing: string
  estimatedPrices: string
  exploreVentures: string
}

function buildPricingUiLabels(t: ReturnType<typeof useTranslations<"pricing">>): PricingUiLabels {
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

function buildCalculatorCopy(t: ReturnType<typeof useTranslations<"pricing">>, tc: ReturnType<typeof useTranslations<"common">>): CalculatorCopy {
  return {
    back: t("back"),
    continue: t("continue"),
    skip: t("skip"),
    submit: t("submit"),
    startOver: t("startOver"),
    thankYou: t("thankYou"),
    thankYouMessage: t("thankYouMessage"),
    bookCall: tc("bookCall"),
    optional: tc("optional"),
    selectOption: tc("selectOption"),
    getEstimate: t("getEstimate"),
    subtitle: t("subtitle"),
    title: t("title"),
    description: t("description"),
    noMatch: t("noMatch"),
    recommendedService: t("recommendedService"),
    recommendedServices: t("recommendedServices"),
    basedOnAnswers: t("basedOnAnswers"),
    compareOptions: t("compareOptions"),
    compareOptionsExpanded: t("compareOptionsExpanded"),
    talkToUs: t("talkToUs"),
    seeFullPricing: t("seeFullPricing"),
    hide: t("hide"),
    otherServices: t("otherServices"),
    teamConfiguration: t("teamConfiguration"),
    profile: t("profile"),
    regime: t("regime"),
    rate: t("rate"),
    pricing: t("pricing"),
    estimatedPrices: t("estimatedPrices"),
    exploreVentures: t("exploreVentures"),
  }
}

export function PriceCalculator() {
  const locale = useLocale() as Locale
  const t = useTranslations("pricing")
  const tc = useTranslations("common")
  const config = useMemo(() => getPricingCalculatorConfig(locale), [locale])
  const uiLabels = useMemo(() => buildPricingUiLabels(t), [t])
  const copy = useMemo(() => buildCalculatorCopy(t, tc), [t, tc])
  const startQuestion = useMemo(() => getStartQuestion(config), [config])
  const productDescriptionQuestion = useMemo(() => getProductDescriptionQuestion(config), [config])

  const [wizardStarted, setWizardStarted] = useState(false)
  const [phase, setPhase] = useState<Phase>("questions")
  const [answers, setAnswers] = useState<CalculatorAnswers>({})
  const [contactDetails, setContactDetails] = useState<CalculatorAnswers>({})
  const [currentQuestionId, setCurrentQuestionId] = useState<string>(config.startQuestionId)
  const [outcomes, setOutcomes] = useState<CalculatorOutcome[]>([])

  const questionPath = useMemo(() => getQuestionPath(answers, config), [answers, config])
  const currentQuestion =
    config.questions.find((question) => question.id === currentQuestionId) ?? startQuestion

  const branchingQuestionCount = useMemo(
    () => getExpectedBranchingQuestionCount(answers, config),
    [answers, config]
  )
  const totalSteps = branchingQuestionCount + POST_BRANCHING_STEPS
  const currentQuestionIndex = questionPath.findIndex((question) => question.id === currentQuestionId)
  const questionStep =
    phase === "questions"
      ? currentQuestionIndex + 1
      : phase === "results"
        ? branchingQuestionCount + 1
        : phase === "product"
          ? branchingQuestionCount + 2
          : phase === "contact"
            ? branchingQuestionCount + 3
            : totalSteps

  function advanceFromQuestion(question: CalculatorQuestion, nextAnswers: CalculatorAnswers) {
    const answer = nextAnswers[question.id]
    if (!answer) return

    const selectedOption = question.options.find((option) => option.id === answer)
    const nextId = selectedOption?.nextQuestionId ?? question.nextQuestionId

    if (nextId) {
      setCurrentQuestionId(nextId)
      return
    }

    if (isQuestionFlowComplete(nextAnswers, config)) {
      setOutcomes(resolveOutcomes(nextAnswers, config))
      setPhase("results")
    }
  }

  function handleChoiceSelect(question: CalculatorQuestion, optionId: string) {
    let nextAnswers: CalculatorAnswers = { ...answers, [question.id]: optionId }

    if (question.id === "business-stage") {
      nextAnswers = clearBranchAnswers(nextAnswers, optionId)
    }

    setAnswers(nextAnswers)
    advanceFromQuestion(question, nextAnswers)
  }

  function handleDropdownChange(question: CalculatorQuestion, optionId: string) {
    const nextAnswers = { ...answers, [question.id]: optionId }
    setAnswers(nextAnswers)
  }

  function handleDropdownContinue(question: CalculatorQuestion) {
    if (!answers[question.id]) return
    advanceFromQuestion(question, answers)
  }

  function handleProductDescriptionChange(value: string) {
    setAnswers((prev) => ({ ...prev, [productDescriptionQuestion.id]: value }))
  }

  function handleProductDescriptionContinue() {
    setPhase("contact")
  }

  function handleProductDescriptionSkip() {
    setAnswers((prev) => {
      const nextAnswers = { ...prev }
      delete nextAnswers[productDescriptionQuestion.id]
      return nextAnswers
    })
    setPhase("contact")
  }

  function handleBack() {
    if (phase === "contact") {
      setPhase("product")
      return
    }

    if (phase === "product") {
      setPhase("results")
      return
    }

    if (phase === "results") {
      setPhase("questions")
      const lastQuestion = questionPath[questionPath.length - 1]
      if (lastQuestion) setCurrentQuestionId(lastQuestion.id)
      return
    }

    const currentIndex = questionPath.findIndex((question) => question.id === currentQuestionId)
    if (currentIndex <= 0) return

    const previousQuestion = questionPath[currentIndex - 1]
    const nextAnswers = { ...answers }
    delete nextAnswers[currentQuestionId]
    setAnswers(nextAnswers)
    setCurrentQuestionId(previousQuestion.id)
  }

  function reset() {
    setPhase("questions")
    setAnswers({})
    setContactDetails({})
    setCurrentQuestionId(startQuestion.id)
    setOutcomes([])
    setWizardStarted(false)
  }

  function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPhase("submitted")
  }

  return (
    <section id="price-calculator" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-base/7 font-semibold text-primary-600 uppercase dark:text-primary-400">
            {copy.subtitle}
          </h1>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
            {copy.title}
          </p>
          <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
            {copy.description}
          </p>
        </div>

        <div
          className={cn(
            "mx-auto mt-12",
            wizardStarted && phase === "results" ? "max-w-5xl" : wizardStarted ? "max-w-3xl" : "max-w-2xl"
          )}
        >
          {!wizardStarted ? (
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <button
                type="button"
                onClick={() => setWizardStarted(true)}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400"
              >
                {copy.getEstimate}
                <IconArrowRight className="size-4" aria-hidden="true" />
              </button>
              <a
                href={CALENDAR_URL}
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                {copy.bookCall}
              </a>
            </div>
          ) : (
            <>
              <StepIndicator currentStep={questionStep} totalSteps={totalSteps} />

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
                {phase === "questions" && (
                  <QuestionStep
                    question={currentQuestion}
                    answers={answers}
                    copy={copy}
                    canGoBack={currentQuestionId !== startQuestion.id}
                    onBack={handleBack}
                    onChoiceSelect={handleChoiceSelect}
                    onDropdownChange={handleDropdownChange}
                    onDropdownContinue={handleDropdownContinue}
                  />
                )}

                {phase === "results" && (
                  <ResultsStep
                    answers={answers}
                    outcomes={outcomes}
                    config={config}
                    uiLabels={uiLabels}
                    copy={copy}
                    onBack={handleBack}
                    onContinue={() => setPhase("product")}
                    onReset={reset}
                  />
                )}

                {phase === "product" && (
                  <QuestionStep
                    question={productDescriptionQuestion}
                    answers={answers}
                    copy={copy}
                    canGoBack
                    onBack={handleBack}
                    onTextareaChange={handleProductDescriptionChange}
                    onTextareaContinue={handleProductDescriptionContinue}
                    onTextareaSkip={handleProductDescriptionSkip}
                  />
                )}

                {phase === "contact" && (
                  <ContactStep
                    contactDetails={contactDetails}
                    config={config}
                    copy={copy}
                    onBack={handleBack}
                    onChange={(fieldId, value) =>
                      setContactDetails((prev) => ({ ...prev, [fieldId]: value }))
                    }
                    onSubmit={handleContactSubmit}
                    onReset={reset}
                  />
                )}

                {phase === "submitted" && (
                  <div className="text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-600/10 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
                      <IconCheck className="size-6" aria-hidden="true" />
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{copy.thankYou}</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {copy.thankYouMessage}
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-6 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
                    >
                      {copy.startOver}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-2 sm:gap-4">
      {Array.from({ length: totalSteps }, (_, index) => index + 1).map((value) => (
        <div key={value} className="flex items-center gap-2 sm:gap-4">
          <div
            className={cn(
              "flex size-8 items-center justify-center rounded-full text-sm font-semibold transition-colors",
              currentStep >= value
                ? "bg-primary-600 text-white dark:bg-primary-500"
                : "bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
            )}
          >
            {currentStep > value ? <IconCheck className="size-4" aria-hidden="true" /> : value}
          </div>
          {value < totalSteps && (
            <div
              className={cn(
                "hidden h-0.5 w-8 sm:block sm:w-16",
                currentStep > value ? "bg-primary-600 dark:bg-primary-500" : "bg-gray-200 dark:bg-gray-800"
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function QuestionStep({
  question,
  answers,
  copy,
  canGoBack,
  onBack,
  onChoiceSelect,
  onDropdownChange,
  onDropdownContinue,
  onTextareaChange,
  onTextareaContinue,
  onTextareaSkip,
}: {
  question: CalculatorQuestion
  answers: CalculatorAnswers
  copy: CalculatorCopy
  canGoBack: boolean
  onBack: () => void
  onChoiceSelect?: (question: CalculatorQuestion, optionId: string) => void
  onDropdownChange?: (question: CalculatorQuestion, optionId: string) => void
  onDropdownContinue?: (question: CalculatorQuestion) => void
  onTextareaChange?: (value: string) => void
  onTextareaContinue?: () => void
  onTextareaSkip?: () => void
}) {
  return (
    <div>
      {canGoBack && (
        <button
          type="button"
          onClick={onBack}
          className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <IconArrowLeft className="size-4" aria-hidden="true" />
          {copy.back}
        </button>
      )}

      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{question.title}</h2>
      {question.description && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{question.description}</p>
      )}

      {question.type === "choice" && (
        <div
          className={cn(
            "mt-6 grid gap-4",
            question.options.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2"
          )}
        >
          {question.options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onChoiceSelect?.(question, option.id)}
              className={cn(
                "rounded-xl border p-4 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
                answers[question.id] === option.id
                  ? "border-primary-400 bg-primary-50/70 dark:border-primary-500 dark:bg-primary-800/50"
                  : "border-gray-200 hover:border-primary-300 hover:bg-primary-50/70 dark:border-gray-700 dark:hover:border-primary-500 dark:hover:bg-primary-800/40"
              )}
            >
              <span className="text-base font-semibold text-gray-900 dark:text-white">{option.label}</span>
              {option.description && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{option.description}</p>
              )}
            </button>
          ))}
        </div>
      )}

      {question.type === "dropdown" && (
        <div className="mt-6 space-y-4">
          <select
            id={question.id}
            value={answers[question.id] ?? ""}
            onChange={(event) => onDropdownChange?.(question, event.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 shadow-xs focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="" disabled>{copy.selectOption}</option>
            {question.options.map((option) => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
          <button
            type="button"
            disabled={!answers[question.id]}
            onClick={() => onDropdownContinue?.(question)}
            className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 disabled:pointer-events-none disabled:opacity-50 dark:bg-primary-500 dark:hover:bg-primary-400"
          >
            {copy.continue}
            <IconArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {question.type === "textarea" && (
        <div className="mt-6 space-y-4">
          <textarea
            id={question.id}
            rows={5}
            value={answers[question.id] ?? ""}
            onChange={(event) => onTextareaChange?.(event.target.value)}
            placeholder={question.placeholder}
            className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 shadow-xs placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onTextareaContinue}
              className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400"
            >
              {copy.continue}
              <IconArrowRight className="size-4" aria-hidden="true" />
            </button>
            {question.optional && (
              <button
                type="button"
                onClick={onTextareaSkip}
                className="rounded-md px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                {copy.skip}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ResultsStep({
  answers,
  outcomes,
  config,
  uiLabels,
  copy,
  onBack,
  onContinue,
  onReset,
}: {
  answers: CalculatorAnswers
  outcomes: CalculatorOutcome[]
  config: CalculatorConfig
  uiLabels: PricingUiLabels
  copy: CalculatorCopy
  onBack: () => void
  onContinue: () => void
  onReset: () => void
}) {
  const [expandedId, setExpandedId] = useState<OutcomeId | null>(null)
  const sortedOutcomes = sortOutcomesForDisplay(outcomes)
  const choiceSummary = getAnswersSummary(answers, config, uiLabels)
  const expandedOutcome = expandedId
    ? sortedOutcomes.find((outcome) => outcome.id === expandedId)
    : null

  if (outcomes.length === 0) {
    return (
      <div className="text-center">
        <p className="text-gray-700 dark:text-gray-300">
          {copy.noMatch}
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
        >
          {copy.startOver}
        </button>
      </div>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        <IconArrowLeft className="size-4" aria-hidden="true" />
        {copy.back}
      </button>

      <div className="rounded-xl bg-primary-600/5 p-4 sm:p-5 dark:bg-primary-500/10">
        <p className="text-sm font-medium text-primary-700 uppercase dark:text-primary-300">
          {sortedOutcomes.length > 1 ? copy.recommendedServices : copy.recommendedService}
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          {expandedId ? copy.compareOptionsExpanded : copy.compareOptions}
        </p>

        {choiceSummary.length > 0 && (
          <div className="mt-4 border-t border-primary-200/60 pt-4 dark:border-primary-700/40">
            <p className="text-xs font-medium uppercase tracking-wide text-primary-700 dark:text-primary-300">
              {copy.basedOnAnswers}
            </p>
            <dl className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
              {choiceSummary.map((item) => (
                <div key={item.questionId} className="flex gap-1.5 text-sm">
                  <dt className="text-gray-500 dark:text-gray-400">{item.label}:</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      <div className="mt-6">
        {expandedId && expandedOutcome ? (
          <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
            <div className="min-w-0 flex-1 order-2 lg:order-1">
              <ExpandedServicePanel
                outcome={expandedOutcome}
                config={config}
                uiLabels={uiLabels}
                copy={copy}
                onHide={() => setExpandedId(null)}
              />
            </div>

            {sortedOutcomes.length > 1 && (
              <div
                className="order-1 flex shrink-0 gap-2 overflow-x-auto pb-1 lg:order-2 lg:w-52 lg:flex-col lg:overflow-visible lg:pb-0"
                role="tablist"
                aria-label={copy.otherServices}
              >
                {sortedOutcomes
                  .filter((outcome) => outcome.id !== expandedId)
                  .map((outcome) => (
                    <ServiceTab
                      key={outcome.id}
                      outcome={outcome}
                      uiLabels={uiLabels}
                      onClick={() => setExpandedId(outcome.id)}
                    />
                  ))}
              </div>
            )}
          </div>
        ) : (
          <div className={cn("grid gap-3", sortedOutcomes.length > 1 && "sm:grid-cols-2")}>
            {sortedOutcomes.map((outcome) => (
              <ServiceResultCard
                key={outcome.id}
                outcome={outcome}
                config={config}
                uiLabels={uiLabels}
                copy={copy}
                onSelect={() => setExpandedId(outcome.id)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          {copy.startOver}
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400"
        >
          {copy.talkToUs}
          <IconArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

const OUTCOME_ICON_STYLES: Record<
  OutcomeId,
  { icon: typeof IconUsersGroup; bg: string; text: string }
> = {
  "self-managed-tech-teams": {
    icon: IconUsersGroup,
    bg: "bg-primary-100 dark:bg-primary-900/40",
    text: "text-primary-600 dark:text-primary-400",
  },
  "team-augmentation": {
    icon: IconUserPlus,
    bg: "bg-indigo-100 dark:bg-indigo-900/40",
    text: "text-indigo-600 dark:text-indigo-400",
  },
  support: {
    icon: IconTool,
    bg: "bg-sky-100 dark:bg-sky-900/40",
    text: "text-sky-600 dark:text-sky-400",
  },
  training: {
    icon: IconSchool,
    bg: "bg-amber-100 dark:bg-amber-900/40",
    text: "text-amber-600 dark:text-amber-400",
  },
  "betacode-ventures": {
    icon: IconRocket,
    bg: "bg-purple-100 dark:bg-purple-900/40",
    text: "text-purple-600 dark:text-purple-400",
  },
}

function ServiceResultCard({
  outcome,
  config,
  uiLabels,
  copy,
  onSelect,
}: {
  outcome: CalculatorOutcome
  config: CalculatorConfig
  uiLabels: PricingUiLabels
  copy: CalculatorCopy
  onSelect: () => void
}) {
  const iconStyle = OUTCOME_ICON_STYLES[outcome.id]
  const Icon = iconStyle.icon
  const briefPrice = getBriefPriceSummary(outcome, uiLabels)
  const groupLabel = getServiceGroupLabel(outcome.serviceGroup, config)

  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:border-primary-200 hover:bg-primary-50/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:border-gray-700 dark:bg-gray-900/50 dark:hover:border-primary-800 dark:hover:bg-primary-950/20"
    >
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-lg",
          iconStyle.bg,
          iconStyle.text
        )}
      >
        <Icon className="size-5" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white">{outcome.label}</h3>
            {groupLabel && (
              <span className="mt-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                {groupLabel}
              </span>
            )}
          </div>
          <div className="shrink-0 text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">{briefPrice.label}</p>
            <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">
              {briefPrice.value}
            </p>
          </div>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {getOutcomeSummary(outcome)}
        </p>
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-600 dark:text-primary-400">
          {copy.seeFullPricing}
          <IconChevronDown className="size-3.5 -rotate-90" aria-hidden="true" />
        </span>
      </div>
    </button>
  )
}

function ExpandedServicePanel({
  outcome,
  config,
  uiLabels,
  copy,
  onHide,
}: {
  outcome: CalculatorOutcome
  config: CalculatorConfig
  uiLabels: PricingUiLabels
  copy: CalculatorCopy
  onHide: () => void
}) {
  const iconStyle = OUTCOME_ICON_STYLES[outcome.id]
  const Icon = iconStyle.icon
  const briefPrice = getBriefPriceSummary(outcome, uiLabels)
  const groupLabel = getServiceGroupLabel(outcome.serviceGroup, config)

  return (
    <div
      className="w-full rounded-xl border border-primary-300 bg-white p-4 shadow-sm ring-1 ring-primary-200 sm:p-5 dark:border-primary-600 dark:bg-gray-900/50 dark:ring-primary-800"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-lg",
              iconStyle.bg,
              iconStyle.text
            )}
          >
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{outcome.label}</h3>
            {groupLabel && (
              <span className="mt-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                {groupLabel}
              </span>
            )}
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{getOutcomeSummary(outcome)}</p>
            <p className="mt-2 text-sm font-semibold text-primary-600 dark:text-primary-400">
              {briefPrice.label}: {briefPrice.value}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onHide}
          className="shrink-0 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          {copy.hide}
        </button>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-5 dark:border-gray-800">
        <OutcomePricingDetails outcome={outcome} uiLabels={uiLabels} copy={copy} />
      </div>
    </div>
  )
}

function ServiceTab({
  outcome,
  uiLabels,
  onClick,
}: {
  outcome: CalculatorOutcome
  uiLabels: PricingUiLabels
  onClick: () => void
}) {
  const iconStyle = OUTCOME_ICON_STYLES[outcome.id]
  const Icon = iconStyle.icon
  const briefPrice = getBriefPriceSummary(outcome, uiLabels)

  return (
    <button
      type="button"
      role="tab"
      onClick={onClick}
      className="flex min-w-[9rem] shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white p-3 text-left transition-all hover:border-primary-300 hover:bg-primary-50/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:border-gray-700 dark:bg-gray-900/50 dark:hover:border-primary-700 dark:hover:bg-primary-950/30 lg:min-w-0 lg:w-full"
    >
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-md",
          iconStyle.bg,
          iconStyle.text
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{outcome.label}</p>
        <p className="truncate text-xs text-primary-600 dark:text-primary-400">{briefPrice.value}</p>
      </div>
    </button>
  )
}

function OutcomePricingDetails({
  outcome,
  uiLabels,
  copy,
}: {
  outcome: CalculatorOutcome
  uiLabels: PricingUiLabels
  copy: CalculatorCopy
}) {
  const pricingNote = getPricingModelNote(outcome.pricingModel, uiLabels)
  const teamConfigurations = outcome.teamConfigurations ?? []
  const showTeamConfigurations = teamConfigurations.length > 0
  const showTeamTable = outcome.teamComposition.length > 0
  const showRate = Boolean(outcome.rate)
  const showEstimates = outcome.estimates.length > 0

  return (
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-300">{outcome.description}</p>

      {showTeamConfigurations && (
        <div className="mt-4 space-y-6">
          {teamConfigurations.map((configItem) => (
            <TeamConfigurationSection key={configItem.id} config={configItem} copy={copy} />
          ))}
        </div>
      )}

      {(showTeamTable || showRate || showEstimates) && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {showTeamTable && (
            <TeamCompositionTable members={outcome.teamComposition} copy={copy} />
          )}

          {showRate && outcome.rate && (
            <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">{copy.pricing}</p>
              <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                {formatHourlyRange(outcome.rate.rateMin, outcome.rate.rateMax)}/h
              </p>
              {outcome.rate.regime && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{outcome.rate.regime}</p>
              )}
            </div>
          )}

          {showEstimates && (
            <EstimatesGrid estimates={outcome.estimates} copy={copy} />
          )}
        </div>
      )}

      {pricingNote && (
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">{pricingNote}</p>
      )}

      {outcome.pricingModel === "partnership" && (
        <div className="mt-6">
          <Link
            href="/betacode-ventures"
            className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-white dark:text-purple-900 dark:hover:bg-purple-50 dark:focus-visible:outline-white"
          >
            {copy.exploreVentures}
            <IconArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  )
}

function TeamConfigurationSection({ config, copy }: { config: TeamConfiguration; copy: CalculatorCopy }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-800/30">
      <h4 className="text-base font-semibold text-gray-900 dark:text-white">{config.label}</h4>
      {config.description && (
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{config.description}</p>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {config.teamComposition.length > 0 && (
          <TeamCompositionTable members={config.teamComposition} copy={copy} />
        )}
        {config.estimates.length > 0 && (
          <EstimatesGrid estimates={config.estimates} copy={copy} />
        )}
      </div>
    </div>
  )
}

function TeamCompositionTable({ members, copy }: { members: TeamMember[]; copy: CalculatorCopy }) {
  return (
    <div className="w-full rounded-lg bg-gray-50 p-3 sm:col-span-2 dark:bg-gray-800/50">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {copy.teamConfiguration}
      </p>
      <div className="mt-2 w-full overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left dark:border-gray-700">
              <th className="w-[45%] pb-1.5 pr-3 font-semibold text-primary-600 dark:text-primary-400">{copy.profile}</th>
              <th className="w-[30%] pb-1.5 pr-3 font-semibold text-primary-600 dark:text-primary-400">{copy.regime}</th>
              <th className="w-[25%] pb-1.5 font-semibold text-primary-600 dark:text-primary-400">{copy.rate}</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {members.map((member) => (
              <tr key={member.profile} className="border-b border-gray-100 last:border-0 dark:border-gray-800">
                <td className="py-2 pr-3">{member.profile}</td>
                <td className="py-2 pr-3">{member.regime}</td>
                <td className="py-2">{formatHourlyRange(member.rateMin, member.rateMax)}/h</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function EstimatesGrid({
  estimates,
  copy,
}: {
  estimates: { label: string; min: number; max: number }[]
  copy: CalculatorCopy
}) {
  return (
    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50 sm:col-span-2">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {copy.estimatedPrices}
      </p>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        {estimates.map((estimate) => (
          <div key={estimate.label}>
            <p className="text-sm text-gray-600 dark:text-gray-400">{estimate.label}</p>
            <p className="mt-0.5 text-base font-semibold text-gray-900 dark:text-white">
              {formatEuroRange(estimate.min, estimate.max)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContactStep({
  contactDetails,
  config,
  copy,
  onBack,
  onChange,
  onSubmit,
  onReset,
}: {
  contactDetails: CalculatorAnswers
  config: CalculatorConfig
  copy: CalculatorCopy
  onBack: () => void
  onChange: (fieldId: string, value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onReset: () => void
}) {
  const contact = config.contact

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        <IconArrowLeft className="size-4" aria-hidden="true" />
        {copy.back}
      </button>

      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{contact.title}</h2>
      {contact.description && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{contact.description}</p>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {contact.fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.optional && (
                <span className="ml-1 text-gray-400 dark:text-gray-500">({copy.optional})</span>
              )}
            </label>
            {field.description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{field.description}</p>
            )}
            <input
              id={field.id}
              type={field.type}
              value={contactDetails[field.id] ?? ""}
              onChange={(event) => onChange(field.id, event.target.value)}
              placeholder={field.placeholder}
              required={!field.optional}
              className="mt-1.5 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 shadow-xs placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>
        ))}

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onReset}
            className="text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            {copy.startOver}
          </button>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={CALENDAR_URL}
              className="inline-flex items-center justify-center rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400 animate-bounce"
            >
              {copy.bookCall}
            </a>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400"
            >
              {copy.submit}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
