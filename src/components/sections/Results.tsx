"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "../ui/AnimatedSection";
import { useDict } from "@/lib/i18n/DictContext";

export default function Results() {
  const { results } = useDict();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = results.transformations.map((t) => t.image).filter(Boolean);

  const close = useCallback(() => setLightboxIndex(null), []);
  const step = useCallback((dir: number) => {
    setLightboxIndex((i) => (i === null ? i : (i + dir + images.length) % images.length));
  }, [images.length]);

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

        {/* ── Single gallery opener block ── */}
        {images.length > 0 && (
          <AnimatedSection direction="up" className="flex justify-center">
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="glass rounded-2xl px-8 py-8 sm:px-12 sm:py-10 w-full max-w-md group hover:border-[rgba(0,212,255,0.35)] transition-all duration-500 hover:shadow-[0_0_45px_rgba(0,212,255,0.12)] flex flex-col items-center text-center cursor-pointer"
              aria-label="Открыть галерею до и после"
            >
              {/* stacked-photos icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 text-[var(--blue-neon)] group-hover:shadow-[0_0_24px_rgba(0,212,255,0.35)] transition-all duration-300"
                style={{ background: "rgba(0,212,255,0.08)" }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <rect x="7" y="7" width="14" height="14" rx="2" />
                  <path d="M3 17V5a2 2 0 0 1 2-2h12" />
                  <circle cx="11.5" cy="11.5" r="1.5" />
                  <path d="M21 16l-4-4-7 7" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-800 text-white mb-2">Галерея «До / После»</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 max-w-xs">
                Реальные трансформации подопечных — открой и листай результаты.
              </p>
              <span
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-700 transition-all duration-300 group-hover:gap-3"
                style={{ background: "linear-gradient(135deg, #0066cc, #00b4d8)", color: "#fff", boxShadow: "0 0 20px rgba(0,180,216,0.3)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3M11 8v6M8 11h6" /></svg>
                Смотреть результаты
              </span>
            </button>
          </AnimatedSection>
        )}

        {/* ── Testimonials ── */}
        <AnimatedSection className="text-center mt-20 sm:mt-24 mb-12">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-800 text-white leading-tight">
            {results.testimonialsTitle}{" "}
            <span className="text-[var(--blue-neon)]">{results.testimonialsAccent}</span>
          </h3>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.testimonials.map((rev, i) => (
            <AnimatedSection key={i} delay={0.05 + i * 0.07} direction="up">
              <div className="glass rounded-2xl p-6 h-full flex flex-col items-center text-center">
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
                <div className="mt-5 pt-4 border-t border-[rgba(255,255,255,0.06)] w-full">
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

      {/* ── Lightbox gallery ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox images={images} index={lightboxIndex} onClose={close} onStep={step} />
        )}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({ images, index, onClose, onStep }: { images: string[]; index: number; onClose: () => void; onStep: (dir: number) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onStep]);

  const multiple = images.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(2,5,12,0.92)", backdropFilter: "blur(8px)" }}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        aria-label="Закрыть"
        className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center rounded-full text-white/80 hover:text-white transition-colors"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>

      {multiple && (
        <button
          onClick={(e) => { e.stopPropagation(); onStep(-1); }}
          aria-label="Предыдущее фото"
          className="absolute left-3 sm:left-6 w-11 h-11 flex items-center justify-center rounded-full text-white/80 hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
      )}

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl h-[82vh] rounded-xl overflow-hidden"
      >
        <Image src={images[index]} alt={`Результат ${index + 1}`} fill style={{ objectFit: "contain" }} sizes="(max-width: 768px) 100vw, 672px" priority />
      </motion.div>

      {multiple && (
        <button
          onClick={(e) => { e.stopPropagation(); onStep(1); }}
          aria-label="Следующее фото"
          className="absolute right-3 sm:right-6 w-11 h-11 flex items-center justify-center rounded-full text-white/80 hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      )}

      {multiple && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-600 text-white/90" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
          {index + 1} / {images.length}
        </div>
      )}
    </motion.div>
  );
}
