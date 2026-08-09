"use client";

import { motion } from "framer-motion";
import { Quote, BookOpen, Music2 } from "lucide-react";
import { getTodayQuote } from "@/data/quotes";
import { LanguageAware } from "./LanguageAware";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

export function DailyQuoteWidget() {
  const quote = getTodayQuote();
  const { language } = useLanguage();
  const raagLabel = t.raag[language] || t.raag.en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
      className="mt-8 lg:mt-10"
    >
      <div className="relative rounded-[1.75rem] p-7 md:p-10 overflow-hidden
        bg-linear-to-br from-saffron/10 via-royal/8 to-saffron/5
        border border-saffron/25 card-glass card-saffron-glow">

        {/* Decorative corner ornament */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="80" cy="20" r="60" fill="none" stroke="#ff8a1e" strokeWidth="0.5" />
            <circle cx="80" cy="20" r="40" fill="none" stroke="#f5c34a" strokeWidth="0.3" />
            <circle cx="80" cy="20" r="20" fill="none" stroke="#ff8a1e" strokeWidth="0.2" />
          </svg>
        </div>

        {/* Header badge */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/25">
            <BookOpen className="h-3 w-3 text-gold" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
              <LanguageAware
                en="Daily Shabad"
                hi="आज का शबद"
                pa="ਅੱਜ ਦਾ ਸ਼ਬਦ"
              />
            </span>
          </div>
          {quote.raag && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-royal/20 border border-violet/40">
              <Music2 className="h-3 w-3 text-violet" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-violet">
                {raagLabel} {quote.raag}
              </span>
            </div>
          )}
        </div>

        {/* Quote text */}
        <div className="relative pl-1">
          <Quote className="absolute -top-1 -left-2 h-8 w-8 text-saffron/20" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-display text-lg md:text-xl lg:text-2xl text-ink leading-relaxed italic"
          >
            &ldquo;{quote.text}&rdquo;
          </motion.p>

          {quote.textHindi && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-3 text-sm md:text-base text-saffron/70 leading-relaxed"
            >
              &ldquo;{quote.textHindi}&rdquo;
            </motion.p>
          )}

          {quote.textPunjabi && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-1 text-sm md:text-base text-ink-soft/50 leading-relaxed"
            >
              {quote.textPunjabi}
            </motion.p>
          )}
        </div>

        {/* Source attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-6 flex items-center gap-3 pl-4"
        >
          <div className="h-px flex-1 bg-linear-to-r from-saffron/40 to-transparent" />
          <span className="text-[11px] text-ink-soft/60 tracking-wide font-medium">
            {quote.source}
          </span>
          <div className="h-px flex-1 bg-linear-to-l from-saffron/40 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
}
