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
      className="relative min-h-dvh flex items-center overflow-hidden"
    >
      {/* Dark background */}
      <div className="absolute inset-0 z-0 bg-[#04060f]" />

      {/* ─── Trainer image — full body, right side ─── */}
      <div className="absolute inset-0 z-0 flex items-end justify-center lg:justify-end">
        <div
          className="relative w-full h-full lg:w-[62%]"
          style={{ minHeight: "100dvh" }}
        >
          <Image
            src="/assets/images/hero-trainer.png"
            alt="Sculptor of Your Body"
            fill
            priority
            style={{
              objectFit: "contain",
              objectPosition: "center bottom",
              filter: "brightness(1.15) contrast(1.05) saturate(1.1)",
            }}
          />
        </div>

        {/* Left text-area fade only */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #04060f 20%, rgba(4,6,15,0.82) 42%, rgba(4,6,15,0.3) 65%, transparent 85%)",
          }}
        />
        {/* Bottom subtle fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #04060f 0%, transparent 100%)",
          }}
        />
        {/* Top subtle fade */}
        <div
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, #04060f 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ─── Animated smoke layers ─── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
        animate={{
          x: [0, -40, 20, -25, 0],
          opacity: [0.5, 0.75, 0.45, 0.7, 0.5],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 75% at 68% 52%, rgba(0,80,200,0.28) 0%, rgba(0,30,100,0.1) 55%, transparent 78%)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
        animate={{
          x: [15, -20, 30, -10, 15],
          y: [0, -18, 12, -10, 0],
          opacity: [0.3, 0.55, 0.2, 0.5, 0.3],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 40% 55% at 58% 38%, rgba(0,140,255,0.22) 0%, rgba(0,80,200,0.08) 50%, transparent 72%)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
        animate={{
          x: [-25, 30, -15, 20, -25],
          y: [8, -22, 16, -12, 8],
          opacity: [0.2, 0.4, 0.12, 0.35, 0.2],
          scaleX: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 30% 45% at 75% 65%, rgba(0,200,255,0.18) 0%, transparent 68%)",
          }}
        />
      </motion.div>

      {/* Ground mist */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: "55%", zIndex: 1 }}
        animate={{
          opacity: [0.55, 0.85, 0.45, 0.75, 0.55],
          y: [0, -10, 5, -7, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,40,120,0.38) 0%, rgba(0,60,160,0.12) 35%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Cyan accent wisp */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
        animate={{
          x: [20, -30, 15, -20, 20],
          opacity: [0.15, 0.3, 0.08, 0.25, 0.15],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 12 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 25% 35% at 60% 75%, rgba(0,212,255,0.15) 0%, transparent 65%)",
          }}
        />
      </motion.div>

      {/* Pulsing backlight behind figure */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
        animate={{ opacity: [0.7, 1, 0.65, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 35% 55% at 63% 48%, rgba(0,120,255,0.18) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* Particles */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {particles.map((p) => (
          <Particle key={p.id} style={p.style} />
        ))}
      </div>

      {/* ─── Content ─── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full" style={{ zIndex: 10 }}>
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
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
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-800 leading-[0.92] tracking-tight mb-6"
          >
            <span className="block text-white">SCULPTOR</span>
            <span className="block text-white">OF YOUR</span>
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
            className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-3 max-w-md"
          >
            Онлайн-фитнес сопровождение, питание и программа трансформации тела
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-sm text-[var(--text-muted)] leading-relaxed mb-8 max-w-sm"
          >
            Создай свою лучшую версию с профессиональным подходом к тренировкам, питанию и дисциплине.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
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
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, #0080ff, #00d4ff)" }}
              />
            </a>
            <a
              href="#services"
              onClick={(e) => handleScroll(e, "#services")}
              className="px-8 py-4 text-sm font-600 tracking-wide text-[var(--blue-neon)] rounded-xl transition-all duration-300 text-center hover:bg-[rgba(0,212,255,0.08)]"
              style={{
                border: "1px solid rgba(0,212,255,0.35)",
                backdropFilter: "blur(10px)",
              }}
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
