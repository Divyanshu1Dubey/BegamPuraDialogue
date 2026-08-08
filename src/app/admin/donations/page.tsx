"use client";

import { useState } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import type { AdminDonation } from "@/lib/admin-data";

export default function DonationsEditor() {
  const { state, update } = useAdmin();
  const donations = state.donations;

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    donorName: "",
    amount: "",
    method: "Online",
    anonymous: false,
    campaign: "General",
    message: "",
  });

  const total = donations.reduce((s, d) => s + d.amount, 0);

  const addDonation = () => {
    if (!form.amount || Number(form.amount) <= 0) return;
    const newDonation: AdminDonation = {
      id: `don-${Date.now()}`,
      donorName: form.anonymous ? "Anonymous" : form.donorName || "Anonymous",
      amount: Number(form.amount),
      currency: "GBP",
      date: new Date().toISOString().split("T")[0],
      method: form.method,
      message: form.message || undefined,
      anonymous: form.anonymous,
      campaign: form.campaign,
    };
    update("donations", [newDonation, ...donations]);
    setForm({ donorName: "", amount: "", method: "Online", anonymous: false, campaign: "General", message: "" });
    setShowForm(false);
  };

  const deleteDonation = (id: string) => {
    update("donations", donations.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-ink dark:text-white">Donations</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Track and manage all donations received.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Total Raised</p>
          <p className="text-2xl font-bold text-saffron mt-1">£{total.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Total Donations</p>
          <p className="text-2xl font-bold text-ink dark:text-white mt-1">{donations.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Average</p>
          <p className="text-2xl font-bold text-ink dark:text-white mt-1">
            £{donations.length ? Math.round(total / donations.length).toLocaleString() : 0}
          </p>
        </div>
      </div>

      {/* Add donation */}
      <div>
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-saffron text-white rounded-xl text-sm font-medium hover:bg-saffron-deep transition-colors"
          >
            + Add Donation
          </button>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
            <h3 className="font-semibold text-ink dark:text-white">New Donation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={form.donorName}
                onChange={(e) => setForm({ ...form, donorName: e.target.value })}
                placeholder="Donor name"
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
              <input
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                type="number"
                placeholder="Amount (£)"
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select
                value={form.method}
                onChange={(e) => setForm({ ...form, method: e.target.value })}
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              >
                <option value="Online">Online</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
              </select>
              <input
                value={form.campaign}
                onChange={(e) => setForm({ ...form, campaign: e.target.value })}
                placeholder="Campaign"
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
              <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.anonymous}
                  onChange={(e) => setForm({ ...form, anonymous: e.target.checked })}
                  className="rounded border-gray-300 text-saffron focus:ring-saffron"
                />
                Anonymous
              </label>
            </div>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Message (optional)"
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 resize-y"
            />
            <div className="flex gap-3">
              <button
                onClick={addDonation}
                className="px-4 py-2 bg-saffron text-white rounded-xl text-sm font-medium hover:bg-saffron-deep"
              >
                Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Donations list */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Donor</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {donations.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-5 py-3 text-ink dark:text-white">
                    {d.anonymous ? "🙈 Anonymous" : d.donorName}
                  </td>
                  <td className="px-5 py-3 font-semibold text-saffron">£{d.amount.toLocaleString()}</td>
                  <td className="px-5 py-3 text-gray-500">{d.date}</td>
                  <td className="px-5 py-3 text-gray-500">{d.method}</td>
                  <td className="px-5 py-3 text-gray-500">{d.campaign || "—"}</td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => deleteDonation(d.id)}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {donations.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-gray-400">
                    No donations yet. Add your first donation above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
