import type { Metadata } from "next";
import { locales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

const BASE_URL = "https://sculptor-of-your-body.vercel.app";

const meta: Record<Locale, { title: string; description: string; keywords: string }> = {
  ru: {
    title: "Sculptor of Your Body — Онлайн фитнес-тренер | Питание и программа тренировок",
    description: "Персональное онлайн-ведение, план питания и 8-недельная программа «Твоя лучшая версия» для трансформации тела. Без зала, без хаоса — системный результат.",
    keywords: "онлайн тренер, фитнес, план питания, программа тренировок, трансформация тела, ягодицы, онлайн фитнес",
  },
  uk: {
    title: "Sculptor of Your Body — Онлайн фітнес-тренер | Харчування та програма тренувань",
    description: "Персональний онлайн-супровід, план харчування та 8-тижнева програма «Твоя найкраща версія» для трансформації тіла. Без залу, без хаосу — системний результат.",
    keywords: "онлайн тренер, фітнес, план харчування, програма тренувань, трансформація тіла, сідниці, онлайн фітнес",
  },
  en: {
    title: "Sculptor of Your Body — Online Fitness Coach | Nutrition & Training Program",
    description: "Personal online coaching, nutrition plan and 8-week 'Your Best Version' transformation program. No gym required — systematic, sustainable results.",
    keywords: "online fitness coach, nutrition plan, training program, body transformation, glutes, online fitness",
  },
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = (locales.includes(locale as Locale) ? locale : "ru") as Locale;
  const m = meta[loc];
  const url = `${BASE_URL}/${loc}`;

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
      languages: { ru: `${BASE_URL}/ru`, uk: `${BASE_URL}/uk`, en: `${BASE_URL}/en` },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      siteName: "Sculptor of Your Body",
      type: "website",
      locale: loc === "ru" ? "ru_RU" : loc === "uk" ? "uk_UA" : "en_US",
      images: [
        {
          url: `${BASE_URL}/assets/images/hero-trainer.png`,
          width: 1200,
          height: 630,
          alt: "Sculptor of Your Body",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [`${BASE_URL}/assets/images/hero-trainer.png`],
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

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return <>{children}</>;
}
