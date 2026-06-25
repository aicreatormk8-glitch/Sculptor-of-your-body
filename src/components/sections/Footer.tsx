"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useDict } from "@/lib/i18n/DictContext";

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.87a8.27 8.27 0 0 0 4.83 1.55V7A4.85 4.85 0 0 1 19.59 6.69z" />
  </svg>
);

export default function Footer() {
  const { footer } = useDict();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ borderTop: "1px solid rgba(0,212,255,0.07)" }}>
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="mb-4 leading-none">
              <div className="text-[10px] font-600 tracking-[0.3em] uppercase text-[var(--blue-neon)] mb-0.5">Sculptor of</div>
              <div className="text-lg font-800 tracking-[0.15em] uppercase text-white">Your Body</div>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-[200px]">
              {footer.tagline}
            </p>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-[10px] font-700 tracking-[0.25em] uppercase text-[var(--text-muted)] mb-4">{footer.followLabel}</h4>
            <div className="flex flex-col gap-3">
              <motion.a
                href="https://instagram.com/mk.sculptor"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group w-fit"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <span className="text-[var(--text-muted)] group-hover:text-[#E1306C] transition-colors duration-200"><InstagramIcon /></span>
                <span className="text-xs font-500 text-[var(--text-muted)] group-hover:text-white transition-colors duration-200">@mk.sculptor</span>
              </motion.a>
              <motion.a
                href="https://tiktok.com/@sculptor_of_your_body_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group w-fit"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <span className="text-[var(--text-muted)] group-hover:text-[#69C9D0] transition-colors duration-200"><TikTokIcon /></span>
                <span className="text-xs font-500 text-[var(--text-muted)] group-hover:text-white transition-colors duration-200">@sculptor_of_your_body_</span>
              </motion.a>
            </div>
          </div>

          {/* Documents */}
          <div>
            <h4 className="text-[10px] font-700 tracking-[0.25em] uppercase text-[var(--text-muted)] mb-4">{footer.documentsLabel}</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { href: "/privacy", label: footer.privacy },
                { href: "/terms", label: footer.terms },
                { href: "/terms#payment", label: footer.payment },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--blue-neon)] transition-colors duration-200 w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p className="text-[11px] text-[var(--text-muted)]">
            © {year} {footer.copyright}
          </p>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-[var(--text-muted)] opacity-50">Made with</span>
            <span className="text-[10px]" style={{ color: "var(--blue-neon)", opacity: 0.7 }}>✦</span>
            <span className="text-[10px] text-[var(--text-muted)] opacity-50">precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
