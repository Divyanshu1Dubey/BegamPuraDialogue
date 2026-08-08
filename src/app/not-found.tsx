import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-ink p-6 text-center">
      <span className="px-3 py-1 rounded-full bg-saffron/10 border border-saffron/30 text-xs font-bold text-saffron uppercase tracking-widest mb-4">
        404 — Page Not Found
      </span>
      <h1 className="font-display text-4xl md:text-6xl font-bold text-gradient-saffron mb-4">
        Page Not Found
      </h1>
      <p className="text-base text-ink-soft max-w-md mb-8">
        The page or resource you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-saffron to-saffron-deep text-white font-bold text-xs shadow-xl shadow-saffron/20 hover:opacity-90 transition-opacity flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Begampura Dialogue Home
      </Link>
    </div>
  );
}
