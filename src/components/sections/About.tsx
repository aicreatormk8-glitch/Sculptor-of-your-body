"use client";

import AnimatedSection from "../ui/AnimatedSection";

const stats = [
  { value: "100+", label: "Трансформаций" },
  { value: "98%", label: "Результат клиентов" },
  { value: "3+", label: "Года опыта" },
  { value: "24/7", label: "Поддержка" },
];

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Индивидуальный подход",
    desc: "Каждая программа создаётся под тебя: твоё тело, цели и образ жизни.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8m-4-4v4" />
      </svg>
    ),
    title: "Онлайн формат",
    desc: "Тренируйся из любой точки мира, когда удобно тебе — без привязки к залу.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Акцент на ягодицы и форму",
    desc: "Специализация на женской физиологии — красивая форма без перекачки.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3h18v18H3zM3 9h18M9 21V9" />
      </svg>
    ),
    title: "Питание без крайностей",
    desc: "Система питания, которая работает в реальной жизни — без голодовок и запретов.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(0,100,200,0.06)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[var(--blue-neon)]" />
            <span className="text-xs font-600 tracking-[0.3em] uppercase text-[var(--blue-neon)]">
              Обо мне
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-800 text-white leading-tight max-w-2xl">
            Тренер, который помогает не просто похудеть, а{" "}
            <span className="text-[var(--blue-neon)]">построить тело</span>
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: text + stats */}
          <AnimatedSection delay={0.1}>
            <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed mb-10">
              Я помогаю девушкам выстроить красивое, сильное и подтянутое тело через тренировки,
              питание и системный подход. Без хаоса, без жёстких запретов и без случайных решений.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-2xl p-5"
                >
                  <div
                    className="text-3xl sm:text-4xl font-800 mb-1"
                    style={{ color: "var(--blue-neon)", textShadow: "0 0 20px rgba(0,212,255,0.4)" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[var(--text-muted)] font-500 tracking-wide">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-700 text-white rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]"
              style={{
                background: "linear-gradient(135deg, #0066cc, #00b4d8)",
                boxShadow: "0 0 20px rgba(0,180,216,0.3)",
              }}
            >
              Записаться на ведение
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </AnimatedSection>

          {/* Right: feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={0.15 + i * 0.08}>
                <div
                  className="glass rounded-2xl p-5 h-full group hover:border-[rgba(0,212,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.08)]"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-[var(--blue-neon)]"
                    style={{ background: "rgba(0,212,255,0.08)" }}
                  >
                    {f.icon}
                  </div>
                  <h3 className="text-sm font-700 text-white mb-2 leading-tight">{f.title}</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
