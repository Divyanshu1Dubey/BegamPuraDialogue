// Admin data store — single source of truth for all editable content
// Syncs to localStorage so changes persist across sessions without a backend.
// All defaults are EMPTY — no fabricated data. Real data comes from admin entry.

export interface AdminHero {
  title: string;
  subtitle: string;
  tagline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  portraitSrc: string;
}

export interface AdminStat {
  label: string;
  labelHindi: string;
  value: string;
  icon: string;
}

export interface AdminTimelineRow {
  period: string;
  title: string;
  titleHindi: string;
  description: string;
}

export interface AdminAbout {
  intro: string;
  stats: AdminStat[];
  timeline: AdminTimelineRow[];
}

export interface AdminTeachingsItem {
  title: string;
  titleHindi: string;
  description: string;
  icon: string;
  color: string;
}

export interface AdminBegampura {
  heading: string;
  subheading: string;
  vision: string;
  pillars: { title: string; description: string }[];
}

export interface AdminEvent {
  id: string;
  title: string;
  titleHindi: string;
  date: string;
  location: string;
  description: string;
  icon: string;
  featured: boolean;
}

export interface AdminGalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
  featured: boolean;
}

export interface AdminLibraryItem {
  id: string;
  title: string;
  titleHindi: string;
  type: "pdf" | "ebook" | "audio" | "video";
  src: string;
  description: string;
}

export interface AdminDonation {
  id: string;
  donorName: string;
  amount: number;
  currency: string;
  date: string;
  method: string;
  message?: string;
  anonymous: boolean;
  campaign?: string;
}

export interface AdminSeoPageOverride {
  path: string;
  title: string;
  description: string;
  keywords: string;
}

export interface AdminSettings {
  siteName: string;
  siteUrl: string;
  countdownTarget: string;
  // Global SEO
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  // Open Graph
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  // Twitter
  twitterHandle: string;
  twitterCardType: "summary" | "summary_large_image";
  // JSON-LD structured data
  orgName: string;
  orgLogo: string;
  orgDescription: string;
  orgEmail: string;
  orgPhone: string;
  orgAddress: string;
  eventName: string;
  eventStartDate: string;
  eventEndDate: string;
  eventLocation: string;
  // Per-page overrides
  pageOverrides: AdminSeoPageOverride[];
  // Contact
  contactEmail: string;
  contactPhone: string;
  socialLinks: { platform: string; url: string }[];
  maintenanceMode: boolean;
}

export interface AdminState {
  hero: AdminHero;
  about: AdminAbout;
  teachings: AdminTeachingsItem[];
  begampura: AdminBegampura;
  events: AdminEvent[];
  gallery: AdminGalleryItem[];
  library: AdminLibraryItem[];
  donations: AdminDonation[];
  settings: AdminSettings;
}

const STORAGE_KEY = "brhf-admin-data";

function getDefaults(): AdminState {
  return {
    hero: {
      title: "Be-gumpura",
      subtitle: "The Light of Equality",
      tagline: "650th Birth Anniversary · 2027",
      ctaPrimary: "Explore the Mission",
      ctaSecondary: "Register for the 650th",
      portraitSrc: "/assets/OIP.webp",
    },
    about: {
      intro: "",
      stats: [],
      timeline: [],
    },
    teachings: [],
    begampura: {
      heading: "",
      subheading: "",
      vision: "",
      pillars: [],
    },
    events: [],
    gallery: [],
    library: [],
    donations: [],
    settings: {
      siteName: "BRHF · Be-gumpura Dialogue",
      siteUrl: "https://begampuradialogue.org",
      countdownTarget: "2027-02-16T06:00:00+05:30",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
      ogTitle: "",
      ogDescription: "",
      ogImage: "/og-image.svg",
      ogUrl: "https://begampuradialogue.org",
      twitterHandle: "@BRHFofficial",
      twitterCardType: "summary_large_image",
      orgName: "British Ravidassia Heritage Foundation",
      orgLogo: "/logo.svg",
      orgDescription: "",
      orgEmail: "brhresearch@yahoo.com",
      orgPhone: "+44-7951007320",
      orgAddress: "1 Chaucer Drive, Biggleswade, Bedfordshire, SG18 8QG, GB",
      eventName: "650th Janam Jayanti of Sant Ravidas Ji",
      eventStartDate: "2027-02-16",
      eventEndDate: "2027-02-22",
      eventLocation: "Varanasi, India",
      pageOverrides: [],
      contactEmail: "brhresearch@yahoo.com",
      contactPhone: "+44-7951007320",
      socialLinks: [],
      maintenanceMode: false,
    },
  };
}

// Load from localStorage or return empty defaults
export function loadAdminState(): AdminState {
  if (typeof window === "undefined") return getDefaults();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to handle new fields added after initial save
      return {
        hero: { ...getDefaults().hero, ...(parsed.hero || {}) },
        about: {
          ...getDefaults().about,
          ...(parsed.about || {}),
          stats: Array.isArray(parsed.about?.stats) ? parsed.about.stats : [],
          timeline: Array.isArray(parsed.about?.timeline) ? parsed.about.timeline : [],
        },
        teachings: Array.isArray(parsed.teachings) ? parsed.teachings : [],
        begampura: { ...getDefaults().begampura, ...(parsed.begampura || {}), pillars: Array.isArray(parsed.begampura?.pillars) ? parsed.begampura.pillars : [] },
        events: Array.isArray(parsed.events) ? parsed.events : [],
        gallery: Array.isArray(parsed.gallery) ? parsed.gallery : [],
        library: Array.isArray(parsed.library) ? parsed.library : [],
        donations: Array.isArray(parsed.donations) ? parsed.donations : [],
        settings: { ...getDefaults().settings, ...(parsed.settings || {}), socialLinks: Array.isArray(parsed.settings?.socialLinks) ? parsed.settings.socialLinks : [], pageOverrides: Array.isArray(parsed.settings?.pageOverrides) ? parsed.settings.pageOverrides : [] },
      };
    }
  } catch {
    // corrupted data — return defaults
  }
  return getDefaults();
}

// Save to localStorage
export function saveAdminState(state: AdminState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // quota exceeded
  }
}

// Update a specific section
export function updateAdminSection<K extends keyof AdminState>(
  section: K,
  data: Partial<AdminState[K]>
): AdminState {
  const current = loadAdminState();
  const updated = { ...current, [section]: { ...current[section], ...data } };
  saveAdminState(updated);
  return updated;
}

// Reset to defaults (empty state)
export function resetAdminState(): AdminState {
  const defaults = getDefaults();
  saveAdminState(defaults);
  return defaults;
}

// ── CSV Export Utility ───────────────────────────────────────────────────────

export function exportDonationsCSV(donations: AdminDonation[]): string {
  const headers = ["ID", "Donor Name", "Amount", "Currency", "Date", "Method", "Campaign", "Anonymous", "Message"];
  const rows = donations.map((d) => [
    d.id,
    d.anonymous ? "Anonymous" : d.donorName,
    d.amount.toFixed(2),
    d.currency,
    d.date,
    d.method,
    d.campaign || "General",
    d.anonymous ? "Yes" : "No",
    (d.message || "").replace(/"/g, '""'),
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  return "﻿" + csv; // BOM for Excel UTF-8
}

export function exportAnalyticsCSV(
  monthlyData: { month: string; label: string; total: number; count: number }[],
  byMethod: { name: string; value: number }[],
  byCampaign: { name: string; value: number }[],
  donations: AdminDonation[]
): string {
  const sections: string[] = [];

  // Section 1: Monthly trend
  sections.push("=== MONTHLY DONATION TREND ===");
  sections.push(["Month", "Label", "Total (£)", "Count"].join(","));
  monthlyData.forEach((m) => {
    sections.push([m.month, m.label, m.total.toFixed(2), m.count].join(","));
  });
  sections.push("");

  // Section 2: By method
  sections.push("=== BY PAYMENT METHOD ===");
  sections.push(["Method", "Total (£)"].join(","));
  byMethod.forEach((m) => {
    sections.push([m.name, m.value.toFixed(2)].join(","));
  });
  sections.push("");

  // Section 3: By campaign
  sections.push("=== BY CAMPAIGN ===");
  sections.push(["Campaign", "Total (£)"].join(","));
  byCampaign.forEach((c) => {
    sections.push([c.name, c.value.toFixed(2)].join(","));
  });
  sections.push("");

  // Section 4: Raw donations
  sections.push("=== ALL DONATIONS ===");
  const headers = ["ID", "Donor Name", "Amount", "Currency", "Date", "Method", "Campaign", "Anonymous", "Message"];
  const rows = donations.map((d) => [
    d.id,
    d.anonymous ? "Anonymous" : d.donorName,
    d.amount.toFixed(2),
    d.currency,
    d.date,
    d.method,
    d.campaign || "General",
    d.anonymous ? "Yes" : "No",
    (d.message || "").replace(/"/g, '""'),
  ]);
  sections.push(headers.join(","));
  rows.forEach((row) => sections.push(row.map((cell) => `"${cell}"`).join(",")));

  return "﻿" + sections.join("\n");
}

export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
