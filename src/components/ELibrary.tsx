"use client";

import { motion } from "framer-motion";
import { BookOpen, Download, FileText, Headphones, Video, BookMarked, ArrowRight } from "lucide-react";
import { LanguageAware } from "./LanguageAware";

const libraryItems = [
  { icon: BookOpen, title: "Guru Granth Sahib Ji", titleHi: "ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ", desc: "Full Bani of Bhagat Ravidas Ji · 41 Shabads · 16 Raags", type: "text" },
  { icon: FileText, title: "Guru Ravidas Pragas Di Khoj", titleHi: "ਗੁਰੂ ਰਵਿਦਾਸ ਪ੍ਰਗਟਸ ਦੀ ਖੋਜ", desc: "By Roop Lal Roop, translated by Ambassador Ramesh Chander IFS", type: "book" },
  { icon: Headphones, title: "Audio Kirtan Collection", titleHi: "ਆਡੀਓ ਕੀਰਤਨ ਸੰਗ੍ਰਹਿ", desc: "Shabads sung in classical raags — immersive audio experience", type: "audio" },
  { icon: Video, title: "Documentary: Begampura", titleHi: "ਡਾਕੂਮੈਂਟਰੀ: ਬੇਗਮਪੁਰਾ", desc: "Full documentary on the life and teachings of Sant Ravidas Ji", type: "video" },
  { icon: BookMarked, title: "Research Papers & Articles", titleHi: "ਖੋਜ ਪੇਪਰਾਂ ਅਤੇ ਲੇਖ", desc: "Academic papers on Begampura, anti-caste movements, and governance", type: "pdf" },
  { icon: Download, title: "Download Centre", titleHi: "ਡਾਊਨਲੋਡ ਕੇਂਦਰ", desc: "Posters, logos, banners, pamphlets — downloadable assets for the 650th", type: "download" },
];

export function ELibrary() {
  return (
    <section id="library" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-violet-deep/5 to-bg pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 mb-4 rounded-full bg-violet/15 border border-violet/40 text-xs font-medium text-violet uppercase tracking-widest">
            <LanguageAware en="Chapter VI" hi="अध्याय VI" pa="ਅਧਿਆਇ VI" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-saffron leading-tight">
            <LanguageAware
              en="E-Library"
              hi="ई-पुस्तकालय"
              pa="ਈ-ਪੁਸਤਕਾਲਾ"
            />
          </h2>
          <p className="mt-6 text-base md:text-lg text-ink-soft leading-relaxed">
            <LanguageAware
              en="A digital sanctuary of the Begampura message — texts, audio, video, and research that carry the light of Sant Ravidas Ji across every digital threshold."
              hi="बेगमपुरा संदेश का डिजिटल पवित्र स्थान — ग्रंथ, आवाज़, वीडियो और शोध जो संत रविदास जी के प्रकाश को हर डिजिटल सीमा तक ले जाते हैं।"
              pa="ਬੇਗਮਪੁਰਾ ਸੁਨੇਹੇ ਦਾ ਡਿਜ਼ੀਟਲ ਪਵਿੱਤਰ ਥਾਂ — ਗਰੰਥ, ਆਵਾਜ਼, ਵਿਡੀਓ ਅਤੇ ਖੋਜ ਜੋ ਸੰਤ ਰਵਿਦਾਸ ਜੀ ਦੀ ਰੋਸ਼ਨੀ ਨੂੰ ਹਰ ਡਿਜ਼ੀਟਲ ਸੀਮਾ ਤੱਕ ਲੈਂਦੇ।"
            />
          </p>
        </motion.div>

        {/* Library grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {libraryItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group rounded-3xl p-7 card-glass card-saffron-glow hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-saffron/15 to-royal/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-saffron" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink mb-0.5">
                  {item.title}
                </h3>
                <p className="text-xs text-saffron/60 mb-3">{item.titleHi}</p>
                <p className="text-sm text-ink-soft leading-relaxed">{item.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-widest text-saffron/70 group-hover:text-saffron transition-colors">
                  <span>
                    <LanguageAware en="Access" hi="प्रवेश" pa="ਪਹੁੰਚ" />
                  </span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Featured book */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 rounded-3xl overflow-hidden card-glass card-saffron-glow"
        >
          <div className="grid lg:grid-cols-5">
            <div className="lg:col-span-3 p-8 md:p-12">
              <span className="inline-block px-3 py-1 mb-4 rounded-full bg-saffron/10 border border-saffron/30 text-xs font-medium text-saffron uppercase tracking-widest">
                <LanguageAware en="Featured" hi="विशेष" pa="ਵਿਸ਼ੇਸ਼" />
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-gradient-saffron mb-4">
                Guru Ravidas Pragas Di Khoj
              </h3>
              <p className="text-ink-soft leading-relaxed mb-6">
                <LanguageAware
                  en="The definitive scholarly work on Sant Ravidas Ji — originally written in Punjabi by Roop Lal Roop and translated by Ambassador Ramesh Chander IFS (Retired). Published by BRHF. The definitive English translation of Guru Ravidas's philosophy."
                  hi="संत रविदास जी पर अभिनंदन ग्रंथ — पंजाबी में रूप लाल रूप द्वारा मूल लेखन, रामेश चंद्र आईएएस (सेवानिवृत्त) द्वारा अंग्रेजी अनुवाद।"
                  pa="ਸੰਤ ਰਵਿਦਾਸ ਜੀ ਬਾਰੇ ਨਿਰਧਾਰਤ ਸ਼ਾਸਤਰੀ ਰਚਨਾ — ਪੰਜਾਬੀ ਵਿੱਚ ਰੂਪ ਲਾਲ ਰੂਪ ਦੁਆਰਾ ਅਸਲ ਲੇਖਨ।"
                />
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-saffron to-saffron-deep text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <LanguageAware en="Download PDF" hi="पीडीएफ डाउनलोड" pa="PDF ਡਾਊਨਲੋਡ" />
                </button>
                <button className="px-5 py-2.5 rounded-xl border border-saffron/30 bg-saffron/5 text-saffron text-sm font-medium hover:bg-saffron/10 transition-colors">
                  <LanguageAware en="Preview" hi="पूर्वावलोकन" pa="ਪ੍ਰੀਵਿਊ" />
                </button>
              </div>
            </div>
            <div className="lg:col-span-2 bg-gradient-to-br from-saffron/10 to-royal/10 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl mb-4">📖</div>
                <p className="font-display text-lg text-saffron font-bold">Guru Ravidas</p>
                <p className="text-sm text-ink-soft">Pragas Di Khoj</p>
                <p className="text-xs text-ink-soft/60 mt-1">BRHF Publication</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <a
            href="/library"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-saffron to-saffron-deep text-white font-bold text-sm shadow-xl shadow-saffron/20 hover:opacity-90 transition-opacity"
          >
            <LanguageAware en="Browse Full E-Library Archive" hi="पूरा ई-लाइब्रेरी आर्काइव देखें" pa="ਪੂਰੀ ਈ-ਲਾਇਬ੍ਰੇਰੀ ਵੇਖੋ" />
          </a>
        </div>
      </div>
    </section>
  );
}