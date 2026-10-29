import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "../components/theme-provider";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { siteFontVariables } from "../fonts";
import { routing } from "@/i18n/routing";
import { ogImageForLocale, SITE_NAME, TWITTER_HANDLE } from "@/lib/metadata";
import { getCopy, type ChromeCopy } from "@/lib/copy";
import { THEME_COOKIE, themeChoice, themeInitScript } from "@/lib/theme-cookie";
import "../styles/site.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const image = ogImageForLocale(locale);

  return {
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: locale === "pt" ? "pt_PT" : "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      images: [image.url],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const chrome = await getCopy<ChromeCopy>(locale, "chrome");
  const theme = themeChoice((await cookies()).get(THEME_COOKIE)?.value);

  return (
    <html lang={locale} className={theme ?? undefined} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="stylesheet" href="/betacode-intro/betacode-intro.css?v=1.1.0" />
        {/* 'always' plays on every full document load (direct visit or refresh); client-side
            navigation never re-runs these head scripts, so moving between pages skips it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.BetacodeIntroConfig={lang:${JSON.stringify(locale)},mode:'always'};`,
          }}
        />
        <script src="/betacode-intro/betacode-intro.min.js?v=1.1.0" />
      </head>
      <body className={siteFontVariables} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <div className="bc-root">
              <SiteHeader />
              {children}
              <SiteFooter copy={chrome} />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
        <GoogleAnalytics gaId="G-TTP70YDXYR" />
      </body>
    </html>
  );
}
