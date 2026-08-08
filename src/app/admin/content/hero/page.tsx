"use client";

import { useAdmin } from "@/hooks/useAdmin";
import { AdminHero } from "@/lib/admin-data";

export default function HeroEditor() {
  const { state, update } = useAdmin();
  const hero = state.hero;

  const set = (partial: Partial<AdminHero>) => update("hero", partial);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-ink dark:text-white">Hero Section</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Edit the main hero banner content shown on the homepage.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-5">
        {/* Title */}
        <FieldLabel label="Main Title">
          <input
            value={hero.title}
            onChange={(e) => set({ title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-lg font-display font-semibold focus:outline-none focus:ring-2 focus:ring-saffron/40"
          />
        </FieldLabel>

        {/* Subtitle */}
        <FieldLabel label="Subtitle">
          <input
            value={hero.subtitle}
            onChange={(e) => set({ subtitle: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
          />
        </FieldLabel>

        {/* Tagline */}
        <FieldLabel label="Tagline">
          <input
            value={hero.tagline}
            onChange={(e) => set({ tagline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
          />
        </FieldLabel>

        {/* Primary CTA */}
        <FieldLabel label="Primary Button Text">
          <input
            value={hero.ctaPrimary}
            onChange={(e) => set({ ctaPrimary: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
          />
        </FieldLabel>

        {/* Secondary CTA */}
        <FieldLabel label="Secondary Button Text">
          <input
            value={hero.ctaSecondary}
            onChange={(e) => set({ ctaSecondary: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
          />
        </FieldLabel>

        {/* Portrait Image Path */}
        <FieldLabel label="Portrait Image Path">
          <input
            value={hero.portraitSrc}
            onChange={(e) => set({ portraitSrc: e.target.value })}
            placeholder="/assets/OIP.webp"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
          />
          <p className="text-xs text-gray-400 mt-1">Path relative to the /public folder.</p>
        </FieldLabel>
      </div>

      {/* Preview */}
      <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Live Preview</p>
        <h2 className="text-3xl font-display font-bold text-gradient-saffron">{hero.title}</h2>
        <p className="text-ink-soft mt-2">{hero.subtitle}</p>
        <p className="text-xs text-gray-400 mt-1">{hero.tagline}</p>
        <div className="mt-4 flex gap-3 justify-center">
          <span className="px-4 py-2 rounded-lg bg-saffron text-white text-sm">{hero.ctaPrimary}</span>
          <span className="px-4 py-2 rounded-lg border border-saffron/40 text-ink text-sm">{hero.ctaSecondary}</span>
        </div>
      </div>
    </div>
  );
}

function FieldLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink dark:text-gray-300 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
