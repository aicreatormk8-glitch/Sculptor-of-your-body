import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sculptor of your body — онлайн фитнес-тренер, питание и программа тренировок",
  description: "Онлайн-ведение, персональный план питания и 8-недельная программа «Твоя лучшая версия» для трансформации тела.",
  keywords: "онлайн тренер, фитнес, план питания, программа тренировок, трансформация тела, ягодицы",
  openGraph: {
    title: "Sculptor of Your Body | Body Architect",
    description: "Онлайн-ведение, персональный план питания и 8-недельная программа трансформации тела.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${manrope.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
