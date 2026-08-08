"use client";

import { useAdmin } from "@/hooks/useAdmin";
import type { AdminAbout } from "@/lib/admin-data";

export default function AboutEditor() {
  const { state, update } = useAdmin();
  const about = state.about;

  const set = (partial: Partial<AdminAbout>) => update("about", partial);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-ink dark:text-white">About Section</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Edit the About / His Life section content.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-5">
        <FieldLabel label="Introduction Text">
          <textarea
            value={about.intro}
            onChange={(e) => set({ intro: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40 resize-y"
          />
        </FieldLabel>
      </div>

      {/* Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-ink dark:text-white">Stats (His Life in Numbers)</h3>
        {about.stats.map((stat, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <input
              value={stat.label}
              onChange={(e) => {
                const next = [...about.stats];
                next[i] = { ...next[i], label: e.target.value };
                set({ stats: next });
              }}
              placeholder="Label"
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
            />
            <input
              value={stat.labelHindi}
              onChange={(e) => {
                const next = [...about.stats];
                next[i] = { ...next[i], labelHindi: e.target.value };
                set({ stats: next });
              }}
              placeholder="Hindi label"
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
            />
            <input
              value={stat.value}
              onChange={(e) => {
                const next = [...about.stats];
                next[i] = { ...next[i], value: e.target.value };
                set({ stats: next });
              }}
              placeholder="Value"
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
            />
            <input
              value={stat.icon}
              onChange={(e) => {
                const next = [...about.stats];
                next[i] = { ...next[i], icon: e.target.value };
                set({ stats: next });
              }}
              placeholder="Icon name"
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
            />
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-ink dark:text-white">Timeline (His Footprint in History)</h3>
        {about.timeline.map((row, i) => (
          <div key={i} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                value={row.period}
                onChange={(e) => {
                  const next = [...about.timeline];
                  next[i] = { ...next[i], period: e.target.value };
                  set({ timeline: next });
                }}
                placeholder="Period (e.g. 1414 AD)"
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
              <input
                value={row.title}
                onChange={(e) => {
                  const next = [...about.timeline];
                  next[i] = { ...next[i], title: e.target.value };
                  set({ timeline: next });
                }}
                placeholder="Title"
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
              <input
                value={row.titleHindi}
                onChange={(e) => {
                  const next = [...about.timeline];
                  next[i] = { ...next[i], titleHindi: e.target.value };
                  set({ timeline: next });
                }}
                placeholder="Hindi title"
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
            </div>
            <textarea
              value={row.description}
              onChange={(e) => {
                const next = [...about.timeline];
                next[i] = { ...next[i], description: e.target.value };
                set({ timeline: next });
              }}
              rows={2}
              placeholder="Description"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 resize-y"
            />
          </div>
        ))}
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
