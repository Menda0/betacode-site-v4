import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { SiteHeader } from "./components/site-header";
import { Google } from "./components/google";
import { GoogleAnalytics } from '@next/third-parties/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Betacode — Dedicated software teams for businesses and startups",
  description: "Custom software, dedicated engineering teams, and technical co-founder partnerships. From MVPs in three months to long-term team augmentation.",
  openGraph: {
    title: "Betacode",
    description: "Custom software, dedicated engineering teams, and technical co-founder partnerships. From MVPs in three months to long-term team augmentation.",
    images: "/images/betacode-facebook.png",
    url: "/",
  },
};

const themeScript = `
(function() {
  const key = 'betacode-theme';
  const stored = localStorage.getItem(key);
  const dark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (dark) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>

      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden antialiased`}
      >
        <Google />
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <ThemeProvider>
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId='G-TTP70YDXYR' />
    </html>
  );
}
