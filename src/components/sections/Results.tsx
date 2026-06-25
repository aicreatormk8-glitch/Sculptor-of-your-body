"use client";

import Image from "next/image";
import AnimatedSection from "../ui/AnimatedSection";
import { useDict } from "@/lib/i18n/DictContext";

export default function Results() {
  const { results } = useDict();

  return (
    <section id="results" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />
      <div className="absolute top-1/3 right-0 translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(0,100,200,0.08)" }} />
      <div className="absolute bottom-0 left-0 -translate-x-1/3 w-96 h-96 rounded-full blur-[130px] pointer-events-none" style={{ background: "rgba(0,180,216,0.06)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[var(--blue-neon)]" />
            <span className="text-xs font-600 tracking-[0.3em] uppercase text-[var(--blue-neon)]">{results.eyebrow}</span>
            <div className="w-8 h-px bg-[var(--blue-neon)]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-800 text-white leading-tight mb-5">
            {results.title}{" "}
            <span className="text-[var(--blue-neon)]">{results.titleAccent}</span>
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">{results.subtitle}</p>
        </AnimatedSection>

        {/* ── Before / After transformations ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.transformations.map((t, i) => (
            <AnimatedSection key={i} delay={0.1 + i * 0.1} direction="up">
              <div className="glass rounded-2xl overflow-hidden group h-full">
                <div className="grid grid-cols-2 gap-px aspect-[4/5]">
                  <BeforeAfterPane src={t.beforeImg} label={results.beforeLabel} accent={false} />
                  <BeforeAfterPane src={t.afterImg} label={results.afterLabel} accent />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-base font-700 text-white">
                      {t.name || <span className="text-[var(--text-muted)]">—</span>}
                    </span>
                    {t.period && (
                      <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">{t.period}</span>
                    )}
                  </div>
                  {t.result ? (
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-600"
                      style={{ background: "rgba(0,212,255,0.1)", color: "var(--blue-neon)", border: "1px solid rgba(0,212,255,0.2)" }}
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M2 11l4-4 3 3 5-6" /></svg>
                      {t.result}
                    </div>
                  ) : (
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">Скоро здесь появится история трансформации</p>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* ── Testimonials ── */}
        <AnimatedSection className="text-center mt-20 sm:mt-24 mb-12">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-800 text-white leading-tight">
            {results.testimonialsTitle}{" "}
            <span className="text-[var(--blue-neon)]">{results.testimonialsAccent}</span>
          </h3>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.testimonials.map((rev, i) => (
            <AnimatedSection key={i} delay={0.1 + i * 0.1} direction="up">
              <div className="glass rounded-2xl p-6 h-full flex flex-col">
                <div className="flex gap-1 mb-4" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} width="16" height="16" viewBox="0 0 20 20" fill="var(--blue-neon)">
                      <path d="M10 1l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.6 4.7 17.2l1-5.8L1.5 7.2l5.9-.9z" />
                    </svg>
                  ))}
                </div>
                <svg className="mb-3 opacity-20" width="32" height="32" viewBox="0 0 24 24" fill="var(--blue-neon)" aria-hidden="true">
                  <path d="M9.5 7H6a2 2 0 00-2 2v3a2 2 0 002 2h2v2a2 2 0 01-2 2H5v2h1a4 4 0 004-4V8.5A1.5 1.5 0 009.5 7zm9 0H15a2 2 0 00-2 2v3a2 2 0 002 2h2v2a2 2 0 01-2 2h-1v2h1a4 4 0 004-4V8.5A1.5 1.5 0 0018.5 7z" />
                </svg>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1 italic">
                  {rev.text || "Скоро здесь появится отзыв клиента."}
                </p>
                <div className="mt-5 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                  <p className="text-sm font-700 text-white">
                    {rev.name || <span className="text-[var(--text-muted)]">—</span>}
                  </p>
                  {rev.meta && <p className="text-xs text-[var(--text-muted)] mt-0.5">{rev.meta}</p>}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* ── CTA ── */}
        <AnimatedSection delay={0.2} className="text-center mt-16">
          <a
            href="#services"
            onClick={(e) => { e.preventDefault(); document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-700 text-white rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
            style={{ background: "linear-gradient(135deg, #0066cc, #00b4d8)", boxShadow: "0 0 20px rgba(0,180,216,0.3)" }}
          >
            {results.startBtn}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

function BeforeAfterPane({ src, label, accent }: { src: string; label: string; accent: boolean }) {
  return (
    <div className="relative overflow-hidden bg-[var(--bg-primary)]">
      {src ? (
        <Image src={src} alt={label} fill style={{ objectFit: "cover" }} className="transition-transform duration-500 group-hover:scale-105" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(160deg, rgba(8,14,28,0.9), rgba(4,8,16,0.95))" }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(74,96,128,0.5)" strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
      )}
      <span
        className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-[10px] font-700 uppercase tracking-wider z-10"
        style={
          accent
            ? { background: "rgba(0,212,255,0.85)", color: "#04111c" }
            : { background: "rgba(0,0,0,0.55)", color: "rgba(234,244,255,0.9)", backdropFilter: "blur(4px)" }
        }
      >
        {label}
      </span>
    </div>
  );
}
