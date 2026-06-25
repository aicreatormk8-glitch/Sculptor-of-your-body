"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../ui/AnimatedSection";

const services = [
  {
    id: 1,
    tag: null,
    title: "Онлайн-ведение",
    price: "$120",
    period: "/ месяц",
    oldPrice: null,
    description: "Полное сопровождение, контроль, корректировки и поддержка на пути к результату.",
    features: [
      "Индивидуальный план тренировок",
      "Рекомендации по питанию",
      "Еженедельная обратная связь",
      "Корректировки по прогрессу",
      "Поддержка и мотивация",
    ],
    cta: "Записаться",
    ctaHref: "#contact",
    featured: false,
    color: "#0066cc",
  },
  {
    id: 2,
    tag: null,
    title: "План питания на месяц",
    price: "$70",
    period: "",
    oldPrice: null,
    description: "Персональный план питания под твои цели, ритм жизни и предпочтения.",
    features: [
      "Расчёт калорий и БЖУ",
      "Меню на месяц",
      "Список продуктов",
      "Рекомендации по замене блюд",
      "Понятная система питания",
    ],
    cta: "Получить план",
    ctaHref: "#contact",
    featured: false,
    color: "#0090c0",
  },
  {
    id: 3,
    tag: "SALE",
    title: "Твоя лучшая версия",
    price: "$33",
    period: "",
    oldPrice: "$117",
    description: "8-недельная программа тренировок с акцентом на ягодицы, тонус и форму тела.",
    features: [
      "Тренировочный план на 8 недель",
      "Акцент на ягодицы",
      "Структура по неделям",
      "Доступ навсегда",
      "Подходит для самостоятельного прохождения",
    ],
    cta: "Купить программу",
    ctaHref: "#program",
    featured: true,
    color: "#00d4ff",
  },
];

export default function Services() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] blur-[150px] pointer-events-none"
        style={{ background: "rgba(0,100,200,0.05)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[var(--blue-neon)]" />
            <span className="text-xs font-600 tracking-[0.3em] uppercase text-[var(--blue-neon)]">
              Услуги
            </span>
            <div className="w-8 h-px bg-[var(--blue-neon)]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-800 text-white mb-4">
            Выбери свой формат
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
            Каждое предложение создано под конкретную цель и формат работы
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {services.map((s, i) => (
            <AnimatedSection key={s.id} delay={i * 0.1}>
              <div
                className={`relative rounded-2xl p-6 sm:p-7 h-full flex flex-col group transition-all duration-500 ${
                  s.featured ? "glow-border" : "glass hover:border-[rgba(0,212,255,0.25)]"
                }`}
                style={
                  s.featured
                    ? {
                        background: "linear-gradient(145deg, rgba(0,40,100,0.7), rgba(0,20,50,0.8))",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(0,212,255,0.5)",
                      }
                    : {}
                }
              >
                {/* SALE badge */}
                {s.tag && (
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-3.5 left-6 px-4 py-1 text-xs font-800 tracking-widest rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #0066cc, #00d4ff)",
                      boxShadow: "0 0 20px rgba(0,212,255,0.5)",
                      color: "white",
                    }}
                  >
                    {s.tag}
                  </motion.div>
                )}

                {/* Title */}
                <div className="mb-6">
                  <h3
                    className="text-lg font-700 text-white mb-1"
                    style={s.featured ? { color: "var(--blue-neon)" } : {}}
                  >
                    {s.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {s.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {s.oldPrice && (
                    <span className="text-sm text-[var(--text-muted)] line-through-price mr-2">
                      {s.oldPrice}
                    </span>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-4xl font-800"
                      style={{
                        color: s.featured ? "var(--blue-neon)" : "white",
                        textShadow: s.featured ? "0 0 20px rgba(0,212,255,0.4)" : "none",
                      }}
                    >
                      {s.price}
                    </span>
                    {s.period && (
                      <span className="text-sm text-[var(--text-muted)]">{s.period}</span>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <hr className="hr-glow mb-6" />

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {s.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <svg
                        className="flex-shrink-0 mt-0.5"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <circle cx="8" cy="8" r="7" stroke="rgba(0,212,255,0.4)" />
                        <path
                          d="M5 8l2 2 4-4"
                          stroke="var(--blue-neon)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={s.ctaHref}
                  onClick={(e) => handleScroll(e, s.ctaHref)}
                  className="block text-center py-3.5 text-sm font-700 tracking-wide rounded-xl transition-all duration-300"
                  style={
                    s.featured
                      ? {
                          background: "linear-gradient(135deg, #0066cc, #00d4ff)",
                          color: "white",
                          boxShadow: "0 0 30px rgba(0,212,255,0.35)",
                        }
                      : {
                          border: "1px solid rgba(0,212,255,0.3)",
                          color: "var(--blue-neon)",
                          background: "rgba(0,212,255,0.05)",
                        }
                  }
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
