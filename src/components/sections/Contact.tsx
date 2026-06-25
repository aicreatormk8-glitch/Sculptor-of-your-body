"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "../ui/AnimatedSection";

type Service = "coaching" | "nutrition" | "program";

const services: { value: Service; label: string; price: string }[] = [
  { value: "coaching", label: "Онлайн-ведение", price: "$120/мес" },
  { value: "nutrition", label: "План питания", price: "$70" },
  { value: "program", label: 'Программа "Твоя лучшая версия"', price: "$33" },
];

export default function Contact() {
  const [selected, setSelected] = useState<Service>("coaching");
  const [form, setForm] = useState({ name: "", instagram: "", goal: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async (payment integration placeholder)
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);

    // For the program, redirect to Telegram after "payment"
    if (selected === "program") {
      setTimeout(() => {
        window.open("https://t.me/+KhFZoWiTgjphYmQy", "_blank");
      }, 1500);
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left info */}
          <AnimatedSection direction="left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[var(--blue-neon)]" />
              <span className="text-xs font-600 tracking-[0.3em] uppercase text-[var(--blue-neon)]">
                Контакты
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-800 text-white mb-4 leading-tight">
              Сделай первый шаг к{" "}
              <span className="text-[var(--blue-neon)]">своей версии</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              Выбери услугу, заполни форму — и я свяжусь с тобой в течение 24 часов
              для обсуждения деталей и старта.
            </p>

            <div className="space-y-4">
              <div
                className="glass rounded-xl p-4 flex items-center gap-4"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--blue-neon)] flex-shrink-0"
                  style={{ background: "rgba(0,212,255,0.08)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.82-.82a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-[var(--text-muted)] mb-0.5">Telegram</div>
                  <div className="text-sm font-600 text-white">@sculptorofyourbody</div>
                </div>
              </div>

              <div
                className="glass rounded-xl p-4 flex items-center gap-4"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--blue-neon)] flex-shrink-0"
                  style={{ background: "rgba(0,212,255,0.08)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-[var(--text-muted)] mb-0.5">Instagram</div>
                  <div className="text-sm font-600 text-white">@sculptor.of.your.body</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right form */}
          <AnimatedSection delay={0.15} direction="right">
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                background: "rgba(8,16,40,0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(0,212,255,0.12)",
              }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: "rgba(0,212,255,0.15)", border: "2px solid rgba(0,212,255,0.5)" }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue-neon)" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-700 text-white mb-2">Заявка отправлена!</h3>
                    {selected === "program" ? (
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                        Сейчас откроется Telegram-канал с доступом к программе.
                        Добро пожаловать в трансформацию! 🔥
                      </p>
                    ) : (
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                        Спасибо! Я свяжусь с тобой в течение 24 часов для обсуждения деталей и старта.
                      </p>
                    )}
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Service selector */}
                    <div>
                      <label className="block text-xs font-600 tracking-wide text-[var(--text-muted)] uppercase mb-3">
                        Выбери услугу
                      </label>
                      <div className="space-y-2">
                        {services.map((s) => (
                          <button
                            key={s.value}
                            type="button"
                            onClick={() => setSelected(s.value)}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200"
                            style={{
                              background:
                                selected === s.value
                                  ? "rgba(0,100,220,0.25)"
                                  : "rgba(255,255,255,0.03)",
                              border:
                                selected === s.value
                                  ? "1px solid rgba(0,212,255,0.5)"
                                  : "1px solid rgba(255,255,255,0.07)",
                              boxShadow:
                                selected === s.value ? "0 0 15px rgba(0,212,255,0.1)" : "none",
                            }}
                          >
                            <span
                              className="font-600"
                              style={{ color: selected === s.value ? "var(--blue-neon)" : "var(--text-secondary)" }}
                            >
                              {s.label}
                            </span>
                            <span
                              className="text-xs font-700"
                              style={{ color: selected === s.value ? "var(--blue-neon)" : "var(--text-muted)" }}
                            >
                              {s.price}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-600 tracking-wide text-[var(--text-muted)] uppercase mb-2">
                        Твоё имя *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Как тебя зовут?"
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-[var(--text-muted)] outline-none transition-all duration-200 focus:border-[rgba(0,212,255,0.5)] focus:shadow-[0_0_15px_rgba(0,212,255,0.1)]"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      />
                    </div>

                    {/* Instagram */}
                    <div>
                      <label htmlFor="instagram" className="block text-xs font-600 tracking-wide text-[var(--text-muted)] uppercase mb-2">
                        Instagram или Telegram *
                      </label>
                      <input
                        id="instagram"
                        type="text"
                        required
                        value={form.instagram}
                        onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                        placeholder="@username"
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-[var(--text-muted)] outline-none transition-all duration-200 focus:border-[rgba(0,212,255,0.5)] focus:shadow-[0_0_15px_rgba(0,212,255,0.1)]"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      />
                    </div>

                    {/* Goal */}
                    <div>
                      <label htmlFor="goal" className="block text-xs font-600 tracking-wide text-[var(--text-muted)] uppercase mb-2">
                        Твоя цель
                      </label>
                      <textarea
                        id="goal"
                        rows={3}
                        value={form.goal}
                        onChange={(e) => setForm({ ...form, goal: e.target.value })}
                        placeholder="Что ты хочешь изменить? Опиши коротко..."
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-[var(--text-muted)] outline-none transition-all duration-200 focus:border-[rgba(0,212,255,0.5)] resize-none"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 text-sm font-700 tracking-wide text-white rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] disabled:opacity-60"
                      style={{
                        background: "linear-gradient(135deg, #0066cc, #00d4ff)",
                        boxShadow: "0 0 20px rgba(0,212,255,0.25)",
                      }}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                          </svg>
                          Обработка...
                        </span>
                      ) : (
                        "Отправить заявку"
                      )}
                    </button>

                    <p className="text-center text-xs text-[var(--text-muted)]">
                      Нажимая кнопку, ты соглашаешься с{" "}
                      <a href="/privacy" className="underline hover:text-[var(--blue-neon)] transition-colors">
                        политикой конфиденциальности
                      </a>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
