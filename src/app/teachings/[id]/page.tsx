"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Scale, BookOpen, Heart } from "lucide-react";
import { raags } from "@/data/raags";
import { LanguageAware } from "@/components/LanguageAware";

export default function TeachingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const item = raags.find((r) => r.id === id) || raags[0];

  return (
    <div className="min-h-screen bg-bg text-ink pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <Link
          href="/teachings"
          className="inline-flex items-center gap-2 text-sm text-saffron hover:underline mb-8 font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          <LanguageAware en="Back to All Teachings" hi="सभी उपदेशों पर वापस जाएं" pa="ਸਾਰੇ ਉਪਦੇਸ਼ਾਂ 'ਤੇ ਵਾਪਸ ਜਾਓ" />
        </Link>

        <div className="rounded-3xl card-glass card-saffron-glow p-6 md:p-10">
          <div className="text-5xl mb-4">{item.emoji}</div>
          <span className="px-3 py-1 rounded-full bg-saffron/15 text-xs font-bold text-saffron uppercase tracking-wider">
            Ang {item.ang} · {item.shabadsCount} Compositions
          </span>

          <h1 className="font-display text-3xl md:text-5xl font-bold text-gradient-saffron leading-tight mt-3 mb-2">
            Raag {item.name} — Spiritual & Civic Philosophy
          </h1>
          <p className="text-sm font-bold text-saffron uppercase tracking-widest mb-8">{item.symbolism}</p>

          <div className="space-y-6 mb-8">
            <div className="p-6 rounded-2xl bg-surface-2/60 border border-border">
              <h3 className="font-display text-base font-bold text-saffron mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Spiritual Essence (Dhyapan)
              </h3>
              <p className="text-base text-ink leading-relaxed font-medium mb-3">{item.dhyapan}</p>
              {item.dhyapanHindi && (
                <p className="text-sm text-ink-soft leading-relaxed font-unicode">{item.dhyapanHindi}</p>
              )}
            </div>

            <div className="p-6 rounded-2xl bg-saffron/10 border border-saffron/30">
              <h3 className="font-display text-base font-bold text-saffron-deep dark:text-saffron mb-2 flex items-center gap-2">
                <Scale className="h-4 w-4" /> Contemporary Governance Principle
              </h3>
              <p className="text-base text-ink leading-relaxed font-medium">{item.governancePrinciple}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-ink-soft">Sri Guru Granth Sahib Ji — Ang {item.ang}</span>
            <Link
              href="/shabads"
              className="px-5 py-2.5 rounded-xl bg-saffron text-white text-xs font-bold shadow-md shadow-saffron/20 hover:bg-saffron-deep transition-colors"
            >
              Read Shabads in Raag {item.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
