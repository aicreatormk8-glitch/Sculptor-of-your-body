"use client";

import { useState, useEffect } from "react";

const DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
const STORAGE_KEY = "sale_start_ts";

// Per-visitor rolling 24h window. Each visitor starts at 24:00:00 on their
// first visit; when the 24h elapse, it rolls over to a fresh 24:00:00
// automatically. The start moment is kept in the browser so the countdown
// stays consistent across reloads within the same 24h cycle.
function getDeadline(): number {
  const now = Date.now();
  let start = Number(localStorage.getItem(STORAGE_KEY));
  if (!start || now - start >= DURATION_MS) {
    start = now;
    localStorage.setItem(STORAGE_KEY, String(start));
  }
  return start + DURATION_MS;
}

function calcTimeLeft() {
  const diff = Math.max(0, getDeadline() - Date.now());
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
