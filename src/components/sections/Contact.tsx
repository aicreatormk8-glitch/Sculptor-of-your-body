"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "../ui/AnimatedSection";
import { useDict } from "@/lib/i18n/DictContext";

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.87a8.27 8.27 0 0 0 4.83 1.55V7A4.85 4.85 0 0 1 19.59 6.69z" />
  </svg>
);

const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
  </svg>
);

const socials = [
  {
    platform: "Instagram",
    handle: "@mk.sculptor",
    url: "https://instagram.com/mk.sculptor",
    icon: <InstagramIcon />,
    gradient: "from-[#E1306C] to-[#833AB4]",
    glow: "rgba(225,48,108,0.25)",
  },
  {
    platform: "TikTok",
    handle: "@sculptor_of_your_body_",
    url: "https://tiktok.com/@sculptor_of_your_body_",
    icon: <TikTokIcon />,
    gradient: "from-[#010101] to-[#69C9D0]",
    glow: "rgba(105,201,208,0.2)",
  },
  {
    platform: "Telegram",
    handle: "@sculptorofyourbody",
    url: "https://t.me/sculptorofyourbody",
    icon: <TelegramIcon />,
    gradient: "from-[#0088cc] to-[#00b4d8]",
    glow: "rgba(0,180,216,0.25)",
  },
];

export default function Contact() {
  const { contact } = useDict();
  const [selected, setSelected] = useState<string>("coaching");
  const [form, setForm] = useState({ name: "", instagram: "", goal: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    if (selected === "program") {
      setTimeout(() => { window.open("https://t.me/+KhFZoWiTgjphYmQy", "_blank"); }, 1500);
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] blur-[160px] pointer-events-none" style={{ background: "rgba(0,80,180,0.06)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[var(--blue-neon)]" />
            <span className="text-xs font-600 tracking-[0.3em] uppercase text-[var(--blue-neon)]">{contact.eyebrow}</span>
            <div className="w-8 h-px bg-[var(--blue-neon)]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-800 text-white leading-tight mb-4">
            {contact.title}{" "}
            <span className="text-[var(--blue-neon)]">{contact.titleAccent}</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">{contact.subtitle}</p>
        </AnimatedSection>

        {/* Social Cards */}
        <AnimatedSection delay={0.1} className="mb-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {socials.map((s, i) => (
              <motion.a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-300"
                style={{
                  background: "rgba(8,16,40,0.5)",
                  border: "1px solid rgba(0,212,255,0.1)",
                  backdropFilter: "blur(20px)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-3px)";
                  el.style.boxShadow = `0 12px 40px ${s.glow}`;
                  el.style.borderColor = "rgba(0,212,255,0.25)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                  el.style.borderColor = "rgba(0,212,255,0.1)";
                }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${s.gradient} transition-all duration-300 group-hover:scale-110`}
                  style={{ boxShadow: `0 4px 20px ${s.glow}` }}
                >
                  {s.icon}
                </div>
                <div className="text-center">
                  <div className="text-xs font-600 tracking-wide text-[var(--text-muted)] mb-0.5">{s.platform}</div>
                  <div className="text-sm font-700 text-white group-hover:text-[var(--blue-neon)] transition-colors duration-300">{s.handle}</div>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-500 text-[var(--text-muted)] group-hover:text-[var(--blue-neon)] transition-colors duration-300">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M7 1h2v2M9 1L5 5M4 2H2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                  {s.handle}
                </div>
              </motion.a>
            ))}
          </div>
        </AnimatedSection>

        {/* Form */}
        <AnimatedSection delay={0.2} className="max-w-xl mx-auto">
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{
              background: "rgba(6,12,30,0.65)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(0,212,255,0.1)",
              boxShadow: "0 4px 60px rgba(0,0,0,0.3)",
            }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "rgba(0,212,255,0.12)", border: "1.5px solid rgba(0,212,255,0.4)" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue-neon)" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                  </motion.div>
                  <h3 className="text-xl font-700 text-white mb-3">{contact.successTitle}</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xs mx-auto">
                    {selected === "program" ? contact.programSuccessMsg : contact.successMsg}
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-700 tracking-[0.12em] text-[var(--text-muted)] uppercase mb-3">{contact.selectService}</label>
                    <div className="space-y-2">
                      {contact.services.map((s) => (
                        <button
                          key={s.value}
                          type="button"
                          onClick={() => setSelected(s.value)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200"
                          style={{
                            background: selected === s.value ? "rgba(0,100,220,0.2)" : "rgba(255,255,255,0.02)",
                            border: `1px solid ${selected === s.value ? "rgba(0,212,255,0.45)" : "rgba(255,255,255,0.06)"}`,
                            boxShadow: selected === s.value ? "0 0 16px rgba(0,212,255,0.08)" : "none",
                          }}
                        >
                          <span className="font-600 text-left" style={{ color: selected === s.value ? "var(--blue-neon)" : "var(--text-secondary)" }}>{s.label}</span>
                          <span className="text-xs font-700 flex-shrink-0 ml-3" style={{ color: selected === s.value ? "var(--blue-neon)" : "var(--text-muted)" }}>{s.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {[
                    { id: "name", label: contact.nameLabel, placeholder: contact.namePlaceholder, type: "text", key: "name" as const, required: true },
                    { id: "instagram", label: contact.contactLabel, placeholder: contact.contactPlaceholder, type: "text", key: "instagram" as const, required: true },
                  ].map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-[10px] font-700 tracking-[0.12em] text-[var(--text-muted)] uppercase mb-2">{field.label}</label>
                      <input
                        id={field.id}
                        type={field.type}
                        required={field.required}
                        value={form[field.key]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-[var(--text-muted)] outline-none transition-all duration-200"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,212,255,0.06)"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}
                      />
                    </div>
                  ))}

                  <div>
                    <label htmlFor="goal" className="block text-[10px] font-700 tracking-[0.12em] text-[var(--text-muted)] uppercase mb-2">{contact.goalLabel}</label>
                    <textarea
                      id="goal"
                      rows={3}
                      value={form.goal}
                      onChange={(e) => setForm({ ...form, goal: e.target.value })}
                      placeholder={contact.goalPlaceholder}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-[var(--text-muted)] outline-none transition-all duration-200 resize-none"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,212,255,0.06)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-4 text-sm font-700 tracking-[0.05em] text-white rounded-xl transition-all duration-300 disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg, #0066cc, #00c8f0)",
                      boxShadow: "0 0 24px rgba(0,212,255,0.22), inset 0 1px 0 rgba(255,255,255,0.12)",
                    }}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                        {contact.loadingBtn}
                      </span>
                    ) : contact.submitBtn}
                  </motion.button>

                  <p className="text-center text-[11px] text-[var(--text-muted)]">
                    {contact.privacyText}{" "}
                    <Link href="/privacy" className="underline underline-offset-2 hover:text-[var(--blue-neon)] transition-colors">{contact.privacyLink}</Link>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
