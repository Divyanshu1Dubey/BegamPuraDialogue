// British Ravidassia Heritage Foundation (BRHF) — Organization details
// Charity Reg: 1199953, UK-registered
// Sources: HCoI 650th Exhibitions letter, Organising Team PDF, and public archives

import { guru } from "./guru";

export interface CommitteeMember {
  role: string;
  roleHindi?: string;
  name: string;
  country: string;
  city?: string;
  title?: string;
}

export interface CommemorativeEvent {
  month: string;
  year: number;
  title: string;
  titleHindi?: string;
  subtitle?: string;
  occasion?: string;
  location: string;
  time?: string;
  day?: string;
  description: string;
  icon?: string;
  isToday?: boolean;
  isProposed?: boolean;
  status?: string;
  quote?: string;
  quoteAuthor?: string;
  organizers?: readonly string[];
  ageGroups?: readonly string[];
}

export interface GlobalChapter {
  country: string;
  city: string;
  head: string;
  description: string;
}

export const brhf = {
  fullName: "British Ravidassia Heritage Foundation",
  abbreviation: "BRHF",
  charityReg: "1199953",
  headquarters: {
    address: "1 Chaucer Drive, Biggleswade, Bedfordshire SG18 8QG, United Kingdom",
    email: "brhresearch@yahoo.com",
    phone: "+44 (0)7951007320",
    phoneAlt: "+44 (0)7954426356",
  },
  leadership: {
    internationalPatron: {
      title: "International Patron",
      name: "Shri Om Prakash",
    },
    indiaHead: {
      title: "India Head",
      name: "Shri Rajesh Bagha",
    },
    secretary: {
      title: "Secretary & Founder Trustee",
      name: "Sat Paul MBE",
    },
  },
  mission: {
    primary: "To preserve, document, and propagate the teachings of Sant Ravidas Ji across the world, fostering a casteless, equal, and humane society.",
    secondary:
      "Through research, exhibitions, publications, and international dialogue — making the universal message of Be-gumpura accessible to all.",
  },
  tagline: {
    en: "Bringing the Light of Be-gumpura to the World",
    hi: "बे-गमपुरा का प्रकाश संसार में लाना",
    pa: "ਬੇਗਮਪੁਰਾ ਦੀ ਰੋਸ਼ਨੀ ਦੁਨੀਆਂ ਵਿੱਚ ਲਿਆਉਂਦੇ",
  },
  foundingYear: 2005,
  workAreas: [
    "Research & Publications",
    "International Exhibitions",
    "Commemorative Lectures & Yatras",
    "Digital Library & Archives",
    "Youth Engagement & Education",
    "Community Dialogue & Advocacy",
  ],
  // 8 Global Yatras organised in UK to study Guru Ravidas
  exhibitions: [
    "Yatra 1: Early Life & Spiritual Awakening (Varanasi)",
    "Yatra 2: Philosophical Teachings — Be-gumpura & Equality",
    "Yatra 3: Anti-Caste Movement & Social Revolution — Be-gumpura",
    "Yatra 4: The 40,000 km Journey — Travels & Contemporaries",
    "Yatra 5: Miracles, Legends & Popular Devotion",
    "Yatra 6: Bani in Guru Granth Sahib — 27 Raags, 40 Shabads (Amritvani tradition)",
    "Yatra 7: Global Diaspora — Ravidassia Communities in UK, USA, Canada, Brazil",
    "Yatra 8: Be-gumpura Vision for the 21st Century",
  ],
  globalEvents: [
    {
      month: "10 August 2026",
      year: 2026,
      title: "Begumpura Dialogue Inaugural Conclave & Website Launch",
      titleHindi: "बेगमपुरा संवाद का उदघाटन सम्मेलन एवं वेबसाइट लोकार्पण",
      subtitle: "Reflecting • Deliberating • Advancing the Dialogue",
      occasion: "Commemorating the 650th Birth Anniversary of Sant Shiromani Guru Ravidas Ji",
      location: "Constitution Club of India, New Delhi",
      time: "6:30 PM Onwards",
      day: "Monday",
      isToday: true,
      status: "Live Today",
      icon: "🌟",
      description:
        "On the occasion of the 650th Birth Anniversary of Sant Shiromani Guru Ravidas Ji, the Begumpura Dialogue is envisioned as a two-year initiative inspired by his timeless philosophy and Shabds, promoting the values of equality, dignity, fraternity, justice, compassion, social harmony and freedom from discrimination. The Inaugural Conclave marks the commencement of this collective journey, bringing together stakeholders to shape the intellectual framework, thematic architecture and long-term roadmap, alongside the official launch of the website.",
      quote: "ऐसा चाहूँ राज मैं, जहाँ मिले सबन को अन्न। छोट बड़ो सब सम बसैं, रविदास रहे प्रसन्न॥",
      quoteAuthor: "Sant Shiromani Guru Ravidas Ji",
      organizers: [
        "British Ravidassia Heritage Foundation",
        "NAMO Foundation (Network for Access to Justice & Multidisciplinary Outreach Foundation)",
        "Pathway Global Alliance",
        "Advanced Study Institute of ASIA (ASIA)",
      ],
    },
    {
      month: "Proposed Event",
      year: 2026,
      title: "Viksit Bharat Generation – Reel Making Competition",
      titleHindi: "विकसित भारत पीढ़ी — रील्स मेकिंग प्रतियोगिता",
      location: "Online / Global Submissions",
      isProposed: true,
      status: "Proposed Event",
      icon: "🎬",
      description:
        "A national youth competition encouraging creative reel submissions reflecting the vision of Viksit Bharat and egalitarian values of Sant Ravidas Ji. Full event details will be filled in later.",
      ageGroups: ["14–18 years", "18–23 years"],
    },
    {
      month: "November 2026",
      year: 2026,
      title: "Bhashan Shivir — 'The Sound of Be-gumpura'",
      titleHindi: "भाषण शिविर — 'बे-गमपुरा का स्वर'",
      location: "New Delhi, India",
      description:
        "A week-long programme of discourses, exhibitions, and cultural performances leading up to the 650th Janam Jayanti celebration.",
      icon: "🇮🇳",
    },
    {
      month: "Early 2027",
      year: 2027,
      title: "Exhibition at the Houses of Parliament, London",
      titleHindi: "लंदन हाउस ऑफ पार्लियामेंट में प्रदर्शनी",
      location: "Palace of Westminster, London, United Kingdom",
      description:
        "An exhibition and dialogue on the life and teachings of Sant Ravidas Ji at the historic Houses of Parliament — bringing the Be-gumpura message to the UK Parliament.",
      icon: "🇬🇧",
    },
    {
      month: "January 2027",
      year: 2027,
      title: "Be-gumpura Dialogue at the European Parliament",
      titleHindi: "यूरोपियन परlement में बेगमपुरा बातचीत",
      location: "European Parliament, Brussels, Belgium",
      description:
        "A high-level policy dialogue on the Be-gumpura vision and its relevance for contemporary European and global governance, hosted at the European Parliament.",
      icon: "🇪🇺",
    },
    {
      month: "February 2027",
      year: 2027,
      title: "650th Janam Jayanti Mahotsav",
      titleHindi: "650वीं जन्म जयंती महोत्सव",
      location: "Varanasi (and globally simultaneous celebrations)",
      description:
        "The pinnacle commemoration — spiritual gatherings, exhibitions, kirtan sewa, and global prayers honouring 650 years of the Be-gumpura message.",
      icon: "🕉️",
    },
  ],
  globalChapters: [
    { country: "United Kingdom", city: "London", head: "Sat Paul MBE", description: "BRHF headquarters; House of Lords exhibition lead" },
    { country: "India", city: "New Delhi", head: "Shri Rajesh Bagha", description: "India national coordination; November 2026 Bhashan Shivir" },
    { country: "United States", city: "New York / California", head: "Coordinator", description: "Diaspora engagement, community events" },
    { country: "Canada", city: "Ontario / Vancouver", head: "Coordinator", description: "Sikh-Dalit solidarity, interfaith dialogue" },
    { country: "Brazil", city: "São Paulo", head: "Coordinator", description: "South American Ravidassia community" },
    { country: "Italy", city: "Rome / Milan", head: "Coordinator", description: "European Sikh-Dalit community outreach" },
  ],
} as const;

// Upcoming deadlines
export const deadlines = [
  { date: new Date("2026-08-10"), label: "Begumpura Dialogue — Inaugural Conclave & Website Launch, Constitution Club of India, New Delhi", urgent: true },
  { date: new Date("2026-11-01"), label: "650th Janam Jayanti Global Commemorative Series Begins (Bhashan Shivir, Delhi)", urgent: true },
  { date: new Date("2026-11-15"), label: "UK House of Lords Exhibition — Opening", urgent: false },
  { date: new Date("2027-01-20"), label: "European Parliament Be-gumpura Dialogue, Brussels", urgent: false },
  { date: new Date("2027-02-16"), label: "650th Janam Jayanti Mahotsav — Magh Purnima, Varanasi", urgent: true },
];

// Presentation deadline
export const presentationDeadline = new Date("2026-08-08");
