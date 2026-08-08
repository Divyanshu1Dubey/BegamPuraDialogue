"use client";

import { motion } from "framer-motion";
import { About } from "@/components/About";
import { brhf } from "@/data/brhf";
import { LanguageAware } from "@/components/LanguageAware";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Breadcrumb currentLabel={{ en: "About BRHF", hi: "बीआरएचएफ के बारे में", pa: "ਬੀਆਰਐਚਐਫ ਬਾਰੇ" }} />

      <About />

      {/* Leadership & Global Patronage Section */}
      <section className="py-20 border-t border-border/50 bg-bg-soft">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full bg-saffron/10 border border-saffron/30 text-xs font-bold text-saffron uppercase tracking-widest">
              Organizational Leadership
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient-saffron mt-3">
              British Ravidassia Heritage Foundation
            </h2>
            <p className="text-sm text-ink-soft mt-3 font-medium">
              Registered Charity 1199953 (United Kingdom) · Dedicated to the global 650th Janam Jayanti Commemoration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl card-glass card-saffron-glow text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-saffron/15 text-saffron flex items-center justify-center font-display font-bold text-2xl mb-4">
                OP
              </div>
              <h3 className="font-display text-xl font-bold text-ink">{brhf.leadership.internationalPatron.name}</h3>
              <p className="text-xs text-saffron font-bold uppercase tracking-wider mt-1 mb-3">
                {brhf.leadership.internationalPatron.title}
              </p>
              <p className="text-xs text-ink-soft leading-relaxed font-medium">
                Guiding the global vision of 650th commemorative exhibitions across Europe, North America, and Asia.
              </p>
            </div>

            <div className="p-8 rounded-3xl card-glass card-saffron-glow text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-saffron/15 text-saffron flex items-center justify-center font-display font-bold text-2xl mb-4">
                RB
              </div>
              <h3 className="font-display text-xl font-bold text-ink">{brhf.leadership.indiaHead.name}</h3>
              <p className="text-xs text-saffron font-bold uppercase tracking-wider mt-1 mb-3">
                {brhf.leadership.indiaHead.title}
              </p>
              <p className="text-xs text-ink-soft leading-relaxed font-medium">
                Coordinating national dialogue initiatives in Delhi, Varanasi, and Punjab for the 650th Birth Anniversary.
              </p>
            </div>

            <div className="p-8 rounded-3xl card-glass card-saffron-glow text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-saffron/15 text-saffron flex items-center justify-center font-display font-bold text-2xl mb-4">
                SP
              </div>
              <h3 className="font-display text-xl font-bold text-ink">{brhf.leadership.secretary.name}</h3>
              <p className="text-xs text-saffron font-bold uppercase tracking-wider mt-1 mb-3">
                {brhf.leadership.secretary.title}
              </p>
              <p className="text-xs text-ink-soft leading-relaxed font-medium">
                Overseeing Foundation operations, research publications, and parliamentary delegations in London and Brussels.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
