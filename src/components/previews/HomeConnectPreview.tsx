"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Mail, Phone, MapPin, UserPlus, HandHeart, MessageCircle, Send } from "lucide-react";
import { brhf } from "@/data/brhf";
import { LanguageAware } from "../LanguageAware";

const connectOptions = [
  { icon: UserPlus, title: "Membership", titleHi: "सदस्यता", desc: "Join the BRHF global family." },
  { icon: HandHeart, title: "Volunteer", titleHi: "स्वयंसेवक", desc: "Help organise exhibitions, yatras, and outreach programmes." },
  { icon: MessageCircle, title: "Donate", titleHi: "दान", desc: "Support the 650th Janam Jayanti Global Commemorative Series." },
  { icon: Send, title: "Outreach", titleHi: "सम्पर्क", desc: "Interfaith dialogue, community events, university programmes." },
];

export function HomeConnectPreview() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="relative py-20 md:py-24 overflow-hidden"
    >
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 mb-3 rounded-full bg-royal/20 border border-violet/40 text-[11px] font-medium text-violet uppercase tracking-widest">
          <LanguageAware en="Chapter VIII" hi="अध्याय VIII" pa="ਅਧਿਆਉ VIII" />
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient-saffron leading-tight">
          <LanguageAware en="Join the Begampura Family" hi="बेगमपुरा परिवार में शामिल हों" pa="ਬੇਗਮਪੁਰਾ ਪਰਿਵਾਰ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ" />
        </h2>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed max-w-2xl mx-auto">
          <LanguageAware
            en="Become a member, volunteer, or partner — the Begampura light grows stronger with every hand that holds it."
            hi="सदस्य बनें, स्वयंसेवक बनें, या भागीदार — बेगमपुरा का प्रकाश हर हाथ से जोड़ने पर मजबूत होता है।"
            pa="ਮੈਂਬਰ ਬਣੋ, ਵਲੰਟੀਅਰ ਬਣੋ, ਜਾਂ ਭਾਗੀਦਾਰ — ਬੇਗਮਪੁਰਾ ਦੀ ਰੋਸ਼ਨੀ ਹਰ ਹੱਥ ਨਾਲ ਮਜਬੂਤ ਹੁੰਦੀ।"
          />
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 max-w-4xl mx-auto">
          {connectOptions.map((opt, i) => {
            const Icon = opt.icon;
            return (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl p-4 card-glass card-saffron-glow text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-saffron/15 to-royal/15 flex items-center justify-center mx-auto mb-3">
                  <Icon className="h-4 w-4 text-saffron" />
                </div>
                <h3 className="font-display text-sm font-bold text-ink">{opt.title}</h3>
                <p className="text-[10px] text-saffron/60 mt-0.5">{opt.titleHi}</p>
                <p className="text-[11px] text-ink-soft mt-1.5 line-clamp-2">{opt.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Quick contact */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-xs text-ink-soft">
          <span className="flex items-center gap-1.5">
            <Mail className="h-3 w-3 text-saffron" /> {brhf.headquarters.email}
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="h-3 w-3 text-saffron" /> {brhf.headquarters.phone}
          </span>
        </div>

        {/* Browse Full CTA */}
        <div className="text-center mt-8">
          <Link
            href="/connect"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-linear-to-r from-royal to-royal-deep text-white font-bold text-sm shadow-xl shadow-royal/20 hover:opacity-90 transition-opacity"
          >
            <LanguageAware en="Join the Family" hi="परिवार में शामिल हों" pa="ਪਰਿਵਾਰ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ" />
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
