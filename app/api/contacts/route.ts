import { NextResponse } from "next/server"
import { contactSubmissionSchema } from "@/lib/contact-validation"
import { getContactModel } from "@/lib/models/contact"
import { getUserModel } from "@/lib/models/user"
import { sendContactNotificationEmail } from "@/lib/email/contact-notification"
import type { OutcomeId } from "@/lib/pricing-calculator"
import type { AnswerSummaryItem } from "@/lib/pricing-calculator"
import type { ContactRecord, ContactSource } from "@/lib/types/contact"

function buildContactRecord(
  data: ReturnType<typeof contactSubmissionSchema.parse>
): Omit<ContactRecord, "createdAt"> {
  if (data.source === "price-calculator") {
    return {
      name: data.contact.name.trim(),
      email: data.contact.email.trim().toLowerCase(),
      website: data.contact.website?.trim() || undefined,
      source: "price-calculator",
      answers: data.answers,
      outcomes: data.outcomes as OutcomeId[],
      answerSummary: data.answerSummary as AnswerSummaryItem[],
      priceSummary: data.priceSummary,
      locale: data.locale,
    }
  }

  if (data.source === "general") {
    return {
      name: data.contact.name.trim(),
      email: data.contact.email.trim().toLowerCase(),
      phone: data.contact.phone?.trim() || undefined,
      message: data.contact.message.trim(),
      source: "general",
      answers: {},
      outcomes: [],
      answerSummary: [],
      priceSummary: "",
      locale: data.locale,
    }
  }

  return {
    name: data.contact.name.trim(),
    email: data.contact.email.trim().toLowerCase(),
    website: data.contact.website?.trim() || undefined,
    message: data.contact.message.trim(),
    source: "betacode-ventures",
    answers: {},
    outcomes: [],
    answerSummary: [],
    priceSummary: "",
    locale: data.locale,
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = contactSubmissionSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid submission", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const contactData = buildContactRecord(parsed.data)
    const Contact = await getContactModel()
    const contactDoc = await Contact.create({
      ...contactData,
      createdAt: new Date(),
    })

    const User = await getUserModel()
    const adminUsers = await User.find({}, { email: 1 }).lean()
    const adminEmails = adminUsers.map((user) => user.email).filter(Boolean)

    const emailResult = await sendContactNotificationEmail(
      {
        ...contactData,
        source: contactData.source as ContactSource,
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
