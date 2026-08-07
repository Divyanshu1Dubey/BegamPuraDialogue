"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight, BookOpen, Scale, Heart, Shield } from "lucide-react";
import { raags } from "@/data/raags";
import { LanguageAware } from "@/components/LanguageAware";

export default function TeachingsPage() {
  const [search, setSearch] = useState("");

  const filteredRaags = raags.filter((r) => {
    return (
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.dhyapan.toLowerCase().includes(search.toLowerCase()) ||
      r.governancePrinciple.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-bg text-ink pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-saffron/10 border border-saffron/30 text-xs font-semibold text-saffron uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            <LanguageAware en="Devotional & Civic Philosophy" hi="भक्ति एवं नागरिक दर्शन" pa="ਭਗਤੀ ਅਤੇ ਨਾਗਰਿਕ ਦਰਸ਼ਨ" />
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-gradient-saffron leading-tight">
            <LanguageAware
              en="Teachings across 16 Raags"
              hi="16 रागों के उपदेश"
              pa="16 ਰਾਗਾਂ ਦੇ ਉਪਦੇਸ਼"
            />
          </h1>
          <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed font-medium">
            <LanguageAware
              en="Each composition in Sri Guru Granth Sahib Ji provides a spiritual blueprint (Dhyapan) and a contemporary principle for governance and human equality."
              hi="श्री गुरु ग्रंथ साहब जी में प्रत्येक रचना आध्यात्मिक सिद्धांत (ध्यापन) और शासन के लिए एक समकालीन सिद्धांत प्रदान करती है।"
              pa="ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਵਿੱਚ ਹਰੇਕ ਰਚਨਾ ਇੱਕ ਆਧਿਆਤਮਿਕ ਸਿਧਾਂਤ ਅਤੇ ਸ਼ਾਸਨ ਲਈ ਸਮਕਾਲੀ ਸਿਧਾਂਤ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ।"
            />
          </p>
        </motion.div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-saffron" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by teaching, raag name, or governance..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface border border-border text-sm text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-saffron/50"
            />
          </div>
        </div>

        {/* Raags Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRaags.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative flex flex-col justify-between p-6 rounded-3xl card-glass card-saffron-glow hover:scale-[1.02] transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-3xl">{r.emoji}</span>
                  <span className="px-2.5 py-1 rounded-full bg-saffron/15 text-[11px] font-bold text-saffron uppercase">
                    Ang {r.ang} · {r.shabadsCount} Shabads
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-ink group-hover:text-saffron transition-colors mb-2">
                  Raag {r.name}
                </h3>
                <p className="text-xs text-saffron font-bold uppercase tracking-wider mb-4">
                  {r.symbolism}
                </p>

                <div className="p-4 rounded-2xl bg-surface-2/60 border border-border/50 mb-4">
                  <span className="text-[10px] uppercase font-bold text-ink-soft tracking-wider block mb-1">
                    Core Teaching (Dhyapan)
                  </span>
                  <p className="text-xs text-ink font-medium leading-relaxed">
                    {r.dhyapan}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-saffron/10 border border-saffron/30 mb-4">
                  <span className="text-[10px] uppercase font-bold text-saffron-deep dark:text-saffron tracking-wider block mb-1 flex items-center gap-1">
                    <Scale className="h-3 w-3" /> Civic Governance Principle
                  </span>
                  <p className="text-xs text-ink font-medium leading-relaxed">
                    {r.governancePrinciple}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                <span className="text-xs text-ink-soft font-medium">Sri Guru Granth Sahib Ji</span>
                <Link
                  href={`/teachings/${r.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron hover:gap-2 transition-all"
                >
                  <LanguageAware en="Explore Teaching" hi="उपदेश पढ़ें" pa="ਉਪਦੇਸ਼ ਪੜ੍ਹੋ" />
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
