"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { LanguageAware } from "./LanguageAware";
import { RavidassImage } from "./RavidassPortrait";

type GalleryItem = {
  title: string;
  subtitle?: string;
  count: number;
  icon?: string;
  image: string;
  alt: string;
  category: "devotional" | "event" | "leader" | "illustration";
};

const galleries: GalleryItem[] = [
  {
    title: "Varanasi Pilgrimage 2026",
    subtitle: "On the banks of the Ganges",
    count: 248,
    icon: "🕌",
    image: "/assets/sant-ravidasss.jpg",
    alt: "Varanasi pilgrimage — Sant Ravidas portrait",
    category: "event",
  },
  {
    title: "House of Lords Exhibition",
    subtitle: "BRHF · UK Parliament",
    count: 156,
    icon: "🇬🇧",
    image: "/assets/bjp-ravidas.jpg",
    alt: "BJP leader bowing at Ravidas portrait",
    category: "leader",
  },
  {
    title: "Brussels European Parliament",
    subtitle: "European dialogue",
    count: 198,
    icon: "🇪🇺",
    image: "/assets/jp-nadda(bjp).jpg",
    alt: "JP Nadda at Brussels Parliament",
    category: "leader",
  },
  {
    title: "Diwali at Gali Be-gumpura",
    subtitle: "Festival of lights",
    count: 312,
    icon: "🪔",
    image: "/assets/lotsofsantravi.jpg",
    alt: "Diwali celebration at Gali Be-gumpura",
    category: "event",
  },
  {
    title: "Guru Ravidas Birthday Mahotsav",
    subtitle: "Janam Jayanti 2026",
    count: 421,
    icon: "🕉️",
    image: "/assets/booj-ravidas.webp",
    alt: "Guru Ravidas Janam Jayanti Mahotsav",
    category: "devotional",
  },
  {
    title: "Bowing at the Shrine",
    subtitle: "Devotee offering",
    count: 187,
    icon: "🙏",
    image: "/assets/bowing.webp",
    alt: "Devotee bowing before Ravidas statue",
    category: "devotional",
  },
  {
    title: "Painted Portrait",
    subtitle: "Devotional art",
    count: 92,
    icon: "🎨",
    image: "/assets/Sri-Guru-Ravidas-Photo-Download-Free.jpg",
    alt: "Painted portrait of Guru Ravidas",
    category: "devotional",
  },
  {
    title: "Sculpted Murti",
    subtitle: "Temple icon",
    count: 124,
    icon: "🛕",
    image: "/assets/Shri-Guru-Ravidas-Ji-Image-Pictures-Download.jpg",
    alt: "Sculpted portrait of Guru Ravidas",
    category: "devotional",
  },
  {
    title: "Saint of the People",
    subtitle: "Devotional painting",
    count: 78,
    icon: "👤",
    image: "/assets/guru-ravidass-hindu-holy-saint-qdl6bp29umg4uvrl.jpg",
    alt: "Painted illustration of Guru Ravidas",
    category: "devotional",
  },
  {
    title: "Janam Jayanti Illustration",
    subtitle: "Vector art",
    count: 64,
    icon: "✨",
    image: "/assets/guru-ravidas-jayanti-illustration-vector.jpg",
    alt: "Vector illustration of Guru Ravidas on throne",
    category: "illustration",
  },
  {
    title: "Laser-Cut Portrait",
    subtitle: "Modern art",
    count: 53,
    icon: "🖼️",
    image: "/assets/LaserCutting-Sant-ravidas-Portrait.png",
    alt: "Laser-cut portrait of Sant Ravidas",
    category: "illustration",
  },
  {
    title: "Leader's Reverence",
    subtitle: "Political tribute",
    count: 41,
    icon: "🎗️",
    image: "/assets/bjp(bowing).jpg",
    alt: "Leader bowing before Guru Ravidas statue",
    category: "leader",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "60%" : "-60%",
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-60%" : "60%",
    opacity: 0,
    scale: 0.95,
  }),
};

export function Gallery() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % galleries.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + galleries.length) % galleries.length);
  }, []);

  const current = galleries[index];

  return (
    <section id="gallery" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-bg via-bg-soft to-bg pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-saffron/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
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
              en="From yatras and exhibitions to global ceremonies — moments that captured the Be-gumpura light."
              hi="यात्राओं से लेकर प्रदर्शनियों तक और विश्व समारोहों तक — वे क्षण जिन्होंने बेगमपुरा के प्रकाश को कैद किया।"
              pa="ਯਾਤਰਾਵਾਂ ਅਤੇ ਪ੍ਰਦਰਸ਼ਨੀਆਂ ਤੋਂ ਲੈ ਕੇ ਵਿਸ਼ਵ ਸਮਾਰੋਹਾਂ ਤੱਕ — ਉਹ ਪਲ ਜਿਨ੍ਹਾਂ ਨੇ ਬੇਗਮਪੁਰਾ ਦੀ ਰੋਸ਼ਨੀ ਨੂੰ ਕੈਦ ਕੀਤੀ।"
            />
          </p>
        </motion.div>

        {/* Hero portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex justify-center mb-14"
        >
          <div className="relative">
            <div className="absolute inset-0 -z-10 blur-3xl opacity-60">
              <div className="absolute inset-0 rounded-full bg-linear-to-br from-saffron/40 via-gold/30 to-royal/40" />
            </div>
            <RavidassImage
              src="/assets/OIP.webp"
              alt="Sant Ravidas Ji"
              size={200}
              revealDuration={2.4}
              className="relative animate-float"
            />
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Slide */}
          <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-3xl overflow-hidden card-glass card-saffron-glow shadow-2xl">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0"
              >
                {/* Background image */}
                <img
                  src={current.image}
                  alt={current.alt}
                  loading={index < 2 ? "eager" : "lazy"}
                  className="h-full w-full object-cover"
                />
                {/* Color tint */}
                <div className="absolute inset-0 bg-linear-to-br from-saffron/30 via-royal/25 to-saffron/30 mix-blend-overlay" />
                {/* Bottom fade */}
                <div className="absolute inset-0 bg-linear-to-t from-bg/90 via-bg/30 to-transparent pointer-events-none" />
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 md:p-10 text-center">
                  {current.icon && (
                    <span className="absolute top-4 left-4 text-3xl md:text-4xl drop-shadow-lg">
                      {current.icon}
                    </span>
                  )}
                  <h3 className="font-display font-bold text-ink text-lg md:text-2xl leading-tight drop-shadow-lg">
                    {current.title}
                  </h3>
                  {current.subtitle && (
                    <p className="text-xs text-saffron-bright uppercase tracking-wider mt-1 drop-shadow-lg">
                      {current.subtitle}
                    </p>
                  )}
                  <p className="text-sm text-ink-soft mt-2 drop-shadow-lg">
                    {current.count}{" "}
                    <LanguageAware en="photos" hi="तस्वीरें" pa="ਤਸਵੀਰਾਂ" />
                  </p>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                      <ImageIcon className="h-4 w-4 text-white" />
                    </span>
                    <span className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                      <Play className="h-3.5 w-3.5 text-white" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goPrev}
            aria-label="Previous photo"
            className="absolute top-1/2 -translate-y-1/2 -left-2 md:-left-4 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-bg/70 backdrop-blur-lg border border-border text-saffron hover:bg-saffron hover:text-white transition-all shadow-lg flex items-center justify-center"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={goNext}
            aria-label="Next photo"
            className="absolute top-1/2 -translate-y-1/2 -right-2 md:-right-4 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-bg/70 backdrop-blur-lg border border-border text-saffron hover:bg-saffron hover:text-white transition-all shadow-lg flex items-center justify-center"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {galleries.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Go to photo ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === index
                    ? "w-8 h-2.5 bg-saffron shadow-md shadow-saffron/30"
                    : "w-2.5 h-2.5 bg-ink-soft/30 hover:bg-ink-soft/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-linear-to-r from-saffron to-saffron-deep text-white font-bold text-sm shadow-xl shadow-saffron/20 hover:opacity-90 transition-opacity"
          >
            <LanguageAware en="Explore Full Media & Photographic Archive" hi="पूरा फोटो आर्काइव देखें" pa="ਪੂਰੀ ਫੋਟੋ ਆਰਕਾਈਵ ਵੇਖੋ" />
          </a>
        </div>
      </div>
    </section>
  );
}
