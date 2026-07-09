import { getContactModel } from "@/lib/models/contact"
import { ContactsTable, type ContactRow } from "@/components/admin/contacts-table"
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

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Contacts</h1>
        <p className="text-sm text-muted-foreground">
          {rows.length} submission{rows.length === 1 ? "" : "s"} from the pricing calculator.
        </p>
      </div>
      <ContactsTable contacts={rows} />
    </div>
  )
}
