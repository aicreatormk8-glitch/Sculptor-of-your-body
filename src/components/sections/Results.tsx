"use client";

import AnimatedSection from "../ui/AnimatedSection";
import { useDict } from "@/lib/i18n/DictContext";

export default function Results() {
  const { results } = useDict();

  return (
    <section id="results" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />
      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(0,100,200,0.08)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimatedSection direction="left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[var(--blue-neon)]" />
              <span className="text-xs font-600 tracking-[0.3em] uppercase text-[var(--blue-neon)]">{results.eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-800 text-white leading-tight mb-6">
              {results.title}{" "}
              <span className="text-[var(--blue-neon)]">{results.titleAccent}</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">{results.desc}</p>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-700 text-white rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
              style={{ background: "linear-gradient(135deg, #0066cc, #00b4d8)", boxShadow: "0 0 20px rgba(0,180,216,0.3)" }}
            >
              {results.startBtn}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </a>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.items.map((r, i) => (
              <AnimatedSection key={r.text} delay={0.1 + i * 0.07} direction="right">
                <div className="glass rounded-xl p-4 flex items-start gap-4 group hover:border-[rgba(0,212,255,0.25)] transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg" style={{ background: "rgba(0,212,255,0.07)" }} aria-hidden="true">{r.icon}</div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-0.5">{r.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection delay={0.3} className="mt-20">
          <div className="rounded-2xl p-6 overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(0,40,100,0.5), rgba(0,20,60,0.6))", border: "1px solid rgba(0,212,255,0.15)" }}>
            <div className="flex flex-wrap justify-around gap-8 text-center">
              {results.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl sm:text-4xl font-800 mb-1" style={{ color: "var(--blue-neon)", textShadow: "0 0 20px rgba(0,212,255,0.4)" }}>{s.num}</div>
                  <div className="text-xs text-[var(--text-muted)] tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
