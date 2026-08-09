"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Sparkles } from "lucide-react";
import { raags, totalShabads } from "@/data/raags";
import { LanguageAware } from "../LanguageAware";

export function HomeRaagsPreview() {
  const previewRaags = raags.slice(0, 6);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="relative py-20 md:py-24 overflow-hidden"
    >
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 mb-3 rounded-full bg-violet/15 border border-violet/40 text-[11px] font-medium text-violet uppercase tracking-widest">
          <LanguageAware en="Chapter IV" hi="अध्याय IV" pa="ਅਧਿਆਇ IV" />
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient-saffron leading-tight">
          <LanguageAware en="27 Raags · 40 Shabads" hi="27 राग · 40 शब्द" pa="27 ਰਾਗ · 40 ਸ਼ਬਦ" />
        </h2>
        <p className="text-sm text-saffron/80 font-display italic mt-1">
          <LanguageAware en="The Musical Architecture of Equality" hi="समतावाद का संगीतमयी रूप" pa="ਸਮਤਾ ਦਾ ਸੰਗੀਤਮਈ ਰੂਪ" />
        </p>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed max-w-2xl mx-auto">
          <LanguageAware
            en="Satguru Ravidas Ji's bani is enshrined in 27 different raags of Sri Guru Granth Sahib Ji — each carrying a unique emotional hue."
            hi="सतगुरू रविदास जी की बाणी श्री गुरू ग्रंथ साहिब जी के 27 रागों में अंकित है — एक-एक राग अद्वितीय भावना रंग लिए हुए है।"
            pa="ਸਤਗੁਰੂ ਰਵਿਦਾਸ ਜੀ ਦੀ ਬਾਣੀ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੇ 27 ਰਾਗਾਂ ਵਿੱਚ ਅੰਕਿਤ ਹੈ।"
          />
        </p>
      </div>

      {/* Raag grid — 6 preview items */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl mx-auto">
        {previewRaags.map((raag, i) => (
          <motion.div
            key={raag.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className={`rounded-2xl p-4 bg-linear-to-br ${raag.color} bg-opacity-5 border border-white/10`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{raag.emoji}</span>
              <span className="text-[10px] uppercase tracking-widest text-ink-soft/50">Ang {raag.ang}</span>
            </div>
            <h3 className="font-display text-sm font-bold text-white">Raag {raag.name}</h3>
            <p className="text-[11px] text-ink/60 mt-0.5 line-clamp-1">{raag.symbolism}</p>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
              <span className="text-[11px] text-ink-soft">{raag.shabadsCount} shabads</span>
              <span className="text-[10px] text-saffron/70">Explore →</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Total badge */}
      <div className="flex justify-center mt-5">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-saffron/10 to-royal/10 border border-saffron/30">
          <Sparkles className="h-3.5 w-3.5 text-saffron" />
          <span className="text-xs text-ink">
            <strong className="text-saffron">{totalShabads}</strong>{" "}
            <LanguageAware en="shabads across" hi="शब्द फैले हुए" pa="ਸ਼ਬਦ ਫੈਲੇ ਹੋਏ" />{" "}
            <strong className="text-saffron">{raags.length}</strong>{" "}
            <LanguageAware en="raags" hi="रागों में" pa="ਰਾਗਾਂ ਵਿੱਚ" />
          </span>
        </div>
      </div>

      {/* Browse Full CTA */}
      <div className="text-center mt-10">
        <Link
          href="/shabads"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-linear-to-r from-violet to-violet-deep text-white font-bold text-sm shadow-xl shadow-violet/20 hover:opacity-90 transition-opacity"
        >
          <LanguageAware en="Browse Full Raags" hi="पूरे राग देखें" pa="ਪੂਰੇ ਰਾਗ ਵੇਖੋ" />
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.section>
  );
}
