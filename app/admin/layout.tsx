import type { Metadata } from "next"
import Script from "next/script"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthProvider } from "@/components/admin/auth-provider"
import { ThemeProvider } from "@/app/components/theme-provider"
import { cookies } from "next/headers"
import { geistMono, geistSans } from "@/app/layout"
import { THEME_COOKIE, themeChoice, themeInitScript } from "@/lib/theme-cookie"
import "@/app/globals.css"

export const metadata: Metadata = {
  title: "Admin | Betacode",
  robots: { index: false, follow: false },
}

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const theme = themeChoice((await cookies()).get(THEME_COOKIE)?.value)

  return (
    <html lang="en" className={theme ? `h-full ${theme}` : "h-full"} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full min-h-dvh bg-background font-sans text-foreground antialiased`}
      >
        <Script id="admin-theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <ThemeProvider>
          <TooltipProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
