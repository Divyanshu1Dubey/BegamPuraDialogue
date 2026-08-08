"use client";

import { motion } from "framer-motion";
import { Begampura } from "@/components/Begampura";
import { ShieldCheck, HeartHandshake, Scale, Sun, Sparkles } from "lucide-react";
import { LanguageAware } from "@/components/LanguageAware";

const pillars = [
  {
    num: "01",
    title: "Dookh Andohu Nahi Tihi Thaao",
    translation: "Land Without Sorrow or Fear",
    desc: "A society where psychological anxiety, physical suffering, and institutional oppression are completely eliminated.",
    icon: Sun,
  },
  {
    num: "02",
    title: "Naa Tasvees Kolu Na Maalu",
    translation: "No Tax on Commodity or Labour",
    desc: "Economic justice where work is dignified, and no unjust taxes or extortion burden the working class.",
    icon: Scale,
  },
  {
    num: "03",
    title: "Khaufu Na Khata Na Tarasu Javaalu",
    translation: "No Fear of Downfall or Error",
    desc: "Legal protection and civic liberty where citizens do not live under state surveillance or arbitrary prosecution.",
    icon: ShieldCheck,
  },
  {
    num: "04",
    title: "Dom Na Sem Ek So Aasa",
    translation: "No Second or Third Class Citizens",
    desc: "Absolute radical equality regardless of caste, creed, lineage, gender, or social origin.",
    icon: HeartHandshake,
  },
  {
    num: "05",
    title: "Jo Ham Shahari Su Meet Hamara",
    translation: "Whosoever Resides Here is My Friend",
    desc: "Universal fraternity where civic citizenship is rooted in unconditional fellowship and mutual love.",
    icon: Sparkles,
  }
];

export default function BegampuraPage() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Begampura />

      {/* Deep-Dive 5 Pillars Section */}
      <section className="py-24 border-t border-border/50 bg-bg-soft">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full bg-saffron/10 border border-saffron/30 text-xs font-bold text-saffron uppercase tracking-widest">
              Civic Architecture
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-saffron mt-3">
              The 5 Pillars of Begampura
            </h2>
            <p className="text-base text-ink-soft mt-4 font-medium">
              Sant Ravidas Ji&apos;s original 14th-century verses from Sri Guru Granth Sahib Ji (Ang 345) translated into core modern democratic principles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="p-8 rounded-3xl card-glass card-saffron-glow relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-3xl font-bold text-saffron opacity-80">{p.num}</span>
                    <div className="p-3 rounded-2xl bg-saffron/15 text-saffron">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="font-unicode text-lg font-bold text-saffron mb-1">{p.title}</h3>
                  <h4 className="font-display text-xl font-bold text-ink mb-3">{p.translation}</h4>
                  <p className="text-xs md:text-sm text-ink-soft leading-relaxed font-medium">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
