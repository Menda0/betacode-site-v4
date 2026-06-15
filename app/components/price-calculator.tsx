"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { IconArrowLeft, IconArrowRight, IconCalculator, IconCheck } from "@tabler/icons-react"
import {
  clearBranchAnswers,
  formatEuroRange,
  formatHourlyRange,
  getPricingModelNote,
  getQuestionPath,
  getStartQuestion,
  groupOutcomesForDisplay,
  isQuestionFlowComplete,
  pricingCalculatorConfig,
  resolveOutcomes,
  type CalculatorAnswers,
  type CalculatorOutcome,
  type CalculatorQuestion,
  type ServiceDisplayGroup,
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

        <div className="mx-auto mt-12 max-w-3xl">
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
  const serviceGroups = groupOutcomesForDisplay(outcomes)

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

      <div className="rounded-xl bg-primary-600/5 p-5 dark:bg-primary-500/10">
        <p className="text-sm font-medium text-primary-700 uppercase dark:text-primary-300">
          {outcomes.length > 1 ? "Recommended services" : "Recommended service"}
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Based on your answers, these options may fit your needs. We suggest more than one when your situation calls for a combined approach.
        </p>
      </div>

      <div className="mt-8 space-y-8">
        {serviceGroups.map((group) => (
          <ServiceGroupSection key={group.id} group={group} />
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

function ServiceGroupSection({ group }: { group: ServiceDisplayGroup }) {
  const isSelfManaged = group.id === "self-managed-tech-teams"

  return (
    <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{group.label}</h3>
      {group.description && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{group.description}</p>
      )}

      <div className={cn("space-y-4", isSelfManaged && "mt-6")}>
        {group.outcomes.map((outcome) => (
          <OutcomeCard
            key={outcome.id}
            outcome={outcome}
            showServiceHeader={isSelfManaged}
            compact={!isSelfManaged}
          />
        ))}
      </div>

      {!isSelfManaged && group.outcomes[0] && (
        <div className="mt-4">
          <Link
            href={group.outcomes[0].cta.href}
            className="text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            {group.outcomes[0].cta.label} →
          </Link>
        </div>
      )}
    </div>
  )
}

function OutcomeCard({
  outcome,
  showServiceHeader = true,
  compact = false,
}: {
  outcome: CalculatorOutcome
  showServiceHeader?: boolean
  compact?: boolean
}) {
  const pricingNote = getPricingModelNote(outcome.pricingModel)
  const showTeamTable = outcome.teamComposition.length > 0
  const showRate = Boolean(outcome.rate)
  const showEstimates = outcome.estimates.length > 0

  return (
    <div
      className={cn(
        compact ? "" : "rounded-xl border border-gray-200 p-5 dark:border-gray-700",
        showServiceHeader && !compact && "rounded-lg border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-800/40"
      )}
    >
      {showServiceHeader && (
        <>
          <h4 className="text-base font-semibold text-gray-900 dark:text-white">{outcome.label}</h4>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{outcome.description}</p>
        </>
      )}

      {(showTeamTable || showRate || showEstimates) && (
        <div className={cn("grid gap-4 sm:grid-cols-2", showServiceHeader && "mt-4")}>
          {showTeamTable && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Team configuration</p>
              <div className="mt-3 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left dark:border-gray-700">
                      <th className="pb-2 pr-4 font-semibold text-primary-600 dark:text-primary-400">Profile</th>
                      <th className="pb-2 pr-4 font-semibold text-primary-600 dark:text-primary-400">Regime</th>
                      <th className="pb-2 font-semibold text-primary-600 dark:text-primary-400">Rate</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 dark:text-gray-300">
                    {outcome.teamComposition.map((member) => (
                      <tr key={member.profile} className="border-b border-gray-100 last:border-0 dark:border-gray-800">
                        <td className="py-2 pr-4">{member.profile}</td>
                        <td className="py-2 pr-4">{member.regime}</td>
                        <td className="py-2">{formatHourlyRange(member.rateMin, member.rateMax)}/h</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {showRate && outcome.rate && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pricing</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{outcome.rate.label}</p>
              {outcome.rate.regime && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{outcome.rate.regime}</p>
              )}
              <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                {formatHourlyRange(outcome.rate.rateMin, outcome.rate.rateMax)}/h
              </p>
            </div>
          )}

          {showEstimates && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Estimated prices</p>
              <div className="mt-3 space-y-3">
                {outcome.estimates.map((estimate) => (
                  <div key={estimate.label}>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{estimate.label}</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
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
        <p className={cn("text-xs text-gray-500 dark:text-gray-400", showServiceHeader ? "mt-4" : "mt-3")}>
          {pricingNote}
        </p>
      )}

      {showServiceHeader && !compact && (
        <div className="mt-4">
          <Link
            href={outcome.cta.href}
            className="text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            {outcome.cta.label} →
          </Link>
        </div>
      )}
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
