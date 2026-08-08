"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error encountered:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-ink p-6 text-center">
      <div className="p-4 rounded-full bg-sindoor/10 text-sindoor mb-4">
        <AlertTriangle className="h-10 w-10" />
      </div>
      <h1 className="font-display text-3xl font-bold text-ink mb-2">Something went wrong!</h1>
      <p className="text-sm text-ink-soft max-w-md mb-8">
        An unexpected application error occurred while loading this page. You can try refreshing or returning to the homepage.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-xl bg-saffron text-white text-xs font-bold shadow-lg shadow-saffron/20 hover:bg-saffron-deep transition-colors flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" /> Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-surface border border-border text-ink-soft hover:text-ink text-xs font-bold transition-colors flex items-center gap-2"
        >
          <Home className="h-4 w-4" /> Return to Home
        </Link>
      </div>
    </div>
  );
}
