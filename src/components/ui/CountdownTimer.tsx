"use client";

import { useState, useEffect } from "react";

const SALE_DEADLINE = "2026-07-17T23:59:59";

function useCountdown() {
  const target = new Date(SALE_DEADLINE).getTime();
  const [diff, setDiff] = useState(() => Math.max(0, target - Date.now()));

  useEffect(() => {
    const id = setInterval(() => setDiff(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(id);
  }, [target]);

  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  };
}

interface Props {
  label: string;
  units: string[];
}

export default function CountdownTimer({ label, units }: Props) {
  const { days, hours, minutes, seconds } = useCountdown();
  const values = [days, hours, minutes, seconds];
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="mt-5">
      <p className="text-[11px] font-600 tracking-[0.2em] uppercase text-center mb-3" style={{ color: "rgba(0,212,255,0.7)" }}>
        {label}
      </p>
      <div className="flex items-center justify-center gap-1.5">
        {values.map((val, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div
              className="flex flex-col items-center justify-center rounded-xl px-3 py-2 min-w-[52px]"
              style={{
                background: "rgba(0,212,255,0.07)",
                border: "1px solid rgba(0,212,255,0.25)",
                boxShadow: "0 0 14px rgba(0,212,255,0.15)",
              }}
            >
              <span
                className="text-2xl font-800 tabular-nums leading-none"
                style={{ color: "var(--blue-neon)", textShadow: "0 0 18px rgba(0,212,255,0.7)" }}
              >
                {pad(val)}
              </span>
              <span className="text-[9px] font-600 mt-1 tracking-widest uppercase" style={{ color: "rgba(0,212,255,0.5)" }}>
                {units[i]}
              </span>
            </div>
            {i < 3 && (
              <span className="text-xl font-700 mb-3" style={{ color: "rgba(0,212,255,0.45)" }}>:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
