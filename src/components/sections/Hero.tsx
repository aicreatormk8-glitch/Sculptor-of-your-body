"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const badges = [
  "Онлайн-ведение",
  "План питания",
  "8-недельная программа",
  "Индивидуальный подход",
];

const Particle = ({ style }: { style: React.CSSProperties }) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: "3px",
      height: "3px",
      background: "rgba(0, 212, 255, 0.7)",
      boxShadow: "0 0 6px rgba(0, 212, 255, 0.8)",
      animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
      ...style,
    }}
  />
);

export default function Hero() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    style: {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
    },
  }));

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-end overflow-hidden"
    >
      {/* ─── Full-screen background image ─── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/hero-trainer.png"
          alt="Sculptor of Your Body"
          fill
          priority
          style={{
            objectFit: "contain",
            objectPosition: "center center",
            filter: "brightness(1.1) contrast(1.05) saturate(1.1)",
          }}
        />

        {/* Dark vignette — edges only, keep centre bright */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 90% at 50% 50%, transparent 40%, rgba(4,6,15,0.55) 80%, rgba(4,6,15,0.85) 100%)",
          }}
        />

        {/* Bottom text-readability gradient */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "55%",
            background:
              "linear-gradient(to top, rgba(4,6,15,0.92) 0%, rgba(4,6,15,0.6) 35%, transparent 70%)",
          }}
        />

        {/* Top header space fade */}
        <div
          className="absolute top-0 left-0 right-0 h-40"
          style={{
            background:
              "linear-gradient(to bottom, rgba(4,6,15,0.7) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ─── Animated smoke layers ─── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
        animate={{ x: [0, -50, 25, -30, 0], opacity: [0.45, 0.7, 0.35, 0.65, 0.45] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 65% 80% at 55% 50%, rgba(0,70,180,0.22) 0%, rgba(0,20,80,0.08) 55%, transparent 78%)",
        }} />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
        animate={{ x: [20, -25, 35, -12, 20], y: [0, -20, 14, -10, 0], opacity: [0.3, 0.5, 0.18, 0.45, 0.3] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      >
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 45% 60% at 62% 38%, rgba(0,130,255,0.2) 0%, rgba(0,70,200,0.07) 52%, transparent 72%)",
        }} />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
        animate={{ x: [-30, 35, -18, 25, -30], y: [10, -25, 18, -14, 10], opacity: [0.18, 0.38, 0.1, 0.3, 0.18], scaleX: [1, 1.2, 0.88, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      >
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 35% 50% at 45% 65%, rgba(0,190,255,0.16) 0%, transparent 68%)",
        }} />
      </motion.div>

      {/* Ground mist */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: "50%", zIndex: 1 }}
        animate={{ opacity: [0.5, 0.8, 0.4, 0.72, 0.5], y: [0, -12, 6, -8, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, rgba(0,35,110,0.35) 0%, rgba(0,55,150,0.1) 38%, transparent 70%)",
        }} />
      </motion.div>

      {/* Pulsing backlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
        animate={{ opacity: [0.6, 1, 0.55, 0.95, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 40% 60% at 50% 45%, rgba(0,110,255,0.16) 0%, transparent 62%)",
        }} />
      </motion.div>

      {/* Particles */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {particles.map((p) => (
          <Particle key={p.id} style={p.style} />
        ))}
      </div>

      {/* ─── Content (bottom-left) ─── */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-32" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-8 h-px bg-[var(--blue-neon)]" />
          <span className="text-xs font-600 tracking-[0.3em] uppercase text-[var(--blue-neon)]">
            Body Architect
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-800 leading-[0.92] tracking-tight mb-5"
        >
          <span className="block text-white drop-shadow-lg">SCULPTOR</span>
          <span className="block text-white drop-shadow-lg">OF YOUR</span>
          <span
            className="block glow-text"
            style={{ color: "var(--blue-neon)", WebkitTextStroke: "1px rgba(0,212,255,0.3)" }}
          >
            BODY
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-2 max-w-lg"
        >
          Онлайн-фитнес сопровождение, питание и программа трансформации тела
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-sm text-[var(--text-muted)] leading-relaxed mb-8 max-w-md"
        >
          Создай свою лучшую версию с профессиональным подходом к тренировкам, питанию и дисциплине.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, "#contact")}
            className="group relative px-8 py-4 text-sm font-700 tracking-wide text-white rounded-xl overflow-hidden transition-all duration-300 text-center"
            style={{
              background: "linear-gradient(135deg, #0066cc, #00b4d8)",
              boxShadow: "0 0 30px rgba(0,180,216,0.4), 0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            <span className="relative z-10">Начать трансформацию</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #0080ff, #00d4ff)" }} />
          </a>
          <a
            href="#services"
            onClick={(e) => handleScroll(e, "#services")}
            className="px-8 py-4 text-sm font-600 tracking-wide text-[var(--blue-neon)] rounded-xl transition-all duration-300 text-center hover:bg-[rgba(0,212,255,0.08)]"
            style={{ border: "1px solid rgba(0,212,255,0.35)", backdropFilter: "blur(10px)" }}
          >
            Смотреть услуги
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap gap-2"
        >
          {badges.map((badge, i) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="px-3 py-1.5 text-xs font-500 rounded-full"
              style={{
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.2)",
                color: "rgba(0,212,255,0.9)",
              }}
            >
              ✦ {badge}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[var(--blue-neon)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
