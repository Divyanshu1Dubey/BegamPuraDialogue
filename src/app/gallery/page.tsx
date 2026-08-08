"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Sparkles, Filter, X, Maximize2 } from "lucide-react";
import { LanguageAware } from "@/components/LanguageAware";

const galleryItems = [
  {
    id: 1,
    title: "Shri Guru Ravidas Janam Asthan Temple",
    category: "Sacred Shrine",
    location: "Seer Goverdhanpur, Varanasi, India",
    src: "/home-dark.jpeg",
    desc: "The holy birthplace shrine of Sant Ravidas Ji, visited by millions of pilgrims annually."
  },
  {
    id: 2,
    title: "650th Janam Jayanti Global Yatra",
    category: "Events & Yatras",
    location: "London & Birmingham, UK",
    src: "/events-dark.jpeg",
    desc: "Commemorative processions and dialogue assemblies organized by BRHF across the United Kingdom."
  },
  {
    id: 3,
    title: "Sacred Shabads Exegesis Recital",
    category: "Gurbani Heritage",
    location: "Varanasi Shrine Assembly",
    src: "/shabads-dark.jpeg",
    desc: "Classical raag renditions of 40 Shabads during the 650th anniversary curtain-raiser."
  },
  {
    id: 4,
    title: "BRHF Delegation at House of Lords",
    category: "Global Delegation",
    location: "Parliament of the United Kingdom",
    src: "/shabads-dark-footer.jpeg",
    desc: "Foundation trustees and patrons presenting the Begampura Civic Charter to UK parliamentarians."
  }
];

export default function GalleryPage() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [lightboxItem, setLightboxItem] = useState<(typeof galleryItems)[number] | null>(null);

  const filtered = galleryItems.filter(
    (item) => selectedCat === "all" || item.category === selectedCat
  );

  return (
    <div className="min-h-screen bg-bg text-ink pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-saffron/10 border border-saffron/30 text-xs font-semibold text-saffron uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            <LanguageAware en="Media & Photographic Archive" hi="मीडिया एवं फोटो आर्काइव" pa="ਮੀਡੀਆ ਅਤੇ ਫੋਟੋ ਆਰਕਾਈਵ" />
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-gradient-saffron leading-tight">
            <LanguageAware
              en="Historical & Commemorative Gallery"
              hi="ऐतिहासिक एवं स्मारक गैलरी"
              pa="ਇਤਿਹਾਸਕ ਅਤੇ ਯਾਦਗਾਰੀ ਗੈਲਰੀ"
            />
          </h1>
          <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed font-medium">
            <LanguageAware
              en="Photographs from Varanasi birthplace shrine, UK parliamentary assemblies, research yatras, and global 650th Janam Jayanti celebrations."
              hi="वाराणसी जन्मस्थान मंदिर, यूके संसदीय सभाओं और 650वीं जन्म जयंती समारोहों के चित्र।"
              pa="ਵਾਰਾਣਸੀ ਜਨਮ ਅਸਥਾਨ, ਯੂਕੇ ਪਾਰਲੀਮੈਂਟ ਅਤੇ 650ਵੀਂ ਜਨਮ ਜਯੰਤੀ ਸਮਾਰੋਹਾਂ ਦੀਆਂ ਤਸਵੀਰਾਂ।"
            />
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          <Filter className="h-4 w-4 text-saffron shrink-0" />
          {["all", "Sacred Shrine", "Events & Yatras", "Gurbani Heritage", "Global Delegation"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCat === cat
                  ? "bg-saffron text-white shadow-md shadow-saffron/20"
                  : "bg-surface text-ink-soft hover:text-saffron hover:bg-surface-2 border border-border"
              }`}
            >
              {cat === "all" ? "All Media" : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              onClick={() => setLightboxItem(item)}
              className="group relative rounded-3xl overflow-hidden card-glass card-saffron-glow cursor-pointer"
            >
              <div className="relative h-72 md:h-80 w-full overflow-hidden bg-surface-2">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <button className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6 relative">
                <span className="px-2.5 py-1 rounded-full bg-saffron/15 text-[11px] font-bold text-saffron uppercase mb-2 inline-block">
                  {item.category}
                </span>
                <h3 className="font-display text-xl font-bold text-ink mb-1 group-hover:text-saffron transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-saffron font-semibold mb-2">{item.location}</p>
                <p className="text-xs text-ink-soft leading-relaxed font-medium">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl rounded-3xl bg-bg border border-border overflow-hidden shadow-2xl p-6"
            >
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-surface text-ink-soft hover:text-ink z-10"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="rounded-2xl overflow-hidden mb-4 bg-black max-h-[60vh] flex items-center justify-center">
                <img src={lightboxItem.src} alt={lightboxItem.title} className="max-h-[60vh] w-auto object-contain" />
              </div>

              <div>
                <span className="text-xs font-bold text-saffron uppercase tracking-wider">{lightboxItem.category}</span>
                <h3 className="font-display text-2xl font-bold text-ink mt-1 mb-1">{lightboxItem.title}</h3>
                <p className="text-xs text-saffron font-bold mb-2">{lightboxItem.location}</p>
                <p className="text-sm text-ink-soft font-medium leading-relaxed">{lightboxItem.desc}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
