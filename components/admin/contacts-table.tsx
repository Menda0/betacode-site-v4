"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { AnswerSummaryItem } from "@/lib/pricing-calculator"
import type { OutcomeId } from "@/lib/pricing-calculator"

export type ContactRow = {
  id: string
  name: string
  email: string
  website?: string
  locale: "en" | "pt"
  outcomes: OutcomeId[]
  answerSummary: AnswerSummaryItem[]
  priceSummary: string
  createdAt: string
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

export function ContactsTable({ contacts }: { contacts: ContactRow[] }) {
  const [selected, setSelected] = useState<ContactRow | null>(null)

  if (contacts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
        No contacts yet. Submissions from the pricing calculator will appear here.
      </div>
    )
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Locale</TableHead>
              <TableHead>Outcomes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow
                key={contact.id}
                className="cursor-pointer"
                onClick={() => setSelected(contact)}
              >
                <TableCell className="whitespace-nowrap">
                  {formatDate(contact.createdAt)}
                </TableCell>
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>
                  {contact.website ? (
                    <a
                      href={contact.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline-offset-4 hover:underline"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {contact.website.replace(/^https?:\/\//, "")}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{contact.locale.toUpperCase()}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {contact.outcomes.length > 0 ? (
                      contact.outcomes.map((outcome) => (
                        <Badge key={outcome} variant="outline">
                          {outcome}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && (
          <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selected.name}</DialogTitle>
              <DialogDescription>
                Submitted {formatDate(selected.createdAt)} · {selected.locale.toUpperCase()}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 text-sm">
              <section className="space-y-2">
                <h3 className="font-medium">Contact</h3>
                <p>
                  <span className="text-muted-foreground">Email:</span> {selected.email}
                </p>
                {selected.website && (
                  <p>
                    <span className="text-muted-foreground">Website:</span>{" "}
                    <a
                      href={selected.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {selected.website}
                    </a>
                  </p>
                )}
              </section>

              <section className="space-y-2">
                <h3 className="font-medium">Price summary</h3>
                <p>{selected.priceSummary || "N/A"}</p>
              </section>

              <section className="space-y-2">
                <h3 className="font-medium">Recommended outcomes</h3>
                <div className="flex flex-wrap gap-1">
                  {selected.outcomes.map((outcome) => (
                    <Badge key={outcome} variant="outline">
                      {outcome}
                    </Badge>
                  ))}
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="font-medium">Questionnaire</h3>
                <ul className="space-y-2">
                  {selected.answerSummary.map((item) => (
                    <li key={`${item.questionId}-${item.value}`}>
                      <p className="text-muted-foreground">{item.label}</p>
                      <p>{item.value}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
