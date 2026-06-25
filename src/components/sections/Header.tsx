"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDict, useLang } from "@/lib/i18n/DictContext";
import type { Locale } from "@/lib/i18n";

const localeNames: Record<Locale, string> = { ru: "RU", uk: "UA", en: "EN" };

export default function Header() {
  const dict = useDict();
  const { locale: currentLocale, setLocale } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);
  const [hoveredCta, setHoveredCta] = useState(false);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const ids = ["hero", "about", "services", "results"];
    const ratios: Record<string, number> = {};
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          ratios[id] = e.intersectionRatio;
          const best = Object.entries(ratios).reduce((a, b) => (b[1] > a[1] ? b : a), ["hero", 0]);
          if (best[1] > 0) setActiveSection(best[0]);
        },
        { threshold: [0, 0.1, 0.3, 0.5, 0.7] }
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

  const navLinks = [
    { href: "#hero",     label: dict.header.nav.home,     id: "hero" },
    { href: "#about",    label: dict.header.nav.about,    id: "about" },
    { href: "#services", label: dict.header.nav.services, id: "services" },
    { href: "#results",  label: dict.header.nav.results,  id: "results" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(3, 8, 18, 0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0, 210, 255, 0.12)",
      }}
    >
      <div className="max-w-7xl mx-auto px-10 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-[70px]">

          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="logo-glow flex-shrink-0 text-[13px] font-800 tracking-[0.22em] uppercase text-white"
            style={{ textDecoration: "none", marginLeft: "clamp(1rem, 4vw, 3rem)" }}
          >
            Sculptor of your body
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const isHovered = hoveredLink === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { setActiveSection(link.id); handleNavClick(e, link.href); }}
                  onMouseEnter={() => setHoveredLink(link.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative text-[13px] font-500 tracking-wide pb-0.5"
                  style={{
                    color: isActive || isHovered ? "#00d4ff" : "rgba(139,163,199,0.9)",
                    transition: "color 0.15s ease-in-out",
                    cursor: "pointer"
                  }}
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-0 h-px bg-[#00d4ff]"
                    style={{
                      width: isActive ? "100%" : "0%",
                      opacity: isActive ? 0.7 : 0,
                      transition: "width 0.3s ease, opacity 0.3s ease",
                    }}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right: lang switcher + CTA */}
          <div className="hidden lg:flex items-center gap-5">

            {/* Language switcher — text only, no background blocks */}
            <div className="flex items-center">
              {(["ru", "uk", "en"] as Locale[]).map((loc, i) => {
                const isLangActive = loc === currentLocale;
                const isLangHovered = hoveredLang === loc;
                return (
                  <button
                    key={loc}
                    onClick={() => setLocale(loc)}
                    onMouseEnter={() => setHoveredLang(loc)}
                    onMouseLeave={() => setHoveredLang(null)}
                    className="text-[12px] font-700 tracking-wide px-2.5 py-1"
                    style={{
                      color: isLangActive || isLangHovered ? "#00d4ff" : "rgba(74,96,128,0.9)",
                      borderRight: i < 2 ? "1px solid rgba(0,210,255,0.15)" : "none",
                      transition: "color 0.15s ease-in-out",
                      cursor: "pointer",
                    }}
                  >
                    {localeNames[loc]}
                  </button>
                );
              })}
            </div>

            {/* CTA */}
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, "#services")}
              onMouseEnter={() => setHoveredCta(true)}
              onMouseLeave={() => setHoveredCta(false)}
              className="text-[13px] font-600 tracking-wide rounded-lg px-5 py-2.5"
              style={{
                color: hoveredCta ? "#fff" : "#00d4ff",
                background: hoveredCta ? "rgba(0,212,255,0.14)" : "rgba(0,212,255,0.06)",
                border: `1px solid ${hoveredCta ? "rgba(0,212,255,0.5)" : "rgba(0,212,255,0.28)"}`,
                boxShadow: hoveredCta ? "0 0 22px rgba(0,212,255,0.22)" : "none",
                transition: "all 0.2s ease-in-out",
                cursor: "pointer",
              }}
            >
              {dict.header.cta}
            </a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10"
            aria-label="Toggle menu"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block w-5 h-[1.5px] bg-white origin-center" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-[1.5px] bg-white" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-5 h-[1.5px] bg-white origin-center" />
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
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden"
            style={{
              background: "rgba(3,8,18,0.97)",
              borderTop: "1px solid rgba(0,210,255,0.08)",
            }}
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="py-3 text-sm font-500 border-b transition-colors duration-200"
                  style={{
                    color: activeSection === link.id ? "#00d4ff" : "rgba(139,163,199,0.9)",
                    borderColor: "rgba(255,255,255,0.04)",
                  }}
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile lang */}
              <div className="flex gap-1 pt-4 pb-1">
                {(["ru", "uk", "en"] as Locale[]).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setLocale(loc)}
                    className="flex-1 py-2 text-xs font-700 rounded-lg transition-all duration-200"
                    style={{
                      color: loc === currentLocale ? "#00d4ff" : "rgba(74,96,128,0.9)",
                      background: loc === currentLocale ? "rgba(0,212,255,0.08)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${loc === currentLocale ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.05)"}`,
                    }}
                  >
                    {localeNames[loc]}
                  </button>
                ))}
              </div>

              <a
                href="#services"
                onClick={(e) => handleNavClick(e, "#services")}
                className="mt-3 text-center py-3.5 text-sm font-700 text-white rounded-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(0,100,204,0.9), rgba(0,210,255,0.7))",
                  border: "1px solid rgba(0,210,255,0.3)",
                }}
              >
                {dict.header.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
