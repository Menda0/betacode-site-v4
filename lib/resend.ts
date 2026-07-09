import { Resend } from "resend"

let resendClient: Resend | null = null

function getResendClient() {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error("Please add RESEND_API_KEY to .env.local")
    }
    resendClient = new Resend(apiKey)
  }
  return resendClient
}

export const resendFromEmail =
  process.env.RESEND_FROM_EMAIL ?? "notifications@betacode.tech"

export { getResendClient as resend }
