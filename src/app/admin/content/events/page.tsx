"use client";

import { useAdmin } from "@/hooks/useAdmin";
import type { AdminEvent } from "@/lib/admin-data";

export default function EventsEditor() {
  const { state, update } = useAdmin();
  const events = state.events;

  const updateEvent = (i: number, partial: Partial<AdminEvent>) => {
    const next = [...events];
    next[i] = { ...next[i], ...partial };
    update("events", next);
  };

  const addEvent = () => {
    const newEvent: AdminEvent = {
      id: `evt-${Date.now()}`,
      title: "New Event",
      titleHindi: "नया आयोजन",
      date: "2027-01-01",
      location: "",
      description: "",
      icon: "📅",
      featured: false,
    };
    update("events", [...events, newEvent]);
  };

  const deleteEvent = (i: number) => {
    update("events", events.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-ink dark:text-white">Events</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage upcoming events and exhibitions.
          </p>
        </div>
        <button
          onClick={addEvent}
          className="px-4 py-2 bg-saffron text-white rounded-xl text-sm font-medium hover:bg-saffron-deep transition-colors"
        >
          + Add Event
        </button>
      </div>

      <div className="space-y-4">
        {events.map((evt, i) => (
          <div key={evt.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">#{i + 1} — {evt.id}</span>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-sm">
                  <input
                    type="checkbox"
                    checked={evt.featured}
                    onChange={(e) => updateEvent(i, { featured: e.target.checked })}
                    className="rounded border-gray-300 text-saffron focus:ring-saffron"
                  />
                  <span className="text-gray-500">Featured</span>
                </label>
                <button
                  onClick={() => deleteEvent(i)}
                  className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={evt.title}
                onChange={(e) => updateEvent(i, { title: e.target.value })}
                placeholder="Title"
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
              <input
                value={evt.titleHindi}
                onChange={(e) => updateEvent(i, { titleHindi: e.target.value })}
                placeholder="Hindi title"
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="date"
                value={evt.date}
                onChange={(e) => updateEvent(i, { date: e.target.value })}
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
              <input
                value={evt.location}
                onChange={(e) => updateEvent(i, { location: e.target.value })}
                placeholder="Location"
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
              <input
                value={evt.icon}
                onChange={(e) => updateEvent(i, { icon: e.target.value })}
                placeholder="Emoji icon"
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
            </div>

            <textarea
              value={evt.description}
              onChange={(e) => updateEvent(i, { description: e.target.value })}
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
