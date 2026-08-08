"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Calendar, Users, Globe, BookOpen, Sparkles, Heart } from "lucide-react";
import { LanguageAware } from "../LanguageAware";

const stats = [
  { value: "126", label: "Years Lived", icon: Calendar },
  { value: "94,000", label: "Satsangs Given", icon: Users },
  { value: "40,000", label: "Km Travelled", icon: Globe },
  { value: "126", label: "Shabads", icon: BookOpen },
  { value: "16", label: "Raags", icon: Sparkles },
  { value: "216", label: "Shlokas", icon: Heart },
];

export function HomeAboutPreview() {
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
          <LanguageAware en="Chapter I" hi="अध्याय I" pa="ਅਧਿਆਇ I" />
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient-saffron leading-tight">
          <LanguageAware
            en="The Saint of Begampura"
            hi="बेगमपुरा के संत"
            pa="ਬੇਗਮਪੁਰਾ ਦੇ ਸੰਤ"
          />
        </h2>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed max-w-2xl mx-auto">
          <LanguageAware
            en="Born into a leather-worker's family on the banks of the Ganges, Sant Ravidas Ji rose to become one of history's most radiant saints — the first to articulate a casteless society and the equal dignity of all labour."
            hi="गंगा के तट पर चमड़ी के परिवार में जन्मे संत रविदास जी इतिहास के सबसे प्रकाशमान संतों में से एक बने।"
            pa="ਗੰਗਾ ਦੇ ਕੰਢੇ ਚਮੜੇ ਦੇ ਪਰਿਵਾਰ ਵਿੱਚ ਜੰਮੇ ਸੰਤ ਰਵਿਦਾਸ ਜੀ ਇਤਿਹਾਸ ਦੇ ਸਭ ਤੋਂ ਰੌਸ਼ਨ ਸੰਤਾਂ ਵਿੱਚੋਂ ਇੱਕ ਬਣੇ।"
          />
        </p>

        {/* Stat preview — first 4 stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {stats.slice(0, 4).map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-4 rounded-2xl card-glass card-saffron-glow"
              >
                <Icon className="h-4 w-4 text-saffron mb-2" />
                <div className="font-display text-xl font-bold text-gradient-saffron">{stat.value}</div>
                <div className="text-[11px] text-ink-soft uppercase tracking-wider mt-0.5">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Browse Full CTA */}
        <div className="text-center mt-10">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-linear-to-r from-saffron to-saffron-deep text-white font-bold text-sm shadow-xl shadow-saffron/20 hover:opacity-90 transition-opacity"
          >
            <LanguageAware en="Browse Full About" hi="पूरा परिचय देखें" pa="ਪੂਰਾ ਜਾਣੋ ਵੇਖੋ" />
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
