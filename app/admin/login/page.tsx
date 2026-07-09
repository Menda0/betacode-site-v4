import { LoginForm } from "@/components/admin/login-form"
import { AdminThemeToggle } from "@/components/admin/theme-toggle"

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center bg-background p-6">
      <div className="absolute top-4 right-4">
        <AdminThemeToggle />
      </div>
      <LoginForm />
    </div>
  )
}
