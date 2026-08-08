"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Lightbulb, Hammer, UsersRound } from "lucide-react";
import { LanguageAware } from "../LanguageAware";
import { guru } from "@/data/guru";

export function HomeTeachingsPreview() {
  const teachings = guru.philosophy.slice(0, 3);
  const icons = [Lightbulb, Hammer, UsersRound];

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
          <LanguageAware en="Chapter II" hi="अध्याय II" pa="ਅਧਿਆਇ II" />
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient-saffron leading-tight">
          <LanguageAware
            en="Teachings That Changed the World"
            hi="दुनिया बदलने वाली शिक्षाएँ"
            pa="ਦੁਨੀਆਂ ਬਦਲਣ ਵਾਲੀਆਂ ਸਿੱਖਿਆਵਾਂ"
          />
        </h2>
        <p className="text-sm text-saffron/80 font-display italic mt-1">
          <LanguageAware en="Wisdom That Transcends Time" hi="समय से परे ज्ञान" pa="ਸਮੇਂ ਤੋਂ ਪਾਰ ਗਿਆਨ" />
        </p>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed max-w-2xl mx-auto">
          <LanguageAware
            en="Six pillars of the Begampura vision — teachings so powerful that centuries later they form the bedrock of modern democratic constitutions."
            hi="बेगमपुरा दृष्टिकोण के छह स्तंभ — इतनी शक्तिशाली शिक्षाएँ कि सदियों बाद वे लोकतांत्रिक संविधानों की आधारशिला बन गईं।"
            pa="ਬੇਗਮਪੁਰਾ ਦਰਸ਼ਨ ਦੇ ਛਹ ਥੰਮ੍ਹਾਂ — ਇਤਨੇ ਸ਼ਕਤੀਸ਼ਾਲੀ ਸਿੱਖਿਆਵਾਂ ਕਿ ਸਦੀਆਂ ਬਾਅਦ ਉਹ ਲੋਕਤੰਤਰੀ ਸੰਵਿਧਾਨਾਂ ਦੀ ਨੀਂਹ ਬਣਦੇ।"
          />
        </p>
      </div>

      {/* Teaching preview cards */}
      <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {teachings.map((teaching, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={teaching.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl p-5 card-glass card-saffron-glow"
            >
              {Icon && (
                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-saffron/20 to-royal/20 flex items-center justify-center mb-3">
                  <Icon className="h-4 w-4 text-saffron" />
                </div>
              )}
              <h3 className="font-display text-base font-bold text-ink">{teaching.title}</h3>
              <p className="text-xs text-saffron/60 mt-0.5">{teaching.titleHindi}</p>
              <blockquote className="text-xs text-saffron/80 italic mt-2 border-l-2 border-saffron/30 pl-2.5 line-clamp-2">
                &ldquo;{teaching.shabadOpening}&rdquo;
              </blockquote>
              <p className="text-xs text-ink-soft mt-2 line-clamp-2">{teaching.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Browse Full CTA */}
      <div className="text-center mt-10">
        <Link
          href="/teachings"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-linear-to-r from-violet to-violet-deep text-white font-bold text-sm shadow-xl shadow-violet/20 hover:opacity-90 transition-opacity"
        >
          <LanguageAware en="Browse Full Teachings" hi="पूरी शिक्षाएँ देखें" pa="ਪੂਰੀ ਸਿਖਲਾਈਆਂ ਵੇਖੋ" />
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.section>
  );
}
