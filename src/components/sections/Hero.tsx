"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const badges = [
  "Онлайн-ведение",
  "План питания",
  "8-недельная программа",
  "Индивидуальный подход",
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 25, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax transforms
  const imgX = useTransform(smoothX, [-1, 1], [-18, 18]);
  const imgY = useTransform(smoothY, [-1, 1], [-10, 10]);
  const glowX = useTransform(smoothX, [-1, 1], [-30, 30]);
  const glowY = useTransform(smoothY, [-1, 1], [-20, 20]);
  const textX = useTransform(smoothX, [-1, 1], [8, -8]);
  const textY = useTransform(smoothY, [-1, 1], [5, -5]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Canvas smoke
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Puff = {
      x: number; y: number; vx: number; vy: number;
      radius: number; opacity: number; hue: number; life: number; maxLife: number;
    };

    const puffs: Puff[] = [];

    const spawnPuff = () => {
      const cx = canvas.width * (0.4 + Math.random() * 0.25);
      const cy = canvas.height * (0.2 + Math.random() * 0.5);
      puffs.push({
        x: cx, y: cy,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.3 - 0.1,
        radius: 60 + Math.random() * 100,
        opacity: 0,
        hue: 200 + Math.random() * 40,
        life: 0,
        maxLife: 220 + Math.random() * 120,
      });
    };

    for (let i = 0; i < 12; i++) spawnPuff();

    let frame = 0;
    let animId: number;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      if (frame % 18 === 0) spawnPuff();

      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.radius += 0.15;

        const t = p.life / p.maxLife;
        p.opacity = t < 0.25
          ? (t / 0.25) * 0.22
          : t < 0.7
            ? 0.22
            : (1 - (t - 0.7) / 0.3) * 0.22;

        if (p.life >= p.maxLife) {
          puffs.splice(i, 1);
          continue;
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `hsla(${p.hue}, 85%, 60%, ${p.opacity})`);
        grad.addColorStop(0.5, `hsla(${p.hue}, 70%, 45%, ${p.opacity * 0.5})`);
        grad.addColorStop(1, `hsla(${p.hue}, 60%, 30%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-end overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* ── Photo with parallax ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ x: imgX, y: imgY, scale: 1.06 }}
      >
        <Image
          src="/assets/images/hero-trainer.png"
          alt="Sculptor of Your Body"
          fill
          priority
          style={{
            objectFit: "contain",
            objectPosition: "center center",
            filter: "brightness(1.05) contrast(1.08) saturate(1.1)",
          }}
        />
      </motion.div>

      {/* ── Volumetric blue backlight (parallax) ── */}
      <motion.div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{ x: glowX, y: glowY }}
      >
        {/* Core backlight */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 38% 55% at 52% 42%, rgba(0,140,255,0.55) 0%, rgba(0,80,200,0.25) 35%, rgba(0,40,120,0.08) 65%, transparent 85%)",
        }} />
        {/* Wide atmospheric glow */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 70% 80% at 52% 44%, rgba(0,80,180,0.2) 0%, rgba(0,30,100,0.06) 55%, transparent 80%)",
        }} />
      </motion.div>

      {/* ── Light beam from top ── */}
      <motion.div
        className="absolute inset-0 z-1 pointer-events-none"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "30%",
          height: "70%",
          background: "linear-gradient(to bottom, rgba(0,160,255,0.18) 0%, rgba(0,120,220,0.08) 40%, transparent 80%)",
          clipPath: "polygon(30% 0%, 70% 0%, 90% 100%, 10% 100%)",
        }} />
      </motion.div>

      {/* ── Canvas smoke ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* ── Edge vignette ── */}
      <div className="absolute inset-0 z-3 pointer-events-none" style={{
        background: "radial-gradient(ellipse 85% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.85) 100%)",
      }} />

      {/* ── Bottom gradient for text readability ── */}
      <div className="absolute bottom-0 left-0 right-0 z-3 pointer-events-none" style={{
        height: "60%",
        background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 35%, transparent 70%)",
      }} />

      {/* ── Top gradient ── */}
      <div className="absolute top-0 left-0 right-0 z-3 pointer-events-none" style={{
        height: "25%",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)",
      }} />

      {/* ── Content with parallax ── */}
      <motion.div
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-32"
        style={{ zIndex: 10, x: textX, y: textY }}
      >
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
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-800 leading-[0.92] tracking-tight mb-6"
        >
          <span className="block text-white drop-shadow-lg">SCULPTOR</span>
          <span className="block drop-shadow-lg">
            <span className="text-white">OF YOUR </span>
            <span className="glow-text" style={{ color: "var(--blue-neon)", WebkitTextStroke: "1px rgba(0,212,255,0.3)" }}>BODY</span>
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
      </motion.div>

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
