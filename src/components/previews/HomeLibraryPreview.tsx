"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BookOpen, FileText, Headphones, Video } from "lucide-react";
import { LanguageAware } from "../LanguageAware";

const libraryItems = [
  { icon: BookOpen, title: "Guru Granth Sahib Ji", titleHi: "ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ", desc: "Full Bani · 41 Shabads · 16 Raags" },
  { icon: FileText, title: "Guru Ravidas Pragas Di Khoj", titleHi: "ਗੁਰੂ ਰਵਿਦਾਸ ਪ੍ਰਗਟਸ ਦੀ ਖੋਜ", desc: "By Roop Lal Roop, translated by Ambassador Ramesh Chander IFS" },
  { icon: Headphones, title: "Audio Kirtan Collection", titleHi: "ਆਡੀਓ ਕੀਰਤਨ ਸੰਗ੍ਰਹਿ", desc: "Shabads sung in classical raags" },
  { icon: Video, title: "Documentary: Begampura", titleHi: "ਡਾਕੂਮੈਂਟਰੀ: ਬੇਗਮਪੁਰਾ", desc: "Full documentary on the life and teachings" },
];

export function HomeLibraryPreview() {
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
          <LanguageAware en="Chapter VI" hi="अध्याय VI" pa="ਅਧਿਆਇ VI" />
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient-saffron leading-tight">
          <LanguageAware en="E-Library" hi="ई-पुस्तकालय" pa="ਈ-ਪੁਸਤਕਾਲਾ" />
        </h2>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed max-w-2xl mx-auto">
          <LanguageAware
            en="A digital sanctuary of the Begampura message — texts, audio, video, and research that carry the light across every digital threshold."
            hi="बेगमपुरा संदेश का डिजिटल पवित्र स्थान — ग्रंथ, आवाज़, वीडियो और शोध।"
            pa="ਬੇਗਮਪੁਰਾ ਸੁਨੇਹੇ ਦਾ ਡਿਜ਼ੀਟਲ ਪਵਿੱਤਰ ਥਾਂ — ਗਰੰਥ, ਆਵਾਜ਼, ਵਿਡੀਓ ਅਤੇ ਖੋਜ।"
          />
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
        {libraryItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl p-4 card-glass card-saffron-glow"
            >
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-saffron/15 to-royal/15 flex items-center justify-center mb-3">
                <Icon className="h-4 w-4 text-saffron" />
              </div>
              <h3 className="font-display text-xs font-bold text-ink leading-tight line-clamp-2">
                {item.title}
              </h3>
              <p className="text-[10px] text-saffron/60 mt-0.5">{item.titleHi}</p>
              <p className="text-[11px] text-ink-soft mt-1.5 line-clamp-2">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Browse Full CTA */}
      <div className="text-center mt-10">
        <Link
          href="/library"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-linear-to-r from-violet to-violet-deep text-white font-bold text-sm shadow-xl shadow-violet/20 hover:opacity-90 transition-opacity"
        >
          <LanguageAware en="Browse Full Library" hi="पूरी पुस्तकालय देखें" pa="ਪੂਰੀ ਪੁਸਤਕਾਲਾ ਵੇਖੋ" />
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.section>
  );
}
