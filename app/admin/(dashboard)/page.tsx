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
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contacts</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {rows.length} submission{rows.length === 1 ? "" : "s"} from the pricing calculator.
        </p>
      </div>
      <ContactsTable contacts={rows} />
    </div>
  )
}
