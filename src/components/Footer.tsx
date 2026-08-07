"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { LanguageAware } from "./LanguageAware";
import { useLanguage } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();

  const quickLinks = [
    { labelKey: "about", href: "/about" },
    { labelKey: "teachings", href: "/teachings" },
    { labelKey: "begampura", href: "/begampura" },
    { labelKey: "shabads", href: "/shabads" },
    { labelKey: "events", href: "/events" },
    { labelKey: "library", href: "/library" },
    { labelKey: "gallery", href: "/gallery" },
    { labelKey: "connect", href: "/connect" },
  ];

  function navLabel(key: string) {
    const entry = (t.nav as Record<string, { en: string; hi: string; pa: string }>)[key];
    return entry ? <LanguageAware {...entry} /> : key;
  }
  return (
    <footer className="relative mt-32 border-t border-border/50 bg-bg-soft">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-saffron/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-saffron to-saffron-deep opacity-80" />
                <span className="relative text-white font-display font-bold text-sm">BR</span>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-gradient-saffron">
                  British Ravidassia Heritage Foundation
                </h3>
                <p className="text-xs text-ink-soft">Charity Reg. 1199953 (UK)</p>
              </div>
            </div>
            <p className="text-sm text-ink-soft max-w-md leading-relaxed">
              Dedicated to preserving and propagating the timeless teachings of
              Sant Ravidas Ji — the light of Begampura for a world free from
              sorrow, fear, and inequality.
            </p>
            <p className="mt-4 text-xs text-ink-soft/60">
              1 Chaucer Drive, Biggleswade, Bedfordshire SG18 8QG, UK
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold text-saffron mb-4 uppercase tracking-wider">
              <LanguageAware en="Quick Links" hi="त्वरित लिंक" pa="ਤੇਜ਼ ਲਿੰਕ" />
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
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

          {/* Stay Connected */}
          <div>
            <h4 className="font-display text-sm font-bold text-saffron mb-4 uppercase tracking-wider">
              <LanguageAware en="Stay Connected" hi="जुड़े रहें" pa="ਜੁੜੇ ਰਹੋ" />
            </h4>
            <p className="text-sm text-ink-soft mb-4">
              <LanguageAware
                en="Daily Shabad from Sri Guru Granth Sahib Ji in your inbox."
                hi="ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦਾ ਰੋਜ਼ ਦਾ ਸ਼ਬਦ ਤੁਹਾਡੇ ਇਨਬਾਕਸ ਵਿੱਚ।"
                pa="ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦਾ ਰੋਜ਼ ਦਾ ਸ਼ਬਦ ਤੁਹਾਡੇ ਇਨਬਾਕਸ ਵਿੱਚ।"
              />
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t.footer.emailPlaceholder[language]}
                className="flex-1 px-3 py-2 rounded-xl bg-surface border border-border text-sm text-ink placeholder:text-ink-soft/40 focus:outline-none focus:ring-2 focus:ring-saffron/50"
              />
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-saffron to-saffron-deep text-white text-sm font-medium hover:opacity-90 transition-opacity">
                <LanguageAware en="Join" hi="शामिल" pa="ਸ਼ਾਮਲ" />
              </button>
            </div>
            <Separator className="my-6 bg-border/50" />
            <div className="flex gap-3">
              {["FB", "TW", "IG", "YT"].map((s) => (
                <button
                  key={s}
                  className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center text-xs font-bold text-ink-soft hover:text-saffron hover:border-saffron/30 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-border/50" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-soft/50">
            &copy; {currentYear} British Ravidassia Heritage Foundation.{" "}
            <LanguageAware en="All rights reserved." hi="सर्वाधिकार सुरक्षित।" pa="ਸਾਰੇ ਅਧਿਕਾਰ ਰਾਖਵੇਂ।" />{" "}
            BRHF Charity No. 1199953
          </p>
          <div className="flex gap-6 text-xs text-ink-soft/50">
            <Link href="#" className="hover:text-saffron transition-colors"><LanguageAware en="Privacy Policy" hi="गोपनीयता नीति" pa="ਗੋਪਨੀਯਤਾ ਨੀਤੀ" /></Link>
            <Link href="#" className="hover:text-saffron transition-colors"><LanguageAware en="Terms of Use" hi="ਵਰਤੋਂ ਦੀਆਂ ਸ਼ਰਤਾਂ" pa="ਵਰਤੋਂ ਦੀਆਂ ਸ਼ਰਤਾਂ" /></Link>
            <Link href="#" className="hover:text-saffron transition-colors"><LanguageAware en="Sitemap" hi="ਸਾਇਟਮੈਪ" pa="ਸਾਈਟਮੈਪ" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}