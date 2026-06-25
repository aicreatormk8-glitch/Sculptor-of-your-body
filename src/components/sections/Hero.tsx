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
  const particles = Array.from({ length: 20 }, (_, i) => ({
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
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/hero-trainer.png"
          alt="Sculptor of Your Body — трансформация тела"
          fill
          priority
          className="object-cover object-center"
          style={{ objectPosition: "center top" }}
        />
        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-[rgba(5,8,16,0.65)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,8,16,0.95)] via-[rgba(5,8,16,0.4)] to-[rgba(5,8,16,0.6)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,8,16,1)] via-transparent to-[rgba(5,8,16,0.3)]" />

        {/* Blue glow behind silhouette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 65% 50%, rgba(0,100,255,0.2) 0%, rgba(0,212,255,0.05) 50%, transparent 70%)",
          }}
        />

        {/* Fog/mist effect */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{
            background:
              "linear-gradient(to top, rgba(5,8,16,1) 0%, rgba(5,8,16,0.5) 40%, transparent 100%)",
          }}
        />
      </div>

      {/* Animated particles */}
      {particles.map((p) => (
        <Particle key={p.id} style={p.style} />
      ))}

      {/* Animated light sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse 40% 60% at 60% 40%, rgba(0,150,255,0.08) 0%, transparent 60%)",
            "radial-gradient(ellipse 40% 60% at 65% 45%, rgba(0,212,255,0.12) 0%, transparent 60%)",
            "radial-gradient(ellipse 40% 60% at 60% 40%, rgba(0,150,255,0.08) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
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

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-800 leading-[0.95] tracking-tight mb-4"
          >
            <span className="block text-white">SCULPTOR</span>
            <span className="block text-white">OF YOUR</span>
            <span
              className="block glow-text"
              style={{
                color: "var(--blue-neon)",
                WebkitTextStroke: "1px rgba(0,212,255,0.3)",
              }}
            >
              BODY
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-3 max-w-lg"
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

          {/* CTA Buttons */}
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

          {/* Badges */}
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[var(--blue-neon)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
