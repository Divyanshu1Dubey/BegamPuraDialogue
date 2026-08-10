"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PARTICLE_RADII = [160,170,175,185,190,195,180,200,165,188,192,178];
const ANIMATION_DURATION = 4500; // ms total loading animation

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function LoadingOverlay() {
  const isMounted = useIsMounted();
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadingOut(true), ANIMATION_DURATION - 700);
    const removeTimer = setTimeout(() => setVisible(false), ANIMATION_DURATION + 100);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isMounted || !visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: fadingOut ? 0 : 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg"
        >
          {/* ── Background glow layers ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Large radial glow */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(245,166,35,0.18) 0%, rgba(245,166,35,0.06) 40%, transparent 70%)",
              }}
            />
            {/* Secondary royal glow */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2.4, delay: 0.3, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)",
              }}
            />
            {/* Floating particles */}
            {[...Array(12)].map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const radius = PARTICLE_RADII[i];
              const x = Math.round(Math.cos(angle) * radius);
              const y = Math.round(Math.sin(angle) * radius);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0.6, 0],
                    scale: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: 0.5 + i * 0.15,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                  }}
                  className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-saffron"
                  style={{
                    marginLeft: x,
                    marginTop: y,
                    boxShadow: "0 0 6px 2px rgba(245,166,35,0.4)",
                  }}
                />
              );
            })}
          </div>

          {/* ── Portrait container ── */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Rotating mandala ring */}
            <div className="relative" style={{ width: 240, height: 240 }}>
              {/* Outer spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <svg viewBox="0 0 240 240" className="w-full h-full">
                  <circle
                    cx="120" cy="120" r="110"
                    fill="none"
                    stroke="url(#goldGrad)"
                    strokeWidth="0.8"
                    strokeDasharray="8 6"
                    opacity="0.6"
                  />
                  <circle
                    cx="120" cy="120" r="100"
                    fill="none"
                    stroke="url(#saffronGrad)"
                    strokeWidth="0.5"
                    strokeDasharray="3 8"
                    opacity="0.4"
                  />
                  {/* Decorative dots on ring */}
                  {[...Array(8)].map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    const x = 120 + Math.cos(angle) * 110;
                    const y = 120 + Math.sin(angle) * 110;
                    return (
                      <circle
                        key={i}
                        cx={x} cy={y} r="2"
                        fill="#f5a623"
                        opacity="0.5"
                      />
                    );
                  })}
                  <defs>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f5a623" />
                      <stop offset="50%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f5a623" />
                    </linearGradient>
                    <linearGradient id="saffronGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#e88b1a" />
                      <stop offset="100%" stopColor="#f5a623" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Counter-rotating inner ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
                style={{ inset: 12 }}
              >
                <svg viewBox="0 0 216 216" className="w-full h-full">
                  <circle
                    cx="108" cy="108" r="96"
                    fill="none"
                    stroke="url(#saffronGrad)"
                    strokeWidth="0.6"
                    strokeDasharray="12 4"
                    opacity="0.35"
                  />
                  {[...Array(6)].map((_, i) => {
                    const angle = (i / 6) * Math.PI * 2;
                    const x = 108 + Math.cos(angle) * 96;
                    const y = 108 + Math.sin(angle) * 96;
                    return (
                      <circle
                        key={i}
                        cx={x} cy={y} r="1.5"
                        fill="#f5a623"
                        opacity="0.4"
                      />
                    );
                  })}
                </svg>
              </motion.div>

              {/* Pulsing halo behind image */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  className="rounded-full"
                  style={{
                    width: 160,
                    height: 160,
                    background:
                      "radial-gradient(circle, rgba(245,166,35,0.25) 0%, transparent 70%)",
                    filter: "blur(12px)",
                  }}
                />
              </motion.div>

              {/* Image with circular clip + scale reveal */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  className="rounded-full overflow-hidden shadow-2xl"
                  style={{
                    width: 150,
                    height: 150,
                    border: "2px solid rgba(245,166,35,0.5)",
                    boxShadow:
                      "0 0 30px rgba(245,166,35,0.2), 0 0 60px rgba(245,166,35,0.1), 0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  <img
                    src="/assets/Shri-Guru-Ravidas-Ji-Image-Pictures-Download.jpg"
                    alt="Sant Ravidas Ji"
                    className="w-full h-full object-cover"
                    style={{ imageRendering: "auto" }}
                  />
                </div>
              </motion.div>

              {/* Golden border ring (static) */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: 12,
                  border: "1px solid rgba(245,166,35,0.25)",
                }}
              />
            </div>

            {/* ── Brand text ── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-center"
            >
              <h1 className="font-display text-2xl md:text-3xl font-bold tracking-wide"
                  style={{
                    background: "linear-gradient(135deg, #f5a623, #fbbf24, #e88b1a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                Be-gumpura Dialogue
              </h1>
              <p className="text-xs text-ink-soft mt-2 font-medium tracking-[0.25em] uppercase">
                650th Janam Jayanti &middot; BRHF
              </p>
              {/* Decorative divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                className="mt-4 mx-auto w-24 h-px"
                style={{
                  background: "linear-gradient(to right, transparent, #f5a623, transparent)",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
