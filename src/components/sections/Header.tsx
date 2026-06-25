"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDict, useLang } from "@/lib/i18n/DictContext";
import type { Locale } from "@/lib/i18n";

const localeNames: Record<Locale, string> = {
  ru: "Рус",
  uk: "Укр",
  en: "Eng",
};

export default function Header() {
  const dict = useDict();
  const { locale: currentLocale, setLocale } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sectionIds = ["hero", "about", "services", "program", "results", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const switchLocale = (loc: Locale) => {
    setMenuOpen(false);
    setLocale(loc);
  };

  const navLinks = [
    { href: "#hero", label: dict.header.nav.home, id: "hero" },
    { href: "#about", label: dict.header.nav.about, id: "about" },
    { href: "#services", label: dict.header.nav.services, id: "services" },
    { href: "#program", label: dict.header.nav.program, id: "program" },
    { href: "#results", label: dict.header.nav.results, id: "results" },
    { href: "#contact", label: dict.header.nav.contact, id: "contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        background: scrolled ? "rgba(4,6,15,0.72)" : "rgba(4,6,15,0.12)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: scrolled
          ? "1px solid rgba(0,212,255,0.14)"
          : "1px solid rgba(0,212,255,0.04)",
        boxShadow: scrolled ? "0 1px 40px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="logo-glow flex-shrink-0 text-sm font-800 tracking-[0.22em] uppercase text-white transition-all duration-300"
            style={{ textDecoration: "none", lineHeight: 1 }}
          >
            Sculptor of your body
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative text-[13px] font-500 tracking-wide transition-colors duration-300 group py-1"
                  style={{ color: isActive ? "var(--blue-neon)" : "var(--text-secondary)" }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px bg-[var(--blue-neon)] transition-all duration-300"
                    style={{ width: isActive ? "100%" : "0%", opacity: isActive ? 1 : 0 }}
                  />
                  {!isActive && (
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--blue-neon)] group-hover:w-full transition-all duration-300 opacity-60" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: lang switcher + CTA */}
          <div className="hidden lg:flex items-center gap-4">

            {/* Language switcher — segmented pill */}
            <div
              className="flex items-center rounded-lg p-0.5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(0,212,255,0.1)",
                backdropFilter: "blur(12px)",
              }}
            >
              {(["ru", "uk", "en"] as Locale[]).map((loc) => (
                <motion.button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className="relative px-3.5 py-1.5 text-[11px] font-700 tracking-wide rounded-md transition-colors duration-200"
                  style={{ color: loc === currentLocale ? "white" : "var(--text-muted)", minWidth: "40px" }}
                >
                  {loc === currentLocale && (
                    <motion.span
                      layoutId="lang-pill"
                      className="absolute inset-0 rounded-md"
                      style={{
                        background: "rgba(0,212,255,0.18)",
                        boxShadow: "0 0 16px rgba(0,212,255,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{localeNames[loc]}</span>
                </motion.button>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="px-5 py-2.5 text-[13px] font-600 tracking-wide text-[var(--blue-neon)] rounded-lg transition-all duration-300 hover:scale-[1.03] hover:text-white"
              style={{
                background: "rgba(0,212,255,0.06)",
                border: "1px solid rgba(0,212,255,0.3)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 12px rgba(0,212,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 0 28px rgba(0,212,255,0.3), inset 0 1px 0 rgba(255,255,255,0.1)";
                el.style.background = "rgba(0,212,255,0.14)";
                el.style.borderColor = "rgba(0,212,255,0.55)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 0 12px rgba(0,212,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)";
                el.style.background = "rgba(0,212,255,0.06)";
                el.style.borderColor = "rgba(0,212,255,0.3)";
              }}
            >
              {dict.header.cta}
            </a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="block w-5 h-0.5 bg-white origin-center" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-0.5 bg-white" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="block w-5 h-0.5 bg-white origin-center" />
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
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden"
            style={{
              background: "rgba(4,6,18,0.96)",
              backdropFilter: "blur(24px)",
              borderTop: "1px solid rgba(0,212,255,0.08)",
            }}
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="py-3 text-sm font-500 border-b transition-colors duration-200"
                  style={{
                    color: activeSection === link.id ? "var(--blue-neon)" : "var(--text-secondary)",
                    borderColor: "rgba(255,255,255,0.04)",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Mobile lang switcher */}
              <div className="flex gap-1.5 pt-4 pb-1">
                {(["ru", "uk", "en"] as Locale[]).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className="flex-1 py-2 text-[11px] font-700 rounded-lg transition-all duration-200"
                    style={{
                      background: loc === currentLocale ? "rgba(0,212,255,0.16)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${loc === currentLocale ? "rgba(0,212,255,0.35)" : "rgba(255,255,255,0.06)"}`,
                      color: loc === currentLocale ? "var(--blue-neon)" : "var(--text-muted)",
                    }}
                  >
                    {localeNames[loc]}
                  </button>
                ))}
              </div>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="mt-2 text-center py-3.5 text-sm font-700 text-white rounded-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(0,102,204,0.85), rgba(0,212,255,0.65))",
                  border: "1px solid rgba(0,212,255,0.35)",
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
