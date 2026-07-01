"use client";

import { useState, useEffect } from "react";

const DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

// Rolling 24-hour window anchored to fixed daily boundaries (UTC midnights).
// It always shows time left in the current 24h cycle and resets automatically
// every day — the same for every visitor, no storage needed.
function calcTimeLeft() {
  const now = Date.now();
  const deadline = Math.ceil(now / DURATION_MS) * DURATION_MS;
  const diff = Math.max(0, deadline - now);
  return {
    hours:   Math.floor(diff / 3_600_000),
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  };
}

interface Props {
  label: string;
  units: string[];
}

export default function CountdownTimer({ label, units }: Props) {
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTimeLeft(calcTimeLeft());
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const values = [timeLeft.hours, timeLeft.minutes, timeLeft.seconds];
  // units: [days, hours, minutes, seconds] — skip days for 24h timer, use hours/minutes/seconds
  const displayUnits = [units[1], units[2], units[3]];

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
                {displayUnits[i]}
              </span>
            </div>
            {i < 2 && (
              <span className="text-xl font-700 mb-3" style={{ color: "rgba(0,212,255,0.45)" }}>:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
