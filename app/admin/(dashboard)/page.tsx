import { getContactModel } from "@/lib/models/contact"
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
    locale: contact.locale,
    outcomes: contact.outcomes as OutcomeId[],
    answerSummary: contact.answerSummary as AnswerSummaryItem[],
    priceSummary: contact.priceSummary,
    createdAt: contact.createdAt.toISOString(),
  }))

  const enCount = rows.filter((row) => row.locale === "en").length
  const ptCount = rows.filter((row) => row.locale === "pt").length
  const withWebsiteCount = rows.filter((row) => row.website).length

  return (
    <>
      <ContactsSectionCards
        total={rows.length}
        enCount={enCount}
        ptCount={ptCount}
        withWebsiteCount={withWebsiteCount}
      />
      <ContactsDataTable data={rows} />
    </>
  )
}
