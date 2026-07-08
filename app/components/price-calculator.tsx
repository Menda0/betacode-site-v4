"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { IconArrowLeft, IconArrowRight, IconCalculator, IconCheck, IconChevronDown, IconRocket, IconSchool, IconTool, IconUserPlus, IconUsersGroup } from "@tabler/icons-react"
import {
  clearBranchAnswers,
  formatEuroRange,
  formatHourlyRange,
  getAnswersSummary,
  getBriefPriceSummary,
  getOutcomeSummary,
  getPricingModelNote,
  getExpectedBranchingQuestionCount,
  getProductDescriptionQuestion,
  getQuestionPath,
  getServiceGroupLabel,
  getStartQuestion,
  isQuestionFlowComplete,
  pricingCalculatorConfig,
  resolveOutcomes,
  sortOutcomesForDisplay,
  type CalculatorAnswers,
  type CalculatorOutcome,
  type CalculatorQuestion,
  type OutcomeId,
  type TeamConfiguration,
  type TeamMember,
} from "@/lib/pricing-calculator"
import { CALENDAR_URL } from "@/lib/ventures-content"
import { cn } from "@/lib/utils"

type Phase = "questions" | "results" | "product" | "contact" | "submitted"

const productDescriptionQuestion = getProductDescriptionQuestion()
const POST_BRANCHING_STEPS = 3

const CARD_HEIGHT_CLASS = "h-[min(36rem,calc(100dvh-14rem))]"
const CARD_INNER_MIN_HEIGHT_CLASS = "min-h-[min(36rem,calc(100dvh-14rem))]"
const PRODUCT_HELP_QUESTION_IDS = new Set(["product-help-startup", "product-help-established"])

function isProductHelpQuestion(questionId: string) {
  return PRODUCT_HELP_QUESTION_IDS.has(questionId)
}

export function PriceCalculator() {
  const t = useTranslations("pricing")
  const startQuestion = getStartQuestion()
  const wizardRef = useRef<HTMLDivElement>(null)
  const [showWizard, setShowWizard] = useState(false)
  const [phase, setPhase] = useState<Phase>("questions")
  const [answers, setAnswers] = useState<CalculatorAnswers>({})
  const [contactDetails, setContactDetails] = useState<CalculatorAnswers>({})
  const [currentQuestionId, setCurrentQuestionId] = useState<string>(startQuestion.id)
  const [outcomes, setOutcomes] = useState<CalculatorOutcome[]>([])
  const [expandedOutcomeId, setExpandedOutcomeId] = useState<OutcomeId | null>(null)

  const questionPath = useMemo(() => getQuestionPath(answers), [answers])
  const currentQuestion =
    pricingCalculatorConfig.questions.find((question) => question.id === currentQuestionId) ?? startQuestion

  const branchingQuestionCount = useMemo(
    () => getExpectedBranchingQuestionCount(answers),
    [answers]
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

  const isCompactQuestionStep =
    phase === "questions" && isProductHelpQuestion(currentQuestionId)

  const hasCardFooter = phase === "results" || phase === "contact"
  const showResultsScrollFade = phase === "results" && expandedOutcomeId !== null
  const { scrollRef: cardScrollRef, showFade: showCardScrollFade, onScroll: onCardScroll } =
    useScrollFade(showResultsScrollFade)

  function advanceFromQuestion(question: CalculatorQuestion, nextAnswers: CalculatorAnswers) {
    const answer = nextAnswers[question.id]
    if (!answer) return

    const selectedOption = question.options.find((option) => option.id === answer)
    const nextId = selectedOption?.nextQuestionId ?? question.nextQuestionId

    if (nextId) {
      setCurrentQuestionId(nextId)
      return
    }

    if (isQuestionFlowComplete(nextAnswers)) {
      setOutcomes(resolveOutcomes(nextAnswers))
      setExpandedOutcomeId(null)
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
      setExpandedOutcomeId(null)
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
    setExpandedOutcomeId(null)
  }

  function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPhase("submitted")
  }

  function handleStartWizard() {
    setShowWizard(true)
    requestAnimationFrame(() => {
      wizardRef.current?.focus()
    })
  }

  return (
    <section
      id="price-calculator"
      className="flex min-h-[calc(100dvh-4rem)] flex-col bg-gray-50 dark:bg-gray-950"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-6 py-8 lg:px-8">
        {!showWizard ? (
          <div className="mx-auto w-full max-w-2xl text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary-600/10 text-primary-600 ring-1 ring-primary-600/20 dark:bg-primary-500/10 dark:text-primary-400 dark:ring-primary-500/20">
              <IconCalculator className="size-7" aria-hidden="true" />
            </div>
            <p className="mt-6 text-base/7 font-semibold text-primary-600 uppercase dark:text-primary-400">
              {t("subtitle")}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
              {t("description")}
            </p>
            <button
              type="button"
              onClick={handleStartWizard}
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-600/20 transition hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:shadow-primary-500/20 dark:hover:bg-primary-400"
            >
              {t("getEstimate")}
              <IconArrowRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div
            ref={wizardRef}
            tabIndex={-1}
            className="flex w-full max-w-5xl animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-500 focus:outline-none"
          >
            <div className="flex w-full flex-col">
              <StepIndicator currentStep={questionStep} totalSteps={totalSteps} />

              <div
                className={cn(
                  "flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900",
                  CARD_HEIGHT_CLASS
                )}
              >
                <div className="relative min-h-0 flex-1">
                  <div
                    ref={cardScrollRef}
                    onScroll={onCardScroll}
                    className="h-full overflow-y-auto"
                  >
                  <div
                    className={cn(
                      "mx-auto flex w-full flex-col",
                      !hasCardFooter && "justify-center",
                      isCompactQuestionStep ? "p-4 sm:p-5" : "p-6 sm:p-8",
                      !hasCardFooter && CARD_INNER_MIN_HEIGHT_CLASS,
                      phase !== "results" && "max-w-3xl"
                    )}
                  >
                  {phase === "questions" && (
                    <QuestionStep
                      question={currentQuestion}
                      answers={answers}
                      compact={isCompactQuestionStep}
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
                      expandedId={expandedOutcomeId}
                      onExpandedChange={setExpandedOutcomeId}
                      onBack={handleBack}
                    />
                  )}

                  {phase === "product" && (
                    <QuestionStep
                      question={productDescriptionQuestion}
                      answers={answers}
                      canGoBack
                      continueLabel={t("continue")}
                      onBack={handleBack}
                      onTextareaChange={handleProductDescriptionChange}
                      onTextareaContinue={handleProductDescriptionContinue}
                      onTextareaSkip={handleProductDescriptionSkip}
                    />
                  )}

                  {phase === "contact" && (
                    <ContactStep
                      contactDetails={contactDetails}
                      onBack={handleBack}
                      onChange={(fieldId, value) =>
                        setContactDetails((prev) => ({ ...prev, [fieldId]: value }))
                      }
                      onSubmit={handleContactSubmit}
                    />
                  )}

                  {phase === "submitted" && (
                    <div className="text-center">
                      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-600/10 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
                        <IconCheck className="size-6" aria-hidden="true" />
                      </div>
                      <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                        {t("thankYou")}
                      </h2>
                      <p className="mt-2 max-w-sm text-gray-600 dark:text-gray-300">
                        {t("thankYouMessage")}
                      </p>
                      <button
                        type="button"
                        onClick={reset}
                        className="mt-6 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
                      >
                        {t("startOver")}
                      </button>
                    </div>
                  )}
                  </div>
                  </div>

                  <ScrollBottomFade visible={showCardScrollFade} />
                </div>

                {phase === "results" && outcomes.length > 0 && (
                  <CardFooter>
                    <button
                      type="button"
                      onClick={reset}
                      className="text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                      {t("startOver")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhase("product")}
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400"
                    >
                      {t("continue")}
                      <IconArrowRight className="size-4" aria-hidden="true" />
                    </button>
                  </CardFooter>
                )}

                {phase === "results" && outcomes.length === 0 && (
                  <CardFooter>
                    <button
                      type="button"
                      onClick={reset}
                      className="ml-auto text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                      {t("startOver")}
                    </button>
                  </CardFooter>
                )}

                {phase === "contact" && (
                  <CardFooter>
                    <button
                      type="button"
                      onClick={reset}
                      className="text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                      {t("startOver")}
                    </button>
                    <button
                      type="submit"
                      form="price-calculator-contact-form"
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400"
                    >
                      {t("submit")}
                    </button>
                  </CardFooter>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function useScrollFade(active: boolean) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showFade, setShowFade] = useState(false)

  const update = useCallback(() => {
    const element = scrollRef.current
    if (!element || !active) {
      setShowFade(false)
      return
    }

    const hasOverflow = element.scrollHeight > element.clientHeight + 1
    const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 8
    setShowFade(hasOverflow && !atBottom)
  }, [active])

  useEffect(() => {
    update()
    const element = scrollRef.current
    if (!element) return

    const observer = new ResizeObserver(update)
    observer.observe(element)

    const content = element.firstElementChild
    if (content) observer.observe(content)

    return () => observer.disconnect()
  }, [update])

  return { scrollRef, showFade, onScroll: update }
}

function ScrollBottomFade({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-linear-to-t from-white via-white/80 to-transparent transition-opacity duration-300 dark:from-gray-900 dark:via-gray-900/80",
        visible ? "opacity-100" : "opacity-0"
      )}
    />
  )
}

function CardFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky bottom-0 z-10 shrink-0 border-t border-gray-200/80 bg-white/75 p-4 backdrop-blur-md dark:border-gray-700/80 dark:bg-gray-900/75 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {children}
      </div>
    </div>
  )
}

function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="mb-6 flex shrink-0 items-center justify-center gap-2 sm:gap-4">
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
  canGoBack,
  compact = false,
  continueLabel = "Continue",
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
  canGoBack: boolean
  compact?: boolean
  continueLabel?: string
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
          className="mb-3 inline-flex shrink-0 items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <IconArrowLeft className="size-4" aria-hidden="true" />
          Back
        </button>
      )}

      <div className="shrink-0">
        <h2
          className={cn(
            "font-semibold text-gray-900 dark:text-white",
            compact ? "text-lg" : "text-xl"
          )}
        >
          {question.title}
        </h2>
        {question.description && (
          <p
            className={cn(
              "text-gray-600 dark:text-gray-400",
              compact ? "mt-1 text-xs leading-relaxed" : "mt-2 text-sm"
            )}
          >
            {question.description}
          </p>
        )}
      </div>

      {question.type === "choice" && (
        <div
          className={cn(
            "grid sm:grid-cols-2",
            compact ? "mt-4 gap-2.5" : "mt-6 gap-4"
          )}
        >
          {question.options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onChoiceSelect?.(question, option.id)}
              className={cn(
                "rounded-xl border text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
                compact ? "rounded-lg p-3" : "p-4",
                option.id === "help-me-decide" && "sm:col-span-2",
                answers[question.id] === option.id
                  ? "border-primary-400 bg-primary-50/70 dark:border-primary-500 dark:bg-primary-800/50"
                  : "border-gray-200 hover:border-primary-300 hover:bg-primary-50/70 dark:border-gray-700 dark:hover:border-primary-500 dark:hover:bg-primary-800/40"
              )}
            >
              <span
                className={cn(
                  "font-semibold text-gray-900 dark:text-white",
                  compact ? "text-sm" : "text-base"
                )}
              >
                {option.label}
              </span>
              {option.description && (
                <p
                  className={cn(
                    "text-gray-600 dark:text-gray-300",
                    compact ? "mt-1 text-xs leading-relaxed" : "mt-2 text-sm"
                  )}
                >
                  {option.description}
                </p>
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
            <option value="" disabled>Select an option</option>
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
            Continue
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
              {continueLabel}
              <IconArrowRight className="size-4" aria-hidden="true" />
            </button>
            {question.optional && (
              <button
                type="button"
                onClick={onTextareaSkip}
                className="rounded-md px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Skip
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
  expandedId,
  onExpandedChange,
  onBack,
}: {
  answers: CalculatorAnswers
  outcomes: CalculatorOutcome[]
  expandedId: OutcomeId | null
  onExpandedChange: (id: OutcomeId | null) => void
  onBack: () => void
}) {
  const sortedOutcomes = sortOutcomesForDisplay(outcomes)
  const choiceSummary = getAnswersSummary(answers)
  const expandedOutcome = expandedId
    ? sortedOutcomes.find((outcome) => outcome.id === expandedId)
    : null

  if (outcomes.length === 0) {
    return (
      <div className="text-center">
        <p className="text-gray-700 dark:text-gray-300">
          We couldn&apos;t match your answers to a recommendation. Try adjusting your responses or book a call with us.
        </p>
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
        Back
      </button>

      {choiceSummary.length > 0 && (
        <div className="rounded-xl bg-primary-600/5 p-4 sm:p-5 dark:bg-primary-500/10">
          <p className="text-xs font-medium uppercase tracking-wide text-primary-700 dark:text-primary-300">
            Based on your answers
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

      <div className={cn(choiceSummary.length > 0 && "mt-6")}>
        {expandedId && expandedOutcome ? (
          <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
            <div className="min-w-0 flex-1 order-2 lg:order-1">
              <ExpandedServicePanel outcome={expandedOutcome} onHide={() => onExpandedChange(null)} />
            </div>

            {sortedOutcomes.length > 1 && (
              <div
                className="order-1 flex shrink-0 gap-2 overflow-x-auto pb-1 lg:order-2 lg:w-52 lg:flex-col lg:overflow-visible lg:pb-0"
                role="tablist"
                aria-label="Other services"
              >
                {sortedOutcomes
                  .filter((outcome) => outcome.id !== expandedId)
                  .map((outcome) => (
                    <ServiceTab
                      key={outcome.id}
                      outcome={outcome}
                      onClick={() => onExpandedChange(outcome.id)}
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
                onSelect={() => onExpandedChange(outcome.id)}
              />
            ))}
          </div>
        )}
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
  onSelect,
}: {
  outcome: CalculatorOutcome
  onSelect: () => void
}) {
  const iconStyle = OUTCOME_ICON_STYLES[outcome.id]
  const Icon = iconStyle.icon
  const briefPrice = getBriefPriceSummary(outcome)
  const groupLabel = getServiceGroupLabel(outcome.serviceGroup)

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
          See full pricing
          <IconChevronDown className="size-3.5 -rotate-90" aria-hidden="true" />
        </span>
      </div>
    </button>
  )
}

function ExpandedServicePanel({
  outcome,
  onHide,
}: {
  outcome: CalculatorOutcome
  onHide: () => void
}) {
  const iconStyle = OUTCOME_ICON_STYLES[outcome.id]
  const Icon = iconStyle.icon
  const briefPrice = getBriefPriceSummary(outcome)
  const groupLabel = getServiceGroupLabel(outcome.serviceGroup)

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
          Hide
        </button>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-5 dark:border-gray-800">
        <OutcomePricingDetails outcome={outcome} />
      </div>
    </div>
  )
}

function ServiceTab({
  outcome,
  onClick,
}: {
  outcome: CalculatorOutcome
  onClick: () => void
}) {
  const iconStyle = OUTCOME_ICON_STYLES[outcome.id]
  const Icon = iconStyle.icon
  const briefPrice = getBriefPriceSummary(outcome)

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

function OutcomePricingDetails({ outcome }: { outcome: CalculatorOutcome }) {
  const pricingNote = getPricingModelNote(outcome.pricingModel)
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
          {teamConfigurations.map((config) => (
            <TeamConfigurationSection key={config.id} config={config} />
          ))}
        </div>
      )}

      {(showTeamTable || showRate || showEstimates) && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {showTeamTable && (
            <TeamCompositionTable members={outcome.teamComposition} />
          )}

          {showRate && outcome.rate && (
            <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Pricing</p>
              <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                {formatHourlyRange(outcome.rate.rateMin, outcome.rate.rateMax)}/h
              </p>
              {outcome.rate.regime && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{outcome.rate.regime}</p>
              )}
            </div>
          )}

          {showEstimates && (
            <EstimatesGrid estimates={outcome.estimates} />
          )}
        </div>
      )}

      {pricingNote && (
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">{pricingNote}</p>
      )}

      <div className="mt-6">
        {outcome.pricingModel === "partnership" ? (
          <Link
            href="/betacode-ventures"
            className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-white dark:text-purple-900 dark:hover:bg-purple-50 dark:focus-visible:outline-white"
          >
            Explore Betacode Ventures
            <IconArrowRight className="size-4" aria-hidden="true" />
          </Link>
        ) : (
          <Link
            href={CALENDAR_URL}
            className="inline-flex items-center justify-center rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400 animate-bounce"
          >
            Book a call
          </Link>
        )}
      </div>
    </div>
  )
}

function TeamConfigurationSection({ config }: { config: TeamConfiguration }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-800/30">
      <h4 className="text-base font-semibold text-gray-900 dark:text-white">{config.label}</h4>
      {config.description && (
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{config.description}</p>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {config.teamComposition.length > 0 && (
          <TeamCompositionTable members={config.teamComposition} />
        )}
        {config.estimates.length > 0 && (
          <EstimatesGrid estimates={config.estimates} />
        )}
      </div>
    </div>
  )
}

function TeamCompositionTable({ members }: { members: TeamMember[] }) {
  return (
    <div className="w-full rounded-lg bg-gray-50 p-3 sm:col-span-2 dark:bg-gray-800/50">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Team configuration
      </p>
      <div className="mt-2 w-full overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left dark:border-gray-700">
              <th className="w-[45%] pb-1.5 pr-3 font-semibold text-primary-600 dark:text-primary-400">Profile</th>
              <th className="w-[30%] pb-1.5 pr-3 font-semibold text-primary-600 dark:text-primary-400">Regime</th>
              <th className="w-[25%] pb-1.5 font-semibold text-primary-600 dark:text-primary-400">Rate</th>
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
}: {
  estimates: { label: string; min: number; max: number }[]
}) {
  return (
    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50 sm:col-span-2">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Estimated prices
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
  onBack,
  onChange,
  onSubmit,
}: {
  contactDetails: CalculatorAnswers
  onBack: () => void
  onChange: (fieldId: string, value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  const contact = pricingCalculatorConfig.contact

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        <IconArrowLeft className="size-4" aria-hidden="true" />
        Back
      </button>

      <h2 className="text-xl font-semibold text-foreground">{contact.title}</h2>
      {contact.description && (
        <p className="mt-2 text-sm text-muted-foreground">{contact.description}</p>
      )}

      <form id="price-calculator-contact-form" onSubmit={onSubmit} className="mt-6 space-y-4">
        {contact.fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <div className="space-y-1">
              <label
                htmlFor={field.id}
                className="block text-sm font-medium leading-none text-foreground"
              >
                {field.label}
                {field.optional && (
                  <span className="ml-1 font-normal text-muted-foreground">(optional)</span>
                )}
              </label>
              {field.description && (
                <p
                  id={`${field.id}-description`}
                  className="text-xs leading-normal text-muted-foreground"
                >
                  {field.description}
                </p>
              )}
            </div>
            <input
              id={field.id}
              type={field.type}
              value={contactDetails[field.id] ?? ""}
              onChange={(event) => onChange(field.id, event.target.value)}
              placeholder={field.placeholder}
              required={!field.optional}
              aria-describedby={field.description ? `${field.id}-description` : undefined}
              className="block w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground shadow-xs placeholder:text-muted-foreground focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
        ))}
      </form>
    </div>
  )
}
