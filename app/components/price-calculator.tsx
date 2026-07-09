"use client"

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"
import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { IconArrowLeft, IconArrowRight, IconBox, IconBuilding, IconCalculator, IconCheck, IconChevronDown, IconCompass, IconListDetails, IconPlayerSkipForward, IconRefresh, IconRocket, IconSchool, IconTool, IconUserPlus, IconUsersGroup } from "@tabler/icons-react"
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
  type AnswerSummaryItem,
  type CalculatorAnswers,
  type CalculatorOutcome,
  type CalculatorQuestion,
  type OutcomeId,
  type TeamConfiguration,
  type TeamMember,
} from "@/lib/pricing-calculator"
import { cn } from "@/lib/utils"

type Phase = "questions" | "results" | "product" | "contact" | "submitted"

const productDescriptionQuestion = getProductDescriptionQuestion()
const POST_BRANCHING_STEPS = 3

const CARD_HEIGHT_CLASS =
  "h-[min(36rem,calc(100dvh-8rem))] sm:h-[min(36rem,calc(100dvh-11rem))] lg:h-[min(36rem,calc(100dvh-14rem))]"
const CARD_INNER_MIN_HEIGHT_CLASS =
  "min-h-[min(36rem,calc(100dvh-8rem))] sm:min-h-[min(36rem,calc(100dvh-11rem))] lg:min-h-[min(36rem,calc(100dvh-14rem))]"
const PRODUCT_HELP_QUESTION_IDS = new Set(["product-help-startup", "product-help-established"])

function isProductHelpQuestion(questionId: string) {
  return PRODUCT_HELP_QUESTION_IDS.has(questionId)
}

const FULL_WIDTH_CHOICE_OPTION_IDS = new Set(["help-me-decide"])

function getChoiceOptionColSpan(
  options: CalculatorQuestion["options"],
  optionId: string
) {
  if (FULL_WIDTH_CHOICE_OPTION_IDS.has(optionId)) {
    return "sm:col-span-2"
  }

  const regularOptions = options.filter(
    (option) => !FULL_WIDTH_CHOICE_OPTION_IDS.has(option.id)
  )
  const regularIndex = regularOptions.findIndex((option) => option.id === optionId)
  if (regularIndex === -1) return undefined

  const isLastRegular = regularIndex === regularOptions.length - 1
  const hasOddRegularCount = regularOptions.length % 2 === 1

  if (isLastRegular && hasOddRegularCount) {
    return "sm:col-span-2"
  }

  return undefined
}

const CHOICE_OPTION_ICONS: Record<
  string,
  { icon: typeof IconRocket; bg: string; text: string }
> = {
  "business-stage:startup": {
    icon: IconRocket,
    bg: "bg-emerald-100 dark:bg-emerald-900/40",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  "business-stage:established": {
    icon: IconBuilding,
    bg: "bg-amber-100 dark:bg-amber-900/40",
    text: "text-amber-600 dark:text-amber-400",
  },
  "product-help-startup:develop-mvp": {
    icon: IconRocket,
    bg: "bg-primary-100 dark:bg-primary-900/40",
    text: "text-primary-600 dark:text-primary-400",
  },
  "product-help-startup:create-tech-team": {
    icon: IconUsersGroup,
    bg: "bg-primary-100 dark:bg-primary-900/40",
    text: "text-primary-600 dark:text-primary-400",
  },
  "product-help-startup:technical-support": {
    icon: IconTool,
    bg: "bg-sky-100 dark:bg-sky-900/40",
    text: "text-sky-600 dark:text-sky-400",
  },
  "product-help-startup:help-me-decide": {
    icon: IconCompass,
    bg: "bg-gray-100 dark:bg-gray-800/60",
    text: "text-gray-600 dark:text-gray-400",
  },
  "product-help-established:new-product": {
    icon: IconBox,
    bg: "bg-purple-100 dark:bg-purple-900/40",
    text: "text-purple-600 dark:text-purple-400",
  },
  "product-help-established:modernize": {
    icon: IconRefresh,
    bg: "bg-indigo-100 dark:bg-indigo-900/40",
    text: "text-indigo-600 dark:text-indigo-400",
  },
  "product-help-established:team-augmentation": {
    icon: IconUserPlus,
    bg: "bg-indigo-100 dark:bg-indigo-900/40",
    text: "text-indigo-600 dark:text-indigo-400",
  },
  "product-help-established:technical-support": {
    icon: IconTool,
    bg: "bg-sky-100 dark:bg-sky-900/40",
    text: "text-sky-600 dark:text-sky-400",
  },
  "product-help-established:help-me-decide": {
    icon: IconCompass,
    bg: "bg-gray-100 dark:bg-gray-800/60",
    text: "text-gray-600 dark:text-gray-400",
  },
}

function getChoiceOptionIcon(questionId: string, optionId: string) {
  return CHOICE_OPTION_ICONS[`${questionId}:${optionId}`]
}

function getDefaultExpandedOutcomeId(outcomes: CalculatorOutcome[]): OutcomeId | null {
  return sortOutcomesForDisplay(outcomes)[0]?.id ?? null
}

function PricingHeroBackground() {
  return (
    <>
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-256 w-full mask-[radial-gradient(32rem_32rem_at_center,white,transparent)] stroke-gray-200 dark:stroke-white/10"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="pricing-hero-grid"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-50 dark:fill-gray-800">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect fill="url(#pricing-hero-grid)" width="100%" height="100%" strokeWidth={0} />
      </svg>
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
      >
        <div
          style={{
            clipPath:
              "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
          }}
          className="aspect-801/1036 w-200.25 bg-linear-to-tr from-primary-400 to-primary-600 opacity-30 dark:from-primary-600 dark:to-primary-800 dark:opacity-25"
        />
      </div>
    </>
  )
}

function PricingIntroContent({
  variant = "hero",
  onStart,
}: {
  variant?: "hero" | "below"
  onStart?: () => void
}) {
  const t = useTranslations("pricing")
  const isHero = variant === "hero"

  return (
    <div className="mx-auto w-full max-w-2xl text-center">
      {isHero && (
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary-600/10 text-primary-600 ring-1 ring-primary-600/20 dark:bg-primary-500/10 dark:text-primary-400 dark:ring-primary-500/20">
          <IconCalculator className="size-7" aria-hidden="true" />
        </div>
      )}
      <p
        className={cn(
          "font-semibold text-primary-600 uppercase dark:text-primary-400",
          isHero ? "mt-6 text-base/7" : "text-sm/6"
        )}
      >
        {t("subtitle")}
      </p>
      {isHero ? (
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
          {t("title")}
        </h1>
      ) : (
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-3xl dark:text-white">
          {t("title")}
        </h2>
      )}
      <p
        className={cn(
          "text-gray-600 dark:text-gray-300",
          isHero ? "mt-6 text-lg/8" : "mt-3 text-base/7"
        )}
      >
        {t("description")}
      </p>
      {isHero && onStart && (
        <button
          type="button"
          onClick={onStart}
          className="mt-10 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-600/20 transition hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:shadow-primary-500/20 dark:hover:bg-primary-400"
        >
          {t("getEstimate")}
          <IconArrowRight className="size-5" aria-hidden="true" />
        </button>
      )}
    </div>
  )
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const locale = useLocale()

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

  const hasCardFooter = phase === "results" || phase === "contact" || phase === "product"
  const shouldCenterCardContent = !hasCardFooter || phase === "product"
  const enableCardScrollFade =
    (phase === "results" && expandedOutcomeId !== null) || isCompactQuestionStep
  const { scrollRef: cardScrollRef, showFade: showCardScrollFade, onScroll: onCardScroll } =
    useScrollFade(enableCardScrollFade)

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
      const resolvedOutcomes = resolveOutcomes(nextAnswers)
      setOutcomes(resolvedOutcomes)
      setExpandedOutcomeId(getDefaultExpandedOutcomeId(resolvedOutcomes))
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
      setExpandedOutcomeId(getDefaultExpandedOutcomeId(outcomes))
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
    setIsSubmitting(false)
    setSubmitError(null)
  }

  async function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError(null)
    setIsSubmitting(true)

    const name = contactDetails.name?.trim()
    const email = contactDetails.email?.trim()
    const website = contactDetails.website?.trim()

    if (!name || !email) {
      setSubmitError("Please fill in your name and email.")
      setIsSubmitting(false)
      return
    }

    const priceSummary = outcomes
      .map((outcome) => {
        const brief = getBriefPriceSummary(outcome)
        return `${getOutcomeSummary(outcome)} — ${brief.label}: ${brief.value}`
      })
      .join(" | ")

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: {
            name,
            email,
            website: website || undefined,
          },
          answers,
          outcomes: outcomes.map((outcome) => outcome.id),
          answerSummary: getAnswersSummary(answers),
          priceSummary,
          locale,
        }),
      })

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(data?.error ?? "Failed to submit your details. Please try again.")
      }

      setPhase("submitted")
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to submit your details. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
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
      className={cn(
        "relative isolate flex flex-col",
        showWizard ? "bg-gray-50 dark:bg-gray-950" : "min-h-[calc(100dvh-4rem)] bg-white dark:bg-gray-900"
      )}
    >
      {!showWizard && <PricingHeroBackground />}

      <div
        className={cn(
          "relative mx-auto flex w-full max-w-7xl flex-1 justify-center",
          showWizard
            ? "flex-col items-center px-4 pt-4 pb-8 sm:px-6 sm:pt-6 lg:px-8"
            : "items-center px-6 py-6 sm:py-8 lg:px-8"
        )}
      >
        {!showWizard ? (
          <PricingIntroContent variant="hero" onStart={handleStartWizard} />
        ) : (
          <div
            ref={wizardRef}
            tabIndex={-1}
            className="flex w-full max-w-5xl flex-col animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-500 focus:outline-none"
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
                    ref={phase === "results" ? undefined : cardScrollRef}
                    onScroll={phase === "results" ? undefined : onCardScroll}
                    className={cn(
                      "flex h-full flex-col",
                      phase === "results" ? "overflow-hidden" : "overflow-y-auto"
                    )}
                  >
                  <div
                    className={cn(
                      "mx-auto flex w-full flex-col",
                      shouldCenterCardContent && "justify-center",
                      phase !== "results" &&
                        (isCompactQuestionStep ? "p-4 sm:p-5" : "p-6 sm:p-8"),
                      shouldCenterCardContent &&
                        (hasCardFooter && phase === "product"
                          ? "min-h-full"
                          : CARD_INNER_MIN_HEIGHT_CLASS),
                      phase === "results" && "min-h-full flex-1",
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
                      scrollRef={cardScrollRef}
                      onScroll={onCardScroll}
                      showScrollFade={showCardScrollFade}
                    />
                  )}

                  {phase === "product" && (
                    <QuestionStep
                      question={productDescriptionQuestion}
                      answers={answers}
                      canGoBack
                      actionsInFooter
                      onBack={handleBack}
                      onTextareaChange={handleProductDescriptionChange}
                    />
                  )}

                  {phase === "contact" && (
                    <ContactStep
                      contactDetails={contactDetails}
                      submitError={submitError}
                      isSubmitting={isSubmitting}
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

                  <ScrollBottomFade visible={phase !== "results" && showCardScrollFade} />
                </div>

                {phase === "results" && outcomes.length > 0 && (
                  <CardFooter>
                    <FooterResetButton label={t("startOver")} onClick={reset} />
                    <FooterPrimaryButton
                      label={t("continue")}
                      onClick={() => setPhase("product")}
                      showArrowOnDesktop
                    />
                  </CardFooter>
                )}

                {phase === "results" && outcomes.length === 0 && (
                  <CardFooter>
                    <FooterResetButton
                      label={t("startOver")}
                      onClick={reset}
                      className="ml-auto"
                    />
                  </CardFooter>
                )}

                {phase === "contact" && (
                  <CardFooter>
                    <FooterResetButton label={t("startOver")} onClick={reset} disabled={isSubmitting} />
                    <FooterPrimaryButton
                      label={isSubmitting ? t("submitting") : t("submit")}
                      type="submit"
                      form="price-calculator-contact-form"
                      icon={IconCheck}
                      disabled={isSubmitting}
                    />
                  </CardFooter>
                )}

                {phase === "product" && (
                  <CardFooter>
                    <FooterResetButton label={t("startOver")} onClick={reset} />
                    <div className="flex items-center gap-2">
                      {productDescriptionQuestion.optional && (
                        <FooterSecondaryButton
                          label={t("skip")}
                          onClick={handleProductDescriptionSkip}
                        />
                      )}
                      <FooterPrimaryButton
                        label={t("continue")}
                        onClick={handleProductDescriptionContinue}
                        showArrowOnDesktop
                      />
                    </div>
                  </CardFooter>
                )}
              </div>
            </div>

            <div className="mt-8 sm:mt-10">
              <PricingIntroContent variant="below" />
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
    <div className="sticky bottom-0 z-10 shrink-0 border-t border-gray-200/80 bg-white/75 p-3 backdrop-blur-md dark:border-gray-700/80 dark:bg-gray-900/75 sm:p-4 sm:px-6">
      <div className="flex items-center justify-between gap-2">
        {children}
      </div>
    </div>
  )
}

function FooterResetButton({
  label,
  onClick,
  className,
  disabled = false,
}: {
  label: string
  onClick: () => void
  className?: string
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 sm:size-auto sm:px-0 sm:py-0 sm:text-sm sm:font-semibold sm:hover:bg-transparent dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white sm:dark:hover:bg-transparent",
        className
      )}
    >
      <IconRefresh className="size-4 sm:hidden" aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}

function FooterSecondaryButton({
  label,
  onClick,
  icon: Icon = IconPlayerSkipForward,
}: {
  label: string
  onClick: () => void
  icon?: typeof IconPlayerSkipForward
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 sm:size-auto sm:px-0 sm:py-0 sm:text-sm sm:font-semibold sm:hover:bg-transparent dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white sm:dark:hover:bg-transparent"
    >
      <Icon className="size-4 sm:hidden" aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}

function FooterPrimaryButton({
  label,
  onClick,
  type = "button",
  form,
  icon: MobileIcon = IconArrowRight,
  showArrowOnDesktop = false,
  disabled = false,
}: {
  label: string
  onClick?: () => void
  type?: "button" | "submit"
  form?: string
  icon?: typeof IconArrowRight
  showArrowOnDesktop?: boolean
  disabled?: boolean
}) {
  return (
    <button
      type={type}
      form={form}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-primary-600 text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:size-auto sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm sm:font-semibold dark:bg-primary-500 dark:hover:bg-primary-400"
    >
      <MobileIcon className="size-4 sm:hidden" aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
      {showArrowOnDesktop && (
        <IconArrowRight className="hidden size-4 sm:block" aria-hidden="true" />
      )}
    </button>
  )
}

function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="mb-3 flex shrink-0 items-center justify-center gap-1.5 sm:mb-6 sm:gap-4">
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
  actionsInFooter = false,
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
  actionsInFooter?: boolean
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
          {question.options.map((option) => {
            const iconStyle = getChoiceOptionIcon(question.id, option.id)
            const Icon = iconStyle?.icon

            return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChoiceSelect?.(question, option.id)}
              className={cn(
                "rounded-xl border text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
                compact ? "rounded-lg p-3" : "p-4",
                iconStyle && "flex items-start gap-3",
                getChoiceOptionColSpan(question.options, option.id),
                answers[question.id] === option.id
                  ? "border-primary-400 bg-primary-50/70 dark:border-primary-500 dark:bg-primary-800/50"
                  : "border-gray-200 hover:border-primary-300 hover:bg-primary-50/70 dark:border-gray-700 dark:hover:border-primary-500 dark:hover:bg-primary-800/40"
              )}
            >
              {Icon && iconStyle && (
                <div
                  className={cn(
                    "flex shrink-0 items-center justify-center rounded-lg",
                    compact ? "size-9" : "size-10",
                    iconStyle.bg,
                    iconStyle.text
                  )}
                >
                  <Icon className={compact ? "size-4" : "size-5"} aria-hidden="true" />
                </div>
              )}

              <div className="min-w-0 flex-1">
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
              </div>
            </button>
            )
          })}
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
        <div className="mt-6">
          <textarea
            id={question.id}
            rows={5}
            value={answers[question.id] ?? ""}
            onChange={(event) => onTextareaChange?.(event.target.value)}
            placeholder={question.placeholder}
            className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 shadow-xs placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
          />
          {!actionsInFooter && (
            <div className="mt-4 flex flex-wrap gap-3">
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
          )}
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
  scrollRef,
  onScroll,
  showScrollFade = false,
}: {
  answers: CalculatorAnswers
  outcomes: CalculatorOutcome[]
  expandedId: OutcomeId | null
  onExpandedChange: (id: OutcomeId | null) => void
  onBack: () => void
  scrollRef?: RefObject<HTMLDivElement | null>
  onScroll?: () => void
  showScrollFade?: boolean
}) {
  const t = useTranslations("pricing")
  const sortedOutcomes = sortOutcomesForDisplay(outcomes)
  const choiceSummary = getAnswersSummary(answers)
  const isSingleOutcome = sortedOutcomes.length === 1
  const activeExpandedId = expandedId
  const expandedOutcome = activeExpandedId
    ? sortedOutcomes.find((outcome) => outcome.id === activeExpandedId)
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
    <div className="flex min-h-full flex-1 flex-col lg:min-h-0 lg:flex-row">
      <aside className="hidden w-56 shrink-0 p-6 pl-8 pt-8 lg:block xl:w-74">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <IconArrowLeft className="size-4" aria-hidden="true" />
          {t("back")}
        </button>

        {choiceSummary.length > 0 && (
          <div className="mt-4 rounded-xl bg-primary-600/5 p-4 sm:p-5 dark:bg-primary-500/10">
            <AnswersSummaryContent items={choiceSummary} title={t("basedOnAnswers")} />
          </div>
        )}
      </aside>

      <div className="relative flex min-h-0 flex-1 flex-col">
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex flex-1 flex-col overflow-y-auto p-6 sm:p-8 lg:px-8 lg:pb-6 lg:pl-0 lg:pt-8"
        >
          <div className="flex min-h-full flex-1 flex-col gap-4">
            <div className="flex items-center justify-between lg:hidden">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <IconArrowLeft className="size-4" aria-hidden="true" />
                {t("back")}
              </button>

              {choiceSummary.length > 0 && (
                <AnswersSummaryPopover items={choiceSummary} title={t("basedOnAnswers")} />
              )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col self-stretch">
              {activeExpandedId && expandedOutcome ? (
                <div className="flex flex-1 flex-col gap-3 self-stretch">
                  {sortedOutcomes.length > 1 && (
                    <div
                      className="flex flex-wrap items-center gap-2"
                      role="tablist"
                      aria-label="Suggested services"
                    >
                      {sortedOutcomes.map((outcome) => (
                        <ServiceTab
                          key={outcome.id}
                          outcome={outcome}
                          isActive={outcome.id === activeExpandedId}
                          onClick={() => onExpandedChange(outcome.id)}
                        />
                      ))}
                    </div>
                  )}

                  <ExpandedServicePanel
                    className="flex-1"
                    outcome={expandedOutcome}
                    showHide={!isSingleOutcome}
                    onHide={() => onExpandedChange(null)}
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-3">
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
        </div>

        <ScrollBottomFade visible={showScrollFade} />
      </div>
    </div>
  )
}

function AnswersSummaryContent({
  items,
  title,
}: {
  items: AnswerSummaryItem[]
  title: string
}) {
  return (
    <>
      <p className="text-xs font-medium uppercase tracking-wide text-primary-700 dark:text-primary-300">
        {title}
      </p>
      <dl className="mt-3 space-y-3">
        {items.map((item) => (
          <div key={item.questionId}>
            <dt className="text-xs text-gray-500 dark:text-gray-400">{item.label}</dt>
            <dd className="mt-0.5 text-sm font-medium text-gray-900 dark:text-white">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </>
  )
}

function AnswersSummaryPopover({
  items,
  title,
}: {
  items: AnswerSummaryItem[]
  title: string
}) {
  return (
    <Popover className="relative">
      <PopoverButton
        type="button"
        aria-label={title}
        className="inline-flex size-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-primary-600 shadow-xs transition hover:bg-primary-50/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:border-gray-700 dark:bg-gray-900 dark:text-primary-400 dark:hover:bg-primary-950/30"
      >
        <IconListDetails className="size-5" aria-hidden="true" />
      </PopoverButton>
      <PopoverPanel
        anchor="bottom end"
        className="z-30 mt-2 w-72 rounded-xl border border-gray-200 bg-white p-4 shadow-lg [--anchor-gap:0.5rem] dark:border-gray-700 dark:bg-gray-900"
      >
        <AnswersSummaryContent items={items} title={title} />
      </PopoverPanel>
    </Popover>
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
  showHide = true,
  onHide,
  className,
}: {
  outcome: CalculatorOutcome
  showHide?: boolean
  onHide: () => void
  className?: string
}) {
  const iconStyle = OUTCOME_ICON_STYLES[outcome.id]
  const Icon = iconStyle.icon
  const briefPrice = getBriefPriceSummary(outcome)
  const groupLabel = getServiceGroupLabel(outcome.serviceGroup)

  return (
    <div
      className={cn(
        "mb-3 flex w-full flex-1 flex-col rounded-xl border border-primary-300 bg-white p-4 shadow-sm ring-1 ring-primary-200 sm:mb-4 sm:p-5 dark:border-primary-600 dark:bg-gray-900/50 dark:ring-primary-800",
        className
      )}
    >
      <div className="flex shrink-0 items-start justify-between gap-4">
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
        {showHide && (
          <button
            type="button"
            onClick={onHide}
            className="shrink-0 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Hide
          </button>
        )}
      </div>

      <div className="mt-5 flex flex-1 flex-col border-t border-gray-100 pt-5 dark:border-gray-800">
        <OutcomePricingDetails outcome={outcome} />
      </div>
    </div>
  )
}

function ServiceTab({
  outcome,
  isActive = false,
  onClick,
}: {
  outcome: CalculatorOutcome
  isActive?: boolean
  onClick: () => void
}) {
  const iconStyle = OUTCOME_ICON_STYLES[outcome.id]
  const Icon = iconStyle.icon
  const briefPrice = getBriefPriceSummary(outcome)

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-label={outcome.label}
      title={outcome.label}
      onClick={onClick}
      className={cn(
        "flex shrink-0 items-center rounded-lg border text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
        isActive
          ? "gap-2 border-primary-400 bg-primary-50/70 p-3 dark:border-primary-500 dark:bg-primary-800/50"
          : "size-9 justify-center border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50/50 dark:border-gray-700 dark:bg-gray-900/50 dark:hover:border-primary-700 dark:hover:bg-primary-950/30"
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-md",
          isActive ? "size-8" : "size-7",
          iconStyle.bg,
          iconStyle.text
        )}
      >
        <Icon className={isActive ? "size-4" : "size-4"} aria-hidden="true" />
      </div>
      {isActive && (
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{outcome.label}</p>
          <p className="truncate text-xs text-primary-600 dark:text-primary-400">{briefPrice.value}</p>
        </div>
      )}
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

      {outcome.pricingModel === "partnership" && (
        <div className="mt-6">
          <Link
            href="/betacode-ventures"
            className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-white dark:text-purple-900 dark:hover:bg-purple-50 dark:focus-visible:outline-white"
          >
            Explore Betacode Ventures
            <IconArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      )}
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
  submitError,
  isSubmitting,
  onBack,
  onChange,
  onSubmit,
}: {
  contactDetails: CalculatorAnswers
  submitError: string | null
  isSubmitting: boolean
  onBack: () => void
  onChange: (fieldId: string, value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void | Promise<void>
}) {
  const contact = pricingCalculatorConfig.contact

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        disabled={isSubmitting}
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        <IconArrowLeft className="size-4" aria-hidden="true" />
        Back
      </button>

      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{contact.title}</h2>
      {contact.description && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{contact.description}</p>
      )}

      <form id="price-calculator-contact-form" onSubmit={onSubmit} className="mt-6 space-y-4">
        {submitError && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300" role="alert">
            {submitError}
          </p>
        )}
        {contact.fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <div className="space-y-1">
              <label
                htmlFor={field.id}
                className="block text-sm font-medium leading-none text-gray-900 dark:text-white"
              >
                {field.label}
                {field.optional && (
                  <span className="ml-1 font-normal text-gray-500 dark:text-gray-400">(optional)</span>
                )}
              </label>
              {field.description && (
                <p
                  id={`${field.id}-description`}
                  className="text-xs leading-normal text-gray-500 dark:text-gray-400"
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
              disabled={isSubmitting}
              aria-describedby={field.description ? `${field.id}-description` : undefined}
              className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-xs placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>
        ))}
      </form>
    </div>
  )
}
