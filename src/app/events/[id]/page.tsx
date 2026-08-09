"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Users, Globe, Clock, CheckCircle2 } from "lucide-react";
import { brhf } from "@/data/brhf";
import { LanguageAware } from "@/components/LanguageAware";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const matched = brhf.globalEvents.find(
    (e) => e.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === id
  ) || brhf.globalEvents[0];

  return (
    <div className="min-h-screen bg-bg text-ink pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <Breadcrumb
          currentLabel={{
            en: matched.title,
            hi: matched.title,
            pa: matched.title,
          }}
        />

        <div className="rounded-3xl card-glass card-saffron-glow p-6 md:p-10">
          <div className="text-5xl mb-4">{matched.icon || "🏛️"}</div>
          <span className="px-3 py-1 rounded-full bg-saffron/15 text-xs font-bold text-saffron uppercase tracking-wider">
            {matched.month} {matched.year}
          </span>

          <h1 className="font-display text-3xl md:text-5xl font-bold text-gradient-saffron leading-tight mt-3 mb-4">
            {matched.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-ink-soft mb-8 font-medium border-b border-border/50 pb-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-saffron" />
              <span>{matched.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-saffron" />
              <span>{matched.month} {matched.year}</span>
            </div>
          </div>

          <div className="prose max-w-none text-ink leading-relaxed font-medium mb-8">
            <p className="text-lg text-ink-soft leading-relaxed mb-4">{matched.description}</p>
            <p className="text-sm text-ink-soft leading-relaxed">
              Organized by the British Ravidassia Heritage Foundation (BRHF) in collaboration with international patron Shri Om Prakash, India Head Shri Rajesh Bagha, and Secretary Sat Paul MBE.
            </p>
          </div>

          {/* Agenda highlights */}
          <div className="p-6 rounded-2xl bg-surface-2/60 border border-border mb-8">
            <h3 className="font-display text-lg font-bold text-saffron mb-4">Key Event Highlights & Agenda</h3>
            <ul className="space-y-3">
              {[
                "Keynote lectures by international scholars on Be-gumpura & Human Rights",
                "Unveiling of the 650th Commemorative Souvenir & Exhibition Panels",
                "Recital of 40 Shabads in traditional classical Raags",
                "Interfaith Dialogue on anti-caste egalitarian civic principles",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-ink">
                  <CheckCircle2 className="h-4 w-4 text-saffron shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-saffron/10 border border-saffron/30">
            <div>
              <h4 className="font-display text-base font-bold text-ink">Want to participate or submit research?</h4>
              <p className="text-xs text-ink-soft">Contact BRHF Secretariat: brhresearch@yahoo.com</p>
            </div>
            <Link
              href="/events"
              className="px-6 py-3 rounded-xl bg-linear-to-r from-saffron to-saffron-deep text-white text-xs font-bold shadow-lg shadow-saffron/20 hover:opacity-90 transition-opacity"
            >
              Register Delegate Pass
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
