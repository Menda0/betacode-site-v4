import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { AdminShell } from "@/components/admin/admin-sidebar"

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/admin/login")
  }

  return (
    <AdminShell userEmail={session.user.email}>{children}</AdminShell>
  )
}
