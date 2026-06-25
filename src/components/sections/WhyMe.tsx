"use client";

import AnimatedSection from "../ui/AnimatedSection";

const reasons = [
  {
    num: "01",
    title: "Без универсальных схем",
    desc: "Никаких шаблонных программ. Каждый план строится под твоё тело, цели и возможности.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Понятная система",
    desc: "Ты всегда знаешь, что делать и почему. Полная ясность на каждом этапе пути.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Фокус на женскую фигуру",
    desc: "Специализация на женской физиологии — красивая форма тела без перекачки и мужских методов.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Поддержка и контроль",
    desc: "Ты не одна. Еженедельная обратная связь, корректировки и мотивация на каждом шаге.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function WhyMe() {
  return (
    <section id="why" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--blue-neon) 1px, transparent 1px), linear-gradient(90deg, var(--blue-neon) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[var(--blue-neon)]" />
            <span className="text-xs font-600 tracking-[0.3em] uppercase text-[var(--blue-neon)]">
              Почему я
            </span>
            <div className="w-8 h-px bg-[var(--blue-neon)]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-800 text-white mb-4">
            Почему выбирают меня
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
            Подход, который даёт реальный и устойчивый результат
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <AnimatedSection key={r.num} delay={i * 0.1}>
              <div
                className="glass rounded-2xl p-6 h-full group hover:border-[rgba(0,212,255,0.3)] transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,212,255,0.08)] cursor-default"
              >
                {/* Number */}
                <div
                  className="text-5xl font-800 leading-none mb-4 select-none"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(0,212,255,0.25)",
                  }}
                >
                  {r.num}
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[var(--blue-neon)] group-hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all duration-300"
                  style={{ background: "rgba(0,212,255,0.07)" }}
                >
                  {r.icon}
                </div>

                <h3 className="text-sm font-700 text-white mb-2 leading-snug">{r.title}</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{r.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
