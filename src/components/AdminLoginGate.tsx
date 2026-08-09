"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Lock, LogOut } from "lucide-react";

export function AdminLoginGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, login, logout } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (isAuthenticated) {
    return (
      <>
        <button
          onClick={logout}
          className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-500 hover:text-red-500 transition-colors shadow-lg"
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
        </button>
        {children}
      </>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(password);
    if (!ok) {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-bg via-bg-soft to-bg p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-saffron to-saffron-deep flex items-center justify-center mx-auto mb-4 shadow-lg shadow-saffron/20">
            <span className="text-white font-bold text-2xl font-display">A</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-ink dark:text-white">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">Enter the admin password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 space-y-5 shadow-xl">
          <div>
            <label className="block text-sm font-medium text-ink dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="Enter admin password"
                autoFocus
                className={cn(
                  "w-full pl-10 pr-4 py-3 rounded-xl border bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 transition-all",
                  error
                    ? "border-red-400 focus:ring-red-300"
                    : "border-gray-200 dark:border-gray-600 focus:ring-saffron/40"
                )}
              />
            </div>
            {error && (
              <p className="text-xs text-red-500 mt-2">Incorrect password. Please try again.</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-linear-to-r from-saffron to-saffron-deep text-white font-semibold shadow-lg shadow-saffron/20 hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>

          <Link href="/" className="block text-center text-sm text-gray-400 hover:text-saffron transition-colors">
            Back to website →
          </Link>
        </form>
      </div>
    </div>
  );
}
