"use client";

import { motion } from "framer-motion";

/**
 * SacredGeometry — Animated mandala/sacred-geometry background.
 * Rotating temple of light: concentric rings, lotus petals,
 * sunburst rays, and layered glows for depth.
 */
export function SacredGeometry({
  className = "",
  rings = 8,
}: {
  className?: string;
  rings?: number;
}) {
  const ringAngles = Array.from({ length: rings }, (_, i) => i);
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <svg
        viewBox="0 0 1000 1000"
        className="h-full w-full opacity-90"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="saffron-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff8a1e" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#ffb24d" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#f5c34a" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#3d1c66" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="violet-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6c3aa6" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#3d1c66" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3d1c66" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ray-stroke" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffb24d" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#ff8a1e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3d1c66" stopOpacity="0.05" />
          </linearGradient>
          <filter id="bindu-glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer violet aura */}
        <circle cx="500" cy="500" r="480" fill="url(#violet-glow)" />

        {/* Center saffron glow blob */}
        <circle cx="500" cy="500" r="380" fill="url(#saffron-glow)" />

        {/* Rotating sunburst rays — primary */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "500px 500px" }}
        >
          {Array.from({ length: 48 }).map((_, i) => {
            const angle = i * 7.5;
            return (
              <line
                key={`ray-${i}`}
                x1="500"
                y1="80"
                x2="500"
                y2="240"
                stroke="url(#ray-stroke)"
                strokeWidth={i % 4 === 0 ? "2.5" : "1"}
                opacity={i % 4 === 0 ? "0.7" : "0.3"}
                transform={`rotate(${angle} 500 500)`}
              />
            );
          })}
        </motion.g>

        {/* Counter-rotating fine rays */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "500px 500px" }}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={`ray2-${i}`}
              x1="500"
              y1="160"
              x2="500"
              y2="280"
              stroke="#ff8a1e"
              strokeWidth="0.5"
              opacity="0.15"
              transform={`rotate(${i * 15} 500 500)`}
            />
          ))}
        </motion.g>

        {/* Petal rings — lotus */}
        {ringAngles.map((r) => {
          const radius = 140 + r * 42;
          const count = 16 + r * 4;
          return (
            <motion.g
              key={`ring-${r}`}
              animate={{ rotate: r % 2 === 0 ? 360 : -360 }}
              transition={{
                duration: 60 + r * 15,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ transformOrigin: "500px 500px" }}
            >
              {Array.from({ length: count }).map((_, i) => {
                const angle = (360 / count) * i;
                const hue = (r * 25 + i * 4) % 50 + 20;
                const lightness = 48 + r * 4;
                const opacity = 0.15 + r * 0.05;
                return (
                  <ellipse
                    key={`petal-${r}-${i}`}
                    cx="500"
                    cy={500 - radius}
                    rx={14 + r * 1.5}
                    ry={28 + r * 2}
                    fill="none"
                    stroke={`hsl(${hue}, 85%, ${lightness}%)`}
                    strokeWidth={0.6 + r * 0.15}
                    opacity={opacity}
                    transform={`rotate(${angle} 500 500)`}
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
            cx="500"
            cy="500"
            r={60 + r * 22}
            fill="none"
            stroke={
              r % 3 === 0
                ? "rgba(255, 178, 77, 0.5)"
                : r % 3 === 1
                  ? "rgba(108, 58, 166, 0.4)"
                  : "rgba(245, 195, 74, 0.3)"
            }
            strokeWidth={r === 0 ? 1.5 : 0.6}
            strokeDasharray={r % 2 === 0 ? "4 8" : "0"}
            animate={{ rotate: r % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 45 + r * 8, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "500px 500px" }}
          />
        ))}

        {/* Outer decorative dotted circle */}
        <motion.circle
          cx="500"
          cy="500"
          r="460"
          fill="none"
          stroke="#ff8a1e"
          strokeWidth="0.4"
          opacity="0.2"
          strokeDasharray="2 12"
          animate={{ rotate: 360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "500px 500px" }}
        />

        {/* Center bindu with glow */}
        <motion.circle
          cx="500"
          cy="500"
          r="18"
          fill="#ffb24d"
          filter="url(#bindu-glow)"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="500"
          cy="500"
          r="30"
          fill="none"
          stroke="#ff8a1e"
          strokeWidth="1.2"
          opacity="0.6"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="500" cy="500" r="44" fill="none" stroke="#f5c34a" strokeWidth="0.5" opacity="0.35" />
        <circle cx="500" cy="500" r="58" fill="none" stroke="#ff8a1e" strokeWidth="0.3" opacity="0.2" />
      </svg>
    </div>
  );
}

/**
 * MandalaRotator — smaller floating mandala for in-page accents.
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
