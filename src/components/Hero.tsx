"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { SacredGeometry } from "./SacredGeometry";
import { Countdown } from "./Countdown";
import { LanguageAware } from "./LanguageAware";
import { DailyQuoteWidget } from "./DailyQuoteWidget";
import { RavidassImage } from "./RavidassPortrait";
import { SignatureMark } from "./SignatureMark";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-start justify-center overflow-x-hidden bg-mandala"
    >
      {/* Sacred Geometry — behind everything */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <SacredGeometry />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-6xl px-4 lg:px-8 text-center pt-24 lg:pt-32 pb-20 lg:pb-28"
      >
        {/* Top tag with animated signature mark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 mb-6 rounded-full border border-saffron/30 bg-saffron/5 backdrop-blur-md"
        >
          <SignatureMark size={56} />
          <Sparkles className="h-3.5 w-3.5 text-saffron" />
          <span className="text-xs font-medium tracking-widest uppercase text-saffron-bright">
            <LanguageAware
              en="650th Birth Anniversary · 2027"
              hi="650वीं जन्म जयंती · 2027"
              pa="650ਵੀਂ ਜਨਮ ਜਯੰਤੀ · 2027"
            />
          </span>
        </motion.div>

        {/* Saint portrait — drawn-on-load */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-6 flex justify-center relative z-10"
        >
          <div className="relative">
            {/* Solid backdrop so portrait is always readable */}
            <div className="absolute inset-0 -z-10 rounded-full bg-bg/60 backdrop-blur-sm scale-110" />
            {/* Soft glow behind */}
            <div className="absolute inset-0 -z-20 blur-3xl opacity-50">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-saffron/30 via-gold/20 to-royal/30" />
            </div>
            <RavidassImage
              src="/assets/OIP.webp"
              alt="Sant Ravidas Ji — drawn-on-load portrait"
              size={260}
              revealDuration={2.6}
              className="relative animate-float"
            />
          </div>
        </motion.div>

        {/* Main title */}
        <motion.div style={{ scale }}>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight text-ink drop-shadow-[0_2px_12px_rgba(11,7,16,0.55)]"
          >
            <span className="block text-gradient-saffron">Begampura</span>
            <span className="block text-3xl md:text-5xl lg:text-6xl mt-3 text-ink/95">
              <LanguageAware
                en="The Light of Equality"
                hi="समता का प्रकाश"
                pa="ਸਮਤਾ ਦੀ ਰੋਸ਼ਨੀ"
              />
            </span>
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 text-base md:text-lg lg:text-xl text-ink-soft max-w-3xl mx-auto leading-relaxed"
        >
          <LanguageAware
            en="Celebrating 650 years of Sant Ravidas Ji — the saint who first envisioned a city without sorrow, without fear, without tax on labour. Where every voice is equal and the Name of the Lord resounds."
            hi="संत रविदास जी के 650 वर्ष — वह संत जिसने सबसे पहले निर्दोष नगर का स्वप्न देखा, जहाँ न भय, न श्रम पर कर, और हर आवाज़ समान हो।"
            pa="ਸੰਤ ਰਵਿਦਾਸ ਜੀ ਦੇ 650 ਸਾਲ — ਉਹ ਸੰਤ ਜਿਸਨੇ ਪਹਿਲਾਂ ਦੁੱਖ-ਰਹਿਤ ਸ਼ਹਿਰ ਦਾ ਸੁਫ਼ਨਾ ਦੇਖਿਆ, ਜਿੱਥੇ ਨਾ ਡਰ, ਨਾਂ ਮਿਹਨਤ ਉੱਤੇ ਟੈਕਸ, ਹਰ ਆਵਾਜ਼ ਬਰਾਬਰ।"
          />
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => scrollToSection("begampura")}
            className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-saffron via-saffron-deep to-sindoor text-white font-semibold tracking-wide hover:scale-[1.02] transition-transform shadow-2xl shadow-saffron/30 animate-pulse-saffron"
          >
            <span className="relative z-10">
              <LanguageAware
                en="Explore the Mission"
                hi="मिशन देखें"
                pa="ਮਿਸ਼ਨ ਵੇਖੋ"
              />
            </span>
          </button>
          <button
            onClick={() => scrollToSection("events")}
            className="px-8 py-4 rounded-2xl border-2 border-saffron/30 bg-saffron/5 backdrop-blur-md text-saffron-bright font-semibold tracking-wide hover:bg-saffron/10 hover:border-saffron/60 transition-all"
          >
            <LanguageAware
              en="Register for the 650th"
              hi="650वीं के लिए पंजीकरण"
              pa="650ਵੀਂ ਲਈ ਰਜਿਸਟਰੇਸ਼ਨ"
            />
          </button>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-12 lg:mt-16"
        >
          <Countdown />
          <DailyQuoteWidget />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <button
          onClick={() => scrollToSection("about")}
          className="group flex flex-col items-center gap-2 text-ink-soft/70 hover:text-saffron transition-colors"
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 24 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        const size = 2 + (i % 5);
        const duration = 8 + (i % 6);
        const delay = (i * 0.4) % 6;
        return (
          <motion.div
            key={i}
            initial={{
              x: `${(i * 137) % 100}%`,
              y: "110%",
              opacity: 0,
            }}
            animate={{
              y: "-10%",
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background:
                i % 3 === 0
                  ? "#ffb24d"
                  : i % 3 === 1
                    ? "#f5c34a"
                    : "#ff8a1e",
              boxShadow: `0 0 ${size * 4}px currentColor`,
            }}
          />
        );
      })}
    </div>
  );
}