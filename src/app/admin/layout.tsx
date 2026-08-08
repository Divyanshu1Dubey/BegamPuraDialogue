"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useAdmin } from "@/hooks/useAdmin";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDirty, reload } = useAdmin();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-72">
        <AdminHeader onMenuToggle={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8">
          {isDirty && (
            <div className="mb-4 flex items-center justify-between px-4 py-3 bg-saffron/10 border border-saffron/20 rounded-xl text-sm">
              <span className="text-saffron-deep dark:text-saffron-bright font-medium">
                Unsaved changes — edits are saved automatically
              </span>
              <button
                onClick={reload}
                className="text-xs px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-saffron/30 transition-colors"
              >
                Refresh
              </button>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
