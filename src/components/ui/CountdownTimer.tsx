"use client";

import { useState, useEffect } from "react";

// Owner's timezone — the sale resets at local midnight here every day.
const TIMEZONE = "Europe/Kyiv";

const timeFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIMEZONE,
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

// Countdown to the next midnight in TIMEZONE. Resets automatically every day
// at 00:00 local time and shows the same value for every visitor, regardless
// of their own timezone (DST handled by the Intl API). No storage needed.
function calcTimeLeft() {
  const parts = timeFmt.formatToParts(new Date());
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  const elapsed = (get("hour") % 24) * 3600 + get("minute") * 60 + get("second");
  const remaining = 86_400 - elapsed;
  return {
    hours:   Math.floor(remaining / 3600),
    minutes: Math.floor(remaining / 60) % 60,
    seconds: remaining % 60,
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
      <p className="text-[11px] font-700 tracking-[0.2em] uppercase text-center mb-3" style={{ color: "rgba(120,235,255,0.95)" }}>
        {label}
      </p>
      <div className="flex items-center justify-center gap-1.5">
        {values.map((val, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div
              className="timer-box flex flex-col items-center justify-center rounded-xl px-3 py-2 min-w-[52px]"
              style={{
                background: "rgba(0,212,255,0.16)",
              }}
            >
              <span
                className="text-2xl font-800 tabular-nums leading-none"
                style={{ color: "#7DF0FF", textShadow: "0 0 22px rgba(0,229,255,0.95), 0 0 40px rgba(0,212,255,0.5)" }}
              >
                {pad(val)}
              </span>
              <span className="text-[9px] font-700 mt-1 tracking-widest uppercase" style={{ color: "rgba(120,235,255,0.85)" }}>
                {displayUnits[i]}
              </span>
            </div>
            {i < 2 && (
              <span className="text-xl font-800 mb-3" style={{ color: "rgba(0,229,255,0.85)" }}>:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
