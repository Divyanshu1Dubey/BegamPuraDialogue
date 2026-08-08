"use client";

import { useAdmin } from "@/hooks/useAdmin";
import {
  Palette,
  FileText,
  Users,
  Heart,
  BarChart3,
  Settings,
  TrendingUp,
  DollarSign,
  Eye,
  Image,
  Calendar,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function StatCard({ title, value, icon: Icon, change, href }: { title: string; value: string; icon: any; change?: string; href: string }) {
  return (
    <Link href={href} className="group block bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-saffron/30 hover:shadow-lg hover:shadow-saffron/5 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center group-hover:bg-saffron/20 transition-colors">
          <Icon className="h-6 w-6 text-saffron" />
        </div>
        {change && (
          <span className="text-xs font-medium text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-ink dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{title}</p>
    </Link>
  );
}

export default function AdminDashboard() {
  const { state } = useAdmin();

  const trafficData = [
    { day: "Mon", visitors: 120 },
    { day: "Tue", visitors: 180 },
    { day: "Wed", visitors: 150 },
    { day: "Thu", visitors: 220 },
    { day: "Fri", visitors: 280 },
    { day: "Sat", visitors: 350 },
    { day: "Sun", visitors: 300 },
  ];

  const totalDonations = state.donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-saffron/10 via-saffron/5 to-transparent rounded-2xl p-6 border border-saffron/20">
        <h1 className="text-2xl font-display font-bold text-ink dark:text-white">Welcome back</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your Begampura Dialogue website content, donations, and analytics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Donations" value={`£${totalDonations.toLocaleString()}`} icon={DollarSign} change="+12%" href="/admin/donations" />
        <StatCard title="Total Visitors" value="1,840" icon={Eye} change="+8%" href="/admin/analytics" />
        <StatCard title="Events Listed" value={`${state.events.length} events`} icon={Calendar} href="/admin/content/events" />
        <StatCard title="Gallery Items" value={`${state.gallery.length} images`} icon={Image} href="/admin/content/gallery" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-ink dark:text-white mb-4">Weekly Traffic</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff8a1e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ff8a1e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 13 }}
                labelStyle={{ color: "#6b7280", fontWeight: 600 }}
              />
              <Area type="monotone" dataKey="visitors" stroke="#ff8a1e" fill="url(#trafficGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Donation Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-ink dark:text-white mb-4">Recent Donations</h3>
          <div className="space-y-3">
            {state.donations.slice(0, 5).map((donation) => (
              <div key={donation.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div>
                  <p className="text-sm font-medium text-ink dark:text-white">
                    {donation.anonymous ? "Anonymous" : donation.donorName}
                  </p>
                  <p className="text-xs text-gray-400">{donation.date} · {donation.method}</p>
                </div>
                <span className="text-sm font-semibold text-saffron">£{donation.amount}</span>
              </div>
            ))}
            {state.donations.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No donations yet</p>
            )}
          </div>
          <Link href="/admin/donations" className="block mt-4 text-center text-sm text-saffron hover:text-saffron-deep font-medium">
            View all donations →
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-ink dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Edit Hero", href: "/admin/content/hero", icon: Palette },
            { label: "Add Event", href: "/admin/content/events", icon: Calendar },
            { label: "Upload Image", href: "/admin/content/gallery", icon: Image },
            { label: "View Analytics", href: "/admin/analytics", icon: BarChart3 },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-saffron/30 hover:bg-saffron/5 transition-all"
            >
              <action.icon className="h-5 w-5 text-saffron" />
              <span className="text-xs font-medium text-ink dark:text-white">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
