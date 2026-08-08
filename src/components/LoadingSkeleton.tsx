"use client";

import { motion } from "framer-motion";

export function LoadingSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="mb-6 rounded-3xl card-glass overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          <div className="p-6 md:p-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="h-4 w-32 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
            </div>
            <div className="h-8 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="h-4 w-4/6 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
            </div>
            <div className="flex gap-3 pt-2">
              <div className="h-10 w-28 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="h-10 w-28 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function PageError({ message = "Something went wrong. Please try again." }: { message?: string }) {
  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16 text-center">
      <div className="text-6xl mb-4">😔</div>
      <h2 className="text-xl font-display font-bold text-ink dark:text-white mb-2">
        Unable to load content
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{message}</p>
    </div>
  );
}
