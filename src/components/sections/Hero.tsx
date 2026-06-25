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
      {/* ── Photo — full section, centered ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ x: imgX, y: imgY }}
      >
        <Image
          src="/assets/images/hero-trainer.png"
          alt="Sculptor of Your Body"
          fill
          priority
          style={{
            objectFit: "contain",
            objectPosition: "50% center",
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

      {/* ── Top gradient ── */}
      <div className="absolute top-0 left-0 right-0 z-3 pointer-events-none" style={{
        height: "25%",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)",
      }} />

      {/* ── Dominant brand title + subtitle (left) ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute z-10"
        style={{ left: "clamp(2rem, 6vw, 5rem)", bottom: "clamp(38%, 42vh, 46%)", maxWidth: "44vw" }}
      >
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-700 leading-[0.95] tracking-[-0.02em]"
          style={{ color: "#EAF4FF", textShadow: "0 0 24px rgba(120, 210, 255, 0.18)" }}
        >
          <span className="block">SCULPTOR</span>
          <span className="block">OF YOUR BODY</span>
        </h1>

        <p className="mt-6 text-sm sm:text-base font-700 leading-relaxed" style={{ color: "#EAF4FF" }}>
          Онлайн-коучинг • Персональные программы тренировок • Индивидуальные планы питания
        </p>
        <p className="mt-3 text-sm sm:text-base font-700 leading-relaxed" style={{ color: "rgba(234,244,255,0.85)" }}>
          Без жёстких диет. Без хаотичных тренировок. Только система, которая меняет тело.
        </p>
      </motion.div>

      {/* ── Premium signature (right) ── */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute z-10 hidden md:flex flex-col items-end gap-5"
        style={{ right: "clamp(2rem, 6vw, 5rem)", bottom: "clamp(40%, 44vh, 48%)", maxWidth: "34vw" }}
      >
        <div className="w-20 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(0,217,255,0.6))" }} />
        <span
          className="text-xl lg:text-2xl font-500 uppercase"
          style={{ color: "rgba(0, 217, 255, 0.78)", letterSpacing: "0.45em", textShadow: "0 0 14px rgba(0,212,255,0.22)" }}
        >
          Body Architect
        </span>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ zIndex: 10 }}
      >
        <motion.a
          href="#services"
          onClick={(e) => handleScroll(e, "#services")}
          className="text-sm sm:text-base md:text-lg font-700 tracking-[0.16em] uppercase whitespace-nowrap cursor-pointer rounded-full px-8 py-3.5"
          style={{
            color: "#EAF4FF",
            background: "rgba(0, 212, 255, 0.08)",
            border: "1px solid rgba(0, 217, 255, 0.55)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
          animate={{
            scale: [1, 1.07, 1, 1.04, 1],
            boxShadow: [
              "0 0 18px rgba(0,212,255,0.25), inset 0 0 12px rgba(0,212,255,0.08)",
              "0 0 40px rgba(0,229,255,0.7), inset 0 0 22px rgba(0,212,255,0.22)",
              "0 0 18px rgba(0,212,255,0.25), inset 0 0 12px rgba(0,212,255,0.08)",
              "0 0 34px rgba(0,229,255,0.55), inset 0 0 18px rgba(0,212,255,0.18)",
              "0 0 18px rgba(0,212,255,0.25), inset 0 0 12px rgba(0,212,255,0.08)",
            ],
            borderColor: [
              "rgba(0,217,255,0.55)",
              "rgba(0,229,255,0.95)",
              "rgba(0,217,255,0.55)",
              "rgba(0,229,255,0.85)",
              "rgba(0,217,255,0.55)",
            ],
          }}
          transition={{
            duration: 1.3,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.15, 0.4, 0.55, 1],
          }}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0,212,255,0.16)" }}
        >
          НАЧАТЬ ТРАНСФОРМАЦИЮ
        </motion.a>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[var(--blue-neon)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
