"use client";

import { motion } from "framer-motion";
import { ImageIcon, Play } from "lucide-react";
import { LanguageAware } from "./LanguageAware";
import { RavidassImage } from "./RavidassPortrait";

type GalleryItem = {
  title: string;
  subtitle?: string;
  count: number;
  icon?: string;
  image: string; // path under /assets/
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
    title: "Diwali at Gali Begampura",
    subtitle: "Festival of lights",
    count: 312,
    icon: "🪔",
    image: "/assets/lotsofsantravi.jpg",
    alt: "Diwali celebration at Gali Begampura",
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
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-saffron/40 via-gold/30 to-royal/40" />
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleries.map((gallery, i) => (
            <motion.div
              key={gallery.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative aspect-square rounded-2xl overflow-hidden card-glass card-saffron-glow cursor-pointer hover:scale-[1.02] transition-all duration-300"
            >
              {/* Background image */}
              <img
                src={gallery.image}
                alt={gallery.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Color tint to maintain palette */}
              <div className="absolute inset-0 bg-gradient-to-br from-saffron/30 via-royal/25 to-saffron/30 mix-blend-overlay" />
              {/* Bottom dark fade for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/30 to-transparent pointer-events-none" />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
                {gallery.icon && (
                  <span className="absolute top-3 left-3 text-2xl">{gallery.icon}</span>
                )}
                <h3 className="font-display font-bold text-ink text-sm md:text-base leading-tight drop-shadow-lg">
                  {gallery.title}
                </h3>
                {gallery.subtitle && (
                  <p className="text-[10px] text-saffron-bright/90 uppercase tracking-wider mt-1 drop-shadow-lg">
                    {gallery.subtitle}
                  </p>
                )}
                <p className="text-xs text-ink-soft mt-1.5 drop-shadow-lg">
                  {gallery.count}{" "}
                  <LanguageAware en="photos" hi="तस्वीरें" pa="ਤਸਵੀਰਾਂ" />
                </p>
                <div className="absolute top-3 right-3 flex gap-1.5">
                  <span className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                    <ImageIcon className="h-3.5 w-3.5 text-white" />
                  </span>
                  <span className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                    <Play className="h-3 w-3 text-white" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-saffron to-saffron-deep text-white font-bold text-sm shadow-xl shadow-saffron/20 hover:opacity-90 transition-opacity"
          >
            <LanguageAware en="Explore Full Media & Photographic Archive" hi="पूरा फोटो आर्काइव देखें" pa="ਪੂਰੀ ਫੋਟੋ ਆਰਕਾਈਵ ਵੇਖੋ" />
          </a>
        </div>
      </div>
    </section>
  );
}