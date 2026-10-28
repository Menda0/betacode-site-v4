export const SITE_ROUTES = {
  home: "/",
  pricing: "/pricing",
  ventures: "/betacode-ventures",
  insights: "/insights",
  contact: "/contact",
} as const

export const CONTACT_FORM_HREF = "/contact#contact-form"
export const VENTURES_APPLY_ANCHOR = "#candidatura"
export const VENTURES_APPLY_HREF = "/betacode-ventures#candidatura"
export const VENTURES_CASE_HREF = "/betacode-ventures#coachid"
export const SERVICES_ANCHOR = "#servicos"

export function articleHref(slug: string) {
  return `/insights/${slug}`
}

export const CONTACT_EMAIL = "info@betacode.tech"
export const CONTACT_PHONE_DISPLAY = "+351 919 245 764"
export const CONTACT_PHONE_TEL = "+351919245764"
export const CONTACT_MAPS_URL =
  "https://maps.google.com/?q=Madan+Parque,+Rua+dos+Inventores,+2825-182+Caparica"
