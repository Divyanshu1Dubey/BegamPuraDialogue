"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Search, ArrowRight, Sparkles, Filter, X, CheckCircle2 } from "lucide-react";
import { brhf, deadlines } from "@/data/brhf";
import { LanguageAware } from "@/components/LanguageAware";

export default function EventsPage() {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedEventModal, setSelectedEventModal] = useState<any>(null);
  const [registered, setRegistered] = useState(false);

  const filteredEvents = brhf.globalEvents.filter((ev) => {
    const matchesSearch =
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.location.toLowerCase().includes(search.toLowerCase()) ||
      ev.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      categoryFilter === "all" ||
      (categoryFilter === "uk" && ev.location.includes("UK")) ||
      (categoryFilter === "eu" && (ev.location.includes("Brussels") || ev.location.includes("Parliament"))) ||
      (categoryFilter === "india" && (ev.location.includes("Varanasi") || ev.location.includes("Delhi")));
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-bg text-ink pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-saffron/10 border border-saffron/30 text-xs font-semibold text-saffron uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            <LanguageAware en="Global Commemoration 2026–2027" hi="विश्वव्यापी स्मरणोत्सव 2026–2027" pa="ਵਿਸ਼ਵਵਿਆਪੀ ਸਮਾਰੋਹ 2026–2027" />
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-gradient-saffron leading-tight">
            <LanguageAware
              en="650th Janam Jayanti Global Events"
              hi="650वीं जन्म जयंती वैश्विक कार्यक्रम"
              pa="650ਵੀਂ ਜਨਮ ਜਯੰਤੀ ਵਿਸ਼ਵਵਿਆਪੀ ਕਾਰਯਕ੍ਰਮ"
            />
          </h1>
          <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed font-medium">
            <LanguageAware
              en="From Varanasi to the House of Lords in London, Parliament in Brussels, and National Dialogue in Delhi — join the global celebration."
              hi="वाराणसी से लंदन के हाउस ऑफ लॉर्ड्स, ब्रसेल्स और दिल्ली तक — विश्वव्यापी समारोह में भाग लें।"
              pa="ਵਾਰਾਣਸੀ ਤੋਂ ਲੰਡਨ ਦੇ ਹਾਊਸ ਆਫ ਲਾਰਡਸ, ਬ੍ਰਾਸੈਲਸ ਅਤੇ ਦਿੱਲੀ ਤੱਕ — ਵਿਸ਼ਵਵਿਆਪੀ ਸਮਾਰੋਹ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ।"
            />
          </p>
        </motion.div>

        {/* Filter controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 card-glass p-4 rounded-2xl">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-saffron" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by event, venue, city..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-saffron/50"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="h-4 w-4 text-saffron shrink-0" />
            {[
              { id: "all", label: "All Events" },
              { id: "india", label: "India (Varanasi/Delhi)" },
              { id: "uk", label: "UK (London)" },
              { id: "eu", label: "EU (Brussels)" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setCategoryFilter(btn.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  categoryFilter === btn.id
                    ? "bg-saffron text-white shadow-md shadow-saffron/20"
                    : "bg-surface text-ink-soft hover:text-saffron hover:bg-surface-2"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredEvents.map((ev, i) => (
            <motion.div
              key={ev.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative flex flex-col justify-between p-6 rounded-3xl card-glass card-saffron-glow hover:scale-[1.02] transition-all duration-300"
            >
              <div>
                <div className="text-4xl mb-3">{ev.icon || "🏛️"}</div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-3.5 w-3.5 text-saffron" />
                  <span className="text-xs text-saffron font-bold uppercase tracking-wider">
                    {ev.month} {ev.year}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-ink leading-snug mb-2 group-hover:text-saffron transition-colors">
                  {ev.title}
                </h3>
                <div className="flex items-start gap-1.5 mb-4 text-xs text-ink-soft font-medium">
                  <MapPin className="h-3.5 w-3.5 text-saffron shrink-0 mt-0.5" />
                  <span>{ev.location}</span>
                </div>
                <p className="text-sm text-ink-soft line-clamp-3 leading-relaxed mb-6 font-medium">
                  {ev.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                <button
                  onClick={() => setSelectedEventModal(ev)}
                  className="px-4 py-2 rounded-xl bg-saffron text-white text-xs font-bold hover:bg-saffron-deep transition-colors shadow-md shadow-saffron/20"
                >
                  <LanguageAware en="Register Delegate" hi="प्रतिनिधि पंजीकरण" pa="ਰਜਿਸਟਰੇਸ਼ਨ ਕਰੋ" />
                </button>
                <Link
                  href={`/events/${ev.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-saffron hover:gap-2 transition-all"
                >
                  <LanguageAware en="Details" hi="विवरण" pa="ਵੇਰਵੇ" />
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Event Registration Modal */}
      <AnimatePresence>
        {selectedEventModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md p-6 rounded-3xl card-glass bg-bg border border-border shadow-2xl"
            >
              <button
                onClick={() => {
                  setSelectedEventModal(null);
                  setRegistered(false);
                }}
                className="absolute top-4 right-4 p-2 text-ink-soft hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>

              {!registered ? (
                <div>
                  <span className="text-xs font-bold text-saffron uppercase tracking-widest">Event Delegate Pass</span>
                  <h2 className="font-display text-2xl font-bold text-ink mt-1 mb-2">{selectedEventModal.title}</h2>
                  <p className="text-xs text-ink-soft mb-6">{selectedEventModal.location} · {selectedEventModal.month} {selectedEventModal.year}</p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setRegistered(true);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold text-ink-soft mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Shri / Smt / Dr. Your Name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-saffron/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink-soft mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-saffron/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink-soft mb-1">Organization / Gurdwara / Sangat</label>
                      <input
                        type="text"
                        placeholder="BRHF Delegate / Sangat Member"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-saffron/50"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-saffron to-saffron-deep text-white text-sm font-bold shadow-lg shadow-saffron/20 hover:opacity-90 transition-opacity mt-4"
                    >
                      Confirm Registration Pass
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="font-display text-2xl font-bold text-ink mb-2">Registration Confirmed!</h3>
                  <p className="text-sm text-ink-soft mb-6">
                    Thank you for registering for {selectedEventModal.title}. Confirmation and entry pass details have been sent to your email.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedEventModal(null);
                      setRegistered(false);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-saffron text-white text-xs font-bold"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
