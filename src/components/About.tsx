"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Heart, BookOpen, Globe, Award, Sparkles } from "lucide-react";
import { guru } from "@/data/guru";
import { LanguageAware } from "./LanguageAware";
import { RavidassImage } from "./RavidassPortrait";

const stats = [
  { value: "126", label: "Years Lived", icon: Calendar },
  { value: "94,000", label: "Satsangs Given", icon: Users },
  { value: "40,000", label: "Km Travelled", icon: Globe },
  { value: "126", label: "Shabads in Guru Granth Sahib", icon: BookOpen },
  { value: "16", label: "Raags", icon: Sparkles },
  { value: "216", label: "Shlokas", icon: Heart },
];

export function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/4 -left-40 w-80 h-80 rounded-full bg-saffron/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full bg-royal/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 mb-4 rounded-full bg-saffron/10 border border-saffron/30 text-xs font-medium text-saffron uppercase tracking-widest">
            <LanguageAware en="Chapter I" hi="अध्याय I" pa="ਅਧਿਆਇ I" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-saffron leading-tight">
            <LanguageAware
              en="The Saint of Begampura"
              hi="बेगमपुरा के संत"
              pa="ਬੇਗਮਪੁਰਾ ਦੇ ਸੰਤ"
            />
          </h2>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed">
            <LanguageAware
              en="Born into a leather-worker's family on the banks of the Ganges, Sant Ravidas Ji rose to become one of history's most radiant saints — the first to articulate a casteless society, a city without sorrow, and the equal dignity of all labour."
              hi="गंगा के तट पर चमड़ी के परिवार में जन्मे संत रविदास जी इतिहास के सबसे प्रकाशमान संतों में से एक बने — जातिविहीन समाज, निर्दोष नगर, और सभी श्रम की समान गरिमा को सबसे पहले मुखरित करने वाले।"
              pa="ਗੰਗਾ ਦੇ ਕੰਢੇ ਚਮੜੇ ਦੇ ਪਰਿਵਾਰ ਵਿੱਚ ਜੰਮੇ ਸੰਤ ਰਵਿਦਾਸ ਜੀ ਇਤਿਹਾਸ ਦੇ ਸਭ ਤੋਂ ਰੌਸ਼ਨ ਸੰਤਾਂ ਵਿੱਚੋਂ ਇੱਕ ਬਣੇ।"
            />
          </p>
        </motion.div>

        {/* Saint portrait — drawn-on-load reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex flex-col items-center mb-16"
        >
          <div className="relative">
            <div className="absolute inset-0 -z-10 blur-3xl opacity-60">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-saffron/40 via-gold/30 to-royal/40" />
            </div>
            <RavidassImage
              src="/assets/OIP.webp"
              alt="Sant Ravidas Ji — drawn-on-load portrait"
              size={260}
              revealDuration={2.8}
              className="relative"
            />
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-saffron/70">
            Sant Ravidas Ji · 1377–1540
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative p-5 rounded-2xl card-glass card-saffron-glow hover:scale-[1.04] transition-transform duration-300"
              >
                <Icon className="h-5 w-5 text-saffron mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-display text-2xl lg:text-3xl font-bold text-gradient-saffron">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-ink-soft uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          <div className="rounded-3xl p-8 card-glass card-saffron-glow">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-saffron to-saffron-deep flex items-center justify-center shrink-0">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-gradient-saffron">
                  <LanguageAware
                    en="His Life in Numbers"
                    hi="उनका जीवन आँकड़ों में"
                    pa="ਉਹਨਾਂ ਦਾ ਜੀਵਨ ਅੰਕਾਂ ਵਿੱਚ"
                  />
                </h3>
              </div>
            </div>
            <dl className="space-y-4 text-ink-soft">
              <FactRow label="Birth" value={guru.birth} />
              <FactRow label="Birthplace" value={guru.birthPlace} />
              <FactRow label="Lifespan" value={`${guru.lifespanYears} years`} />
              <FactRow label="Father" value={guru.parents.father} />
              <FactRow label="Mother" value={guru.parents.mother} />
              <FactRow label="Wife" value={guru.family.wife} />
              <FactRow label="Children" value={`${guru.family.son}, ${guru.family.daughter}`} />
            </dl>
          </div>

          <div className="rounded-3xl p-8 card-glass card-saffron-glow">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-royal to-violet flex items-center justify-center shrink-0">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-gradient-saffron">
                  <LanguageAware
                    en="His Footprint in History"
                    hi="इतिहास में उनके पदचिह्न"
                    pa="ਇਤਿਹਾਸ ਵਿੱਚ ਉਹਨਾਂ ਦੇ ਪੈਰਾਂ ਦੇ ਨਿਸ਼ਾਨ"
                  />
                </h3>
              </div>
            </div>
            <ul className="space-y-3 text-ink-soft">
              {guru.contemporaries.map((name) => (
                <li
                  key={name}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl bg-surface/40 hover:bg-surface/80 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                  <span className="text-sm">{name}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-saffron/5 border border-saffron/20">
              <p className="text-xs uppercase tracking-widest text-saffron mb-1">
                Travel
              </p>
              <p className="text-sm text-ink">
                {guru.travels.continent}, covering {guru.travels.kilometers.toLocaleString()} km
                over {guru.travels.journeys} journeys and {guru.travels.satsangs.toLocaleString()} satsangs.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Devotional Art Strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-gradient-saffron">
              <LanguageAware
                en="Devotional Art Through the Ages"
                hi="सभी युगों में भक्ति कला"
                pa="ਸਾਰੇ ਯੁੱਗਾਂ ਵਿੱਚ ਭਗਤੀ ਕਲਾ"
              />
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/assets/Sri-Guru-Ravidas-Photo-Download-Free.jpg", alt: "Painted devotional portrait" },
              { src: "/assets/Shri-Guru-Ravidas-Ji-Image-Pictures-Download.jpg", alt: "Temple sculpted murti" },
              { src: "/assets/guru-ravidass-hindu-holy-saint-qdl6bp29umg4uvrl.jpg", alt: "Classical painting of Guru Ravidas" },
              { src: "/assets/LaserCutting-Sant-ravidas-Portrait.png", alt: "Modern laser-cut portrait art" },
            ].map((img, i) => (
              <motion.figure
                key={img.src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative aspect-square rounded-2xl overflow-hidden card-glass card-saffron-glow"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-transparent to-transparent pointer-events-none" />
                <figcaption className="absolute bottom-2 inset-x-2 text-center text-[10px] uppercase tracking-wider text-saffron-bright/90 drop-shadow-lg">
                  {img.alt}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline border-b border-border/40 pb-2">
      <dt className="text-xs uppercase tracking-wider text-ink-soft/70">{label}</dt>
      <dd className="text-sm text-ink text-right max-w-[60%]">{value}</dd>
    </div>
  );
}