"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, Languages, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useLanguage } from "@/i18n/LanguageContext";
import { languageMeta, Language } from "@/i18n/translations";

const navItems = [
  { href: "#home", labelEn: "Home" },
  { href: "#about", labelEn: "About" },
  { href: "#teachings", labelEn: "Teachings" },
  { href: "#begampura", labelEn: "Begampura" },
  { href: "#shabads", labelEn: "16 Raags" },
  { href: "#events", labelEn: "Events" },
  { href: "#library", labelEn: "E-Library" },
  { href: "#gallery", labelEn: "Gallery" },
  { href: "#connect", labelEn: "Connect" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-saffron/5"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-saffron to-saffron-deep opacity-80 animate-pulse-saffron" />
            <span className="relative text-white font-display font-bold text-sm">BR</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold leading-tight text-gradient-saffron">
              BRHF
            </span>
            <span className="text-[9px] uppercase tracking-widest text-ink-soft leading-tight">
              650th Janam Jayanti
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href.replace("#", ""))}
              className="px-3 py-2 text-sm text-ink-soft hover:text-saffron transition-colors duration-200 relative group"
            >
              {item.labelEn}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-saffron to-marigold transition-all duration-300 group-hover:w-3/4" />
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language */}
          <div className="relative">
            <LanguageSelector
              current={language}
              onChange={setLanguage}
              labels={languageMeta}
            />
          </div>

          {/* Theme */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl hover:bg-surface transition-colors text-ink-soft hover:text-saffron"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 hidden dark:block" />
            <Moon className="h-4 w-4 block dark:hidden" />
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-surface transition-colors text-ink-soft"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-bg/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item.href.replace("#", ""))}
                  className="text-left px-3 py-3 rounded-xl hover:bg-surface text-ink-soft hover:text-saffron transition-colors"
                >
                  {item.labelEn}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function LanguageSelector({
  current,
  onChange,
  labels,
}: {
  current: Language;
  onChange: (l: Language) => void;
  labels: Record<Language, { native: string; code: string }>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-medium text-ink-soft hover:text-saffron hover:bg-surface transition-colors"
      >
        <Languages className="h-3.5 w-3.5" />
        <span>{labels[current].code}</span>
        <ChevronDown className="h-3 w-3 transition-transform duration-200" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 bg-surface border border-border rounded-xl shadow-2xl shadow-saffron/5 overflow-hidden z-50 min-w-[120px]"
          >
            {(Object.keys(labels) as Language[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  onChange(key);
                  setOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-2.5 text-sm transition-colors",
                  current === key
                    ? "bg-saffron/15 text-saffron"
                    : "text-ink-soft hover:text-saffron hover:bg-surface-2"
                )}
              >
                <span className="font-medium">{labels[key].native}</span>
                <span className="text-xs ml-2 opacity-60">{labels[key].code}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}