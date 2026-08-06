"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Countdown({ target }: { target?: Date }) {
  const deadline = target ?? new Date("2027-02-16T06:00:00+05:30");
  const [mounted, setMounted] = useState(false);
  const [diff, setDiff] = useState(() => Math.max(0, deadline.getTime() - Date.now()));

  useEffect(() => {
    setMounted(true);
    const tick = setInterval(() => {
      setDiff(Math.max(0, deadline.getTime() - Date.now()));
    }, 1000);
    return () => clearInterval(tick);
  }, [deadline]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
        {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
          <div key={label} className="flex items-center gap-3 sm:gap-6">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gradient-saffron glow-gold tabular-nums">
                --
              </div>
              <span className="text-xs uppercase tracking-widest text-ink-soft/70 mt-1.5 block">
                {label}
              </span>
            </div>
            {label !== "Seconds" && (
              <span className="hidden sm:block text-saffron/40 text-3xl font-light">:</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
      {[
        { value: days, label: "Days" },
        { value: hours, label: "Hours" },
        { value: mins, label: "Minutes" },
        { value: secs, label: "Seconds" },
      ].map((item, i, arr) => (
        <div key={item.label} className="flex items-center gap-3 sm:gap-6">
          <div className="text-center">
            <motion.div
              key={`${item.value}-${item.label}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gradient-saffron glow-gold tabular-nums"
            >
              {String(item.value).padStart(2, "0")}
            </motion.div>
            <span className="text-xs uppercase tracking-widest text-ink-soft/70 mt-1.5 block">
              {item.label}
            </span>
          </div>
          {i < arr.length - 1 && (
            <span className="hidden sm:block text-saffron/40 text-3xl font-light">:</span>
          )}
        </div>
      ))}
    </div>
  );
}