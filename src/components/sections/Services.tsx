"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../ui/AnimatedSection";
import { useDict } from "@/lib/i18n/DictContext";

export default function Services() {
  const { services } = useDict();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] blur-[150px] pointer-events-none" style={{ background: "rgba(0,100,200,0.05)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[var(--blue-neon)]" />
            <span className="text-xs font-600 tracking-[0.3em] uppercase text-[var(--blue-neon)]">{services.eyebrow}</span>
            <div className="w-8 h-px bg-[var(--blue-neon)]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-800 text-white mb-4">{services.title}</h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto">{services.subtitle}</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {services.items.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.1}>
              <div
                className={`relative rounded-2xl p-6 sm:p-7 h-full flex flex-col transition-all duration-500 ${s.featured ? "glow-border" : "glass"}`}
                style={s.featured
                  ? { background: "linear-gradient(148deg, rgba(0,50,120,0.72), rgba(0,18,50,0.85))", backdropFilter: "blur(24px)", border: "1px solid rgba(0,212,255,0.48)" }
                  : {}
                }
              >
                {s.tag && (
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-3.5 left-6 px-4 py-1 text-xs font-800 tracking-widest rounded-full"
                    style={{ background: "linear-gradient(135deg, #0066cc, #00d4ff)", boxShadow: "0 0 20px rgba(0,212,255,0.5)", color: "white" }}
                  >
                    {s.tag}
                  </motion.div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-700 text-white mb-1" style={s.featured ? { color: "var(--blue-neon)" } : {}}>{s.title}</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{s.description}</p>
                </div>
                <div className="mb-6">
                  {s.oldPrice && <span className="text-sm text-[var(--text-muted)] line-through-price mr-2">{s.oldPrice}</span>}
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-800" style={{ color: s.featured ? "var(--blue-neon)" : "white", textShadow: s.featured ? "0 0 20px rgba(0,212,255,0.4)" : "none" }}>{s.price}</span>
                    {s.period && <span className="text-sm text-[var(--text-muted)]">{s.period}</span>}
                  </div>
                </div>
                <hr className="hr-glow mb-6" />
                <ul className="space-y-3 mb-8 flex-1">
                  {s.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7" stroke="rgba(0,212,255,0.4)" />
                        <path d="M5 8l2 2 4-4" stroke="var(--blue-neon)" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span className="text-xs text-[var(--text-secondary)] leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={s.ctaHref}
                  onClick={(e) => handleScroll(e, s.ctaHref)}
                  className="block text-center py-3.5 text-sm font-700 tracking-wide rounded-xl transition-all duration-300"
                  style={s.featured
                    ? { background: "linear-gradient(135deg, #0066cc, #00d4ff)", color: "white", boxShadow: "0 0 30px rgba(0,212,255,0.35)" }
                    : { border: "1px solid rgba(0,212,255,0.3)", color: "var(--blue-neon)", background: "rgba(0,212,255,0.05)" }}
                >
                  {s.cta}
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
