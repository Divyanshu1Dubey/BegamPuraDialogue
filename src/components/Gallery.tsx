"use client";

import { motion } from "framer-motion";
import { ImageIcon, Play } from "lucide-react";
import { LanguageAware } from "./LanguageAware";

const galleries = [
  { title: "Varanasi Pilgrimage 2026", count: 248, icon: "🕌" },
  { title: "House of Lords Exhibition", count: 156, icon: "🇬🇧" },
  { title: "Brussels European Parliament", count: 198, icon: "🇪🇺" },
  { title: "Diwali at Gali Begampura", count: 312, icon: "🪔" },
  { title: "Guru Ravidas Birthday Mahotsav", count: 421, icon: "🕉️" },
  { title: "Youth Sangam Programme", count: 187, icon: "👥" },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-soft to-bg pointer-events-none" />
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
            <LanguageAware en="Chapter VII" hi="अध्याय VII" pa="ਅਧਿਆਇ VII" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-saffron leading-tight">
            <LanguageAware
              en="Gallery · The Visual Journey"
              hi="गैलरी · दृश्य यात्रा"
              pa="ਗੈਲਰੀ · ਦਿੱਖ ਯਾਤਰਾ"
            />
          </h2>
          <p className="mt-6 text-base md:text-lg text-ink-soft leading-relaxed">
            <LanguageAware
              en="From yatras and exhibitions to global ceremonies — moments that captured the Begampura light."
              hi="यात्राओं से लेकर प्रदर्शनियों तक और विश्व समारोहों तक — वे क्षण जिन्होंने बेगमपुरा के प्रकाश को कैद किया।"
              pa="ਯਾਤਰਾਵਾਂ ਅਤੇ ਪ੍ਰਦਰਸ਼ਨੀਆਂ ਤੋਂ ਲੈ ਕੇ ਵਿਸ਼ਵ ਸਮਾਰੋਹਾਂ ਤੱਕ — ਉਹ ਪਲ ਜਿਨ੍ਹਾਂ ਨੇ ਬੇਗਮਪੁਰਾ ਦੀ ਰੋਸ਼ਨੀ ਨੂੰ ਕੈਦ ਕੀਤਾ।"
            />
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleries.map((gallery, i) => (
            <motion.div
              key={gallery.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative aspect-square rounded-2xl overflow-hidden card-glass card-saffron-glow cursor-pointer hover:scale-[1.02] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-saffron/15 via-royal/15 to-saffron/15 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-5xl mb-3">{gallery.icon}</span>
                <h3 className="font-display font-bold text-ink text-sm md:text-base leading-tight">
                  {gallery.title}
                </h3>
                <p className="text-xs text-ink-soft mt-1.5">
                  {gallery.count}{" "}
                  <LanguageAware en="photos" hi="तस्वीरें" pa="ਤਸਵੀਰਾਂ" />
                </p>
                <div className="absolute bottom-3 right-3 flex gap-1.5">
                  <span className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                    <ImageIcon className="h-3.5 w-3.5 text-white" />
                  </span>
                  <span className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                    <Play className="h-3 w-3 text-white" />
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}