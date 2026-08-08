"use client";

import { motion } from "framer-motion";

/**
 * SignatureMark — Animated drawn-on-load monogram combining an "R" (Ravidas)
 * glyph stylised with lotus petals and a ring. Used as a visual anchor in the
 * hero alongside the title or beside the 650th tag.
 *
 * Usage:
 *   <SignatureMark />
 *   <SignatureMark size={180} />
 */
export function SignatureMark({ size = 140 }: { size?: number }) {
  return (
    <div
      className="pointer-events-none inline-block select-none will-change-transform"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="sm-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5c34a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3d1c66" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center glow */}
        <circle cx={size / 2} cy={size / 2} r={size * 0.38} fill="url(#sm-glow)" />

        {/* Outer ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size * 0.38}
          fill="none"
          stroke="#f5c34a"
          strokeWidth={1.2}
          opacity={0.8}
        />

        {/* Central "R" monogram */}
        <g stroke="#ffb24d" strokeWidth={2.2} strokeLinecap="round" fill="none">
          <path d={`M ${size * 0.42} ${size * 0.28} L ${size * 0.42} ${size * 0.72}`} />
          <path
            d={`M ${size * 0.42} ${size * 0.28}
                Q ${size * 0.62} ${size * 0.26} ${size * 0.60} ${size * 0.40}
                Q ${size * 0.58} ${size * 0.52} ${size * 0.42} ${size * 0.52}`}
          />
          <path d={`M ${size * 0.52} ${size * 0.52} L ${size * 0.62} ${size * 0.72}`} />
        </g>
      </svg>
    </div>
  );
}

/**
 * SectionDivider — a thin animated horizontal line ornament used
 * between major sections. Draws from center outwards.
 */
export function SectionDivider() {
  return (
    <div className="flex items-center justify-center my-8">
      <svg width="240" height="20" viewBox="0 0 240 20" aria-hidden="true">
        <defs>
          <linearGradient id="sd-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#ff8a1e" stopOpacity="0" />
            <stop offset="50%" stopColor="#f5c34a" stopOpacity="1" />
            <stop offset="100%" stopColor="#ff8a1e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.line
          x1="120"
          y1="10"
          x2="120"
          y2="10"
          stroke="url(#sd-grad)"
          strokeWidth={1}
          initial={{ x2: 0 }}
          animate={{ x2: 120 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        <motion.line
          x1="120"
          y1="10"
          x2="120"
          y2="10"
          stroke="url(#sd-grad)"
          strokeWidth={1}
          initial={{ x1: 120 }}
          animate={{ x1: 240 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
        />
        <motion.circle
          cx="120"
          cy="10"
          r="3"
          fill="#f5c34a"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        />
      </svg>
    </div>
  );
}

/* ── Helpers ──────────────────────────────────────────────────────────────── */

function DrawCircle({
  cx,
  cy,
  r,
  duration = 2,
  delay = 0,
  stroke = "#f5c34a",
  strokeWidth = 1,
}: {
  cx: number;
  cy: number;
  r: number;
  duration?: number;
  delay?: number;
  stroke?: string;
  strokeWidth?: number;
}) {
  const circumference = 2 * Math.PI * r;
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      initial={{ strokeDashoffset: circumference }}
      animate={{ strokeDashoffset: 0 }}
      transition={{
        duration,
        delay,
        ease: "easeInOut",
      }}
      style={{ strokeDasharray: circumference, opacity: 0.8 }}
    />
  );
}

function DrawPath({
  d,
  stroke,
  duration = 2,
  delay = 0,
  strokeWidth = 1.2,
  strokeLinecap,
  fill = "none",
  filter,
  strokeDasharray,
}: {
  d: string;
  stroke: string;
  duration?: number;
  delay?: number;
  strokeWidth?: number;
  strokeLinecap?: string;
  fill?: string;
  filter?: string;
  strokeDasharray?: string;
}) {
  return (
    <motion.path
      d={d}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={(strokeLinecap ?? "round") as "round" | "butt" | "square"}
      strokeDasharray={strokeDasharray}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: { duration, delay, ease: "easeInOut" },
        opacity: { duration: 0.4, delay: Math.min(delay, 0.1) },
      }}
      filter={filter}
    />
  );
}
