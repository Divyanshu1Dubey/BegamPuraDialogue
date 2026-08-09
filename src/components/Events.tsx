"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { brhf, deadlines } from "@/data/brhf";
import { LanguageAware } from "./LanguageAware";

export function Events() {
  return (
    <section id="events" className="relative py-32 overflow-hidden">
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
            <LanguageAware en="Chapter V" hi="अध्याय V" pa="ਅਧਿਆਇ V" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-saffron leading-tight">
            <LanguageAware
              en="Global Commemorative Events"
              hi="विश्व स्मारक कार्यक्रम"
              pa="ਵਿਸ਼ਵ ਸਮਾਰਕ ਕਾਰਯਕਰਮ"
            />
          </h2>
          <p className="mt-6 text-base md:text-lg text-ink-soft leading-relaxed">
            <LanguageAware
              en="From the heart of Varanasi to the House of Lords in London and the European Parliament in Brussels — the message of Be-gumpura travels the world."
              hi="वाराणसी के हृदय से लंदन के हाउस ऑफ लॉर्ड्स तक और ब्रसेल्स के यूरोपियन पार्लियामेंट तक — बेगमपुरा का संदेश संसार भर में यात्रा करता है।"
              pa="ਵਾਰਾਣਸੀ ਦੇ ਦਿਲ ਤੋਂ ਲੰਡਨ ਦੇ ਹਾਊਸ ਆਫ ਲਾਰਡਸ ਅਤੇ ਬ੍ਰਾਸੈਲਸ ਦੇ ਯੂਰਪੀਅਨ ਪਾਰਲੀਮੈਂਟ ਤੱਕ — ਬੇਗਮਪੁਰਾ ਦਾ ਸੁਨੇਹਾ ਦੁਨੀਆਂ ਭਰ ਵਿੱਚ ਘੁੰਮਦਾ।"
            />
          </p>
        </motion.div>

        {/* Featured global events */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {brhf.globalEvents.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative rounded-3xl overflow-hidden card-glass card-saffron-glow hover:scale-[1.02] transition-all duration-500"
            >
              {/* Icon header */}
              <div className="relative p-8 pb-5">
                <div className="text-5xl mb-4">{event.icon}</div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-3.5 w-3.5 text-saffron" />
                  <span className="text-xs text-saffron font-medium uppercase tracking-wider">
                    {event.month} {event.year}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-ink leading-tight mb-1">
                  {event.title}
                </h3>
                {event.titleHindi && (
                  <p className="text-xs text-ink-soft/60">{event.titleHindi}</p>
                )}
                <div className="flex items-start gap-1.5 mt-4 text-ink-soft">
                  <MapPin className="h-4 w-4 text-saffron shrink-0 mt-0.5" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>

              <div className="px-8 pb-8">
                <p className="text-sm text-ink-soft leading-relaxed">
                  {event.description}
                </p>
                <button className="mt-4 flex items-center gap-1.5 text-sm text-saffron font-medium group-hover:gap-2.5 transition-all">
                  <LanguageAware en="Learn More" hi="और जानें" pa="ਹੋਰ ਜਾਣੋ" />
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-saffron/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Yatras exhibition info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl p-8 md:p-12 card-glass card-saffron-glow mb-16"
        >
          <div className="text-center mb-10">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-gradient-saffron">
              <LanguageAware
                en="8 Global Yatras · Exhibition Series"
                hi="8 विश्व यात्राएँ · प्रदर्शनी श्रृंखला"
                pa="8 ਵਿਸ਼ਵ ਯਾਤਰਾਵਾਂ · ਪ੍ਰਦਰਸ਼ਨੀ ਲੜੀ"
              />
            </h3>
            <p className="mt-3 text-ink-soft">
              <LanguageAware
                en="A journey through the life and philosophy of Sant Ravidas Ji — 8 curated exhibitions spanning the globe."
                hi="संत रविदास जी के जीवन और दर्शन की यात्रा — 8 क्यूरेटेड प्रदर्शनाएँ संसार भर में।"
                pa="ਸੰਤ ਰਵਿਦਾਸ ਜੀ ਦੇ ਜੀਵਨ ਅਤੇ ਦਰਸ਼ਨ ਦੀ ਯਾਤਰਾ — 8 ਕਿਊਰੇਟਡ ਪ੍ਰਦਰਸ਼ਨੀ ਸੰਸਾਰ ਭਰ ਵਿੱਚ।"
              />
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {brhf.exhibitions.map((exhibition, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-2xl bg-saffron/5 border border-saffron/15 hover:bg-saffron/10 transition-colors"
              >
                <span className="text-saffron font-display font-bold text-lg shrink-0">
                  {i + 1}
                </span>
                <p className="text-sm text-ink-soft leading-relaxed">{exhibition}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Countdown to deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl p-8 md:p-12 bg-linear-to-br from-saffron/5 via-surface to-royal/5 border border-border/50"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold text-gradient-saffron text-center mb-10">
            <LanguageAware
              en="Mark Your Calendar"
              hi="अपने कैलेंडर पर निशान लगाएं"
              pa="ਆਪਣੇ ਕੈਲੈਂਡਰ 'ਤੇ ਨਿਸ਼ਾਨ ਲਗਾਓ"
            />
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {deadlines.map((deadline, i) => (
              <motion.div
                key={deadline.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`p-5 rounded-2xl border transition-colors ${
                  deadline.urgent
                    ? "bg-saffron/10 border-saffron/30"
                    : "bg-surface/60 border-border"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-saffron" />
                  <span className="text-xs font-medium text-saffron">
                    {deadline.date.toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sm text-ink leading-relaxed">{deadline.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Photo strip — global celebrations */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-gradient-saffron">
              <LanguageAware
                en="Celebrations Around the World"
                hi="दुनिया भर में उत्सव"
                pa="ਦੁਨੀਆਂ ਭਰ ਵਿੱਚ ਉਤਸਾਵ"
              />
            </h3>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { src: "/assets/sant-ravidasss.jpg", alt: "Varanasi" },
              { src: "/assets/lotsofsantravi.jpg", alt: "Diwali at Gali Be-gumpura" },
              { src: "/assets/booj-ravidas.webp", alt: "Janam Jayanti Mahotsav" },
              { src: "/assets/bjp-ravidas.jpg", alt: "UK House of Lords" },
              { src: "/assets/jp-nadda(bjp).jpg", alt: "Brussels Parliament" },
              { src: "/assets/bowing.webp", alt: "Devotee offering" },
            ].map((img, i) => (
              <motion.figure
                key={img.src}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group relative aspect-square rounded-xl overflow-hidden card-saffron-glow"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-bg/70 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <figcaption className="absolute bottom-1.5 left-1.5 right-1.5 text-[8px] md:text-[10px] uppercase tracking-wider text-white/90 text-center opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
                  {img.alt}
                </figcaption>
              </motion.figure>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-linear-to-r from-saffron to-saffron-deep text-white font-bold text-sm shadow-xl shadow-saffron/20 hover:opacity-90 transition-opacity"
            >
              <LanguageAware en="View All Global Commemorative Events & Register" hi="सभी कार्यक्रम देखें और पंजीकरण करें" pa="ਸਾਰੇ ਕਾਰਯਕ੍ਰਮ ਵੇਖੋ ਅਤੇ ਰਜਿਸਟਰੇਸ਼ਨ ਕਰੋ" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}