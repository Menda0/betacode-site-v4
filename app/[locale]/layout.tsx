import Script from "next/script";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "../components/theme-provider";
import { SiteHeader } from "../components/site-header";
import { Google } from "../components/google";
import { geistMono, geistSans } from "../layout";
import { routing } from "@/i18n/routing";

const themeScript = `
(function() {
  const key = 'betacode-theme';
  const stored = localStorage.getItem(key);
  const dark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (dark) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
})();
`;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden antialiased`}
      >
        <Google />
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <SiteHeader />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
        <GoogleAnalytics gaId="G-TTP70YDXYR" />
      </body>
    </html>
  );
}
