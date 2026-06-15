"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { IconArrowLeft, IconArrowRight, IconCalculator, IconCheck, IconChevronDown, IconRocket, IconSchool, IconTool, IconUserPlus, IconUsersGroup } from "@tabler/icons-react"
import {
  clearBranchAnswers,
  formatEuroRange,
  formatHourlyRange,
  getBriefPriceSummary,
  getOutcomeSummary,
  getPricingModelNote,
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
} from "@/lib/pricing-calculator"
import { cn } from "@/lib/utils"

type Phase = "questions" | "results" | "contact" | "submitted"

export function PriceCalculator() {
  const startQuestion = getStartQuestion()
  const [phase, setPhase] = useState<Phase>("questions")
  const [answers, setAnswers] = useState<CalculatorAnswers>({})
  const [contactDetails, setContactDetails] = useState<CalculatorAnswers>({})
  const [currentQuestionId, setCurrentQuestionId] = useState<string>(startQuestion.id)
  const [outcomes, setOutcomes] = useState<CalculatorOutcome[]>([])

  const questionPath = useMemo(() => getQuestionPath(answers), [answers])
  const currentQuestion =
    pricingCalculatorConfig.questions.find((question) => question.id === currentQuestionId) ?? startQuestion

  const totalQuestionSteps = questionPath.length + 1
  const currentQuestionIndex = questionPath.findIndex((question) => question.id === currentQuestionId)
  const questionStep =
    phase === "questions"
      ? currentQuestionIndex + 1
      : phase === "results"
        ? totalQuestionSteps
        : totalQuestionSteps + 1
  const totalSteps = totalQuestionSteps + 1

  function advanceFromQuestion(question: CalculatorQuestion, nextAnswers: CalculatorAnswers) {
    if (question.type === "textarea") {
      if (isQuestionFlowComplete(nextAnswers)) {
        setOutcomes(resolveOutcomes(nextAnswers))
        setPhase("results")
      }
      return
    }

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

  function handleTextareaChange(value: string) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))
  }

  function handleTextareaContinue() {
    const nextAnswers = { ...answers }
    advanceFromQuestion(currentQuestion, nextAnswers)
  }

  function handleTextareaSkip() {
    const nextAnswers = { ...answers }
    delete nextAnswers[currentQuestion.id]
    setAnswers(nextAnswers)
    advanceFromQuestion(currentQuestion, nextAnswers)
  }

  function handleBack() {
    if (phase === "contact") {
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
  }

  function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPhase("submitted")
  }

  return (
    <section id="price-calculator" className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-600/10 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
            <IconCalculator className="size-6" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-base/7 font-semibold text-primary-600 uppercase dark:text-primary-400">
            Price Calculator
          </h1>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
            Get an estimated price for your project
          </p>
          <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
            Answer a few questions about your business and goals. Each option includes context so you can pick what fits—and we&apos;ll suggest the right services and price ranges.
          </p>
        </div>

        <div
          className={cn(
            "mx-auto mt-12",
            phase === "results" ? "max-w-5xl" : "max-w-3xl"
          )}
        >
          <StepIndicator currentStep={questionStep} totalSteps={totalSteps} />

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            {phase === "questions" && (
              <QuestionStep
                question={currentQuestion}
                answers={answers}
                canGoBack={currentQuestionId !== startQuestion.id}
                onBack={handleBack}
                onChoiceSelect={handleChoiceSelect}
                onDropdownChange={handleDropdownChange}
                onDropdownContinue={handleDropdownContinue}
                onTextareaChange={handleTextareaChange}
                onTextareaContinue={handleTextareaContinue}
                onTextareaSkip={handleTextareaSkip}
              />
            )}

            {phase === "results" && (
              <ResultsStep
                outcomes={outcomes}
                onBack={handleBack}
                onContinue={() => setPhase("contact")}
                onReset={reset}
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
                onReset={reset}
              />
            )}

            {phase === "submitted" && (
              <div className="text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-600/10 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
                  <IconCheck className="size-6" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Thank you</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  We&apos;ve received your details. We&apos;ll review your project and get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
                >
                  Start over
                </button>
              </div>
            )}
          </div>
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
  canGoBack: boolean
  onBack: () => void
  onChoiceSelect: (question: CalculatorQuestion, optionId: string) => void
  onDropdownChange: (question: CalculatorQuestion, optionId: string) => void
  onDropdownContinue: (question: CalculatorQuestion) => void
  onTextareaChange: (value: string) => void
  onTextareaContinue: () => void
  onTextareaSkip: () => void
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
          Back
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
              onClick={() => onChoiceSelect(question, option.id)}
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
            onChange={(event) => onDropdownChange(question, event.target.value)}
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
            onClick={() => onDropdownContinue(question)}
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
            onChange={(event) => onTextareaChange(event.target.value)}
            placeholder={question.placeholder}
            className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 shadow-xs placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onTextareaContinue}
              className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400"
            >
              See recommendations
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
  outcomes,
  onBack,
  onContinue,
  onReset,
}: {
  outcomes: CalculatorOutcome[]
  onBack: () => void
  onContinue: () => void
  onReset: () => void
}) {
  const sortedOutcomes = sortOutcomesForDisplay(outcomes)

  if (outcomes.length === 0) {
    return (
      <div className="text-center">
        <p className="text-gray-700 dark:text-gray-300">
          We couldn&apos;t match your answers to a recommendation. Try adjusting your responses or book a call with us.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
        >
          Start over
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
        Back
      </button>

      <div className="rounded-xl bg-primary-600/5 p-4 sm:p-5 dark:bg-primary-500/10">
        <p className="text-sm font-medium text-primary-700 uppercase dark:text-primary-300">
          {sortedOutcomes.length > 1 ? "Recommended services" : "Recommended service"}
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Compare options below. Tap any card for full pricing breakdowns.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {sortedOutcomes.map((outcome) => (
          <ServiceResultCard key={outcome.id} outcome={outcome} />
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          Start over
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400"
        >
          Continue
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
  "small-team": {
    icon: IconUsersGroup,
    bg: "bg-primary-100 dark:bg-primary-900/40",
    text: "text-primary-600 dark:text-primary-400",
  },
  "base-team": {
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

function ServiceResultCard({ outcome }: { outcome: CalculatorOutcome }) {
  const [expanded, setExpanded] = useState(false)
  const iconStyle = OUTCOME_ICON_STYLES[outcome.id]
  const Icon = iconStyle.icon
  const briefPrice = getBriefPriceSummary(outcome)
  const groupLabel = getServiceGroupLabel(outcome.serviceGroup)

  return (
    <div
      className={cn(
        "rounded-xl border bg-white transition-all dark:bg-gray-900/50",
        expanded
          ? "border-primary-300 shadow-sm ring-1 ring-primary-200 dark:border-primary-600 dark:ring-primary-800"
          : "border-gray-200 hover:border-primary-200 dark:border-gray-700 dark:hover:border-primary-800"
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded((open) => !open)}
        className="flex w-full items-start gap-3 p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        aria-expanded={expanded}
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
            {expanded ? "Hide pricing" : "See full pricing"}
            <IconChevronDown
              className={cn("size-3.5 transition-transform", expanded && "rotate-180")}
              aria-hidden="true"
            />
          </span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 px-4 pb-4 pt-3 dark:border-gray-800">
          <OutcomePricingDetails outcome={outcome} />
        </div>
      )}
    </div>
  )
}

function OutcomePricingDetails({ outcome }: { outcome: CalculatorOutcome }) {
  const pricingNote = getPricingModelNote(outcome.pricingModel)
  const showTeamTable = outcome.teamComposition.length > 0
  const showRate = Boolean(outcome.rate)
  const showEstimates = outcome.estimates.length > 0

  return (
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-300">{outcome.description}</p>

      {(showTeamTable || showRate || showEstimates) && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {showTeamTable && (
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
                    {outcome.teamComposition.map((member) => (
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
            <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50 sm:col-span-2">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Estimated prices
              </p>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                {outcome.estimates.map((estimate) => (
                  <div key={estimate.label}>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{estimate.label}</p>
                    <p className="mt-0.5 text-base font-semibold text-gray-900 dark:text-white">
                      {formatEuroRange(estimate.min, estimate.max)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {pricingNote && (
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">{pricingNote}</p>
      )}

      <Link
        href={outcome.cta.href}
        className="mt-4 inline-flex text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
      >
        {outcome.cta.label} →
      </Link>
    </div>
  )
}

function ContactStep({
  contactDetails,
  onBack,
  onChange,
  onSubmit,
  onReset,
}: {
  contactDetails: CalculatorAnswers
  onBack: () => void
  onChange: (fieldId: string, value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onReset: () => void
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
                <span className="ml-1 text-gray-400 dark:text-gray-500">(optional)</span>
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
            Start over
          </button>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="https://calendar.app.google/1kXGjsszjPB3eFGr7"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Book a call
            </Link>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
