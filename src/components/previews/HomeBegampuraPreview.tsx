"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Quote, Scale, Heart, Users } from "lucide-react";
import { LanguageAware } from "../LanguageAware";
import { guru } from "@/data/guru";

const begampuraEntry = guru.philosophy.find(p => p.title.startsWith("Begampura"));

export function HomeBegampuraPreview() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="relative py-20 md:py-24 overflow-hidden"
    >
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 mb-3 rounded-full bg-saffron/10 border border-saffron/30 text-[11px] font-medium text-saffron uppercase tracking-widest">
          <LanguageAware en="Chapter III" hi="अध्याय III" pa="ਅਧਿਆਇ III" />
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient-saffron leading-tight">
          <LanguageAware en="Begampura" hi="बेगमपुरा" pa="ਬੇਗਮਪੁਰਾ" />{" "}
          <span className="text-lg md:text-xl text-saffron/80 italic font-display">
            <LanguageAware en="— The City Without Sorrow" hi="— दुःख रहित नगर" pa="— ਦੁੱਖ-ਰਹਿਤ ਨਗਰ" />
          </span>
        </h2>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed max-w-2xl mx-auto">
          <LanguageAware
            en="Five hundred years before modern constitutions, one saint wrote the world's first charter of a truly egalitarian society."
            hi="आधुनिक संविधानों से पाँच सदी पहले — एक संत ने समतावादी समाज की दुनिया की पहली समझौता लिखी।"
            pa="ਆਧੁਨਿਕ ਸੰਵਿਧਾਨਾਂ ਤੋਂ ਪੰਜ ਸਦੀਆਂ ਪਹਿਲਾਂ — ਇੱਕ ਸੰਤ ਨੇ ਸਮਾਨਤਾਵਾਦੀ ਸਮਾਜ ਦੀ ਚਾਰਟਰ ਲਿਖੀ।"
          />
        </p>

        {/* Shabad quote */}
        {begampuraEntry?.shabadOpening && (
          <div className="mt-5 relative rounded-2xl p-6 bg-linear-to-br from-saffron/8 via-royal/5 to-saffron/5 border border-saffron/20 max-w-2xl mx-auto">
            <Quote className="h-8 w-8 text-saffron/25 absolute top-4 right-6" />
            <p className="font-display text-base md:text-lg text-saffron italic leading-relaxed">
              &ldquo;{begampuraEntry.shabadOpening}&rdquo;
            </p>
            <p className="text-xs text-ink-soft/50 mt-2 italic line-clamp-2">
              {begampuraEntry.descriptionHindi}
            </p>
            <p className="text-[11px] text-ink-soft/60 mt-3">
              Sri Guru Granth Sahib Ji · Ang 345 · Raag Gaur
            </p>
          </div>
        )}

        {/* Governance pillars — first 3 */}
        <div className="grid md:grid-cols-3 gap-4 mt-5 max-w-4xl mx-auto">
          {[
            { icon: Scale, title: "Equality for All", titleHi: "सभी के लिए समानता" },
            { icon: Heart, title: "Dignity of Labour", titleHi: "श्रम की गरिमा" },
            { icon: Users, title: "No Caste, No Fear", titleHi: "नो जाति, नो भय" },
          ].map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-2xl card-glass"
              >
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-saffron/20 to-royal/20 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-saffron" />
                </div>
                <div>
                  <p className="text-sm font-bold text-ink">{pillar.title}</p>
                  <p className="text-[11px] text-saffron/60">{pillar.titleHi}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Browse Full CTA */}
        <div className="text-center mt-10">
          <Link
            href="/begampura"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-linear-to-r from-saffron to-saffron-deep text-white font-bold text-sm shadow-xl shadow-saffron/20 hover:opacity-90 transition-opacity"
          >
            <LanguageAware en="Browse Full Begampura" hi="पूरी बेगमपुरा देखें" pa="ਪੂਰੀ ਬੇਗਮਪੁਰਾ ਵੇਖੋ" />
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
