"use client";

import { useAdmin } from "@/hooks/useAdmin";
import type { AdminLibraryItem } from "@/lib/admin-data";

const TYPE_COLORS: Record<string, string> = {
  pdf: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  ebook: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  audio: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  video: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
};

export default function LibraryEditor() {
  const { state, update } = useAdmin();

  const updateItem = (i: number, partial: Partial<AdminLibraryItem>) => {
    const next = [...state.library];
    next[i] = { ...next[i], ...partial };
    update("library", next);
  };

  const addItem = () => {
    const item: AdminLibraryItem = {
      id: `lib-${Date.now()}`,
      title: "New Resource",
      titleHindi: "नया संसाधन",
      type: "pdf",
      src: "/assets/new.pdf",
      description: "",
    };
    update("library", [...state.library, item]);
  };

  const deleteItem = (i: number) => {
    update("library", state.library.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-ink dark:text-white">Library</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage PDFs, eBooks, audio and video resources.
          </p>
        </div>
        <button
          onClick={addItem}
          className="px-4 py-2 bg-saffron text-white rounded-xl text-sm font-medium hover:bg-saffron-deep transition-colors"
        >
          + Add Resource
        </button>
      </div>

      <div className="space-y-4">
        {state.library.map((item, i) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider ${TYPE_COLORS[item.type] || TYPE_COLORS.pdf}`}>
                {item.type}
              </span>
              <button
                onClick={() => deleteItem(i)}
                className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Delete
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={item.title}
                onChange={(e) => updateItem(i, { title: e.target.value })}
                placeholder="Title"
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
              <input
                value={item.titleHindi}
                onChange={(e) => updateItem(i, { titleHindi: e.target.value })}
                placeholder="Hindi title"
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={item.type}
                onChange={(e) => updateItem(i, { type: e.target.value as AdminLibraryItem["type"] })}
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              >
                <option value="pdf">PDF</option>
                <option value="ebook">E-Book</option>
                <option value="audio">Audio</option>
                <option value="video">Video</option>
              </select>
              <input
                value={item.src}
                onChange={(e) => updateItem(i, { src: e.target.value })}
                placeholder="File path"
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
            </div>

            <textarea
              value={item.description}
              onChange={(e) => updateItem(i, { description: e.target.value })}
              rows={2}
              placeholder="Description"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 resize-y"
            />
          </div>
        ))}
        {state.library.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">No library items yet.</p>
        )}
      </div>
    </div>
  );
}
