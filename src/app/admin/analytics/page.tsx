"use client";

import { useMemo } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { exportAnalyticsCSV, downloadCSV } from "@/lib/admin-data";
import { Download } from "lucide-react";

const PIE_COLORS = ["#ff8a1e", "#ffb24d", "#f5c34a", "#6c3aa6", "#3d1c66", "#5b1d8b"];

export default function AnalyticsPage() {
  const { state } = useAdmin();
  const donations = state.donations;

  const monthly = useMemo(() => {
    const map = new Map<string, { month: string; total: number; count: number }>();
    donations.forEach((d) => {
      const m = d.date.slice(0, 7);
      const existing = map.get(m) || { month: m, total: 0, count: 0 };
      existing.total += d.amount;
      existing.count += 1;
      map.set(m, existing);
    });
    return Array.from(map.values())
      .sort((a, b) => a.month.localeCompare(b.month))
      .map((m) => ({
        ...m,
        label: new Date(m.month + "-01").toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
      }));
  }, [donations]);

  const byMethod = useMemo(() => {
    const map = new Map<string, number>();
    donations.forEach((d) => { map.set(d.method, (map.get(d.method) || 0) + d.amount); });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [donations]);

  const byCampaign = useMemo(() => {
    const map = new Map<string, number>();
    donations.forEach((d) => { const c = d.campaign || "General"; map.set(c, (map.get(c) || 0) + d.amount); });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [donations]);

  const totalRaised = donations.reduce((s, d) => s + d.amount, 0);
  const avgDonation = donations.length ? Math.round(totalRaised / donations.length) : 0;

  const handleExport = () => {
    const csv = exportAnalyticsCSV(monthly, byMethod, byCampaign, donations);
    downloadCSV(csv, `brhf-analytics-${new Date().toISOString().split("T")[0]}.csv`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-ink dark:text-white">Analytics</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Donation insights and contribution trends.</p>
        </div>
        {donations.length > 0 && (
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-saffron to-saffron-deep text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Total Raised</p>
          <p className="text-3xl font-bold text-saffron mt-1">£{totalRaised.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Average Donation</p>
          <p className="text-3xl font-bold text-ink dark:text-white mt-1">£{avgDonation.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Total Donors</p>
          <p className="text-3xl font-bold text-ink dark:text-white mt-1">{donations.length}</p>
        </div>
      </div>

      {donations.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
          <p className="text-gray-400">No donation data yet. Add donations from the Donations page.</p>
        </div>
      ) : (
        <>
          {/* Monthly trend */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-ink dark:text-white mb-4">Monthly Donations</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthly}>
                <defs>
                  <linearGradient id="donGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff8a1e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ff8a1e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#9ca3af" }} />
                <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 13 }}
                  formatter={(value: unknown) => [`£${Number(value).toLocaleString()}`, "Donations"]}
                />
                <Area type="monotone" dataKey="total" stroke="#ff8a1e" fill="url(#donGrad2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-ink dark:text-white mb-4">By Payment Method</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={byMethod}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#9ca3af" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 13 }}
                    formatter={(value: unknown) => [`£${Number(value).toLocaleString()}`, "Amount"]}
                  />
                  <Bar dataKey="value" fill="#ff8a1e" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-ink dark:text-white mb-4">By Campaign</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={byCampaign}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  >
                    {byCampaign.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 13 }}
                    formatter={(value: unknown) => [`£${Number(value).toLocaleString()}`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
