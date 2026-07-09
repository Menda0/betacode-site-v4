import type { ContactSource } from "@/lib/types/contact"

export function normalizeContactSource(source?: string | null): ContactSource {
  if (source === "general" || source === "betacode-ventures") {
    return source
  }
  return "price-calculator"
}

export function getContactSourceLabel(source: ContactSource) {
  switch (source) {
    case "general":
      return "General"
    case "betacode-ventures":
      return "Betacode Ventures"
    case "price-calculator":
      return "Price Calculator"
  }
}

export const CONTACT_SOURCE_OPTIONS: Array<ContactSource | "all"> = [
  "all",
  "general",
  "betacode-ventures",
  "price-calculator",
]
