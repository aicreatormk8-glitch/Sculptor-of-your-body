"use client";

import { motion } from "framer-motion";
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
        <AnimatedSection delay={0.22} className="mt-12">
          <motion.a
            href="#services"
            onClick={(e) => { e.preventDefault(); document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-block px-12 py-5 text-lg font-700 tracking-wide rounded-full cursor-pointer"
            style={{
              color: "#EAF4FF",
              background: "rgba(0, 8, 18, 0.72)",
              border: "1.5px solid rgba(0, 210, 255, 0.4)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
            }}
            animate={{
              scale: [1, 1.07, 1, 1.04, 1],
              boxShadow: [
                "0 0 32px rgba(0,212,255,0.18), inset 0 0 24px rgba(0,212,255,0.06)",
                "0 0 60px rgba(0,229,255,0.55), inset 0 0 28px rgba(0,212,255,0.18)",
                "0 0 32px rgba(0,212,255,0.18), inset 0 0 24px rgba(0,212,255,0.06)",
                "0 0 50px rgba(0,229,255,0.42), inset 0 0 22px rgba(0,212,255,0.14)",
                "0 0 32px rgba(0,212,255,0.18), inset 0 0 24px rgba(0,212,255,0.06)",
              ],
              borderColor: [
                "rgba(0,210,255,0.4)",
                "rgba(0,229,255,0.85)",
                "rgba(0,210,255,0.4)",
                "rgba(0,229,255,0.7)",
                "rgba(0,210,255,0.4)",
              ],
            }}
            transition={{
              duration: 1.3,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.15, 0.4, 0.55, 1],
            }}
            whileHover={{
              scale: 1.12,
              color: "#0ABAB5",
              boxShadow: "0 0 70px rgba(0,212,255,0.65), inset 0 0 26px rgba(0,212,255,0.18)",
              borderColor: "rgba(0,229,255,0.9)",
            }}
          >
            {about.cta}
          </motion.a>
        </AnimatedSection>
      </div>
    </section>
  );
}
