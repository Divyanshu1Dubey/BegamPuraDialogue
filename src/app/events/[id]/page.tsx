"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Users, Globe, Clock, CheckCircle2, Sparkles, Award, Video } from "lucide-react";
import { brhf, CommemorativeEvent } from "@/data/brhf";
import { LanguageAware } from "@/components/LanguageAware";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const matched: CommemorativeEvent =
    (brhf.globalEvents as readonly CommemorativeEvent[]).find(
      (e) => e.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === id
    ) || brhf.globalEvents[0];

  const isToday = !!matched.isToday;
  const isProposed = !!matched.isProposed;
  const ageGroups = matched.ageGroups || [];
  const organizers = matched.organizers || [];

  return (
    <div className="min-h-screen bg-bg text-ink pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <Breadcrumb
          currentLabel={{
            en: matched.title,
            hi: matched.titleHindi || matched.title,
            pa: matched.title,
          }}
        />

        {isToday ? (
          /* Invitation Card Layout for Today's Event */
          <div className="rounded-3xl card-glass card-saffron-glow p-6 md:p-12 border-2 border-saffron/40 shadow-2xl relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header Badges & Logos */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-saffron text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-saffron/30">
                <Sparkles className="h-4 w-4 animate-pulse" />
                Live Today • 10 August 2026
              </span>
              <span className="text-xs font-semibold text-saffron uppercase tracking-widest">
                Official Inaugural Invitation
              </span>
            </div>

            {/* Organizers Ribbon */}
            <div className="p-4 rounded-2xl bg-surface/80 border border-saffron/20 mb-8 text-center">
              <p className="text-[11px] font-bold uppercase tracking-widest text-saffron mb-2">
                Organized & Sponsored By
              </p>
              <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs font-bold text-ink">
                <span>🏛️ British Ravidassia Heritage Foundation</span>
                <span>⚖️ NAMO Foundation</span>
                <span>🌐 Pathway Global Alliance</span>
                <span>🎓 Advanced Study Institute of ASIA</span>
              </div>
            </div>

            <div className="text-center max-w-2xl mx-auto mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-saffron mb-2">
                You are cordially invited to the
              </p>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold text-gradient-saffron leading-tight">
                {matched.title}
              </h1>
              {"subtitle" in matched && (
                <p className="text-sm font-semibold text-saffron mt-2 tracking-wide uppercase">
                  {matched.subtitle as string}
                </p>
              )}
              {"occasion" in matched && (
                <p className="text-xs font-bold text-ink-soft mt-3 bg-saffron/10 py-1.5 px-4 rounded-full inline-block">
                  {matched.occasion as string}
                </p>
              )}
            </div>

            {/* Key Event Details Card */}
            <div className="grid sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-surface border border-saffron/30 mb-8 text-center">
              <div className="p-3">
                <Calendar className="h-5 w-5 text-saffron mx-auto mb-1" />
                <span className="block text-[10px] uppercase font-bold text-ink-soft">Date</span>
                <span className="text-sm font-bold text-ink">10 August 2026 (Monday)</span>
              </div>
              <div className="p-3 border-y sm:border-y-0 sm:border-x border-border/60">
                <Clock className="h-5 w-5 text-saffron mx-auto mb-1" />
                <span className="block text-[10px] uppercase font-bold text-ink-soft">Time</span>
                <span className="text-sm font-bold text-ink">6:30 PM Onwards</span>
              </div>
              <div className="p-3">
                <MapPin className="h-5 w-5 text-saffron mx-auto mb-1" />
                <span className="block text-[10px] uppercase font-bold text-ink-soft">Venue</span>
                <span className="text-sm font-bold text-ink">Constitution Club of India, New Delhi</span>
              </div>
            </div>

            {/* Narrative text from Invitation Card */}
            <div className="space-y-4 text-sm text-ink leading-relaxed font-medium mb-8 bg-surface-2/40 p-6 rounded-2xl border border-border">
              <p>
                On the occasion of the 650th Birth Anniversary of Sant Shiromani Guru Ravidas Ji, the Begumpura Dialogue is envisioned as a two-year initiative inspired by his timeless philosophy and Shabds, promoting the values of equality, dignity, fraternity, justice, compassion, social harmony and freedom from discrimination.
              </p>
              <p>
                The Inaugural Conclave marks the commencement of this collective journey, bringing together stakeholders to shape the intellectual framework, thematic architecture and long-term roadmap of the Begumpura Dialogue.
              </p>
              <p>
                The occasion will also witness the launch of the Website, envisioned as a digital platform connecting communities, institutions and individuals committed to advancing the enduring vision of Begumpura.
              </p>
            </div>

            {/* Sacred Quote Box */}
            {"quote" in matched && (
              <div className="p-6 rounded-2xl bg-linear-to-r from-saffron/15 via-saffron/5 to-saffron/15 border border-saffron/40 text-center mb-8">
                <p className="font-serif text-lg md:text-xl font-bold text-ink mb-2 leading-relaxed">
                  “{"quote" in matched && (matched.quote as string)}”
                </p>
                <p className="text-xs font-bold text-saffron uppercase tracking-widest">
                  — {"quoteAuthor" in matched ? (matched.quoteAuthor as string) : "Sant Shiromani Guru Ravidas Ji"}
                </p>
              </div>
            )}

            {/* Gracious Presence Footer */}
            <div className="text-center pt-4 border-t border-border/60">
              <p className="text-xs italic text-ink-soft mb-6">
                Together, let us embark upon a collective journey towards the timeless vision of Begumpura.<br />
                <strong className="text-saffron font-bold uppercase tracking-wider">Your gracious presence will be our honour.</strong>
              </p>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-linear-to-r from-saffron to-saffron-deep text-white font-bold text-sm shadow-xl shadow-saffron/20 hover:opacity-90 transition-opacity"
              >
                Register Delegate Pass for Today
              </Link>
            </div>
          </div>
        ) : isProposed ? (
          /* Layout for Proposed Event */
          <div className="rounded-3xl card-glass card-saffron-glow p-6 md:p-10 border border-saffron/30">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-saffron/20 text-xs font-bold text-saffron uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Proposed Event
              </span>
              <span className="text-xs font-medium text-ink-soft">Youth & Creative Competition</span>
            </div>

            <div className="text-5xl mb-4">{matched.icon || "🎬"}</div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-gradient-saffron leading-tight mb-4">
              {matched.title}
            </h1>
            {matched.titleHindi && (
              <p className="text-sm font-semibold text-saffron mb-6">{matched.titleHindi}</p>
            )}

            {/* Age Groups Box */}
            <div className="p-6 rounded-2xl bg-saffron/10 border border-saffron/30 mb-8">
              <h3 className="font-display text-base font-bold text-ink mb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-saffron" />
                Target Age Groups
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {ageGroups.map((group) => (
                  <div
                    key={group}
                    className="p-3 rounded-xl bg-surface border border-saffron/20 text-center font-bold text-saffron text-sm"
                  >
                    🎯 {group}
                  </div>
                ))}
              </div>
            </div>

            <div className="prose max-w-none text-ink leading-relaxed font-medium mb-8">
              <p className="text-base text-ink-soft leading-relaxed mb-4">
                {matched.description}
              </p>
              <div className="p-4 rounded-xl bg-surface-2/60 border border-border text-xs text-ink-soft">
                📌 <strong>Status:</strong> Proposed Event. Complete theme details, submission guidelines, video specs, and prize awards will be announced separately soon.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-saffron/10 border border-saffron/30">
              <div>
                <h4 className="font-display text-base font-bold text-ink">Want to receive submission updates?</h4>
                <p className="text-xs text-ink-soft">Pre-register your interest to be notified when entries open.</p>
              </div>
              <Link
                href="/events"
                className="px-6 py-3 rounded-xl bg-linear-to-r from-saffron to-saffron-deep text-white text-xs font-bold shadow-lg shadow-saffron/20 hover:opacity-90 transition-opacity"
              >
                Proposed Event — Register Interest
              </Link>
            </div>
          </div>
        ) : (
          /* Standard Event Layout */
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
        )}
      </div>
    </div>
  );
}

