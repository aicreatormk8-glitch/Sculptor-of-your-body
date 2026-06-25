"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#hero", label: "Главная" },
  { href: "#about", label: "Обо мне" },
  { href: "#services", label: "Услуги" },
  { href: "#program", label: "Программа" },
  { href: "#results", label: "Результаты" },
  { href: "#contact", label: "Контакты" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        background: scrolled
          ? "rgba(4,6,15,0.65)"
          : "rgba(4,6,15,0.15)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(0,212,255,0.18)"
          : "1px solid rgba(0,212,255,0.06)",
        boxShadow: scrolled
          ? "0 1px 30px rgba(0,212,255,0.08)"
          : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="logo-glow text-sm sm:text-base font-800 tracking-[0.2em] uppercase text-white transition-all duration-300"
            style={{ textDecoration: "none", lineHeight: 1 }}
          >
            Sculptor of Your Body
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

          {/* CTA Button */}
          <div className="hidden lg:block">
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
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(0,212,255,0.35), inset 0 1px 0 rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.15)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(0,212,255,0.1), inset 0 1px 0 rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.06)";
              }}
            >
              <span className="relative z-10">Записаться</span>
            </a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            aria-label="Открыть меню"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white origin-center transition-all"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-white"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white origin-center transition-all"
            />
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
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="mt-2 text-center py-3 text-sm font-600 text-white rounded-lg"
                style={{
                  background: "linear-gradient(135deg, rgba(0,102,204,0.8), rgba(0,212,255,0.6))",
                  border: "1px solid rgba(0,212,255,0.4)",
                }}
              >
                Записаться
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
