"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RavidassPortrait } from "@/components/RavidassPortrait";

const ANIMATION_DURATION = 3800; // ms — matches portrait revealDuration

export function LoadingOverlay() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Start fade-out shortly before animation ends
    const fadeTimer = setTimeout(() => setFadingOut(true), ANIMATION_DURATION - 600);
    // Remove from DOM after fade completes
    const removeTimer = setTimeout(() => setVisible(false), ANIMATION_DURATION + 100);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: fadingOut ? 0 : 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg"
        >
          {/* Subtle radial glow behind portrait */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-saffron/15 via-gold/8 to-royal/10 blur-3xl" />
          </div>

          <div className="relative flex flex-col items-center gap-6">
            {/* Portrait draw animation */}
            <RavidassPortrait
              size={200}
              revealDuration={ANIMATION_DURATION / 1000}
              className="relative z-10"
            />

            {/* Brand text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-display text-xl md:text-2xl font-bold text-gradient-saffron tracking-wide">
                Begampura Dialogue
              </h1>
              <p className="text-xs text-ink-soft mt-1 font-medium tracking-wider uppercase">
                650th Janam Jayanti &middot; BRHF
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
