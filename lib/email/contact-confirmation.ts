import type { ContactRecord } from "@/lib/types/contact"
import { resend, resendFromEmail } from "@/lib/resend"
import { escapeHtml } from "@/lib/email/contact-notification"

// TODO(betacode): confirmation email copy is new and needs approval (IMPLEMENTATION.md §10, points 3 and 4).
const COPY = {
  pt: {
    subject: "Recebemos o seu pedido | Betacode",
    greeting: (name: string) => `Olá ${name},`,
    body: {
      general: "Obrigado pela sua mensagem. Recebemos o seu pedido e vamos responder por email.",
      "betacode-ventures": "Obrigado pela sua candidatura à Betacode Ventures. Vamos analisar a ideia e entrar em contacto por email.",
      "price-calculator": "Obrigado pelo seu pedido de proposta. Recebemos a estimativa e as suas respostas e vamos entrar em contacto por email.",
    },
    sign: "A equipa Betacode",
    footer: "Madan Parque, Rua dos Inventores, 2825-182 Caparica, Portugal · info@betacode.tech",
  },
  en: {
    subject: "We received your request | Betacode",
    greeting: (name: string) => `Hi ${name},`,
    body: {
      general: "Thanks for your message. We received your request and will reply by email.",
      "betacode-ventures": "Thanks for applying to Betacode Ventures. We’ll review the idea and get in touch by email.",
      "price-calculator": "Thanks for your proposal request. We received the estimate and your answers and will get in touch by email.",
    },
    sign: "The Betacode team",
    footer: "Madan Parque, Rua dos Inventores, 2825-182 Caparica, Portugal · info@betacode.tech",
  },
} as const

export async function sendContactConfirmationEmail(contact: ContactRecord) {
  const c = COPY[contact.locale]
  const firstName = contact.name.trim().split(/\s+/)[0] || contact.name
  const html = `
    <p>${escapeHtml(c.greeting(firstName))}</p>
    <p>${escapeHtml(c.body[contact.source])}</p>
    <p>${escapeHtml(c.sign)}</p>
    <p style="color:#4A4B7A;font-size:12px">${escapeHtml(c.footer)}</p>
  `

  const { error } = await resend().emails.send({
    from: resendFromEmail,
    to: [contact.email],
    replyTo: "info@betacode.tech",
    subject: c.subject,
    html,
  })

  if (error) return { success: false as const, error: error.message }
  return { success: true as const }
}
