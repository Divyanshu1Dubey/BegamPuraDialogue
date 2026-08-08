"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";
import { SacredGeometry } from "./SacredGeometry";
import { Countdown } from "./Countdown";
import { LanguageAware } from "./LanguageAware";
import { DailyQuoteWidget } from "./DailyQuoteWidget";
import { RavidassImage } from "./RavidassPortrait";
import { SignatureMark } from "./SignatureMark";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-start justify-center overflow-x-hidden bg-mandala"
    >
      {/* Sacred Geometry — behind everything */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <SacredGeometry />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      <div
        className="relative z-10 mx-auto max-w-6xl px-4 lg:px-8 text-center pt-24 lg:pt-32 pb-20 lg:pb-28"
      >
        {/* Top tag with animated signature mark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 mb-6 rounded-full border border-saffron/30 bg-saffron/10 backdrop-blur-sm"
        >
          <SignatureMark size={56} />
          <Sparkles className="h-3.5 w-3.5 text-saffron" />
          <span className="text-xs font-semibold tracking-widest uppercase text-saffron-deep dark:text-saffron-bright">
            <LanguageAware
              en="650th Birth Anniversary · 2027"
              hi="650वीं जन्म जयंती · 2027"
              pa="650ਵੀਂ ਜਨਮ ਜਯੰਤੀ · 2027"
            />
          </span>
        </motion.div>

        {/* Saint portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-6 flex justify-center relative z-10"
        >
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-full bg-bg/70 backdrop-blur-sm scale-110" />
            <div className="absolute inset-0 -z-20 blur-2xl opacity-40">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-saffron/40 via-gold/20 to-royal/30" />
            </div>
            <RavidassImage
              src="/assets/OIP.webp"
              alt="Sant Ravidas Ji — portrait"
              size={240}
              revealDuration={2}
              className="relative animate-float"
            />
          </div>
        </motion.div>

        {/* Main title */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight text-ink"
          >
            <span className="block text-gradient-saffron">Begampura</span>
            <span className="block text-3xl md:text-5xl lg:text-6xl mt-3 text-ink">
              <LanguageAware
                en="The Light of Equality"
                hi="समता का प्रकाश"
                pa="ਸਮਤਾ ਦੀ ਰੋਸ਼ਨੀ"
              />
            </span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-base md:text-lg lg:text-xl text-ink-soft max-w-3xl mx-auto leading-relaxed font-medium"
        >
          <LanguageAware
            en="Celebrating 650 years of Sant Ravidas Ji — the saint who first envisioned a city without sorrow, without fear, without tax on labour. Where every voice is equal and the Name of the Lord resounds."
            hi="संत रविदास जी के 650 वर्ष — वह संत जिसने सबसे पहले निर्दोष नगर का स्वप्न देखा, जहाँ न भय, न श्रम पर कर, और हर आवाज़ समान हो।"
            pa="ਸੰਤ ਰਵਿਦਾਸ ਜੀ ਦੇ 650 ਸਾਲ — ਉਹ ਸੰਤ ਜਿਸਨੇ ਪਹਿਲਾਂ ਦੁੱਖ-ਰਹਿਤ ਸ਼ਹਿਰ ਦਾ ਸੁਫ਼ਨਾ ਦੇਖਿਆ, ਜਿੱਥੇ ਨਾ ਡਰ, ਨਾਂ ਮਿਹਨਤ ਉੱਤੇ ਟੈਕਸ, ਹਰ ਆਵਾਜ਼ ਬਰਾਬਰ।"
          />
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/begampura"
            className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-saffron via-saffron-deep to-sindoor text-white font-semibold tracking-wide hover:scale-[1.02] transition-transform shadow-xl shadow-saffron/20 animate-pulse-saffron inline-flex items-center justify-center"
          >
            <span className="relative z-10">
              <LanguageAware
                en="Explore the Mission"
                hi="मिशन देखें"
                pa="ਮਿਸ਼ਨ ਵੇਖੋ"
              />
            </span>
          </Link>
          <Link
            href="/events"
            className="px-8 py-4 rounded-2xl border-2 border-saffron/40 bg-saffron/10 backdrop-blur-sm text-ink hover:text-saffron-deep dark:text-saffron-bright font-semibold tracking-wide hover:bg-saffron/20 hover:border-saffron transition-all inline-flex items-center justify-center"
          >
            <LanguageAware
              en="Register for the 650th"
              hi="650वीं के लिए पंजीकरण"
              pa="650ਵੀਂ ਲਈ ਰਜਿਸਟਰੇਸ਼ਨ"
            />
          </Link>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 lg:mt-16"
        >
          <Countdown />
          <DailyQuoteWidget />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <Link
          href="/about"
          className="group flex flex-col items-center gap-2 text-ink-soft hover:text-saffron transition-colors"
          aria-label="Learn about Sant Ravidas Ji"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">Explore</span>
            <ChevronDown className="h-4 w-4 text-saffron" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 12 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        const size = 3 + (i % 4);
        const duration = 10 + (i % 6);
        const delay = (i * 0.8) % 6;
        return (
          <motion.div
            key={i}
            initial={{
              x: `${(i * 145) % 100}%`,
              y: "105%",
              opacity: 0,
            }}
            animate={{
              y: "-5%",
              opacity: [0, 0.5, 0.5, 0],
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
            }}
          />
        );
      })}
    </div>
  );
}