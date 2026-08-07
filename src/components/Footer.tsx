"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();
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
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "About BRHF", href: "/about" },
                { label: "Teachings", href: "/teachings" },
                { label: "Begampura Vision", href: "/begampura" },
                { label: "16 Raags", href: "/shabads" },
                { label: "Events 2026-27", href: "/events" },
                { label: "E-Library", href: "/library" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/connect" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-soft hover:text-saffron transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h4 className="font-display text-sm font-bold text-saffron mb-4 uppercase tracking-wider">
              Stay Connected
            </h4>
            <p className="text-sm text-ink-soft mb-4">
              Daily Shabad from Sri Guru Granth Sahib Ji in your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 rounded-xl bg-surface border border-border text-sm text-ink placeholder:text-ink-soft/40 focus:outline-none focus:ring-2 focus:ring-saffron/50"
              />
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-saffron to-saffron-deep text-white text-sm font-medium hover:opacity-90 transition-opacity">
                Join
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
            © {currentYear} British Ravidassia Heritage Foundation. All rights
            reserved. | BRHF Charity No. 1199953
          </p>
          <div className="flex gap-6 text-xs text-ink-soft/50">
            <a href="#" className="hover:text-saffron transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-saffron transition-colors">
              Terms of Use
            </a>
            <a href="#" className="hover:text-saffron transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}