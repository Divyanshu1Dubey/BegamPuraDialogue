"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, Languages, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useLanguage } from "@/i18n/LanguageContext";
import { languageMeta, Language, t } from "@/i18n/translations";
import { LanguageAware } from "./LanguageAware";

const navItems = [
  { href: "/", key: "home", section: "" },
  { href: "/about", key: "about", section: "about" },
  { href: "/teachings", key: "teachings", section: "teachings" },
  { href: "/begampura", key: "begampura", section: "begampura" },
  { href: "/shabads", key: "shabads", section: "shabads" },
  { href: "/events", key: "events", section: "events" },
  { href: "/library", key: "library", section: "library" },
  { href: "/gallery", key: "gallery", section: "gallery" },
  { href: "/connect", key: "connect", section: "connect" },
];

function navLabel(key: string) {
  const entry = (t.nav as Record<string, { en: string; hi: string; pa: string }>)[key];
  return entry ? <LanguageAware {...entry} /> : key;
}

function NavLink({ item, isActive }: { item: typeof navItems[0]; isActive: boolean }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // On home page, use anchor links for in-page scroll
  if (item.key === "home") {
    return (
      <Link
        href="/"
        className={cn(
          "px-3 py-2 text-sm transition-colors duration-200 relative group",
          isActive
            ? "text-saffron font-medium"
            : "text-ink-soft hover:text-saffron"
        )}
      >
        {navLabel(item.key)}
        <span
          className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-saffron to-marigold transition-all duration-300",
            isActive ? "w-3/4" : "w-0 group-hover:w-3/4"
          )}
        />
      </Link>
    );
  }

  // On home page, scroll to section instead of navigating
  if (isHome && item.section) {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      const el = document.getElementById(item.section);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    return (
      <button
        onClick={handleClick}
        className={cn(
          "px-3 py-2 text-sm transition-colors duration-200 relative group",
          isActive
            ? "text-saffron font-medium"
            : "text-ink-soft hover:text-saffron"
        )}
      >
        {navLabel(item.key)}
        <span
          className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-saffron to-marigold transition-all duration-300",
            isActive ? "w-3/4" : "w-0 group-hover:w-3/4"
          )}
        />
      </button>
    );
  }

  // On other pages, use Next.js Link
  return (
    <Link
      href={item.href}
      className={cn(
        "px-3 py-2 text-sm transition-colors duration-200 relative group",
        isActive
          ? "text-saffron font-medium"
          : "text-ink-soft hover:text-saffron"
      )}
    >
      {navLabel(item.key)}
      <span
        className={cn(
          "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-saffron to-marigold transition-all duration-300",
          isActive ? "w-3/4" : "w-0 group-hover:w-3/4"
        )}
      />
    </Link>
  );
}

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

  // On non-home pages, always show scrolled style
  const isHome = pathname === "/";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        (scrolled || !isHome)
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
              <LanguageAware
                en="650th Janam Jayanti"
                hi="650वीं जन्म जयंती"
                pa="650ਵੀਂ ਜਨਮ ਜਯੰਤੀ"
              />
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return <NavLink key={item.href} item={item} isActive={isActive} />;
          })}
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
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;
                const isHome = pathname === "/";

                const content = (
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "block text-left px-3 py-3 rounded-xl transition-colors",
                      isActive
                        ? "text-saffron font-medium bg-saffron/10"
                        : "text-ink-soft hover:text-saffron hover:bg-surface"
                    )}
                  >
                    {navLabel(item.key)}
                  </motion.span>
                );

                if (item.key === "home") {
                  return (
                    <Link key={item.href} href="/" onClick={() => setMobileOpen(false)}>
                      {content}
                    </Link>
                  );
                }

                if (isHome && item.section) {
                  return (
                    <button
                      key={item.href}
                      onClick={() => {
                        setMobileOpen(false);
                        const el = document.getElementById(item.section);
                        if (el) {
                          setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
                        }
                      }}
                    >
                      {content}
                    </button>
                  );
                }

                return (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                    {content}
                  </Link>
                );
              })}
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