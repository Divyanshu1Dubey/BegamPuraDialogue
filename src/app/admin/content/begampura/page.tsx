"use client";

import { useAdmin } from "@/hooks/useAdmin";
import type { AdminBegampura } from "@/lib/admin-data";

export default function BegampuraEditor() {
  const { state, update } = useAdmin();
  const b = state.begampura;

  const set = (partial: Partial<AdminBegampura>) => update("begampura", partial);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-ink dark:text-white">Begampura Vision</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Edit the Begampura section heading, subheading, vision text, and pillars.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-5">
        <Field label="Heading">
          <input
            value={b.heading}
            onChange={(e) => set({ heading: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-lg font-display font-semibold focus:outline-none focus:ring-2 focus:ring-saffron/40"
          />
        </Field>

        <Field label="Subheading">
          <input
            value={b.subheading}
            onChange={(e) => set({ subheading: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
          />
        </Field>

        <Field label="Vision Text">
          <textarea
            value={b.vision}
            onChange={(e) => set({ vision: e.target.value })}
            rows={4}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40 resize-y"
          />
        </Field>
      </div>

      {/* Pillars */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-ink dark:text-white">Four Pillars</h3>
        {b.pillars.map((pillar, i) => (
          <div key={i} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl space-y-3">
            <input
              value={pillar.title}
              onChange={(e) => {
                const next = [...b.pillars];
                next[i] = { ...next[i], title: e.target.value };
                set({ pillars: next });
              }}
              placeholder="Pillar title"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
            />
            <textarea
              value={pillar.description}
              onChange={(e) => {
                const next = [...b.pillars];
                next[i] = { ...next[i], description: e.target.value };
                set({ pillars: next });
              }}
              rows={2}
              placeholder="Pillar description"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 resize-y"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink dark:text-gray-300 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
