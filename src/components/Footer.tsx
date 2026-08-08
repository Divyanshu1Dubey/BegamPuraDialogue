"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { LanguageAware } from "./LanguageAware";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

const footerLinks = [
  {
    titleKey: "explore",
    links: [
      { labelKey: "about", href: "/about" },
      { labelKey: "teachings", href: "/teachings" },
      { labelKey: "begampura", href: "/begampura" },
      { labelKey: "shabads", href: "/shabads" },
    ],
  },
  {
    titleKey: "discover",
    links: [
      { labelKey: "events", href: "/events" },
      { labelKey: "library", href: "/library" },
      { labelKey: "gallery", href: "/gallery" },
      { labelKey: "connect", href: "/connect" },
    ],
  },
  {
    titleKey: "resources",
    links: [
      { labelKey: "admin", href: "/admin" },
    ],
  },
];

const socials = [
  { label: "FB", href: "#" },
  { label: "IG", href: "#" },
  { label: "YT", href: "#" },
  { label: "X", href: "#" },
];

function navLabel(key: string) {
  const entry = (t.nav as Record<string, { en: string; hi: string; pa: string }>)[key];
  return entry ? <LanguageAware {...entry} /> : key;
}

const footerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-32 bg-bg-soft overflow-hidden">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-saffron/60 to-transparent" />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-saffron/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-royal/5 blur-3xl" />
      </div>

      {/* Main footer content */}
      <motion.div
        variants={footerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative mx-auto max-w-7xl px-4 lg:px-8 pt-20 pb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column — spans 5 cols */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 rounded-xl bg-linear-to-br from-saffron to-saffron-deep opacity-90" />
                <span className="relative text-white font-display font-bold text-lg">BR</span>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-gradient-saffron leading-tight">
                  British Ravidassia Heritage Foundation
                </h3>
                <p className="text-[11px] text-ink-soft/70 tracking-wide">Charity Reg. 1199953 (UK)</p>
              </div>
            </div>
            <p className="text-sm text-ink-soft leading-relaxed max-w-sm mb-4">
              <LanguageAware
                en="Dedicated to preserving and propagating the timeless teachings of Sant Ravidas Ji — the light of Begampura for a world free from sorrow, fear, and inequality."
                hi="संत रविदास जी की अनANT शिक्षाओं का संरक्षण और प्रचार — बेगमपुरा के प्रकाश के लिए समर्पित।"
                pa="ਸੰਤ ਰਵਿਦਾਸ ਜੀ ਦੀ ਅਨੰਤ ਸਿੱਖਿਆਵਾਂ ਦੀ ਰੱਖਿਆ ਅਤੇ ਪ੍ਰਚਾਰ — ਬੇਗਮਪੁਰਾ ਦੀ ਰੋਸ਼ਨੀ ਲਈ ਸਮਰਪਿਤ।"
              />
            </p>
            <div className="flex items-start gap-2 text-xs text-ink-soft/60">
              <MapPinIcon />
              <span>1 Chaucer Drive, Biggleswade, Bedfordshire SG18 8QG, UK</span>
            </div>
          </motion.div>

          {/* Nav links */}
          <motion.div variants={itemVariants} className="lg:col-span-3 lg:col-start-7">
            {footerLinks.map((group) => (
              <div key={group.titleKey} className="mb-5 last:mb-0">
                <h4 className="font-display text-xs font-bold text-saffron mb-3 uppercase tracking-widest">
                  <LanguageAware
                    en={group.titleKey}
                    hi={group.titleKey === "explore" ? "अन्वेषण" : group.titleKey === "discover" ? "खोजें" : "संसाधन"}
                    pa={group.titleKey === "explore" ? "ਖੋਜ" : group.titleKey === "discover" ? "ਖੋਜੋ" : "ਸਰੋਤ"}
                  />
                </h4>
                <ul className="space-y-2">
                  {group.links.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-ink-soft hover:text-saffron transition-colors duration-200 hover:translate-x-1 inline-block"
                      >
                        {navLabel(item.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Newsletter + Social */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <h4 className="font-display text-xs font-bold text-saffron mb-3 uppercase tracking-widest">
              <LanguageAware en="Stay Connected" hi="जुड़े रहें" pa="ਜੁੜੇ ਰਹੋ" />
            </h4>
            <p className="text-sm text-ink-soft mb-4 leading-relaxed">
              <LanguageAware
                en="Daily Shabad from Sri Guru Granth Sahib Ji in your inbox."
                hi="ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦਾ ਰੋਜ਼ ਦਾ ਸ਼ਬਦ ਤੁਹਾਡੇ ਇਨਬਾਕਸ ਵਿੱਚ।"
                pa="ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦਾ ਰੋਜ਼ ਦਾ ਸ਼ਬਦ ਤੁਹਾਡੇ ਇਨਬਾਕਸ ਵਿੱਚ।"
              />
            </p>
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder={t.footer.emailPlaceholder[language]}
                className="flex-1 px-3 py-2.5 rounded-xl bg-surface border border-border text-sm text-ink placeholder:text-ink-soft/40 focus:outline-none focus:ring-2 focus:ring-saffron/50"
              />
              <button className="px-5 py-2.5 rounded-xl bg-linear-to-r from-saffron to-saffron-deep text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-saffron/20">
                <LanguageAware en="Join" hi="शामिल" pa="ਸ਼ਾਮਲ" />
              </button>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-xs font-bold text-ink-soft hover:text-saffron hover:border-saffron/30 hover:scale-110 transition-all"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        <Separator className="my-10 bg-border/40" />

        {/* Bottom bar */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-soft/50 text-center md:text-left">
            &copy; {currentYear} British Ravidassia Heritage Foundation.{" "}
            <LanguageAware en="All rights reserved." hi="सर्वाधिकार सुरक्षित।" pa="ਸਾਰੇ ਅਧਿਕਾਰ ਰਾਖਵੇਂ।" />{" "}
            BRHF Charity No. 1199953
          </p>
          <div className="flex gap-6 text-xs text-ink-soft/50">
            <Link href="#" className="hover:text-saffron transition-colors">
              <LanguageAware en="Privacy Policy" hi="गोपनीयता नीति" pa="ਗੋਪਨੀਯਤਾ ਨੀਤੀ" />
            </Link>
            <Link href="#" className="hover:text-saffron transition-colors">
              <LanguageAware en="Terms of Use" hi="ਵਰਤੋਂ ਦੀਆਂ ਸ਼ਰਤਾਂ" pa="ਵਰਤੋਂ ਦੀਆਂ ਸ਼ਰਤਾਂ" />
            </Link>
            <Link href="#" className="hover:text-saffron transition-colors">
              <LanguageAware en="Sitemap" hi="ਸਾਇਟਮੈਪ" pa="ਸਾਈਟਮੈਪ" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

function MapPinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-saffron shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <circle cx="12" cy="11" r="1.5" />
    </svg>
  );
}
