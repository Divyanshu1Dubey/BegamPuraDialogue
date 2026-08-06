"use client";

import { motion } from "framer-motion";
import { Globe, MapPin, Users } from "lucide-react";
import { brhf } from "@/data/brhf";
import { LanguageAware } from "./LanguageAware";

export function GlobalPresence() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-soft via-bg to-bg-soft pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-saffron/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 mb-4 rounded-full bg-saffron/10 border border-saffron/30 text-xs font-medium text-saffron uppercase tracking-widest">
            <LanguageAware en="Global Chapters" hi="विश्व प्रभाग" pa="ਵਿਸ਼ਵ ਖੰਡ" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-saffron leading-tight">
            <LanguageAware
              en="One Light · One World"
              hi="एक प्रकाश · एक संसार"
              pa="ਇੱਕ ਰੋਸ਼ਨੀ · ਇੱਕ ਦੁਨੀਆਂ"
            />
          </h2>
          <p className="mt-6 text-base md:text-lg text-ink-soft leading-relaxed">
            <LanguageAware
              en="BRHF chapters across continents — each carrying the Begampura message in local communities, engaging policy-makers, youth, and interfaith partners."
              hi="BRHF प्रभाग महाद्वीपों में — बेगमपुरा का संदेश स्थानीय समुदायों में, नीति-निर्माताओं, युवकों और अंतर-धार्मिक भागीदारों को।"
              pa="BRHF ਖੰਡ ਮਹਾਂਦੀਪਾਂ ਵਿੱਚ — ਬੇਗਮਪੁਰਾ ਦਾ ਸੁਨੇਹਾ ਸਥਾਨਕ ਸਮੁਦਾਇਾਂ ਵਿੱਚ, ਨੀਤੀ-ਨਿਰਮਾਤਾਵਾਂ ਅਤੇ ਯੁਵਕਾਂ ਨੂੰ।"
            />
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brhf.globalChapters.map((chapter, i) => (
            <motion.div
              key={chapter.country}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-3xl p-7 card-glass card-saffron-glow hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-5 w-5 text-saffron" />
                <span className="font-display text-lg font-bold text-ink">
                  {chapter.country}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3 text-ink-soft">
                <MapPin className="h-4 w-4 text-saffron" />
                <span className="text-sm">{chapter.city}</span>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed mb-4">
                {chapter.description}
              </p>
              <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                <Users className="h-3.5 w-3.5 text-saffron" />
                <span className="text-xs text-ink-soft">
                  <LanguageAware en="Chapter Lead" hi="प्रभाग प्रमुख" pa="ਖੰਡ ਨੇਤਾ" />:{" "}
                  {chapter.head}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-ink-soft mb-6">
            <LanguageAware
              en="Part of a global community carrying the light of Begampura?"
              hi="बेगमपुरा के प्रकाश को ले जाने वाले विश्व समुदाय का हिस्सा? "
              pa="ਬੇਗਮਪੁਰਾ ਦੀ ਰੋਸ਼ਨੀ ਨੂੰ ਲੈਂਦੇ ਵਿਸ਼ਵ ਸਮੂਹ ਦਾ ਹਿੱਸਾ?"
            />
          </p>
          <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-saffron to-saffron-deep text-white font-semibold tracking-wide hover:scale-[1.03] transition-transform shadow-2xl shadow-saffron/30">
            <LanguageAware
              en="Start a Chapter in Your City"
              hi="अपने शहर में एक प्रभाग शुरू करें"
              pa="ਆਪਣੇ ਸ਼ਹਿਰ ਵਿੱਚ ਇੱਕ ਖੰਡ ਸ਼ੁਰੂ ਕਰੋ"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}