"use client";

import AnimatedSection from "../ui/AnimatedSection";
import { useDict } from "@/lib/i18n/DictContext";

const weekColors = [
  "rgba(0,100,200,0.5)",
  "rgba(0,150,220,0.5)",
  "rgba(0,180,240,0.5)",
  "rgba(0,212,255,0.5)",
];

export default function Program() {
  const { program } = useDict();

  return (
    <section id="program" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] blur-[180px] pointer-events-none" style={{ background: "rgba(0,80,180,0.07)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[var(--blue-neon)]" />
            <span className="text-xs font-600 tracking-[0.3em] uppercase text-[var(--blue-neon)]">{program.eyebrow}</span>
            <div className="w-8 h-px bg-[var(--blue-neon)]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-800 text-white mb-4">
            {program.title}{" "}
            <span className="text-[var(--blue-neon)]">{program.titleAccent}</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">{program.subtitle}</p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <AnimatedSection delay={0.1}>
            <h3 className="text-sm font-600 tracking-[0.2em] uppercase text-[var(--text-muted)] mb-8">{program.structureLabel}</h3>
            <div className="relative">
              <div className="absolute left-6 top-6 bottom-6 w-px" style={{ background: "linear-gradient(to bottom, var(--blue-neon), transparent)" }} />
              <div className="space-y-6">
                {program.weeks.map((w, i) => (
                  <AnimatedSection key={w.range} delay={0.15 + i * 0.08} direction="left">
                    <div className="flex gap-6">
                      <div className="relative z-10 flex-shrink-0">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-800 text-white"
                          style={{ background: `radial-gradient(circle, ${weekColors[i]}, rgba(0,40,80,0.8))`, border: "1px solid rgba(0,212,255,0.4)", boxShadow: `0 0 20px ${weekColors[i]}` }}
                        >
                          {i + 1}
                        </div>
                      </div>
                      <div className="glass rounded-2xl p-4 flex-1">
                        <span className="text-xs font-600 tracking-wider text-[var(--blue-neon)] uppercase">{w.range}</span>
                        <h4 className="text-sm font-700 text-white mt-1 mb-1">{w.title}</h4>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">{w.desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} direction="right">
            <div className="rounded-2xl p-7 sm:p-8 glow-border" style={{ background: "linear-gradient(145deg, rgba(0,40,100,0.6), rgba(0,15,40,0.8))", backdropFilter: "blur(20px)" }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-700 mb-6" style={{ background: "linear-gradient(135deg, rgba(0,102,204,0.3), rgba(0,212,255,0.2))", border: "1px solid rgba(0,212,255,0.4)", color: "var(--blue-neon)" }}>
                <span>{program.badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-800 text-white mb-1">{program.programTitle}</h3>
              <p className="text-sm text-[var(--text-muted)] mb-6">{program.programSubtitle}</p>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-5xl font-800" style={{ color: "var(--blue-neon)", textShadow: "0 0 30px rgba(0,212,255,0.5)" }}>$33</span>
                <span className="text-lg text-[var(--text-muted)] line-through-price">$117</span>
              </div>
              <hr className="hr-glow mb-6" />
              <ul className="space-y-3 mb-8">
                {program.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="rgba(0,212,255,0.4)" />
                      <path d="M5 8l2 2 4-4" stroke="var(--blue-neon)" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span className="text-xs text-[var(--text-secondary)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#services"
                onClick={(e) => { e.preventDefault(); document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
                className="block text-center py-4 text-sm font-700 tracking-wide text-white rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.4)] pulse-glow"
                style={{ background: "linear-gradient(135deg, #0066cc, #00d4ff)", boxShadow: "0 0 30px rgba(0,212,255,0.35)" }}
              >
                {program.buyBtn}
              </a>
              <p className="text-center text-xs text-[var(--text-muted)] mt-4">{program.accessNote}</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
