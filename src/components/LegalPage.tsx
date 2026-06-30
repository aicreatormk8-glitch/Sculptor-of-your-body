import Link from "next/link";
import { legal, type LegalDocKey } from "@/lib/i18n/legal";
import type { Locale } from "@/lib/i18n";

export default function LegalPage({
  locale,
  docKey,
}: {
  locale: Locale;
  docKey: LegalDocKey;
}) {
  const t = legal[locale] ?? legal.ru;
  const doc = t.docs[docKey];
  const homeHref = `/${locale}`;

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[var(--bg-primary)]">
      {/* Ambient glows to match the site */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.35), transparent)" }}
      />
      <div
        className="pointer-events-none absolute -top-32 right-0 w-96 h-96 rounded-full blur-[140px]"
        style={{ background: "rgba(0,120,200,0.10)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[150px]"
        style={{ background: "rgba(0,180,216,0.06)" }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Top bar: brand + back */}
        <div className="flex items-center justify-between gap-4 mb-14">
          <Link
            href={homeHref}
            className="text-sm sm:text-base font-700 tracking-[-0.01em] transition-opacity hover:opacity-80"
            style={{ color: "#EAF4FF" }}
          >
            SCULPTOR <span style={{ color: "#00d4ff" }}>OF YOUR BODY</span>
          </Link>
          <Link
            href={homeHref}
            className="inline-flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--blue-neon)] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 12l-4-4 4-4" />
            </svg>
            {t.backHome}
          </Link>
        </div>

        {/* Heading */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-[var(--blue-neon)]" />
          <span className="text-xs font-600 tracking-[0.3em] uppercase text-[var(--blue-neon)]">{t.eyebrow}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-800 text-white leading-tight mb-4">{doc.title}</h1>
        <p className="text-xs text-[var(--text-muted)] mb-10">
          {t.updatedLabel}: {t.updatedDate}
        </p>

        <p className="text-[var(--text-secondary)] leading-relaxed mb-12">{doc.intro}</p>

        {/* Sections */}
        <div className="space-y-10">
          {doc.sections.map((s, i) => (
            <section key={i}>
              <h2 className="flex items-baseline gap-3 text-lg sm:text-xl font-700 text-white mb-3">
                <span className="text-sm font-800 text-[var(--blue-neon)]">{String(i + 1).padStart(2, "0")}</span>
                {s.heading}
              </h2>
              <div className="space-y-3 pl-8">
                {s.body.map((p, j) => (
                  <p key={j} className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Back-to-home CTA */}
        <div className="mt-16 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Link
            href={homeHref}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-700 text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
            style={{ background: "linear-gradient(135deg, #0066cc, #00b4d8)", boxShadow: "0 0 20px rgba(0,180,216,0.3)" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 8H3M7 4L3 8l4 4" />
            </svg>
            {t.backHome}
          </Link>
        </div>
      </div>
    </main>
  );
}
