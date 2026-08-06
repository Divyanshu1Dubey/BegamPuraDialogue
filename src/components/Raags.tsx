"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight, BookOpen, Landmark, Sparkles } from "lucide-react";
import { raags, totalShabads, type RaagEntry } from "@/data/raags";
import { LanguageAware } from "./LanguageAware";

export function Raags() {
  const [active, setActive] = useState<RaagEntry | null>(null);
  return (
    <section id="shabads" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-soft to-bg pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 mb-4 rounded-full bg-violet/15 border border-violet/40 text-xs font-medium text-violet uppercase tracking-widest">
            <LanguageAware en="Chapter IV" hi="अध्याय IV" pa="ਅਧਿਆਇ IV" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-saffron leading-tight">
            <LanguageAware
              en="16 Raags · 41 Shabads"
              hi="16 राग · 41 शबद"
              pa="16 ਰਾਗ · 41 ਸ਼ਬਦ"
            />
          </h2>
          <p className="mt-3 text-lg md:text-xl text-saffron/80 font-display italic">
            <LanguageAware
              en="The Musical Architecture of Equality"
              hi="समता का संगीतमय स्वरूप"
              pa="ਸਮਤਾ ਦਾ ਸੰਗੀਤਮਈ ਰੂਪ"
            />
          </p>
          <p className="mt-6 text-base md:text-lg text-ink-soft leading-relaxed">
            <LanguageAware
              en="Bhagat Ravidas Ji's bani is enshrined in 16 different raags of Sri Guru Granth Sahib Ji — from Ang 345 to Ang 1196. Each raag carries a unique emotional hue and a timeless teaching on how a society should be organised. Here are those 16 raags, the dhyapan (essence) of each, and what governance should look like in its spirit."
              hi="भगत रविदास जी की बाणी श्री गुरु ग्रंथ साहिब जी के 16 रागों में अंकित है — अंग 345 से अंग 1196 तक। प्रत्येक राग एक अनूठी भावनात्मक छटा और समाज-व्यवस्था पर एक शाश्वत शिक्षा वहन करता है।"
              pa="ਭਗਤ ਰਵਿਦਾਸ ਜੀ ਦੀ ਬਾਣੀ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੇ 16 ਰਾਗਾਂ ਵਿੱਚ ਅੰਕਿਤ ਹੈ — ਅੰਗ 345 ਤੋਂ 1196 ਤੱਕ।"
            />
          </p>

          {/* Total badge */}
          <div className="inline-flex items-center gap-3 mt-8 px-5 py-2.5 rounded-full bg-gradient-to-r from-saffron/10 to-royal/10 border border-saffron/30">
            <Sparkles className="h-4 w-4 text-saffron" />
            <span className="text-sm text-ink">
              <strong className="text-saffron">{totalShabads}</strong>{" "}
              <LanguageAware en="shabads across" hi="शबद फैले हुए" pa="ਸ਼ਬਦ ਫੈਲੇ ਹੋਏ" />{" "}
              <strong className="text-saffron">{raags.length}</strong>{" "}
              <LanguageAware en="raags" hi="रागों में" pa="ਰਾਗਾਂ ਵਿੱਚ" />
            </span>
          </div>
        </motion.div>

        {/* Raag grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {raags.map((raag, i) => (
            <motion.button
              key={raag.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => setActive(raag)}
              className={`group relative text-left rounded-2xl p-5 bg-gradient-to-br ${raag.color} bg-opacity-5 hover:scale-[1.05] transition-all duration-300 border border-white/10 overflow-hidden`}
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-saffron/0 via-saffron/5 to-saffron/0 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative flex items-start justify-between mb-3">
                <span className="text-3xl">{raag.emoji}</span>
                <span className="text-xs uppercase tracking-widest text-ink-soft/60">
                  Ang {raag.ang}
                </span>
              </div>

              <h3 className="relative font-display text-2xl font-bold text-white leading-tight">
                Raag {raag.name}
              </h3>
              <p className="relative text-xs text-ink/70 mt-1 line-clamp-2 italic">
                {raag.symbolism}
              </p>

              <div className="relative mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-ink-soft">
                  {raag.shabadsCount}{" "}
                  <LanguageAware en="shabad" hi="शबद" pa="ਸ਼ਬਦ" />
                  {raag.shabadsCount > 1 ? "s" : ""}
                </span>
                <ChevronRight className="h-4 w-4 text-saffron group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Detail modal */}
        <AnimatePresence>
          {active && <RaagDetail raag={active} onClose={() => setActive(null)} />}
        </AnimatePresence>
      </div>
    </section>
  );
}

function RaagDetail({ raag, onClose }: { raag: RaagEntry; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative max-w-3xl w-full max-h-[90vh] overflow-auto rounded-3xl bg-bg-soft border border-saffron/30 shadow-2xl shadow-saffron/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`relative bg-gradient-to-br ${raag.color} p-8 overflow-hidden`}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative flex items-center gap-4">
            <span className="text-6xl">{raag.emoji}</span>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/70">
                Raag · Sri Guru Granth Sahib Ji · Ang {raag.ang}
              </p>
              <h3 className="font-display text-4xl font-bold text-white">{raag.name}</h3>
              <p className="text-sm text-white/80 mt-1">{raag.symbolism}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors flex items-center justify-center"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* Dhyapan */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-saffron" />
              <span className="text-xs uppercase tracking-widest text-saffron font-medium">
                Dhyapan · Teaching Essence
              </span>
            </div>
            <p className="text-base md:text-lg text-ink leading-relaxed italic border-l-2 border-saffron/40 pl-4">
              {raag.dhyapan}
            </p>
            <p className="text-sm text-ink-soft/60 mt-2 italic">{raag.dhyapanHindi}</p>
          </div>

          {/* Shabad opening */}
          {raag.shabadOpening && (
            <div className="p-4 rounded-2xl bg-saffron/5 border border-saffron/20">
              <p className="text-xs uppercase tracking-widest text-saffron mb-1">
                Shabad Opening
              </p>
              <p className="font-display text-lg text-saffron italic">
                "{raag.shabadOpening}"
              </p>
            </div>
          )}

          {/* Governance principle */}
          <div className="rounded-2xl p-6 bg-gradient-to-br from-royal/10 to-violet/5 border border-violet/30">
            <div className="flex items-center gap-2 mb-3">
              <Landmark className="h-4 w-4 text-violet" />
              <span className="text-xs uppercase tracking-widest text-violet font-medium">
                What governance should look like
              </span>
            </div>
            <p className="text-base text-ink leading-relaxed">
              {raag.governancePrinciple}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 pt-4 border-t border-border">
            <div>
              <p className="text-3xl font-display font-bold text-saffron">{raag.shabadsCount}</p>
              <p className="text-xs uppercase tracking-widest text-ink-soft">
                <LanguageAware en="Shabads" hi="शबद" pa="ਸ਼ਬਦ" />
              </p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <p className="text-3xl font-display font-bold text-saffron">{raag.ang}</p>
              <p className="text-xs uppercase tracking-widest text-ink-soft">
                <LanguageAware en="Ang (Page)" hi="अंग" pa="ਅੰਗ" />
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}