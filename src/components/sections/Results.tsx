"use client";

import AnimatedSection from "../ui/AnimatedSection";

const results = [
  { icon: "🏋️", text: "Понятные тренировки, которые дают результат" },
  { icon: "🥗", text: "Питание под твой образ жизни без ограничений" },
  { icon: "📊", text: "Контроль прогресса на каждом этапе" },
  { icon: "💪", text: "Уверенность в себе и своём теле" },
  { icon: "🔥", text: "Дисциплина и устойчивые привычки" },
  { icon: "✨", text: "Красивая форма тела, которой ты гордишься" },
];

export default function Results() {
  return (
    <section id="results" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />

      {/* Glow orb */}
      <div
        className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(0,100,200,0.08)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <AnimatedSection direction="left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[var(--blue-neon)]" />
              <span className="text-xs font-600 tracking-[0.3em] uppercase text-[var(--blue-neon)]">
                Результат
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-800 text-white leading-tight mb-6">
              Ты получаешь не просто план —{" "}
              <span className="text-[var(--blue-neon)]">ты получаешь систему</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              Каждый элемент нашей работы ведёт к одному результату — твоей лучшей версии.
              Устойчиво. Системно. По-настоящему.
            </p>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-700 text-white rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
              style={{
                background: "linear-gradient(135deg, #0066cc, #00b4d8)",
                boxShadow: "0 0 20px rgba(0,180,216,0.3)",
              }}
            >
              Начать сейчас
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </AnimatedSection>

          {/* Right: results grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((r, i) => (
              <AnimatedSection key={r.text} delay={0.1 + i * 0.07} direction="right">
                <div className="glass rounded-xl p-4 flex items-start gap-4 group hover:border-[rgba(0,212,255,0.25)] transition-all duration-300">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg"
                    style={{ background: "rgba(0,212,255,0.07)" }}
                    aria-hidden="true"
                  >
                    {r.icon}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-0.5">{r.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Marquee stats bar */}
        <AnimatedSection delay={0.3} className="mt-20">
          <div
            className="rounded-2xl p-6 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(0,40,100,0.5), rgba(0,20,60,0.6))",
              border: "1px solid rgba(0,212,255,0.15)",
            }}
          >
            <div className="flex flex-wrap justify-around gap-8 text-center">
              {[
                { num: "100+", label: "Трансформаций" },
                { num: "98%", label: "Результат клиентов" },
                { num: "8", label: "Недель до результата" },
                { num: "24/7", label: "Поддержка тренера" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="text-3xl sm:text-4xl font-800 mb-1"
                    style={{
                      color: "var(--blue-neon)",
                      textShadow: "0 0 20px rgba(0,212,255,0.4)",
                    }}
                  >
                    {s.num}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
