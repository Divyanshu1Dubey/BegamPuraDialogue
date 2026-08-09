"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * RavidassPortrait — Animated drawn-on-load SVG vector portrait of Sant Ravidas.
 * All paths use `stroke-dasharray` / `stroke-dashoffset` so every line
 * draws itself into existence, honouring the calligraphy/calligraphic tradition.
 *
 * Usage:
 *   <RavidassPortrait />                          // default size
 *   <RavidassPortrait size={380} />               // custom size in px
 */
export function RavidassPortrait({
  size = 360,
  className = "",
  revealDuration = 3,
}: {
  size?: number;
  className?: string;
  revealDuration?: number;
}) {
  return (
    <div
      className={`relative pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Outer halo ring — draws first */}
      <DrawCircle cx={size / 2} cy={size / 2} r={size / 2 - 4} duration={revealDuration * 0.8} />

      {/* Glow filter applied through drop-shadow via gradient definition */}
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="halo-glow" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#ffb24d" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ff8a1e" stopOpacity="0" />
          </radialGradient>
          <filter id="glow-portrait">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="portrait-stroke" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#f5c34a" />
            <stop offset="50%" stopColor="#ffb24d" />
            <stop offset="100%" stopColor="#ff8a1e" />
          </linearGradient>
        </defs>

        {/* Center ambient glow */}
        <circle cx={size / 2} cy={size / 2} r={size * 0.42} fill="url(#halo-glow)" />

        {/* ── Head shape ───────────────────────────────── */}
        <DrawPath
          d={`M ${size * 0.34} ${size * 0.32}
              Q ${size * 0.33} ${size * 0.18} ${size * 0.5} ${size * 0.16}
              Q ${size * 0.67} ${size * 0.18} ${size * 0.66} ${size * 0.32}
              Q ${size * 0.67} ${size * 0.50} ${size * 0.62} ${size * 0.58}
              Q ${size * 0.58} ${size * 0.65} ${size * 0.5} ${size * 0.66}
              Q ${size * 0.42} ${size * 0.65} ${size * 0.38} ${size * 0.58}
              Q ${size * 0.33} ${size * 0.50} ${size * 0.34} ${size * 0.32} Z`}
          stroke="url(#portrait-stroke)"
          duration={revealDuration * 1.2}
          delay={0.3}
          strokeWidth={1.4}
          filter="url(#glow-portrait)"
        />

        {/* ── Face — subtle inner features ───────────── */}
        {/* Left eye */}
        <DrawPath
          d={`M ${size * 0.40} ${size * 0.34} Q ${size * 0.44} ${size * 0.30} ${size * 0.48} ${size * 0.34}`}
          stroke="#ffb24d"
          duration={revealDuration * 0.6}
          delay={revealDuration * 0.5}
          strokeWidth={1.6}
          strokeLinecap="round"
          filter="url(#glow-portrait)"
        />
        {/* Right eye */}
        <DrawPath
          d={`M ${size * 0.52} ${size * 0.34} Q ${size * 0.56} ${size * 0.30} ${size * 0.60} ${size * 0.34}`}
          stroke="#ffb24d"
          duration={revealDuration * 0.6}
          delay={revealDuration * 0.55}
          strokeWidth={1.6}
          strokeLinecap="round"
          filter="url(#glow-portrait)"
        />
        {/* Eyebrows */}
        <DrawPath
          d={`M ${size * 0.39} ${size * 0.28} Q ${size * 0.44} ${size * 0.25} ${size * 0.48} ${size * 0.27}`}
          stroke="#f5c34a"
          duration={revealDuration * 0.4}
          delay={revealDuration * 0.6}
          strokeWidth={1}
          strokeLinecap="round"
        />
        <DrawPath
          d={`M ${size * 0.52} ${size * 0.27} Q ${size * 0.56} ${size * 0.25} ${size * 0.61} ${size * 0.28}`}
          stroke="#f5c34a"
          duration={revealDuration * 0.4}
          delay={revealDuration * 0.62}
          strokeWidth={1}
          strokeLinecap="round"
        />
        {/* Nose */}
        <DrawPath
          d={`M ${size * 0.5} ${size * 0.34}
              Q ${size * 0.49} ${size * 0.40} ${size * 0.47} ${size * 0.43}
              Q ${size * 0.50} ${size * 0.44} ${size * 0.53} ${size * 0.43}`}
          stroke="#ffb24d"
          duration={revealDuration * 0.5}
          delay={revealDuration * 0.65}
          strokeWidth={1.2}
          strokeLinecap="round"
        />
        {/* Gentle smile */}
        <DrawPath
          d={`M ${size * 0.42} ${size * 0.49} Q ${size * 0.50} ${size * 0.54} ${size * 0.58} ${size * 0.49}`}
          stroke="#f5c34a"
          duration={revealDuration * 0.6}
          delay={revealDuration * 0.7}
          strokeWidth={1.4}
          strokeLinecap="round"
        />
        {/* Beard outline */}
        <DrawPath
          d={`M ${size * 0.38} ${size * 0.46}
              Q ${size * 0.35} ${size * 0.54} ${size * 0.38} ${size * 0.62}
              Q ${size * 0.43} ${size * 0.70} ${size * 0.50} ${size * 0.71}
              Q ${size * 0.57} ${size * 0.70} ${size * 0.62} ${size * 0.62}
              Q ${size * 0.65} ${size * 0.54} ${size * 0.62} ${size * 0.46}`}
          stroke="#ffb24d"
          duration={revealDuration * 0.8}
          delay={revealDuration * 0.75}
          strokeWidth={1.2}
          fill="none"
        />

        {/* ── Traditional Turban / Pagri ───────────────── */}
        <DrawPath
          d={`M ${size * 0.28} ${size * 0.30}
              Q ${size * 0.30} ${size * 0.14} ${size * 0.50} ${size * 0.11}
              Q ${size * 0.70} ${size * 0.14} ${size * 0.72} ${size * 0.30}
              Q ${size * 0.73} ${size * 0.36} ${size * 0.70} ${size * 0.34}
              Q ${size * 0.70} ${size * 0.22} ${size * 0.50} ${size * 0.20}
              Q ${size * 0.30} ${size * 0.22} ${size * 0.30} ${size * 0.34}
              Q ${size * 0.27} ${size * 0.36} ${size * 0.28} ${size * 0.30} Z`}
          stroke="url(#portrait-stroke)"
          duration={revealDuration * 1.0}
          delay={0.5}
          strokeWidth={1.3}
          filter="url(#glow-portrait)"
        />
        {/* Turban pleat lines */}
        {[0.30, 0.35, 0.40, 0.45, 0.50, 0.55, 0.60, 0.65, 0.70].map((frac, idx) => (
          <DrawPath
            key={`turban-${idx}`}
            d={`M ${size * frac} ${size * 0.20}
                Q ${size * frac} ${size * 0.16} ${size * frac} ${size * 0.14}`}
            stroke="#f5c34a"
            duration={revealDuration * 0.25}
            delay={0.8 + idx * 0.08}
            strokeWidth={0.8}
            strokeLinecap="round"
          />
        ))}
        {/* Turban fan (panch-sajja) top ornament */}
        <DrawPath
          d={`M ${size * 0.45} ${size * 0.12}
              Q ${size * 0.47} ${size * 0.06} ${size * 0.50} ${size * 0.04}
              Q ${size * 0.53} ${size * 0.06} ${size * 0.55} ${size * 0.12}
              Q ${size * 0.52} ${size * 0.09} ${size * 0.50} ${size * 0.07}
              Q ${size * 0.48} ${size * 0.09} ${size * 0.45} ${size * 0.12} Z`}
          stroke="#f5c34a"
          duration={revealDuration * 0.5}
          delay={revealDuration * 0.85}
          strokeWidth={1}
          strokeLinecap="round"
        />

        {/* ── Sacred Tilak ─────────────────────────────── */}
        <DrawPath
          d={`M ${size * 0.50} ${size * 0.23}
              Q ${size * 0.49} ${size * 0.27} ${size * 0.50} ${size * 0.30}
              Q ${size * 0.51} ${size * 0.27} ${size * 0.50} ${size * 0.23} Z`}
          stroke="#ff8a1e"
          duration={revealDuration * 0.4}
          delay={revealDuration * 0.9}
          strokeWidth={1.8}
          strokeLinecap="round"
          filter="url(#glow-portrait)"
        />

        {/* ── Neck & Shoulders ─────────────────────────── */}
        <DrawPath
          d={`M ${size * 0.43} ${size * 0.65}
              Q ${size * 0.42} ${size * 0.72} ${size * 0.38} ${size * 0.82}
              L ${size * 0.62} ${size * 0.82}
              Q ${size * 0.58} ${size * 0.72} ${size * 0.57} ${size * 0.65}`}
          stroke="url(#portrait-stroke)"
          duration={revealDuration * 0.7}
          delay={revealDuration * 0.95}
          strokeWidth={1.4}
          filter="url(#glow-portrait)"
        />

        {/* ── Sacred thread / Janeu horizontal ─────────── */}
        <DrawPath
          d={`M ${size * 0.36} ${size * 0.60} Q ${size * 0.50} ${size * 0.64} ${size * 0.64} ${size * 0.60}`}
          stroke="#f5c34a"
          duration={revealDuration * 0.4}
          delay={revealDuration * 1.05}
          strokeWidth={1}
          strokeDasharray={`${size * 0.04} ${size * 0.06}`}
        />

        {/* ── Central Om symbol (stylised) ─────────────── */}
        <DrawPath
          d={`M ${size * 0.47} ${size * 0.78}
              Q ${size * 0.47} ${size * 0.72} ${size * 0.50} ${size * 0.71}
              Q ${size * 0.53} ${size * 0.72} ${size * 0.53} ${size * 0.78}
              Q ${size * 0.53} ${size * 0.82} ${size * 0.50} ${size * 0.82}
              Q ${size * 0.47} ${size * 0.82} ${size * 0.47} ${size * 0.78}`}
          stroke="#ffb24d"
          duration={revealDuration * 1.0}
          delay={revealDuration * 1.1}
          strokeWidth={1.6}
          strokeLinecap="round"
          filter="url(#glow-portrait)"
        />

        {/* ── Decorative radiating rays behind head ────── */}
        {Array.from({ length: 18 }).map((_, i) => {
          const angle = (360 / 18) * i;
          const rad = (angle * Math.PI) / 180;
          const innerR = size * 0.28;
          const outerR = size * 0.32;
          const x1 = r(size / 2 + innerR * Math.sin(rad));
          const y1 = r(size / 2 - innerR * Math.cos(rad));
          const x2 = r(size / 2 + outerR * Math.sin(rad));
          const y2 = r(size / 2 - outerR * Math.cos(rad));
          return (
            <DrawPath
              key={`ray-${i}`}
              d={`M ${x1} ${y1} L ${x2} ${y2}`}
              stroke="#f5c34a"
              duration={revealDuration * 0.2}
              delay={0.4 + i * 0.04}
              strokeWidth={0.8}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    </div>
  );
}

/**
 * RavidassImage — places a real image (webp/jpg) behind the same
 * drawn-on-load SVG overlay so the image "materialises" through a
 * light-line reveal effect rather than just fading in.
 */
/**
 * RavidassImage — Smooth hardware-accelerated portrait image presentation
 * with a golden devotional halo glow ring.
 */
export function RavidassImage({
  src,
  alt,
  size = 360,
  className = "",
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  revealDuration?: number;
}) {
  return (
    <div
      className={`relative select-none pointer-events-none ${className}`}
      style={{ width: size, height: size, willChange: "transform" }}
    >
      {/* Outer Halo Glow */}
      <div className="absolute inset-0 rounded-full bg-linear-to-br from-saffron/30 via-gold/20 to-royal/30 blur-xl opacity-70 animate-pulse-saffron" />

      {/* Golden Ring Accent */}
      <div className="absolute -inset-1 rounded-full p-[2px] bg-linear-to-tr from-saffron via-gold to-saffron-bright shadow-lg shadow-saffron/20">
        <div className="w-full h-full rounded-full bg-bg" />
      </div>

      {/* The Portrait Image */}
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        draggable={false}
        className="relative z-10 h-full w-full object-cover rounded-full shadow-2xl transition-transform duration-700 hover:scale-105"
        style={{ aspectRatio: "1/1", objectPosition: "center top" }}
      />
    </div>
  );
}

/* ── Helpers ──────────────────────────────────────────────────────────────── */

/** Round to 2 decimal places to eliminate floating-point drift across SSR/client. */
const r = (n: number) => Math.round(n * 100) / 100;

/** A circle that draws itself (stroke-dashoffset animation). */
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

/** A path that draws itself from start to finish. */
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
