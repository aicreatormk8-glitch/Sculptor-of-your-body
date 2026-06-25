"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useDict } from "@/lib/i18n/DictContext";

export default function Hero() {
  const dict = useDict();
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

  // Canvas smoke — живой 5D дым
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Simple noise helper (hash-based pseudo-noise)
    const hash = (x: number, y: number) => {
      const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return h - Math.floor(h);
    };
    const noise = (x: number, y: number) => {
      const ix = Math.floor(x), iy = Math.floor(y);
      const fx = x - ix, fy = y - iy;
      const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
      const a = hash(ix, iy), b = hash(ix + 1, iy);
      const c = hash(ix, iy + 1), d = hash(ix + 1, iy + 1);
      return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
    };
    const fbm = (x: number, y: number, oct: number) => {
      let v = 0, amp = 0.5, freq = 1;
      for (let i = 0; i < oct; i++) {
        v += amp * noise(x * freq, y * freq);
        amp *= 0.5; freq *= 2;
      }
      return v;
    };

    type Puff = {
      x: number; y: number; vx: number; vy: number;
      ox: number; oy: number; // origin for turbulence
      radius: number; targetRadius: number;
      opacity: number; hue: number; saturation: number;
      life: number; maxLife: number;
      rotation: number; rotSpeed: number;
      layer: number; // 0=bg, 1=mid, 2=fg
      phase: number;
    };

    const puffs: Puff[] = [];

    const spawnPuff = (layer = Math.floor(Math.random() * 3)) => {
      const cx = W * (0.3 + Math.random() * 0.4);
      const cy = H * (0.1 + Math.random() * 0.75);
      const maxLife = layer === 0
        ? 400 + Math.random() * 200
        : layer === 1
          ? 250 + Math.random() * 150
          : 120 + Math.random() * 80;

      puffs.push({
        x: cx, y: cy, ox: cx, oy: cy,
        vx: (Math.random() - 0.5) * (layer === 2 ? 0.6 : 0.25),
        vy: -(Math.random() * (layer === 2 ? 0.5 : 0.2) + 0.05),
        radius: layer === 0 ? 80 + Math.random() * 120
          : layer === 1 ? 40 + Math.random() * 80
          : 20 + Math.random() * 40,
        targetRadius: 0,
        opacity: 0,
        hue: 200 + Math.random() * 50,
        saturation: 60 + Math.random() * 30,
        life: 0, maxLife,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.003,
        layer,
        phase: Math.random() * 100,
      });
    };

    // Seed initial puffs on all layers
    for (let i = 0; i < 6; i++) spawnPuff(0);
    for (let i = 0; i < 8; i++) spawnPuff(1);
    for (let i = 0; i < 6; i++) spawnPuff(2);

    let frame = 0;
    let animId: number;
    let t = 0;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      frame++;
      t += 0.004;

      // Spawn schedule
      if (frame % 25 === 0) spawnPuff(0);
      if (frame % 12 === 0) spawnPuff(1);
      if (frame % 8 === 0) spawnPuff(2);

      // Sort by layer (bg first)
      puffs.sort((a, b) => a.layer - b.layer);

      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i];
        p.life++;
        p.rotation += p.rotSpeed;

        // Turbulence via fBm noise
        const nx = fbm((p.x / W) * 2 + t, (p.y / H) * 2 + p.phase, 4);
        const ny = fbm((p.x / W) * 2 + p.phase + 5, (p.y / H) * 2 + t, 4);
        const turbStr = p.layer === 0 ? 0.6 : p.layer === 1 ? 1.0 : 1.5;

        p.x += p.vx + (nx - 0.5) * turbStr;
        p.y += p.vy + (ny - 0.5) * turbStr * 0.5;
        p.radius += p.layer === 0 ? 0.08 : p.layer === 1 ? 0.12 : 0.18;

        const prog = p.life / p.maxLife;
        const maxOp = p.layer === 0 ? 0.28 : p.layer === 1 ? 0.22 : 0.16;
        p.opacity = prog < 0.2
          ? (prog / 0.2) * maxOp
          : prog < 0.65
            ? maxOp
            : (1 - (prog - 0.65) / 0.35) * maxOp;

        if (p.life >= p.maxLife) { puffs.splice(i, 1); continue; }

        // Draw with rotation transform
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Multi-pass bloom: draw 3 times at different scales
        for (let pass = 0; pass < 3; pass++) {
          const scale = 1 + pass * 0.3;
          const alpha = p.opacity * (pass === 0 ? 1 : pass === 1 ? 0.5 : 0.25);
          const r = p.radius * scale;

          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
          grad.addColorStop(0,   `hsla(${p.hue}, ${p.saturation}%, 65%, ${alpha})`);
          grad.addColorStop(0.3, `hsla(${p.hue}, ${p.saturation - 10}%, 50%, ${alpha * 0.7})`);
          grad.addColorStop(0.6, `hsla(${p.hue - 10}, ${p.saturation - 20}%, 35%, ${alpha * 0.3})`);
          grad.addColorStop(1,   `hsla(${p.hue}, 40%, 20%, 0)`);

          ctx.beginPath();
          // Ellipse for more organic shape
          ctx.ellipse(0, 0, r, r * (0.7 + Math.sin(p.phase + p.life * 0.01) * 0.15), 0, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        ctx.restore();

        // Extra: bright core for foreground wisps
        if (p.layer === 2) {
          const coreGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 0.4);
          coreGrad.addColorStop(0, `hsla(${p.hue + 20}, 95%, 80%, ${p.opacity * 0.8})`);
          coreGrad.addColorStop(1, `hsla(${p.hue}, 80%, 60%, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = coreGrad;
          ctx.fill();
        }
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
      {/* ── Photo with parallax — 12% larger, shifted right ── */}
      <motion.div
        className="absolute z-0"
        style={{
          x: imgX, y: imgY,
          inset: "-6%",
          left: "3%",
        }}
      >
        <Image
          src="/assets/images/hero-trainer.png"
          alt="Sculptor of Your Body"
          fill
          priority
          style={{
            objectFit: "contain",
            objectPosition: "58% center",
            filter: "brightness(1.08) contrast(1.08) saturate(1.1)",
          }}
        />
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
        className="relative w-full max-w-7xl mx-auto pb-20 pt-32"
        style={{ zIndex: 10, x: textX, y: textY, paddingLeft: "clamp(2rem, 12vw, 10rem)", paddingRight: "1.5rem" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-8 h-px bg-[var(--blue-neon)]" />
          <span className="text-xs font-600 tracking-[0.3em] uppercase text-[var(--blue-neon)]">
            {dict.hero.eyebrow}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-700 leading-[1.02] tracking-[-0.02em] mb-6"
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
          {dict.hero.desc1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-sm text-[var(--text-muted)] leading-relaxed mb-8 max-w-md"
        >
          {dict.hero.desc2}
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
            className="group relative px-8 py-4 text-sm font-700 tracking-wide text-white rounded-xl overflow-hidden transition-all duration-300 text-center hover:scale-105"
            style={{
              background: "rgba(0,100,200,0.25)",
              border: "1px solid rgba(0,212,255,0.45)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 0 25px rgba(0,180,255,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(0,140,255,0.35)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 45px rgba(0,200,255,0.5), inset 0 1px 0 rgba(255,255,255,0.15)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(0,100,200,0.25)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 25px rgba(0,180,255,0.25), inset 0 1px 0 rgba(255,255,255,0.1)";
            }}
          >
            <span className="relative z-10">{dict.hero.btn1}</span>
          </a>
          <a
            href="#services"
            onClick={(e) => handleScroll(e, "#services")}
            className="px-8 py-4 text-sm font-600 tracking-wide text-[var(--blue-neon)] rounded-xl transition-all duration-300 text-center hover:scale-105"
            style={{
              background: "rgba(0,212,255,0.05)",
              border: "1px solid rgba(0,212,255,0.25)",
              backdropFilter: "blur(16px)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.12)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 25px rgba(0,212,255,0.2), inset 0 1px 0 rgba(255,255,255,0.08)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.05)";
              (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.05)";
            }}
          >
            {dict.hero.btn2}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap gap-2"
        >
          {dict.hero.badges.map((badge, i) => (
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
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10, top: "68%" }}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)]">НАЧАТЬ ТРАНСФОРМАЦИЮ</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[var(--blue-neon)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
