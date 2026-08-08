"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ImageIcon, Play } from "lucide-react";
import { LanguageAware } from "../LanguageAware";

const galleryItems = [
  { icon: "🕌", title: "Varanasi Pilgrimage 2026", count: 248 },
  { icon: "🇬🇧", title: "House of Lords Exhibition", count: 156 },
  { icon: "🇪🇺", title: "Brussels European Parliament", count: 198 },
  { icon: "🪔", title: "Diwali at Gali Begampura", count: 312 },
  { icon: "🕉️", title: "Guru Ravidas Birthday Mahotsav", count: 421 },
  { icon: "🙏", title: "Bowing at the Shrine", count: 187 },
];

export function HomeGalleryPreview() {
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
          <LanguageAware en="Chapter VII" hi="अध्याय VII" pa="ਅਧਿਆਇ VII" />
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient-saffron leading-tight">
          <LanguageAware en="Gallery · The Visual Journey" hi="गैलरी · दृश्य यात्रा" pa="ਗੈਲਰੀ · ਦਿੱਖ ਯਾਤਰਾ" />
        </h2>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed max-w-2xl mx-auto">
          <LanguageAware
            en="From yatras and exhibitions to global ceremonies — moments that captured the Begampura light."
            hi="यात्राओं से लेकर प्रदर्शनियों तक — वे क्षण जिन्होंने बेगमपुरा के प्रकाश को कैद किया।"
            pa="ਯਾਤਰਾਵਾਂ ਅਤੇ ਪ੍ਰਦਰਸ਼ਨੀਆਂ ਤੋਂ ਲੈ ਕੇ ਵਿਸ਼ਵ ਸਮਾਰੋਹਾਂ ਤੱਕ — ਉਹ ਪਲ ਜਿਨ੍ਹਾਂ ਨੇ ਬੇਗਮਪੁਰਾ ਦੀ ਰੋਸ਼ਨੀ ਨੂੰ ਕੈਦ ਕੀਤਾ।"
          />
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-5xl mx-auto">
        {galleryItems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
            style={{
              background: "linear-gradient(135deg, rgba(245,166,35,0.15) 0%, rgba(99,102,241,0.15) 50%, rgba(245,166,35,0.15) 100%)",
            }}
          >
            <div className="absolute inset-0 bg-bg/40 group-hover:bg-bg/20 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-[10px] md:text-xs font-bold text-ink leading-tight">{item.title}</span>
              <span className="text-[10px] text-ink-soft mt-0.5">{item.count} photos</span>
            </div>
            {/* Media icons */}
            <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="w-5 h-5 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <ImageIcon className="h-2.5 w-2.5 text-white" />
              </span>
              <span className="w-5 h-5 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <Play className="h-2 w-2 text-white" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Browse Full CTA */}
      <div className="text-center mt-10">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-linear-to-r from-saffron to-saffron-deep text-white font-bold text-sm shadow-xl shadow-saffron/20 hover:opacity-90 transition-opacity"
        >
          <LanguageAware en="Browse Full Gallery" hi="पूरी गैलरी देखें" pa="ਪੂਰੀ ਗੈਲਰੀ ਵੇਖੋ" />
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.section>
  );
}
