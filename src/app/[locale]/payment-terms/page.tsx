import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { legal } from "@/lib/i18n/legal";
import { locales, type Locale } from "@/lib/i18n";

function resolveLocale(locale: string): Locale {
  return (locales.includes(locale as Locale) ? locale : "ru") as Locale;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = resolveLocale(locale);
  return { title: `${legal[loc].docs.payment.title} | Sculptor of Your Body` };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LegalPage locale={resolveLocale(locale)} docKey="payment" />;
}
