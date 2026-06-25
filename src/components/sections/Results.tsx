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

        {/* ── Before / After transformation collages ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.transformations.map((t, i) => {
            const hasCaption = t.name || t.period || t.result;
            return (
              <AnimatedSection key={i} delay={0.1 + i * 0.1} direction="up">
                <button
                  type="button"
                  onClick={() => t.image && setLightboxIndex(i)}
                  className={`glass rounded-2xl overflow-hidden group h-full w-full text-left block ${t.image ? "cursor-pointer" : ""}`}
                  aria-label={`${t.name || "Трансформация"} — открыть фото`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--bg-primary)]">
                    {t.image ? (
                      <Image src={t.image} alt={t.name || "До и после"} fill style={{ objectFit: "cover" }} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="transition-transform duration-500 group-hover:scale-[1.04]" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(160deg, rgba(8,14,28,0.9), rgba(4,8,16,0.95))" }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(74,96,128,0.5)" strokeWidth="1.5" aria-hidden="true">
                          <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
                        </svg>
                      </div>
                    )}
                    {t.image && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/25 transition-colors duration-300 pointer-events-none">
                        <span className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-700 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300" style={{ background: "rgba(0,212,255,0.9)", color: "#04111c" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3M11 8v6M8 11h6" /></svg>
                          Смотреть
                        </span>
                      </div>
                    )}
                  </div>
                  {hasCaption && (
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        {t.name && <span className="text-base font-700 text-white">{t.name}</span>}
                        {t.period && <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">{t.period}</span>}
                      </div>
                      {t.result && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-600" style={{ background: "rgba(0,212,255,0.1)", color: "var(--blue-neon)", border: "1px solid rgba(0,212,255,0.2)" }}>
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M2 11l4-4 3 3 5-6" /></svg>
                          {t.result}
                        </div>
                      )}
                    </div>
                  )}
                </button>
              </AnimatedSection>
            );
          })}
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
            <AnimatedSection key={i} delay={0.05 + i * 0.07} direction="up">
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
