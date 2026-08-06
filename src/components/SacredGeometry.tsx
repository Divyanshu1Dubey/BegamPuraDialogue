"use client";

import { motion } from "framer-motion";

/**
 * SacredGeometry — Animated mandala/sacred-geometry background.
 * Behaves like a rotating temple of light: concentric rings, lotus petals,
 * sunburst rays. Pure SVG so no extra deps; GPU-friendly.
 */
export function SacredGeometry({
  className = "",
  rings = 6,
}: {
  className?: string;
  rings?: number;
}) {
  const ringAngles = Array.from({ length: rings }, (_, i) => i);
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <svg
        viewBox="0 0 800 800"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="saffron-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff8a1e" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#f5c34a" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3d1c66" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="violet-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6c3aa6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3d1c66" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ray-stroke" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#ffb24d" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#f5c34a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff8a1e" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Background glow */}
        <circle cx="400" cy="400" r="400" fill="url(#violet-glow)" />
        <circle cx="400" cy="400" r="220" fill="url(#saffron-glow)" />

        {/* Outer rotating rays */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "400px 400px" }}
        >
          {Array.from({ length: 36 }).map((_, i) => (
            <line
              key={`ray-${i}`}
              x1="400"
              y1="40"
              x2="400"
              y2="200"
              stroke="url(#ray-stroke)"
              strokeWidth="1.2"
              transform={`rotate(${i * 10} 400 400)`}
            />
          ))}
        </motion.g>

        {/* Petal rings — lotus */}
        {ringAngles.map((r) => {
          const radius = 110 + r * 38;
          const count = 12 + r * 4;
          return (
            <motion.g
              key={`ring-${r}`}
              animate={{ rotate: r % 2 === 0 ? 360 : -360 }}
              transition={{
                duration: 40 + r * 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ transformOrigin: "400px 400px" }}
            >
              {Array.from({ length: count }).map((_, i) => {
                const angle = (360 / count) * i;
                return (
                  <ellipse
                    key={`petal-${r}-${i}`}
                    cx="400"
                    cy={400 - radius}
                    rx="10"
                    ry="22"
                    fill="none"
                    stroke={`hsl(${(r * 30 + i * 5) % 60 + 20}, 80%, ${
                      50 + r * 5
                    }%)`}
                    strokeWidth="0.8"
                    opacity={0.2 + r * 0.06}
                    transform={`rotate(${angle} 400 400)`}
                  />
                );
              })}
            </motion.g>
          );
        })}

        {/* Inner concentric circles */}
        {ringAngles.map((r) => (
          <motion.circle
            key={`circle-${r}`}
            cx="400"
            cy="400"
            r={40 + r * 18}
            fill="none"
            stroke={
              r % 2 === 0
                ? "rgba(255, 178, 77, 0.4)"
                : "rgba(108, 58, 166, 0.35)"
            }
            strokeWidth={r === 3 ? 1.2 : 0.6}
            strokeDasharray={r % 2 === 0 ? "2 6" : "0"}
            animate={{ rotate: r % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 30 + r * 6, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "400px 400px" }}
          />
        ))}

        {/* Center — bindu */}
        <motion.circle
          cx="400"
          cy="400"
          r="14"
          fill="#ffb24d"
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="400" cy="400" r="22" fill="none" stroke="#ff8a1e" strokeWidth="1" />
        <circle cx="400" cy="400" r="32" fill="none" stroke="#ff8a1e" strokeWidth="0.5" opacity="0.5" />
      </svg>
    </div>
  );
}

/**
 * MandalaRotator — A simpler, smaller floating mandala for in-page accents.
 */
export function MandalaRotator({ size = 200 }: { size?: number }) {
  return (
    <div
      className="pointer-events-none animate-spin-slow"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <radialGradient id="mn-glow">
            <stop offset="0%" stopColor="#f5c34a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#3d1c66" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="98" fill="url(#mn-glow)" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="20"
            x2="100"
            y2="60"
            stroke="#f5c34a"
            strokeWidth="0.4"
            opacity="0.4"
            transform={`rotate(${i * 15} 100 100)`}
          />
        ))}
        {Array.from({ length: 16 }).map((_, i) => (
          <circle
            key={`c-${i}`}
            cx="100"
            cy="40"
            r="3"
            fill="none"
            stroke="#ff8a1e"
            strokeWidth="0.4"
            opacity="0.5"
            transform={`rotate(${i * 22.5} 100 100)`}
          />
        ))}
      </svg>
    </div>
  );
}