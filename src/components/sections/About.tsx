"use client";

import AnimatedSection from "../ui/AnimatedSection";
import { useDict } from "@/lib/i18n/DictContext";

const icons = [
  <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8m-4-4v4" /></svg>,
  <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
  <svg key="4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h18v18H3zM3 9h18M9 21V9" /></svg>,
];

export default function About() {
  const dict = useDict();
  const { about } = dict;

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(0,100,200,0.06)" }} />

      {/* Single centered composition */}
      <div className="relative w-full flex flex-col items-center px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <AnimatedSection className="w-full max-w-2xl text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-[var(--blue-neon)]" />
            <span className="text-xs font-600 tracking-[0.3em] uppercase text-[var(--blue-neon)]">{about.eyebrow}</span>
            <div className="w-8 h-px bg-[var(--blue-neon)]" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-700 text-white leading-tight mb-3">
            {about.title}
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-800 leading-tight" style={{ color: "var(--blue-neon)", textShadow: "0 0 32px rgba(0,212,255,0.35)" }}>
            {about.titleAccent}
          </h3>
        </AnimatedSection>

        {/* Body text */}
        <AnimatedSection delay={0.08} className="w-full max-w-[780px] text-center mb-20 space-y-6">
          {about.desc.split("\n\n").map((para, i) => (
            <p key={i} className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed">{para}</p>
          ))}
        </AnimatedSection>

        {/* Statistics — 4 equal cards */}
        <div className="w-full max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-20">
          {about.stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={0.1 + i * 0.07} className="h-full">
              <div
                className="glass rounded-2xl px-4 py-10 text-center flex flex-col items-center justify-center h-full min-h-[160px] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.15)]"
                style={{ border: "1px solid rgba(0,212,255,0.12)" }}
              >
                <div className="text-5xl sm:text-6xl font-800 leading-none mb-4" style={{ color: "var(--blue-neon)", textShadow: "0 0 28px rgba(0,212,255,0.45)" }}>{s.value}</div>
                <div className="text-[10px] sm:text-xs text-[var(--text-muted)] font-500 tracking-[0.14em] uppercase opacity-70">{s.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Feature cards — 4 equal cards */}
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {about.features.map((f, i) => (
            <AnimatedSection key={f.title} delay={0.13 + i * 0.08} className="h-full">
              <div
                className="glass rounded-2xl p-8 flex flex-col h-full min-h-[220px] group transition-all duration-300 hover:shadow-[0_0_48px_rgba(0,212,255,0.12)] hover:-translate-y-1"
                style={{ border: "1px solid rgba(0,212,255,0.1)" }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-[var(--blue-neon)] shrink-0 transition-all duration-300 group-hover:shadow-[0_0_32px_rgba(0,212,255,0.3)]" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.14)" }}>
                  {icons[i]}
                </div>
                <h3 className="text-sm font-700 text-white mb-3 leading-tight">{f.title}</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{f.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.2}>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group inline-flex items-center gap-3 px-9 py-4 text-base font-700 tracking-wider rounded-full transition-all duration-300 hover:shadow-[0_0_52px_rgba(0,212,255,0.5)] hover:-translate-y-1"
            style={{
              color: "#EAF4FF",
              background: "rgba(0, 8, 18, 0.68)",
              border: "1px solid rgba(0, 210, 255, 0.35)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 0 28px rgba(0,212,255,0.16), inset 0 0 20px rgba(0,212,255,0.05)",
            }}
          >
            {about.cta}
            <svg className="transition-transform duration-300 group-hover:translate-x-1.5" width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
