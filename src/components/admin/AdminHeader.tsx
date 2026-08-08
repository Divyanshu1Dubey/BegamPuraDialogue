"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/content/hero", label: "Hero" },
  { href: "/admin/content/about", label: "About" },
  { href: "/admin/content/teachings", label: "Teachings" },
  { href: "/admin/content/events", label: "Events" },
  { href: "/admin/content/gallery", label: "Gallery" },
  { href: "/admin/content/library", label: "Library" },
  { href: "/admin/content/begampura", label: "Begampura" },
  { href: "/admin/donations", label: "Donations" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminHeader({ onMenuToggle }: { onMenuToggle: () => void }) {
  const pathname = usePathname();

  return (
    <header className="h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="lg:hidden p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 className="text-base font-semibold text-ink dark:text-white">BRHF Admin Panel</h2>
      </div>

      {/* Desktop breadcrumb */}
      <nav className="hidden lg:flex items-center gap-1 text-xs">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return isActive ? (
            <span key={item.href} className="text-saffron font-medium">{item.label}</span>
          ) : (
            <span key={item.href} className="text-gray-400">{item.label}</span>
          );
        }).filter(Boolean).slice(-3)}
      </nav>

      <div className="flex items-center gap-3">
        <a href="/" className="text-sm text-gray-500 hover:text-saffron transition-colors">
          View Site
        </a>
      </div>
    </header>
  );
}
