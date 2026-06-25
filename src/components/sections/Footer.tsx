"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-10 overflow-hidden"
      style={{ borderTop: "1px solid rgba(0,212,255,0.08)" }}
    >
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center sm:items-start leading-none">
            <span className="text-[10px] font-600 tracking-[0.25em] uppercase text-[var(--blue-neon)]">
              Sculptor of
            </span>
            <span className="text-base font-800 tracking-[0.15em] uppercase text-white">
              Your Body™
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--blue-neon)] transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
              Instagram
            </a>
            <a
              href="https://t.me/sculptorofyourbody"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--blue-neon)] transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
              </svg>
              Telegram
            </a>
            <a
              href="/privacy"
              className="text-xs text-[var(--text-muted)] hover:text-[var(--blue-neon)] transition-colors duration-300"
            >
              Политика конфиденциальности
            </a>
            <a
              href="/terms"
              className="text-xs text-[var(--text-muted)] hover:text-[var(--blue-neon)] transition-colors duration-300"
            >
              Условия оплаты
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-[var(--text-muted)]">
            © {year} Sculptor of Your Body™
          </p>
        </div>
      </div>
    </footer>
  );
}
