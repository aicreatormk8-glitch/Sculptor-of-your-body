"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "../ui/AnimatedSection";
import { useDict, useLang } from "@/lib/i18n/DictContext";

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
    handle: "@MK_sculptor1",
    url: "https://t.me/MK_sculptor1",
    icon: <TelegramIcon />,
    gradient: "from-[#0088cc] to-[#00b4d8]",
    glow: "rgba(0,180,216,0.25)",
  },
];

export default function Contact() {
  const { contact } = useDict();
  const { locale } = useLang();

  const getBotLink = (product: string) => {
    return `https://t.me/MK_sculptor_bot?start=${product}_${locale}`;
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

        {/* CTA Buttons */}
        <AnimatedSection delay={0.2} className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {contact.services.map((service, i) => (
              <motion.a
                key={service.value}
                href={getBotLink(service.value)}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block p-6 rounded-2xl transition-all duration-300"
                style={{
                  background: "rgba(6,12,30,0.65)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(0,212,255,0.1)",
                  boxShadow: "0 4px 60px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(0,212,255,0.3)";
                  el.style.boxShadow = "0 8px 40px rgba(0,212,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(0,212,255,0.1)";
                  el.style.boxShadow = "0 4px 60px rgba(0,0,0,0.3)";
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-700 text-white mb-1">{service.label}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-800 text-white">{service.price}</span>
                      {service.oldPrice && (() => {
                        const oldNum = parseFloat(service.oldPrice.replace(/[^0-9.]/g, ""));
                        const newNum = parseFloat(service.price.replace(/[^0-9.]/g, ""));
                        const discount = oldNum > 0 ? Math.round(((oldNum - newNum) / oldNum) * 100) : 0;
                        return (
                          <>
                            <span className="text-sm font-500 line-through" style={{ color: "rgba(139,163,199,0.55)" }}>{service.oldPrice}</span>
                            {discount > 0 && (
                              <span className="font-800" style={{ color: "#00d4ff", fontSize: "0.95rem", textShadow: "0 0 14px rgba(0,212,255,0.45)" }}>-{discount}%</span>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[var(--blue-neon)]">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>

          <p className="text-center text-[11px] text-[var(--text-muted)] mt-8">
            {contact.privacyText}{" "}
            <Link href={`/${locale}/privacy-policy`} className="underline underline-offset-2 hover:text-[var(--blue-neon)] transition-colors">{contact.privacyLink}</Link>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
