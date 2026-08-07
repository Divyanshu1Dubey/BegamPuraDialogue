"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LanguageAware } from "./LanguageAware";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

export function Countdown({ target }: { target?: Date }) {
  const deadline = target ?? new Date("2026-08-10T00:00:00+05:30");
  const [mounted, setMounted] = useState(false);
  const [diff, setDiff] = useState(() => Math.max(0, deadline.getTime() - Date.now()));
  const { language } = useLanguage();

  useEffect(() => {
    setMounted(true);
    const tick = setInterval(() => {
      setDiff(Math.max(0, deadline.getTime() - Date.now()));
    }, 1000);
    return () => clearInterval(tick);
  }, [deadline]);

  const cd = t.countdown;
  const labels = [cd.days, cd.hours, cd.minutes, cd.seconds].map(
    (item) => item[language] || item.en
  );

  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
        {labels.map((label, idx) => (
          <div key={label} className="flex items-center gap-3 sm:gap-6">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gradient-saffron glow-gold tabular-nums">
                --
              </div>
              <span className="text-xs uppercase tracking-widest text-ink-soft/70 mt-1.5 block">
                {label}
              </span>
            </div>
            {idx < 3 && (
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
        { value: days, label: labels[0] },
        { value: hours, label: labels[1] },
        { value: mins, label: labels[2] },
        { value: secs, label: labels[3] },
      ].map((item, i, arr) => (
        <div key={item.label} className="flex items-center gap-3 sm:gap-6">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gradient-saffron glow-gold tabular-nums">
              {String(item.value).padStart(2, "0")}
            </div>
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
