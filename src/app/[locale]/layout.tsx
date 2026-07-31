import type { Metadata } from "next";
import { Caveat, Inter, Tektur, Unbounded } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

// Body/UI font — Inter carries Cyrillic well for Uzbek + Russian.
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

// Bold, modern display font for headings — energetic rather than classical.
const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// Heavy chamfered display face for the hero wordmark (Master-IELTS-style block
// lettering). Latin only — the wordmark text is always "STANFORD EDUCATION".
const tektur = Tektur({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-block",
  display: "swap",
});

// Handwritten script for the teacher's name (has Cyrillic for the ru locale).
const caveat = Caveat({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-script",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://stanfordedu.uz"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      siteName: "Stanford Education Center",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${unbounded.variable} ${tektur.variable} ${caveat.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground antialiased">
        {/* Light mode only — no theme switching. */}
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
