"use client";

import { useAdmin } from "@/hooks/useAdmin";
import type { AdminSettings, AdminSeoPageOverride } from "@/lib/admin-data";
import { useDataBackup } from "@/hooks/useDataBackup";
import { useState, useRef } from "react";
import { Download, Upload, Trash2, HardDrive } from "lucide-react";

type Field = "seo" | "og" | "twitter" | "jsonld" | "pages" | "backup";

export default function SettingsPage() {
  const { state, update } = useAdmin();
  const { exportData, importData, resetAllData } = useDataBackup();
  const s = state.settings;

  const set = (partial: Partial<AdminSettings>) => update("settings", partial);

  const [openSections, setOpenSections] = useState<Record<Field, boolean>>({
    seo: true,
    og: true,
    twitter: false,
    jsonld: false,
    pages: true,
    backup: false,
  });

  const toggle = (key: Field) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const [importText, setImportText] = useState("");
  const [backupStatus, setBackupStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const result = exportData();
    setBackupStatus({ type: "success", message: result.message });
    setTimeout(() => setBackupStatus(null), 4000);
  };

  const handleImport = () => {
    if (!importText.trim()) {
      setBackupStatus({ type: "error", message: "Please paste backup JSON data first." });
      return;
    }
    const result = importData(importText);
    setBackupStatus({ type: result.success ? "success" : "error", message: result.message });
    if (result.success) setImportText("");
    setTimeout(() => setBackupStatus(null), 4000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      setImportText(text);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleReset = () => {
    if (window.confirm("This will permanently delete all admin data (content, settings, donations, analytics). This action cannot be undone. Are you sure?")) {
      resetAllData();
    }
  };

  const socials = s.socialLinks;
  const updateSocial = (i: number, field: "platform" | "url", value: string) => {
    const next = socials.map((so, idx) => (idx === i ? { ...so, [field]: value } : so));
    set({ socialLinks: next });
  };
  const addSocial = () => set({ socialLinks: [...socials, { platform: "", url: "" }] });
  const removeSocial = (i: number) =>
    set({ socialLinks: socials.filter((_, idx) => idx !== i) });

  // Per-page overrides
  const overrides = s.pageOverrides || [];
  const updateOverride = (i: number, partial: Partial<AdminSeoPageOverride>) => {
    const next = overrides.map((o, idx) => (idx === i ? { ...o, ...partial } : o));
    set({ pageOverrides: next });
  };
  const addOverride = () =>
    set({ pageOverrides: [...overrides, { path: "", title: "", description: "", keywords: "" }] });
  const removeOverride = (i: number) =>
    set({ pageOverrides: overrides.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-ink dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Configure site-wide settings, SEO, structured data, and contact details.
        </p>
      </div>

      {/* ===================== GENERAL ===================== */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-5">
        <Field label="Site Name">
          <input
            value={s.siteName}
            onChange={(e) => set({ siteName: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
          />
        </Field>
        <Field label="Site URL">
          <input
            value={s.siteUrl}
            onChange={(e) => set({ siteUrl: e.target.value })}
            placeholder="https://example.com"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
          />
        </Field>
        <Field label="Countdown Target">
          <input
            type="datetime-local"
            value={s.countdownTarget.slice(0, 16)}
            onChange={(e) => set({ countdownTarget: e.target.value + ":00+05:30" })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
          />
        </Field>
      </div>

      {/* ===================== GLOBAL SEO ===================== */}
      <Section title="Global SEO" field="seo" open={openSections.seo} onToggle={() => toggle("seo")}>
        <div className="space-y-5">
          <Field label="Default Page Title" hint="Used when no per-page override is set">
            <input
              value={s.seoTitle}
              onChange={(e) => set({ seoTitle: e.target.value })}
              placeholder="BRHF · Be-gumpura Dialogue — 650th Janam Jayanti"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
            />
            <p className="text-xs text-gray-400 mt-1">
              Final browser tab title = "{s.seoTitle} · BRHF Be-gumpura Dialogue"
            </p>
          </Field>
          <Field label="Meta Description">
            <textarea
              value={s.seoDescription}
              onChange={(e) => set({ seoDescription: e.target.value })}
              rows={3}
              placeholder="Describe the site for search engines (150-160 characters recommended)"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40 resize-y"
            />
            <p className="text-xs text-gray-400 mt-1">{s.seoDescription.length} characters</p>
          </Field>
          <Field label="Keywords (comma-separated)">
            <textarea
              value={s.seoKeywords}
              onChange={(e) => set({ seoKeywords: e.target.value })}
              rows={2}
              placeholder="Sant Ravidas, Be-gumpura, BRHF, equality..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40 resize-y font-mono text-xs"
            />
          </Field>
        </div>
      </Section>

      {/* ===================== OPEN GRAPH ===================== */}
      <Section title="Open Graph (Social Sharing)" field="og" open={openSections.og} onToggle={() => toggle("og")}>
        <div className="space-y-5">
          <Field label="OG Title">
            <input
              value={s.ogTitle}
              onChange={(e) => set({ ogTitle: e.target.value })}
              placeholder="Title shown when sharing on Facebook, WhatsApp, LinkedIn..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
            />
          </Field>
          <Field label="OG Description">
            <textarea
              value={s.ogDescription}
              onChange={(e) => set({ ogDescription: e.target.value })}
              rows={2}
              placeholder="Description shown in social media preview cards"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40 resize-y"
            />
          </Field>
          <Field label="OG Image Path">
            <input
              value={s.ogImage}
              onChange={(e) => set({ ogImage: e.target.value })}
              placeholder="/og-image.svg"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40 font-mono text-xs"
            />
            <p className="text-xs text-gray-400 mt-1">
              Recommended size: 1200x630px. Place in the public/ folder.
            </p>
          </Field>
          <Field label="OG Canonical URL">
            <input
              value={s.ogUrl}
              onChange={(e) => set({ ogUrl: e.target.value })}
              placeholder="https://example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40 font-mono text-xs"
            />
          </Field>
        </div>
      </Section>

      {/* ===================== TWITTER ===================== */}
      <Section title="Twitter Card" field="twitter" open={openSections.twitter} onToggle={() => toggle("twitter")}>
        <div className="space-y-5">
          <Field label="Twitter Handle">
            <input
              value={s.twitterHandle}
              onChange={(e) => set({ twitterHandle: e.target.value })}
              placeholder="@BRHFofficial"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
            />
          </Field>
          <Field label="Card Type">
            <select
              value={s.twitterCardType}
              onChange={(e) => set({ twitterCardType: e.target.value as AdminSettings["twitterCardType"] })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
            >
              <option value="summary">Summary (small image)</option>
              <option value="summary_large_image">Summary Large Image (recommended)</option>
            </select>
          </Field>
        </div>
      </Section>

      {/* ===================== JSON-LD ===================== */}
      <Section title="Structured Data (JSON-LD)" field="jsonld" open={openSections.jsonld} onToggle={() => toggle("jsonld")}>
        <div className="space-y-5">
          <Field label="Organization Name">
            <input
              value={s.orgName}
              onChange={(e) => set({ orgName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
            />
          </Field>
          <Field label="Logo Path">
            <input
              value={s.orgLogo}
              onChange={(e) => set({ orgLogo: e.target.value })}
              placeholder="/logo.svg"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40 font-mono text-xs"
            />
          </Field>
          <Field label="Organization Description">
            <textarea
              value={s.orgDescription}
              onChange={(e) => set({ orgDescription: e.target.value })}
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40 resize-y"
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Email">
              <input
                type="email"
                value={s.orgEmail}
                onChange={(e) => set({ orgEmail: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
            </Field>
            <Field label="Phone">
              <input
                value={s.orgPhone}
                onChange={(e) => set({ orgPhone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
            </Field>
          </div>
          <Field label="Address">
            <input
              value={s.orgAddress}
              onChange={(e) => set({ orgAddress: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
            />
          </Field>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-5 mt-2">
            <h4 className="text-sm font-semibold text-ink dark:text-white mb-4">Event Details</h4>
            <div className="space-y-4">
              <Field label="Event Name">
                <input
                  value={s.eventName}
                  onChange={(e) => set({ eventName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Event Start Date">
                  <input
                    type="date"
                    value={s.eventStartDate}
                    onChange={(e) => set({ eventStartDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
                  />
                </Field>
                <Field label="Event End Date">
                  <input
                    type="date"
                    value={s.eventEndDate}
                    onChange={(e) => set({ eventEndDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
                  />
                </Field>
              </div>
              <Field label="Event Location">
                <input
                  value={s.eventLocation}
                  onChange={(e) => set({ eventLocation: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
                />
              </Field>
            </div>
          </div>
        </div>
      </Section>

      {/* ===================== PER-PAGE SEO OVERRIDES ===================== */}
      <Section title="Per-Page SEO Overrides" field="pages" open={openSections.pages} onToggle={() => toggle("pages")}>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Override the default SEO title and description for specific pages. Leave empty to use global defaults.
        </p>
        <div className="space-y-3">
          {overrides.map((ov, i) => (
            <div key={i} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-saffron">Page {i + 1}</span>
                <button
                  onClick={() => removeOverride(i)}
                  className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Remove
                </button>
              </div>
              <input
                value={ov.path}
                onChange={(e) => updateOverride(i, { path: e.target.value })}
                placeholder="URL path (e.g. /about)"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
              <input
                value={ov.title}
                onChange={(e) => updateOverride(i, { title: e.target.value })}
                placeholder="Page title"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
              <textarea
                value={ov.description}
                onChange={(e) => updateOverride(i, { description: e.target.value })}
                rows={2}
                placeholder="Page meta description"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 resize-y"
              />
              <input
                value={ov.keywords}
                onChange={(e) => updateOverride(i, { keywords: e.target.value })}
                placeholder="Page-specific keywords (comma-separated)"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
            </div>
          ))}
          <button
            onClick={addOverride}
            className="text-sm text-saffron hover:text-saffron-deep font-medium px-4 py-2 rounded-xl hover:bg-saffron/5 transition-colors"
          >
            + Add Page Override
          </button>
        </div>
      </Section>

      {/* ===================== CONTACT ===================== */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-5">
        <h3 className="text-lg font-semibold text-ink dark:text-white">Contact Info</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Contact Email">
            <input
              type="email"
              value={s.contactEmail}
              onChange={(e) => set({ contactEmail: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
            />
          </Field>
          <Field label="Contact Phone">
            <input
              value={s.contactPhone}
              onChange={(e) => set({ contactPhone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron/40"
            />
          </Field>
        </div>
      </div>

      {/* ===================== SOCIAL LINKS ===================== */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-ink dark:text-white">Social Links</h3>
          <button onClick={addSocial} className="text-sm text-saffron hover:text-saffron-deep font-medium">
            + Add
          </button>
        </div>
        {socials.map((link, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              value={link.platform}
              onChange={(e) => updateSocial(i, "platform", e.target.value)}
              placeholder="Platform (e.g. Facebook)"
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
            />
            <input
              value={link.url}
              onChange={(e) => updateSocial(i, "url", e.target.value)}
              placeholder="https://..."
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
            />
            <button
              onClick={() => removeSocial(i)}
              className="text-xs text-red-500 hover:text-red-700 px-2 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* ===================== MAINTENANCE MODE ===================== */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <Field label="Maintenance Mode">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={s.maintenanceMode}
                onChange={(e) => set({ maintenanceMode: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-saffron/25 dark:peer-focus:ring-saffron rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-saffron"></div>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {s.maintenanceMode ? "Site is in maintenance mode" : "Site is live"}
            </span>
          </label>
        </Field>
      </div>

      {/* ===================== DATA BACKUP ===================== */}
      <Section title="Data Backup & Restore" field="backup" open={openSections.backup} onToggle={() => toggle("backup")}>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
          Export all your content, settings, and analytics data as a JSON file. You can restore it later on the same or a different browser. Always keep a backup before making large changes.
        </p>
        <div className="space-y-5">
          {/* Export */}
          <div className="p-5 rounded-2xl bg-surface-2/60 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-saffron/15 to-saffron/5 flex items-center justify-center">
                <Download className="h-5 w-5 text-saffron" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink dark:text-white">Export Data</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Download all data as a JSON file</p>
              </div>
            </div>
            <button
              onClick={handleExport}
              className="mt-3 px-5 py-2.5 rounded-xl bg-linear-to-r from-saffron to-saffron-deep text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Backup
            </button>
          </div>

          {/* Import */}
          <div className="p-5 rounded-2xl bg-surface-2/60 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-royal/15 to-royal/5 flex items-center justify-center">
                <Upload className="h-5 w-5 text-royal" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink dark:text-white">Import Data</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Restore from a previously exported backup file</p>
              </div>
            </div>
            <div className="flex gap-2 mb-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="text-xs text-gray-500 dark:text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-saffron/10 file:text-saffron hover:file:bg-saffron/20"
              />
            </div>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              rows={4}
              placeholder="Or paste backup JSON here..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm font-mono placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-royal/40 resize-y"
            />
            <button
              onClick={handleImport}
              className="mt-3 px-5 py-2.5 rounded-xl bg-linear-to-r from-royal to-violet text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <HardDrive className="h-4 w-4" />
              Restore Data
            </button>
          </div>

          {/* Reset */}
          <div className="p-5 rounded-2xl bg-red-50/50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-red-700 dark:text-red-400">Reset All Data</h4>
                <p className="text-xs text-red-500/80 dark:text-red-400/80">Permanently delete all admin data and restore defaults</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="mt-3 px-5 py-2.5 rounded-xl border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 text-sm font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Reset Everything
            </button>
          </div>
        </div>
      </Section>

      {/* Status toast */}
      {backupStatus && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl text-sm font-semibold flex items-center gap-2 ${
            backupStatus.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {backupStatus.type === "success" ? "✓" : "✗"} {backupStatus.message}
        </div>
      )}
    </div>
  );
}

/* ---- Collapsible Section ---- */
function Section({
  title,
  field,
  open,
  onToggle,
  children,
}: {
  title: string;
  field: Field;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
      >
        <span className="text-lg font-semibold text-ink dark:text-white">{title}</span>
        <svg
          className={`h-5 w-5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}

/* ---- Reusable Field ---- */
function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink dark:text-gray-300 mb-1.5">
        {label}
        {hint && <span className="block text-xs text-gray-400 font-normal">{hint}</span>}
      </label>
      {children}
    </div>
  );
}
