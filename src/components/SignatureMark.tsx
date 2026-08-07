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
      className="pointer-events-none inline-block"
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
            <stop offset="0%" stopColor="#f5c34a" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3d1c66" stopOpacity="0" />
          </radialGradient>
          <filter id="sm-blur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        {/* Center glow */}
        <circle cx={size / 2} cy={size / 2} r={size * 0.38} fill="url(#sm-glow)" />

        {/* Outer circle ring */}
        <DrawCircle
          cx={size / 2}
          cy={size / 2}
          r={size * 0.38}
          duration={2.2}
          delay={0.1}
          stroke="#f5c34a"
          strokeWidth={1.2}
        />

        {/* Inner lotus petals — 8 */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (360 / 8) * i;
          const petalCx = size / 2;
          const petalCy = size / 2 - size * 0.22;
          return (
            <motion.ellipse
              key={`petal-${i}`}
              cx={petalCx}
              cy={petalCy}
              rx={size * 0.06}
              ry={size * 0.14}
              fill="none"
              stroke="#ffb24d"
              strokeWidth={0.9}
              opacity={0.5}
              initial={{ scale: 0, opacity: 0, rotate: -angle }}
              animate={{ scale: 1, opacity: 0.5, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.0 + i * 0.08,
                ease: "backOut",
              }}
              style={{ transformOrigin: `${petalCx}px ${petalCx}px` }}
              transform={`rotate(${angle} ${petalCx} ${petalCx})`}
            />
          );
        })}

        {/* Central stylised "R" monogram — drawn stroke-by-stroke */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {/* Vertical stem */}
          <DrawPath
            d={`M ${size * 0.42} ${size * 0.28} L ${size * 0.42} ${size * 0.72}`}
            stroke="url(#portrait-stroke)"
            duration={0.9}
            delay={0.7}
            strokeWidth={2.2}
            strokeLinecap="round"
          />
          {/* Top right curve */}
          <DrawPath
            d={`M ${size * 0.42} ${size * 0.28}
                Q ${size * 0.62} ${size * 0.26} ${size * 0.60} ${size * 0.40}
                Q ${size * 0.58} ${size * 0.52} ${size * 0.42} ${size * 0.52}`}
            stroke="url(#portrait-stroke)"
            duration={0.9}
            delay={1.0}
            strokeWidth={2.2}
            strokeLinecap="round"
          />
          {/* Diagonal leg */}
          <DrawPath
            d={`M ${size * 0.52} ${size * 0.52} L ${size * 0.62} ${size * 0.72}`}
            stroke="url(#portrait-stroke)"
            duration={0.6}
            delay={1.5}
            strokeWidth={2.2}
            strokeLinecap="round"
          />
        </motion.g>

        {/* Radial dots between lotus and outer ring */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (360 / 16) * i;
          const rad = (angle * Math.PI) / 180;
          const r = size * 0.30;
          const x = size / 2 + r * Math.sin(rad);
          const y = size / 2 - r * Math.cos(rad);
          return (
            <motion.circle
              key={`dot-${i}`}
              cx={x}
              cy={y}
              r={size * 0.008}
              fill="#f5c34a"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.7 }}
              transition={{
                duration: 0.4,
                delay: 1.2 + i * 0.05,
                ease: "easeOut",
              }}
            />
          );
        })}
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
