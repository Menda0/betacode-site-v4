import type { ContactRecord } from "@/lib/types/contact"
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

export async function sendContactNotificationEmail(
  contact: ContactRecord,
  adminEmails: string[]
) {
  if (adminEmails.length === 0) {
    return { success: false as const, error: "No admin emails configured" }
  }

  const outcomes =
    contact.outcomes.length > 0
      ? contact.outcomes.map((id) => `<li>${escapeHtml(id)}</li>`).join("")
      : "<li><em>None</em></li>"

  const html = `
    <h2>New pricing calculator lead</h2>
    <p><strong>Name:</strong> ${escapeHtml(contact.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(contact.email)}</p>
    ${
      contact.website
        ? `<p><strong>Website:</strong> <a href="${escapeHtml(contact.website)}">${escapeHtml(contact.website)}</a></p>`
        : ""
    }
    <p><strong>Locale:</strong> ${escapeHtml(contact.locale)}</p>
    <p><strong>Submitted:</strong> ${contact.createdAt.toISOString()}</p>
    <h3>Recommended outcomes</h3>
    <ul>${outcomes}</ul>
    <h3>Price summary</h3>
    <p>${escapeHtml(contact.priceSummary || "N/A")}</p>
    <h3>Questionnaire answers</h3>
    ${formatAnswerSummary(contact)}
  `

  const { error } = await resend().emails.send({
    from: resendFromEmail,
    to: adminEmails,
    subject: `New pricing calculator lead: ${contact.name}`,
    html,
  })

  if (error) {
    return { success: false as const, error: error.message }
  }

  return { success: true as const }
}
