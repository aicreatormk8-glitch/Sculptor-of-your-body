"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useDict } from "@/lib/i18n/DictContext";
import type { Locale } from "@/lib/i18n";

const localeLabels: Record<Locale, string> = {
  ru: "🇷🇺 RU",
  uk: "🇺🇦 UK",
  en: "🇬🇧 EN",
};

export default function Header() {
  const dict = useDict();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const currentLocale = (pathname.split("/")[1] ?? "ru") as Locale;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const switchLocale = (locale: Locale) => {
    setLangOpen(false);
    setMenuOpen(false);
    router.push(`/${locale}`);
  };

  const navLinks = [
    { href: "#hero", label: dict.header.nav.home },
    { href: "#about", label: dict.header.nav.about },
    { href: "#services", label: dict.header.nav.services },
    { href: "#program", label: dict.header.nav.program },
    { href: "#results", label: dict.header.nav.results },
    { href: "#contact", label: dict.header.nav.contact },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        background: scrolled ? "rgba(4,6,15,0.65)" : "rgba(4,6,15,0.15)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(0,212,255,0.18)" : "1px solid rgba(0,212,255,0.06)",
        boxShadow: scrolled ? "0 1px 30px rgba(0,212,255,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="logo-glow text-sm sm:text-base font-800 tracking-[0.2em] uppercase text-white transition-all duration-300"
            style={{ textDecoration: "none", lineHeight: 1, marginLeft: "1.5rem" }}
          >
            Sculptor of your body
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-500 tracking-wide text-[var(--text-secondary)] hover:text-[var(--blue-neon)] transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--blue-neon)] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right side: lang switcher + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-600 text-[var(--text-secondary)] hover:text-[var(--blue-neon)] transition-colors duration-200 rounded-lg"
                style={{ border: "1px solid rgba(0,212,255,0.15)", background: "rgba(0,212,255,0.04)" }}
              >
                {localeLabels[currentLocale]}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 rounded-xl overflow-hidden"
                    style={{
                      background: "rgba(5,8,20,0.97)",
                      border: "1px solid rgba(0,212,255,0.18)",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
                      minWidth: "130px",
                    }}
                  >
                    {(["ru", "uk", "en"] as Locale[]).map((loc) => (
                      <button
                        key={loc}
                        onClick={() => switchLocale(loc)}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-600 transition-colors duration-150 text-left"
                        style={{
                          color: loc === currentLocale ? "var(--blue-neon)" : "var(--text-secondary)",
                          background: loc === currentLocale ? "rgba(0,212,255,0.08)" : "transparent",
                        }}
                      >
                        {localeLabels[loc]}
                        {loc === currentLocale && (
                          <svg className="ml-auto" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="var(--blue-neon)" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="relative px-6 py-2.5 text-sm font-600 tracking-wide text-[var(--blue-neon)] rounded-lg overflow-hidden group transition-all duration-300 hover:scale-105 hover:text-white"
              style={{
                background: "rgba(0,212,255,0.06)",
                border: "1px solid rgba(0,212,255,0.35)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 15px rgba(0,212,255,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(0,212,255,0.35), inset 0 1px 0 rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(0,212,255,0.1), inset 0 1px 0 rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.06)";
              }}
            >
              <span className="relative z-10">{dict.header.cta}</span>
            </a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            aria-label="Открыть меню"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-white origin-center transition-all" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-6 h-0.5 bg-white" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-white origin-center transition-all" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-[rgba(5,8,16,0.97)] backdrop-blur-xl border-t border-[rgba(0,212,255,0.1)]"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-base font-500 text-[var(--text-secondary)] hover:text-[var(--blue-neon)] transition-colors py-2 border-b border-[rgba(255,255,255,0.05)]"
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Mobile lang switcher */}
              <div className="flex gap-2 pt-2">
                {(["ru", "uk", "en"] as Locale[]).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className="flex-1 py-2 text-xs font-600 rounded-lg transition-all duration-200"
                    style={{
                      background: loc === currentLocale ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.04)",
                      border: loc === currentLocale ? "1px solid rgba(0,212,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                      color: loc === currentLocale ? "var(--blue-neon)" : "var(--text-secondary)",
                    }}
                  >
                    {localeLabels[loc]}
                  </button>
                ))}
              </div>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="mt-2 text-center py-3 text-sm font-600 text-white rounded-lg"
                style={{
                  background: "linear-gradient(135deg, rgba(0,102,204,0.8), rgba(0,212,255,0.6))",
                  border: "1px solid rgba(0,212,255,0.4)",
                }}
              >
                {dict.header.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
