import { NextResponse } from "next/server"
import { contactSubmissionSchema, type ContactSubmission } from "@/lib/contact-validation"
import { getContactModel } from "@/lib/models/contact"
import { getUserModel } from "@/lib/models/user"
import { sendContactNotificationEmail } from "@/lib/email/contact-notification"
import { sendContactConfirmationEmail } from "@/lib/email/contact-confirmation"
import { checkRateLimit, getClientIp } from "@/lib/rate-limit"
import type { ContactRecord } from "@/lib/types/contact"

const TEN_MINUTES = 10 * 60 * 1000
const ONE_HOUR = 60 * 60 * 1000

function buildContactRecord(data: ContactSubmission): Omit<ContactRecord, "createdAt"> {
  const base = {
    name: data.contact.name.trim(),
    email: data.contact.email.trim().toLowerCase(),
    locale: data.locale,
  }

  if (data.source === "price-calculator") {
    return {
      ...base,
      website: data.contact.website?.trim() || undefined,
      message: data.description?.trim() || undefined,
      when: data.when?.trim() || undefined,
      selectedService: data.selectedService,
      source: "price-calculator",
      answers: data.answers,
      outcomes: data.outcomes,
      answerSummary: data.answerSummary,
      priceSummary: data.priceSummary,
    }
  }

  if (data.source === "general") {
    return {
      ...base,
      phone: data.contact.phone?.trim() || undefined,
      company: data.contact.company?.trim() || undefined,
      message: data.contact.message.trim(),
      topic: data.topic,
      source: "general",
      answers: {},
      outcomes: [],
      answerSummary: [],
      priceSummary: "",
    }
  }

  return {
    ...base,
    website: data.contact.website?.trim() || undefined,
    message: data.contact.message.trim(),
    stage: data.stage?.trim() || undefined,
    source: "betacode-ventures",
    answers: {},
    outcomes: [],
    answerSummary: [],
    priceSummary: "",
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = contactSubmissionSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "invalid", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    // Honeypot filled: answer like a success so bots get no signal, but store nothing.
    if (parsed.data.hp) {
      return NextResponse.json({ success: true }, { status: 201 })
    }

    const ip = getClientIp(request)
    const email = parsed.data.contact.email.trim().toLowerCase()
    const { limited } = await checkRateLimit([
      { key: `contact:ip:${ip}`, limit: 5, windowMs: TEN_MINUTES },
      { key: `contact:email:${email}`, limit: 3, windowMs: ONE_HOUR },
    ])
    if (limited) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 })
    }

    const contactData = buildContactRecord(parsed.data)
    const Contact = await getContactModel()
    const contactDoc = await Contact.create({ ...contactData, createdAt: new Date() })
    const record: ContactRecord = { ...contactData, createdAt: contactDoc.createdAt }

    const User = await getUserModel()
    const adminUsers = await User.find({}, { email: 1 }).lean()
    const adminEmails = adminUsers.map((user) => user.email).filter(Boolean)

    const [notification, confirmation] = await Promise.allSettled([
      sendContactNotificationEmail(record, adminEmails),
      sendContactConfirmationEmail(record),
    ])
    const notificationOk = notification.status === "fulfilled" && notification.value.success
    const confirmationOk = confirmation.status === "fulfilled" && confirmation.value.success

    return NextResponse.json(
      { success: true, emailSent: notificationOk, confirmationSent: confirmationOk },
      { status: 201 }
    )
  } catch (error) {
    console.error("Failed to save contact:", error)
    return NextResponse.json({ error: "server_error" }, { status: 500 })
  }
}
