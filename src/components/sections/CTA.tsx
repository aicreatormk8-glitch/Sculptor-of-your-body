"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../ui/AnimatedSection";
import { useDict } from "@/lib/i18n/DictContext";

export default function CTA() {
  const { cta } = useDict();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ background: ["radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,80,200,0.12) 0%, transparent 70%)", "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,120,255,0.15) 0%, transparent 70%)", "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,80,200,0.12) 0%, transparent 70%)"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[var(--blue-neon)]" />
            <span className="text-xs font-600 tracking-[0.3em] uppercase text-[var(--blue-neon)]">{cta.eyebrow}</span>
            <div className="w-8 h-px bg-[var(--blue-neon)]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-800 text-white leading-tight mb-4">
            {cta.title}{" "}
            <span className="glow-text" style={{ color: "var(--blue-neon)" }}>{cta.titleAccent}</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-12 max-w-xl mx-auto">{cta.subtitle}</p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <a
              href="#services"
              onClick={(e) => handleScroll(e, "#services")}
              className="group relative px-8 py-4 text-sm font-700 tracking-wide text-white rounded-xl overflow-hidden transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #0066cc, #00b4d8)", boxShadow: "0 0 30px rgba(0,180,216,0.35)" }}
            >
              <span className="relative z-10">{cta.btn1}</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, #0080ff, #00d4ff)" }} />
            </a>
            <a
              href="#program"
              onClick={(e) => handleScroll(e, "#program")}
              className="px-8 py-4 text-sm font-600 tracking-wide text-[var(--blue-neon)] rounded-xl transition-all duration-300 hover:bg-[rgba(0,212,255,0.08)] hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]"
              style={{ border: "1px solid rgba(0,212,255,0.35)", backdropFilter: "blur(10px)" }}
            >
              {cta.btn2}
            </a>
            <a
              href="#services"
              onClick={(e) => handleScroll(e, "#services")}
              className="px-8 py-4 text-sm font-600 tracking-wide text-[var(--text-secondary)] rounded-xl transition-all duration-300 hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
              style={{ border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}
            >
              {cta.btn3}
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
