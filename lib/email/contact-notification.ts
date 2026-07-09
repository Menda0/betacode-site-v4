import type { ContactRecord, ContactSource } from "@/lib/types/contact"
import { resend, resendFromEmail } from "@/lib/resend"

function formatAnswerSummary(contact: ContactRecord) {
  if (contact.answerSummary.length === 0) {
    return "<p><em>No answers recorded</em></p>"
  }

  return `<ul>${contact.answerSummary
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.value)}</li>`
    )
    .join("")}</ul>`
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function getSourceLabel(source: ContactSource) {
  switch (source) {
    case "general":
      return "General contact"
    case "betacode-ventures":
      return "Betacode Ventures"
    case "price-calculator":
      return "Price calculator"
  }
}

function getEmailSubject(contact: ContactRecord) {
  switch (contact.source) {
    case "general":
      return `New general contact: ${contact.name}`
    case "betacode-ventures":
      return `New ventures inquiry: ${contact.name}`
    case "price-calculator":
      return `New pricing calculator lead: ${contact.name}`
  }
}

function buildEmailHtml(contact: ContactRecord) {
  const outcomes =
    contact.outcomes.length > 0
      ? contact.outcomes.map((id) => `<li>${escapeHtml(id)}</li>`).join("")
      : "<li><em>None</em></li>"

  const pricingSections =
    contact.source === "price-calculator"
      ? `
    <h3>Recommended outcomes</h3>
    <ul>${outcomes}</ul>
    <h3>Price summary</h3>
    <p>${escapeHtml(contact.priceSummary || "N/A")}</p>
    <h3>Questionnaire answers</h3>
    ${formatAnswerSummary(contact)}
  `
      : ""

  return `
    <h2>${escapeHtml(getSourceLabel(contact.source))}</h2>
    <p><strong>Name:</strong> ${escapeHtml(contact.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(contact.email)}</p>
    ${
      contact.phone
        ? `<p><strong>Phone:</strong> ${escapeHtml(contact.phone)}</p>`
        : ""
    }
    ${
      contact.website
        ? `<p><strong>Website:</strong> <a href="${escapeHtml(contact.website)}">${escapeHtml(contact.website)}</a></p>`
        : ""
    }
    ${
      contact.message
        ? `<h3>Message</h3><p>${escapeHtml(contact.message).replaceAll("\n", "<br />")}</p>`
        : ""
    }
    <p><strong>Source:</strong> ${escapeHtml(getSourceLabel(contact.source))}</p>
    <p><strong>Locale:</strong> ${escapeHtml(contact.locale)}</p>
    <p><strong>Submitted:</strong> ${contact.createdAt.toISOString()}</p>
    ${pricingSections}
  `
}

export async function sendContactNotificationEmail(
  contact: ContactRecord,
  adminEmails: string[]
) {
  if (adminEmails.length === 0) {
    return { success: false as const, error: "No admin emails configured" }
  }

  const { error } = await resend().emails.send({
    from: resendFromEmail,
    to: adminEmails,
    subject: getEmailSubject(contact),
    html: buildEmailHtml(contact),
  })

  if (error) {
    return { success: false as const, error: error.message }
  }

  return { success: true as const }
}
