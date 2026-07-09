import { NextResponse } from "next/server"
import { z } from "zod"
import { getContactModel } from "@/lib/models/contact"
import { getUserModel } from "@/lib/models/user"
import { sendContactNotificationEmail } from "@/lib/email/contact-notification"
import type { OutcomeId } from "@/lib/pricing-calculator"
import type { AnswerSummaryItem } from "@/lib/pricing-calculator"

const contactSchema = z.object({
  contact: z.object({
    name: z.string().min(1),
    email: z.email(),
    website: z.string().optional(),
  }),
  answers: z.record(z.string(), z.string()),
  outcomes: z.array(z.string()),
  answerSummary: z.array(
    z.object({
      questionId: z.string(),
      label: z.string(),
      value: z.string(),
    })
  ),
  priceSummary: z.string(),
  locale: z.enum(["en", "pt"]),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid submission", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { contact, answers, outcomes, answerSummary, priceSummary, locale } =
      parsed.data

    const Contact = await getContactModel()
    const contactDoc = await Contact.create({
      name: contact.name.trim(),
      email: contact.email.trim().toLowerCase(),
      website: contact.website?.trim() || undefined,
      answers,
      outcomes: outcomes as OutcomeId[],
      answerSummary: answerSummary as AnswerSummaryItem[],
      priceSummary,
      locale,
      createdAt: new Date(),
    })

    const User = await getUserModel()
    const adminUsers = await User.find({}, { email: 1 }).lean()
    const adminEmails = adminUsers.map((user) => user.email).filter(Boolean)

    const emailResult = await sendContactNotificationEmail(
      {
        name: contactDoc.name,
        email: contactDoc.email,
        website: contactDoc.website,
        answers,
        outcomes: outcomes as OutcomeId[],
        answerSummary: answerSummary as AnswerSummaryItem[],
        priceSummary,
        locale,
        createdAt: contactDoc.createdAt,
      },
      adminEmails
    )

    return NextResponse.json(
      {
        success: true,
        emailSent: emailResult.success,
        ...(emailResult.success ? {} : { emailWarning: emailResult.error }),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Failed to save contact:", error)
    return NextResponse.json(
      { error: "Failed to save contact" },
      { status: 500 }
    )
  }
}
