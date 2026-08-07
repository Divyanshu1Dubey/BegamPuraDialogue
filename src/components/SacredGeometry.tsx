"use client";

/**
 * SacredGeometry — Animated mandala/sacred-geometry background.
 * Optimized with CSS hardware acceleration for smooth 60 FPS scrolling.
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
    <div className={`pointer-events-none absolute inset-0 ${className} will-change-transform`}>
      <svg
        viewBox="0 0 1000 1000"
        className="h-full w-full opacity-80"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="saffron-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff8a1e" stopOpacity="0.75" />
            <stop offset="35%" stopColor="#ffb24d" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#f5c34a" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3d1c66" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="violet-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6c3aa6" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#3d1c66" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#3d1c66" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ray-stroke" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffb24d" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#ff8a1e" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3d1c66" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Outer violet aura */}
        <circle cx="500" cy="500" r="480" fill="url(#violet-glow)" />

        {/* Center saffron glow blob */}
        <circle cx="500" cy="500" r="380" fill="url(#saffron-glow)" />

        {/* Rotating sunburst rays — primary */}
        <g
          className="animate-spin-slow"
          style={{ transformOrigin: "500px 500px", willChange: "transform" }}
        >
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = i * 10;
            return (
              <line
                key={`ray-${i}`}
                x1="500"
                y1="80"
                x2="500"
                y2="240"
                stroke="url(#ray-stroke)"
                strokeWidth={i % 3 === 0 ? "2" : "1"}
                opacity={i % 3 === 0 ? "0.6" : "0.25"}
                transform={`rotate(${angle} 500 500)`}
              />
            );
          })}
        </g>

        {/* Petal rings — lotus */}
        {ringAngles.map((r) => {
          const radius = 140 + r * 48;
          const count = 12 + r * 4;
          return (
            <g
              key={`ring-${r}`}
              className={r % 2 === 0 ? "animate-spin-slow" : ""}
              style={{
                transformOrigin: "500px 500px",
                willChange: "transform",
                animationDirection: r % 2 === 0 ? "normal" : "reverse",
                animationDuration: `${60 + r * 20}s`,
              }}
            >
              {Array.from({ length: count }).map((_, i) => {
                const angle = (360 / count) * i;
                const hue = (r * 30 + i * 5) % 50 + 20;
                const lightness = 48 + r * 4;
                const opacity = 0.12 + r * 0.04;
                return (
                  <ellipse
                    key={`petal-${r}-${i}`}
                    cx="500"
                    cy={500 - radius}
                    rx={14 + r * 1.5}
                    ry={26 + r * 2}
                    fill="none"
                    stroke={`hsl(${hue}, 85%, ${lightness}%)`}
                    strokeWidth={0.6 + r * 0.15}
                    opacity={opacity}
                    transform={`rotate(${angle} 500 500)`}
                  />
                );
              })}
            </g>
          );
        })}

        {/* Inner concentric circles */}
        {ringAngles.map((r) => (
          <circle
            key={`circle-${r}`}
            cx="500"
            cy="500"
            r={60 + r * 26}
            fill="none"
            stroke={
              r % 3 === 0
                ? "rgba(255, 178, 77, 0.4)"
                : r % 3 === 1
                  ? "rgba(108, 58, 166, 0.3)"
                  : "rgba(245, 195, 74, 0.25)"
            }
            strokeWidth={r === 0 ? 1.2 : 0.6}
            strokeDasharray={r % 2 === 0 ? "4 8" : "0"}
          />
        ))}

        {/* Center bindu */}
        <circle cx="500" cy="500" r="18" fill="#ffb24d" opacity="0.9" />
        <circle
          cx="500"
          cy="500"
          r="30"
          fill="none"
          stroke="#ff8a1e"
          strokeWidth="1.2"
          opacity="0.6"
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
