"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LanguageAware } from "./LanguageAware";

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
];

const socials = [
  { label: "FB", href: "#" },
  { label: "IG", href: "#" },
  { label: "YT", href: "#" },
  { label: "X", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-bg-soft mt-24">
      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-24 bg-linear-to-r from-transparent via-saffron to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-saffron to-saffron-deep flex items-center justify-center shadow-md shadow-saffron/20">
                <span className="text-white font-display font-bold text-base">BR</span>
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-ink leading-tight">
                  BRHF
                </h3>
                <p className="text-[10px] text-ink-soft/60 tracking-wide">
                  Be-gumpura Dialogue
                </p>
              </div>
            </div>
            <p className="text-xs text-ink-soft leading-relaxed max-w-xs mb-5">
              <LanguageAware
                en="Preserving and propagating the timeless teachings of Satguru Ravidas Ji — the light of Be-gumpura for a world free from sorrow, fear, and inequality."
                hi="सतगुरु रविदास जी की अनANT शिक्षाओं का संरक्षण — बे-गमपुरा के प्रकाश के लिए समर्पित।"
                pa="ਸਤਗੁਰੂ ਰਵਿਦਾਸ ਜੀ ਦੀ ਅਨੰਤ ਸਿੱਖਿਆਵਾਂ ਦੀ ਰੱਖਿਆ — ਬੇ-ਗਮਪੁਰਾ ਦੀ ਰੋਸ਼ਨੀ ਲਈ ਸਮਰਪਿਤ।"
              />
            </p>
            <p className="text-[11px] text-ink-soft/50">
              1 Chaucer Drive, Biggleswade, SG18 8QG, UK
            </p>
            <p className="text-[11px] text-ink-soft/50 mt-0.5">
              brhresearch@yahoo.com
            </p>
          </div>

          {/* Navigation */}
          {footerLinks.map((group) => (
            <div key={group.titleKey}>
              <h4 className="font-display text-[11px] font-bold text-saffron mb-4 uppercase tracking-widest">
                <LanguageAware
                  en={group.titleKey}
                  hi={group.titleKey === "explore" ? "अन्वेषण" : "खोजें"}
                  pa={group.titleKey === "explore" ? "ਖੋਜ" : "ਖੋਜੋ"}
                />
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs text-ink-soft hover:text-saffron transition-colors duration-200"
                    >
                      {item.labelKey.charAt(0).toUpperCase() + item.labelKey.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Connect */}
          <div>
            <h4 className="font-display text-[11px] font-bold text-saffron mb-4 uppercase tracking-widest">
              <LanguageAware en="Connect" hi="जुड़ें" pa="ਜੁੜੋ" />
            </h4>
            <p className="text-xs text-ink-soft mb-4 leading-relaxed">
              <LanguageAware
                en="Daily Shabad from Sri Guru Granth Sahib Ji in your inbox."
                hi="ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦਾ ਰੋਜ਼ ਦਾ ਸ਼ਬਦ ਤੁਹਾਡੇ ਇਨਬਾਕਸ ਵਿੱਚ।"
                pa="ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦਾ ਰੋਜ਼ ਦਾ ਸ਼ਬਦ ਤੁਹਾਡੇ ਇਨਬਾਕਸ ਵਿੱਚ।"
              />
            </p>
            <div className="flex gap-2 mb-5">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-[10px] font-bold text-ink-soft hover:text-saffron hover:border-saffron/30 transition-all"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-ink-soft/40 text-center sm:text-left">
            &copy; {new Date().getFullYear()} British Ravidassia Heritage Foundation. All rights reserved. BRHF Charity No. 1199953
          </p>
          <div className="flex gap-5 text-[11px] text-ink-soft/40">
            <Link href="#" className="hover:text-saffron transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-saffron transition-colors">Terms</Link>
            <Link href="#" className="hover:text-saffron transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
