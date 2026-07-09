import type { Metadata } from "next"
import Script from "next/script"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthProvider } from "@/components/admin/auth-provider"
import { ThemeProvider } from "@/app/components/theme-provider"
import { geistMono, geistSans } from "@/app/layout"
import "@/app/globals.css"

const themeScript = `
(function() {
  const key = 'betacode-theme';
  const stored = localStorage.getItem(key);
  const dark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (dark) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
})();
`

export const metadata: Metadata = {
  title: "Admin | Betacode",
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-background font-sans text-foreground antialiased`}
      >
        <Script id="admin-theme-init" strategy="beforeInteractive">
          {themeScript}
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
