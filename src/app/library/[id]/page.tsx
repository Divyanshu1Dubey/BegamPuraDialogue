"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Download, Share2, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { LanguageAware } from "@/components/LanguageAware";

export default function LibraryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="min-h-screen bg-bg text-ink pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <Link
          href="/library"
          className="inline-flex items-center gap-2 text-sm text-saffron hover:underline mb-8 font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          <LanguageAware en="Back to E-Library Archive" hi="डिजिटल लाइब्रेरी पर वापस जाएं" pa="ਡਿਜੀਟਲ ਲਾਇਬ੍ਰੇਰੀ 'ਤੇ ਵਾਪਸ ਜਾਓ" />
        </Link>

        <div className="rounded-3xl card-glass card-saffron-glow p-6 md:p-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-saffron/15 text-xs font-bold text-saffron uppercase">
              BRHF Publication Archive
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold text-gradient-saffron leading-tight mb-3">
            Begampura: The Vision of Human Rights & Social Equality
          </h1>
          <p className="text-sm font-bold text-saffron mb-8">BRHF Academic Research Council · Published 2024</p>

          <div className="p-6 rounded-2xl bg-surface-2/60 border border-border mb-8">
            <h3 className="font-display text-base font-bold text-ink mb-2">Abstract & Scope</h3>
            <p className="text-sm text-ink-soft leading-relaxed font-medium mb-4">
              This publication provides an exhaustive historical and philosophical analysis of Sant Ravidas Ji's 14th-century composition 'Begampura' (City Without Sorrow). It compares his radical egalitarian blueprint with contemporary democratic governance and global human rights treaties.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            <h4 className="font-display text-sm font-bold text-saffron uppercase tracking-wider">Volume Contents</h4>
            {[
              "Chapter I: The Historical Context of 14th Century Kashi (Varanasi)",
              "Chapter II: Exegesis of the 5 Civic Pillars of Begampura",
              "Chapter III: Anti-Caste Thought and Dignity of Physical Labour",
              "Chapter IV: Comparative Analysis with UN Human Rights Declarations",
              "Chapter V: Global Yatras & The 650th Janam Jayanti Roadmap",
            ].map((ch, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs text-ink p-3 rounded-xl bg-surface border border-border/50">
                <CheckCircle2 className="h-4 w-4 text-saffron shrink-0" />
                <span className="font-semibold">{ch}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 p-6 rounded-2xl bg-saffron/10 border border-saffron/30">
            <div>
              <span className="text-xs font-bold text-ink-soft">Available in PDF (148 Pages)</span>
              <p className="text-xs text-saffron-deep dark:text-saffron font-bold">Free Open-Access Download</p>
            </div>
            <a
              href="/assets/sample.pdf"
              download
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-saffron to-saffron-deep text-white font-bold text-xs shadow-lg shadow-saffron/20 flex items-center gap-2"
            >
              <Download className="h-4 w-4" /> Download PDF (4.2 MB)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
