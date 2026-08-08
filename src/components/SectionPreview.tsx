"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { LanguageAware } from "./LanguageAware";

type SectionPreviewProps = {
  section: string;
  title: { en: string; hi: string; pa: string };
  subtitle?: string;
  description: string;
  icon?: React.ReactNode;
  href: string;
  accentColor?: "saffron" | "violet" | "royal" | "sindoor";
  children: React.ReactNode;
};

export function SectionPreview({
  section,
  title,
  subtitle,
  description,
  icon,
  href,
  accentColor = "saffron",
  children,
}: SectionPreviewProps) {
  const accentMap = {
    saffron: "from-saffron to-saffron-deep",
    violet: "from-violet to-violet-deep",
    royal: "from-royal to-royal-deep",
    sindoor: "from-saffron via-saffron-deep to-sindoor",
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="relative py-20 md:py-24 overflow-hidden"
    >
      {/* Section tag */}
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 mb-3 rounded-full bg-saffron/10 border border-saffron/30 text-[11px] font-medium text-saffron uppercase tracking-widest">
          {section}
        </span>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-saffron leading-tight">
          <LanguageAware en={title.en} hi={title.hi} pa={title.pa} />
        </h2>
        {subtitle && (
          <p className="mt-2 text-base text-saffron/80 font-display italic">{subtitle}</p>
        )}
        <p className="mt-4 text-sm md:text-base text-ink-soft leading-relaxed max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      {/* Section content preview */}
      <div className="relative max-w-6xl mx-auto">
        {children}
      </div>

      {/* Browse Full CTA */}
      <div className="text-center mt-10">
        <Link
          href={href}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-linear-to-r text-white font-bold text-sm shadow-xl shadow-saffron/20 hover:opacity-90 transition-opacity"
          style={{
            background: accentColor === "saffron"
              ? "linear-gradient(to right, #f5a623, #e88b1a)"
              : accentColor === "violet"
                ? "linear-gradient(to right, #7c3aed, #6d28d9)"
                : accentColor === "royal"
                  ? "linear-gradient(to right, #1e40af, #1e3a8a)"
                  : "linear-gradient(to right, #f5a623, #e88b1a, #c0392b)",
          }}
        >
          <LanguageAware
            en={`Browse Full ${title.en}`}
            hi={title.hi ? `पूरा ${title.hi} देखें` : ""}
            pa={title.pa ? `ਪੂਰਾ ${title.pa} ਵੇਖੋ` : ""}
          />
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.section>
  );
}
