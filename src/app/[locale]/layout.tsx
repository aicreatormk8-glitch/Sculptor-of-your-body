import type { Metadata } from "next";
import { getDictionary, locales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const titles: Record<string, string> = {
    ru: "Sculptor of your body — онлайн фитнес-тренер, питание и программа тренировок",
    uk: "Sculptor of your body — онлайн фітнес-тренер, харчування та програма тренувань",
    en: "Sculptor of your body — Online Fitness Coach, Nutrition & Training Program",
  };
  const descs: Record<string, string> = {
    ru: "Онлайн-ведение, персональный план питания и 8-недельная программа «Твоя лучшая версия» для трансформации тела.",
    uk: "Онлайн-ведення, персональний план харчування та 8-тижнева програма «Твоя найкраща версія» для трансформації тіла.",
    en: "Online coaching, personal nutrition plan and 8-week 'Your Best Version' program for body transformation.",
  };

  return {
    title: titles[locale] ?? titles.ru,
    description: descs[locale] ?? descs.ru,
    openGraph: {
      title: `Sculptor of Your Body | ${dict.hero.eyebrow}`,
      description: descs[locale] ?? descs.ru,
      type: "website",
    },
    alternates: {
      languages: {
        ru: "/ru",
        uk: "/uk",
        en: "/en",
      },
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
