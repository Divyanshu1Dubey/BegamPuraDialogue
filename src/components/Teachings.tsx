"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lightbulb, Hammer, UsersRound, Scale, HeartHandshake, Baby } from "lucide-react";
import { guru } from "@/data/guru";
import { LanguageAware } from "./LanguageAware";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Begampura: Lightbulb,
  Kirat: Hammer,
  AntiCaste: UsersRound,
  EkNoor: Scale,
  Woman: HeartHandshake,
  Sabhal: Baby,
};

export function Teachings() {
  return (
    <section id="teachings" className="relative py-32 overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-soft to-bg pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-saffron/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 mb-4 rounded-full bg-saffron/10 border border-saffron/30 text-xs font-medium text-saffron uppercase tracking-widest">
            <LanguageAware en="Chapter II" hi="अध्याय II" pa="ਅਧਿਆਇ II" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-saffron leading-tight">
            <LanguageAware
              en="Teachings That Changed the World"
              hi="दुनिया बदलने वाली शिक्षाएँ"
              pa="ਦੁਨੀਆਂ ਬਦਲਣ ਵਾਲੀਆਂ ਸਿੱਖਿਆਵਾਂ"
            />
          </h2>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed">
            <LanguageAware
              en="Six pillars of the Begampura vision — teachings so powerful that centuries later they form the bedrock of modern democratic constitutions, social justice movements, and inclusive nation-building."
              hi="बेगमपुरा दृष्टिकोण के छह स्तंभ — इतनी शक्तिशाली शिक्षाएँ कि सदियों बाद वे आधुनिक लोकतांत्रिक संविधानों, सामाजिक न्याय आंदोलनों और समावेशी राष्ट्र-निर्माण की आधारशिला बन गईं।"
              pa="ਬੇਗਮਪੁਰਾ ਦਰਸ਼ਨ ਦੇ ਛਹ ਥੰਮ੍ਹਾਂ — ਇਤਨੇ ਸ਼ਕਤੀਸ਼ਾਲੀ ਸਿੱਖਿਆਵਾਂ ਕਿ ਸਦੀਆਂ ਬਾਅਦ ਉਹ ਆਧੁਨਿਕ ਲੋਕਤੰਤਰੀ ਸੰਵਿਧਾਨਾਂ ਦੀ ਨੀਂਹ ਬਣਦੇ।"
            />
          </p>
        </motion.div>

        {/* Teaching cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guru.philosophy.map((teaching, i) => {
            const Icon = iconMap[i] || Lightbulb;
            return (
              <motion.div
                key={teaching.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="group rounded-3xl p-7 card-glass card-saffron-glow hover:scale-[1.02] transition-all duration-500 flex flex-col h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-saffron/20 to-royal/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5 text-saffron" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink leading-tight">
                      {teaching.title}
                    </h3>
                    <p className="text-[10px] uppercase tracking-widest text-saffron/70 mt-0.5">
                      {teaching.titleHindi}
                    </p>
                  </div>
                </div>

                <blockquote className="text-sm font-medium text-saffron/90 italic mb-3 border-l-2 border-saffron/40 pl-3">
                  &ldquo;{teaching.shabadOpening}&rdquo;
                </blockquote>

                <p className="text-sm text-ink-soft leading-relaxed flex-1 mb-3">
                  {teaching.description}
                </p>

                <p className="text-xs text-ink-soft/50 italic mb-4">
                  {teaching.descriptionHindi}
                </p>

                <div className="mt-auto p-3 rounded-xl bg-saffron/5 border border-saffron/15">
                  <p className="text-[10px] uppercase tracking-widest text-saffron mb-1.5">
                    <LanguageAware en="Modern Relevance" hi="आधुनिक प्रासंगिकता" pa="ਆਧੁਨਿਕ ਪ੍ਰਸੰਗਿਕਤਾ" />
                  </p>
                  <p className="text-xs text-ink leading-relaxed">{teaching.modernRelevance}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Miracles strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 rounded-3xl p-8 md:p-12 card-glass card-saffron-glow"
        >
          <div className="text-center mb-10">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-gradient-saffron">
              <LanguageAware
                en="Divine Encounters & Miracles"
                hi="दिव्य मिलन और चमत्कार"
                pa="ਦਿਵਯ ਮਿਲਣ ਅਤੇ ਚਮਤਕਾਰ"
              />
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {guru.miracles.map((miracle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-2xl bg-surface/30 hover:bg-surface/70 transition-colors border border-border/40"
              >
                <span className="text-saffron mt-0.5 text-lg">✦</span>
                <p className="text-sm text-ink-soft leading-relaxed font-medium">{miracle}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/teachings"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-saffron to-saffron-deep text-white font-bold text-sm shadow-xl shadow-saffron/20 hover:opacity-90 transition-opacity"
            >
              <LanguageAware en="Explore All 16 Raags & Philosophy" hi="सभी 16 राग और दर्शन देखें" pa="ਸਾਰੇ 16 ਰਾਗ ਅਤੇ ਦਰਸ਼ਨ ਵੇਖੋ" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}