"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../ui/AnimatedSection";
import CountdownTimer from "../ui/CountdownTimer";
import { useDict } from "@/lib/i18n/DictContext";

export default function Services() {
  const { services } = useDict();
  const { saleTimerLabel, saleTimerUnits } = services;

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] blur-[150px] pointer-events-none" style={{ background: "rgba(0,100,200,0.05)" }} />

      <div className="relative w-full flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-24 w-full">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[var(--blue-neon)]" />
            <span className="text-xs font-600 tracking-[0.3em] uppercase text-[var(--blue-neon)]">{services.eyebrow}</span>
            <div className="w-8 h-px bg-[var(--blue-neon)]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-800 text-white">{services.title}</h2>
        </AnimatedSection>

        <div className="w-full max-w-6xl grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {services.items.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.1}>
              <motion.div
                className={`relative rounded-2xl p-6 sm:p-7 h-full flex flex-col ${s.featured ? "" : "glass"}`}
                style={s.featured
                  ? { background: "linear-gradient(148deg, rgba(0,50,120,0.72), rgba(0,18,50,0.85))", backdropFilter: "blur(24px)", border: "1px solid rgba(0,212,255,0.55)" }
                  : {}
                }
                animate={s.featured ? {
                  boxShadow: [
                    "0 0 0 1px rgba(0,212,255,0.45), 0 0 35px rgba(0,212,255,0.22), 0 0 80px rgba(0,100,200,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
                    "0 0 0 1px rgba(0,212,255,0.7),  0 0 60px rgba(0,212,255,0.50), 0 0 120px rgba(0,150,255,0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
                    "0 0 0 1px rgba(0,212,255,0.45), 0 0 35px rgba(0,212,255,0.22), 0 0 80px rgba(0,100,200,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
                  ]
                } : {}}
                transition={s.featured ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : {}}
              >
                {s.tag && (
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-3.5 left-6 px-4 py-1 text-xs font-800 tracking-widest rounded-full"
                    style={s.tag === "SALE"
                      ? { background: "linear-gradient(135deg, #0066cc, #00d4ff)", boxShadow: "0 0 20px rgba(0,212,255,0.5)", color: "white" }
                      : { background: "rgba(0,8,20,0.85)", border: "1px solid rgba(0,210,255,0.5)", color: "#00d4ff", boxShadow: "0 0 14px rgba(0,212,255,0.3)" }
                    }
                  >
                    {s.tag}
                  </motion.div>
                )}

                <div className="mb-6 text-center">
                  <h3 className="text-lg font-700 mb-1" style={{ color: s.featured ? "var(--blue-neon)" : "white" }}>{s.title}</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{s.description}</p>
                </div>

                <div className="mb-6">
                  {s.oldPrice && (
                    <div className="mb-1.5">
                      <span className="text-base sm:text-lg font-500" style={{ color: "rgba(139,163,199,0.55)", textDecoration: "line-through" }}>{s.oldPrice}</span>
                    </div>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl sm:text-6xl font-800 leading-none" style={{ color: s.featured ? "var(--blue-neon)" : "white", textShadow: s.featured ? "0 0 28px rgba(0,212,255,0.5)" : "0 0 20px rgba(255,255,255,0.08)" }}>{s.price}</span>
                    {s.period && <span className="text-sm text-[var(--text-muted)] pb-1">{s.period}</span>}
                  </div>
                </div>

                {s.featured && (
                  <CountdownTimer label={saleTimerLabel} units={saleTimerUnits} />
                )}

                <hr className="hr-glow mb-6 mt-6" />

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
                  className="heartbeat block text-center py-3.5 text-sm font-700 tracking-wide rounded-xl"
                  style={s.featured
                    ? { background: "linear-gradient(135deg, #0066cc, #00d4ff)", color: "white", boxShadow: "0 0 30px rgba(0,212,255,0.35)" }
                    : { border: "1px solid rgba(0,212,255,0.3)", color: "var(--blue-neon)", background: "rgba(0,212,255,0.05)" }}
                >
                  {s.cta}
                </a>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
