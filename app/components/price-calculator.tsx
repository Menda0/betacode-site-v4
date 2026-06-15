"use client"

import { useState } from "react"
import Link from "next/link"
import { IconArrowLeft, IconArrowRight, IconCalculator, IconCheck } from "@tabler/icons-react"
import {
  BUSINESS_OPTIONS,
  SOFTWARE_OPTIONS,
  formatEuroRange,
  formatHourlyRange,
  getPricingRecommendation,
  type BusinessType,
  type SoftwareType,
} from "@/lib/pricing-calculator"
import { cn } from "@/lib/utils"

type Step = 1 | 2 | 3

export function PriceCalculator() {
  const [step, setStep] = useState<Step>(1)
  const [businessType, setBusinessType] = useState<BusinessType | null>(null)
  const [softwareType, setSoftwareType] = useState<SoftwareType | null>(null)

  const recommendation =
    businessType && softwareType ? getPricingRecommendation(businessType, softwareType) : null

  const isHourlyModel = businessType === "tech-company" && softwareType !== "integration"

  function handleBusinessSelect(id: BusinessType) {
    setBusinessType(id)
    setStep(2)
  }

  function handleSoftwareSelect(id: SoftwareType) {
    setSoftwareType(id)
    setStep(3)
  }

  function reset() {
    setStep(1)
    setBusinessType(null)
    setSoftwareType(null)
  }

  return (
    <section id="price-calculator" className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-600/10 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
            <IconCalculator className="size-6" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-base/7 font-semibold text-primary-600 uppercase dark:text-primary-400">
            Price Calculator
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
            Get an estimated price for your project
          </p>
          <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
            Tell us about your business and what you want to build—we&apos;ll suggest the right service and a price range.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="mb-8 flex items-center justify-center gap-2 sm:gap-4">
            {[1, 2, 3].map((value) => (
              <div key={value} className="flex items-center gap-2 sm:gap-4">
                <div
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                    step >= value
                      ? "bg-primary-600 text-white dark:bg-primary-500"
                      : "bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  )}
                >
                  {step > value ? <IconCheck className="size-4" aria-hidden="true" /> : value}
                </div>
                {value < 3 && (
                  <div
                    className={cn(
                      "hidden h-0.5 w-8 sm:block sm:w-16",
                      step > value ? "bg-primary-600 dark:bg-primary-500" : "bg-gray-200 dark:bg-gray-800"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            {step === 1 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  What type of business do you have?
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Choose the option that best describes your organization.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {BUSINESS_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleBusinessSelect(option.id)}
                      className="rounded-xl border border-gray-200 p-4 text-left transition-all hover:border-primary-300 hover:bg-primary-50/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:border-gray-700 dark:hover:border-primary-700 dark:hover:bg-primary-950/30"
                    >
                      <span className="text-base font-semibold text-gray-900 dark:text-white">{option.label}</span>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <IconArrowLeft className="size-4" aria-hidden="true" />
                  Back
                </button>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  What do you want to build?
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Select the type of software that matches your project.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {SOFTWARE_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSoftwareSelect(option.id)}
                      className="rounded-xl border border-gray-200 p-4 text-left transition-all hover:border-primary-300 hover:bg-primary-50/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:border-gray-700 dark:hover:border-primary-700 dark:hover:bg-primary-950/30"
                    >
                      <span className="text-base font-semibold text-gray-900 dark:text-white">{option.label}</span>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && recommendation && businessType && softwareType && (
              <div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <IconArrowLeft className="size-4" aria-hidden="true" />
                  Back
                </button>

                <div className="rounded-xl bg-primary-600/5 p-5 dark:bg-primary-500/10">
                  <p className="text-sm font-medium text-primary-700 uppercase dark:text-primary-300">
                    Recommended service
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                    {recommendation.service}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{recommendation.serviceDescription}</p>
                </div>

                <p className="mt-6 text-gray-700 dark:text-gray-300">{recommendation.summary}</p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Team configuration</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {recommendation.teamLabel}
                    </p>
                    <div className="mt-4 overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 text-left dark:border-gray-700">
                            <th className="pb-2 pr-4 font-semibold text-primary-600 dark:text-primary-400">Profile</th>
                            <th className="pb-2 pr-4 font-semibold text-primary-600 dark:text-primary-400">Regime</th>
                            <th className="pb-2 font-semibold text-primary-600 dark:text-primary-400">Rate</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-700 dark:text-gray-300">
                          {recommendation.teamComposition.map((member) => (
                            <tr key={member.profile} className="border-b border-gray-100 last:border-0 dark:border-gray-800">
                              <td className="py-2.5 pr-4">{member.profile}</td>
                              <td className="py-2.5 pr-4">{member.regime}</td>
                              <td className="py-2.5">{formatHourlyRange(member.rateMin, member.rateMax)}/h</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {isHourlyModel ? "Estimated investment" : "Estimated prices"}
                    </p>
                    <div className="mt-4 space-y-4">
                      {recommendation.estimates.map((estimate) => (
                        <div key={estimate.label}>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{estimate.label}</p>
                          <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                            {formatEuroRange(estimate.min, estimate.max)}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                      {isHourlyModel
                        ? "Hourly rates above. Annual range shown as a reference for a full-year engagement."
                        : "Ranges based on our standard team configurations. Final pricing depends on scope and requirements."}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={reset}
                    className="text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    Start over
                  </button>
                  <Link
                    href="https://calendar.app.google/1kXGjsszjPB3eFGr7"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400"
                  >
                    Book a call for a detailed quote
                    <IconArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
