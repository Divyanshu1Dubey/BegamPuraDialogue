import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-ink p-4">
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-full border-4 border-saffron/20 border-t-saffron animate-spin" />
        <Sparkles className="absolute h-6 w-6 text-saffron animate-pulse" />
      </div>
      <h2 className="font-display text-xl font-bold text-gradient-saffron">
        Loading Be-gumpura Dialogue...
      </h2>
      <p className="text-xs text-ink-soft mt-1">650th Janam Jayanti Commemoration</p>
    </div>
  );
}
