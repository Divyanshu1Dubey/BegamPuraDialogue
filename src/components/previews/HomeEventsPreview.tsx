"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Calendar, MapPin } from "lucide-react";
import { brhf } from "@/data/brhf";
import { LanguageAware } from "../LanguageAware";

export function HomeEventsPreview() {
  const featuredEvents = brhf.globalEvents.slice(0, 3);

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
          <LanguageAware en="Chapter V" hi="अध्याय V" pa="ਅਧਿਆਉ V" />
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient-saffron leading-tight">
          <LanguageAware en="Global Commemorative Events" hi="विश्व स्मारक कार्यक्रम" pa="ਵਿਸ਼ਵ ਸਮਾਰਕ ਕਾਰਯਕਰਮ" />
        </h2>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed max-w-2xl mx-auto">
          <LanguageAware
            en="From Varanasi to the House of Lords in London and the European Parliament in Brussels — the message of Be-gumpura travels the world."
            hi="वाराणसी से लंदन के हाउस ऑफ लॉर्ड्स तक — बेगमपुरा का संदेश संसार भर में यात्रा करता है।"
            pa="ਵਾਰਾਣਸੀ ਤੋਂ ਲੰਡਨ ਦੇ ਹਾਊਸ ਆਫ ਲਾਰਡਸ ਤੱਕ — ਬੇਗਮਪੁਰਾ ਦਾ ਸੁਨੇਹਾ ਦੁਨੀਆਂ ਭਰ ਵਿੱਚ ਘੁੰਮਦਾ।"
          />
        </p>
      </div>

      {/* Featured events — compact cards */}
      <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto px-4">
        {featuredEvents.map((event, i) => {
          const isToday = "isToday" in event && event.isToday;
          const isProposed = "isProposed" in event && event.isProposed;
          const ageGroups = "ageGroups" in event && Array.isArray(event.ageGroups) ? (event.ageGroups as readonly string[]) : [];

          return (
            <Link
              key={event.title}
              href={`/events/${event.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="block group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl p-5 card-glass card-saffron-glow group-hover:scale-[1.02] transition-all h-full flex flex-col justify-between ${
                  isToday ? "border border-saffron/50 bg-saffron/10" : ""
                } ${isProposed ? "border border-saffron/30" : ""}`}
              >
                <div>
                  {isToday ? (
                    <span className="inline-block px-2.5 py-0.5 mb-2 rounded-full bg-saffron text-white text-[10px] font-bold uppercase tracking-wider">
                      🌟 Live Today
                    </span>
                  ) : isProposed ? (
                    <span className="inline-block px-2.5 py-0.5 mb-2 rounded-full bg-saffron/20 text-saffron border border-saffron/30 text-[10px] font-bold uppercase tracking-wider">
                      🎬 Proposed Event
                    </span>
                  ) : null}

                  <div className="text-4xl mb-3">{event.icon}</div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Calendar className="h-3 w-3 text-saffron" />
                    <span className="text-xs text-saffron font-bold uppercase tracking-wider">
                      {event.month} {event.year}
                    </span>
                  </div>
                  <h3 className="font-display text-sm font-bold text-ink leading-tight group-hover:text-saffron transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-start gap-1.5 mt-2 text-ink-soft">
                    <MapPin className="h-3 w-3 text-saffron shrink-0 mt-0.5" />
                    <span className="text-xs">{event.location}</span>
                  </div>

                  {isProposed && ageGroups.length > 0 && (
                    <div className="mt-2 text-[11px] font-bold text-saffron">
                      🎯 Age Groups: {ageGroups.join(" & ")}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-border/40 text-[11px] font-bold text-saffron flex items-center justify-between">
                  <span>View Details</span>
                  <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Exhibition count badge */}
      <div className="flex justify-center mt-5">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/5 border border-saffron/20">
          <span className="text-xs text-ink-soft">
            <LanguageAware en="8 Global Yatras · Exhibition Series" hi="8 विश्व यात्राएँ" pa="8 ਵਿਸ਼ਵ ਯਾਤਰਾਵਾਂ" />
          </span>
        </div>
      </div>

      {/* Browse Full CTA */}
      <div className="text-center mt-10">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-linear-to-r from-saffron to-saffron-deep text-white font-bold text-sm shadow-xl shadow-saffron/20 hover:opacity-90 transition-opacity"
        >
          <LanguageAware en="Browse Full Events" hi="पूरे कार्यक्रम देखें" pa="ਪੂਰੇ ਕਾਰਯਕਰਮ ਵੇਖੋ" />
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.section>
  );
}
