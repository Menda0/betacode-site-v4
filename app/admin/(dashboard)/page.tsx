import { getContactModel } from "@/lib/models/contact"
import { normalizeContactSource } from "@/lib/contact-source"
import { ContactsDataTable, type ContactRow } from "@/components/admin/contacts-data-table"
import { ContactsSectionCards } from "@/components/admin/contacts-section-cards"
import type { OutcomeId } from "@/lib/pricing-calculator"
import type { AnswerSummaryItem } from "@/lib/pricing-calculator"

export const dynamic = "force-dynamic"

export default async function AdminDashboardPage() {
  const Contact = await getContactModel()
  const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean()

  const rows: ContactRow[] = contacts.map((contact) => ({
    id: contact._id.toString(),
    name: contact.name,
    email: contact.email,
    website: contact.website,
    phone: contact.phone,
    message: contact.message,
    source: normalizeContactSource(contact.source),
    locale: contact.locale,
    outcomes: contact.outcomes as OutcomeId[],
    answerSummary: contact.answerSummary as AnswerSummaryItem[],
    priceSummary: contact.priceSummary,
    createdAt: contact.createdAt.toISOString(),
  }))

  const generalCount = rows.filter((row) => row.source === "general").length
  const venturesCount = rows.filter((row) => row.source === "betacode-ventures").length
  const priceCalculatorCount = rows.filter((row) => row.source === "price-calculator").length

  return (
    <>
      <ContactsSectionCards
        total={rows.length}
        generalCount={generalCount}
        venturesCount={venturesCount}
        priceCalculatorCount={priceCalculatorCount}
      />
      <ContactsDataTable data={rows} />
    </>
  )
}
