"use client";

import { useAdmin } from "@/hooks/useAdmin";
import type { AdminTeachingsItem } from "@/lib/admin-data";

export default function TeachingsEditor() {
  const { state, update } = useAdmin();

  const updateItem = (i: number, partial: Partial<AdminTeachingsItem>) => {
    const next = state.teachings.map((t, idx) => idx === i ? { ...t, ...partial } : t);
    update("teachings", next);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-ink dark:text-white">Teachings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Edit the teaching cards shown on the homepage.
        </p>
      </div>

      <div className="space-y-4">
        {state.teachings.map((t, i) => (
          <div key={t.title} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-saffron uppercase tracking-wider">
                {t.titleHindi} — {t.title}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={t.title}
                onChange={(e) => updateItem(i, { title: e.target.value })}
                placeholder="Title"
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
              <input
                value={t.titleHindi}
                onChange={(e) => updateItem(i, { titleHindi: e.target.value })}
                placeholder="Hindi title"
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
            </div>
            <input
              value={t.description}
              onChange={(e) => updateItem(i, { description: e.target.value })}
              placeholder="Description"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                value={t.icon}
                onChange={(e) => updateItem(i, { icon: e.target.value })}
                placeholder="Icon name"
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
              <input
                value={t.color}
                onChange={(e) => updateItem(i, { color: e.target.value })}
                placeholder="Gradient color"
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
