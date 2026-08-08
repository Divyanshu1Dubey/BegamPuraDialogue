// Admin data store — single source of truth for all editable content
// Syncs to localStorage so changes persist across sessions without a backend.

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
      title: "Begampura",
      subtitle: "The Light of Equality",
      tagline: "650th Birth Anniversary · 2027",
      ctaPrimary: "Explore the Mission",
      ctaSecondary: "Register for the 650th",
      portraitSrc: "/assets/OIP.webp",
    },
    about: {
      intro: "Sant Ravidas Ji (1414–1540 AD) — the saint-poet who gave the world the vision of Begampura, a city without sorrow, without fear, without tax on labour.",
      stats: [
        { label: "Years Lived", labelHindi: "वर्ष जीवित", value: "126", icon: "Calendar" },
        { label: "Satsangs Held", labelHindi: "सत्संग", value: "94,000+", icon: "Users" },
        { label: "Km Travelled", labelHindi: "किमी यात्रा", value: "40,000+", icon: "MapPin" },
        { label: "Shabads Penned", labelHindi: "शabad", value: "126", icon: "BookOpen" },
        { label: "Raags", labelHindi: "राग", value: "16", icon: "Music" },
        { label: "Shlokas", labelHindi: "श्लोक", value: "216", icon: "FileText" },
      ],
      timeline: [
        { period: "1414 AD", title: "Birth at Varanasi", titleHindi: "काशी में जन्म", description: "Born to Shri Raghunanda and Shrimati Karma Devi in Manduadih, Seergovardhanpur on the banks of the Ganges." },
        { period: "1420 AD", title: "Spiritual Awakening", titleHindi: "आध्यात्मिक जागृति", description: "Under the guidance of Guru Ramanand, began the journey of Bhakti and selfless service." },
        { period: "1440 AD", title: "First Public Discourse", titleHindi: "पहला सार्वजनिक भाषण", description: "First to give public discourse from a temple, breaking the caste barrier at Varanasi's Vishwanath Gali." },
        { period: "1490 AD", title: "8 Great Yatras", titleHindi: "8 महान यात्राएं", description: "Travelled 40,000 km across the Indian subcontinent — Punjab, Rajasthan, Gujarat, Bengal, Karnataka, Delhi, Mithila, Gorakhpur." },
        { period: "1528 AD", title: "Miracles & Teachings", titleHindi: "चमत्कार और शिक्षाएं", description: "Cured Prince Humayun; convinced Sultan Sikandar Lodhi to walk beside him as an equal; performed many acts of divine justice." },
        { period: "1540 AD", title: "Departure from Begampura", titleHindi: "बेगमपुरा से प्रस्थान", description: "Left this world at the age of 126, leaving behind a legacy of equality, dignity, and the song of Begampura." },
      ],
    },
    teachings: [
      { title: "Begampura", titleHindi: "बेगमपुरा", description: "The first vision of a society without caste, without tax on labour, without sorrow — the guiding star of any modern welfare state.", icon: "Castle", color: "from-saffron to-saffron-deep" },
      { title: "Dignity of Labour", titleHindi: "श्रम की गरिमा", description: "Honest labour is true devotion — work over pedigree, Kirat as the highest form of worship.", icon: "Hammer", color: "from-amber-400 to-orange-500" },
      { title: "Anti-Caste", titleHindi: "जाति-विहीन समाज", description: "Rejected the varna order — 'The Lord made all from one clay; how then is one better?'", icon: "Scale", color: "from-royal to-indigo" },
      { title: "Universal Brotherhood", titleHindi: "एक नूर", description: "All light comes from the One — the chhotas and brahmins stand equal in God's court.", icon: "Globe", color: "from-emerald-400 to-teal-600" },
      { title: "Woman as Sacred", titleHindi: "नारी की पवित्रता", description: "'From a woman is the seed of all — why is she considered evil?' First to publicly revere the divine feminine.", icon: "Heart", color: "from-rose-400 to-pink-600" },
      { title: "Sabhal Sobha", titleHindi: "सभल विच सोभा", description: "The Divine resides in every gathering — where the people are, there is God. Sabka Saath, Sabka Vikas.", icon: "Users", color: "from-violet-500 to-purple-700" },
    ],
    begampura: {
      heading: "The Vision of Begampura",
      subheading: "A City Without Sorrow",
      vision: "Begampura is not a physical city — it is a state of being, a social order, a declaration. It is the first articulation in world literature of a casteless, classless, fearless society where every human being lives with dignity, free from exploitation and sorrow.",
      pillars: [
        { title: "No Caste", description: "Equality of all human beings — the divine spark resides in every heart equally." },
        { title: "No Tax on Labour", description: "Honest work is sacred — no exploitation of the worker, no unjust extraction." },
        { title: "No Sorrow", description: "A society where fear, want, and injustice have no address — Begampura, the city without sorrow." },
        { title: "No Fear", description: "Freedom from oppression, violence, and discrimination — the fearless citizen is the foundation of a just society." },
      ],
    },
    events: [
      { id: "evt-1", title: "Be-gumpura Dialogue", titleHindi: "बेगमपुरा बातचीत", date: "2026-08-10", location: "New Delhi, India", description: "National Dialogue & Community Leadership Conclave bringing together leaders from across India.", icon: "🇮🇳", featured: true },
      { id: "evt-2", title: "Bhashan Shivir", titleHindi: "भाषण शिविर", date: "2026-11-01", location: "New Delhi, India", description: "Week-long programme of discourses, exhibitions, and cultural performances.", icon: "🎤", featured: true },
      { id: "evt-3", title: "UK House of Lords Exhibition", titleHindi: "UK सांसद भवन प्रदर्शनी", date: "2026-11-15", location: "London, United Kingdom", description: "Exhibition on the life and teachings of Sant Ravidas Ji at the historic House of Lords.", icon: "🇬🇧", featured: true },
      { id: "evt-4", title: "Be-gumpura Dialogue at European Parliament", titleHindi: "यूरोपियan Sansad बातचीत", date: "2027-01-20", location: "Brussels, Belgium", description: "High-level policy dialogue on the Begampura vision for contemporary governance.", icon: "🇪🇺", featured: true },
      { id: "evt-5", title: "650th Janam Jayanti Mahotsav", titleHindi: "650वीं जन्म जयंती महोत्सव", date: "2027-02-16", location: "Varanasi, India", description: "The pinnacle commemoration — spiritual gatherings, exhibitions, kirtan sewa, and global prayers.", icon: "🕉️", featured: true },
    ],
    gallery: [
      { id: "gal-1", src: "/assets/OIP.webp", alt: "Sant Ravidas Ji Portrait", caption: "Sant Ravidas Ji — the visionary saint", category: "Portrait", featured: true },
      { id: "gal-2", src: "/assets/650th-anniversary-begampura-dialogue-brhf-celebration-sant-ravidas.png", alt: "BRHF 650th Celebration", caption: "BRHF celebrating the 650th Janam Jayanti", category: "Events", featured: true },
      { id: "gal-3", src: "/assets/brhf.png", alt: "BRHF Logo", caption: "British Ravidassia Heritage Foundation", category: "Logo", featured: true },
      { id: "gal-4", src: "/assets/begampura_dialogue_logo.png", alt: "Begampura Dialogue Logo", caption: "Begampura Dialogue — BRHF initiative", category: "Logo", featured: true },
    ],
    library: [
      { id: "lib-1", title: "Begampura Dialogue — Official Publication", titleHindi: "बेगमपुरा बातचीत — आधिकारिक प्रकाशन", type: "pdf", src: "/assets/begampura-dialogue-1.pdf", description: "Complete publication of the Begampura Dialogue initiative." },
      { id: "lib-2", title: "650th Janam Jayanti — Exhibition Catalogue", titleHindi: "650वीं जन्म जयंती — प्रदर्शनी कैटलॉग", type: "pdf", src: "/assets/janamjayanti2027.pdf", description: "Catalogue of the 650th Janam Jayanti exhibitions across 8 yatras." },
    ],
    donations: [
      { id: "don-1", donorName: "Anonymous", amount: 500, currency: "GBP", date: "2026-08-07", method: "Online", anonymous: true, campaign: "General" },
      { id: "don-2", donorName: "Sat Paul", amount: 1000, currency: "GBP", date: "2026-08-06", method: "Bank Transfer", anonymous: false, campaign: "General" },
      { id: "don-3", donorName: "Rajesh Bagha", amount: 750, currency: "GBP", date: "2026-08-05", method: "Online", anonymous: false, campaign: "Exhibition" },
    ],
    settings: {
      siteName: "BRHF · Begampura Dialogue",
      siteUrl: "https://begampuradialogue.org",
      countdownTarget: "2027-02-16T06:00:00+05:30",
      // Global SEO
      seoTitle: "BRHF · Begampura Dialogue — 650th Janam Jayanti of Sant Ravidas Ji",
      seoDescription: "Celebrating 650 years of Sant Ravidas Ji — the saint who first envisioned Begampura, the city without sorrow, fear, or tax on labour. Initiated by the British Ravidassia Heritage Foundation.",
      seoKeywords: "Sant Ravidas,Ravidas Ji,Begampura,650th Janam Jayanti,Guru Ravidas,British Ravidassia Heritage Foundation,BRHF,Guru Granth Sahib,Ravidassia,Be-gumpura,National Dialogue,Delhi 2026,interfaith,equality,anti-caste,Sangat,Punjab,Varanasi",
      // Open Graph
      ogTitle: "BRHF · Begampura Dialogue — 650th Janam Jayanti",
      ogDescription: "The light of Begampura — celebrating 650 years of Sant Ravidas Ji's vision of equality, dignity, and a city without sorrow.",
      ogImage: "/og-image.svg",
      ogUrl: "https://begampuradialogue.org",
      // Twitter
      twitterHandle: "@BRHFofficial",
      twitterCardType: "summary_large_image",
      // JSON-LD
      orgName: "British Ravidassia Heritage Foundation",
      orgLogo: "/logo.svg",
      orgDescription: "Celebrating the 650th Janam Jayanti of Sant Ravidas Ji and the Begampura vision. Registered Charity 1199953.",
      orgEmail: "brhresearch@yahoo.com",
      orgPhone: "+44-7951007320",
      orgAddress: "1 Chaucer Drive, Biggleswade, Bedfordshire, SG18 8QG, GB",
      eventName: "650th Janam Jayanti of Sant Ravidas Ji",
      eventStartDate: "2027-02-16",
      eventEndDate: "2027-02-22",
      eventLocation: "Varanasi, India",
      // Per-page overrides
      pageOverrides: [
        { path: "/", title: "BRHF · Begampura Dialogue", description: "Celebrating 650 years of Sant Ravidas Ji — the saint who first envisioned Begampura, the city without sorrow.", keywords: "Sant Ravidas, Begampura, 650th Janam Jayanti, BRHF" },
        { path: "/about", title: "About Sant Ravidas Ji — Life, Teachings & Legacy", description: "Learn about Sant Ravidas Ji (1414-1540) — the saint-poet who envisioned Begampura. His life, 8 great yatras, and the Begampura vision.", keywords: "Sant Ravidas biography, Begampura vision, Ravidas life, 1414-1540" },
        { path: "/teachings", title: "Teachings — 16 Raags of Sant Ravidas Ji", description: "Explore the 6 core teachings of Sant Ravidas across 16 Raags in Sri Guru Granth Sahib Ji. Dignity of labour, equality, Begampura.", keywords: "Ravidas teachings, Begampura, equality, anti-caste, Sri Guru Granth Sahib" },
        { path: "/shabads", title: "40 Shabads of Bhagat Ravidas Ji — Gurbani Archive", description: "Read 40 divine shabads of Bhagat Ravidas Ji in Gurmukhi, Devanagari, and English translation from Sri Guru Granth Sahib Ji.", keywords: "Ravidas shabads, Gurbani, Sri Guru Granth Sahib, Gurmukhi, Bani" },
        { path: "/begampura", title: "Begampura — The Vision of a Just Society", description: "Begampura is not a physical city — it is a state of being. Sant Ravidas Ji's vision of a casteless, classless, fearless society.", keywords: "Begampura, Ravidas vision, just society, caste-less society, Begampura pillars" },
        { path: "/events", title: "650th Janam Jayanti Global Events 2026-2027", description: "Global events commemorating 650 years of Sant Ravidas Ji — from Delhi to London House of Lords to Brussels Parliament.", keywords: "650th Janam Jayanti, Ravidas events, BRHF, Delhi, London, Brussels" },
        { path: "/library", title: "Publications Library — Begampura Dialogue Resources", description: "Browse publications, exhibition catalogues, and digital resources from the Begampura Dialogue initiative.", keywords: "Begampura publications, Ravidas books, exhibition catalogue, BRHF publications" },
        { path: "/gallery", title: "Photo Gallery — 650th Janam Jayanti Commemoration", description: "Photo gallery from the 650th Janam Jayanti events, portraits, and commemorations across the world.", keywords: "Ravidas gallery, photos, 650th anniversary, BRHF events" },
        { path: "/connect", title: "Connect with BRHF — Contact & Get Involved", description: "Get in touch with the British Ravidassia Heritage Foundation. Join the global Begampura movement.", keywords: "BRHF contact, Begampura, get involved, Ravidassia Heritage Foundation" },
      ],
      // Contact
      contactEmail: "brhresearch@yahoo.com",
      contactPhone: "+44-7951007320",
      socialLinks: [
        { platform: "Facebook", url: "https://facebook.com/BRHFofficial" },
        { platform: "Twitter", url: "https://twitter.com/BRHFofficial" },
        { platform: "Instagram", url: "https://instagram.com/BRHFofficial" },
      ],
      maintenanceMode: false,
    },
  };
}

// Load from localStorage or return defaults
export function loadAdminState(): AdminState {
  if (typeof window === "undefined") return getDefaults();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...getDefaults(), ...parsed };
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

// Reset to defaults
export function resetAdminState(): AdminState {
  const defaults = getDefaults();
  saveAdminState(defaults);
  return defaults;
}
