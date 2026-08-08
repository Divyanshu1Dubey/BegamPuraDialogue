"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Download, CheckCircle2 } from "lucide-react";
import { LanguageAware } from "@/components/LanguageAware";
import { Breadcrumb } from "@/components/Breadcrumb";

interface LibraryBook {
  id: string;
  title: string;
  author: string;
  category: string;
  year: string;
  pages: number;
  fileSize: string;
  description: string;
  chapters: string[];
  pdfUrl: string;
}

const libraryBooksMap: Record<string, LibraryBook> = {
  "begampura-vision-and-human-rights": {
    id: "begampura-vision-and-human-rights",
    title: "Begampura: The Vision of Human Rights & Social Equality",
    author: "BRHF Academic Research Council",
    category: "Research Papers",
    year: "2024",
    pages: 148,
    fileSize: "4.2 MB",
    description: "An in-depth scholarly treatise examining Sant Ravidas Ji's 14th-century blueprint of Begampura alongside the UN Universal Declaration of Human Rights.",
    chapters: [
      "Chapter I: The Historical Context of 14th Century Kashi (Varanasi)",
      "Chapter II: Exegesis of the 5 Civic Pillars of Begampura",
      "Chapter III: Anti-Caste Thought and Dignity of Physical Labour",
      "Chapter IV: Comparative Analysis with UN Human Rights Declarations",
      "Chapter V: Global Yatras & The 650th Janam Jayanti Roadmap",
    ],
    pdfUrl: "/assets/HCoI 650th Exhibitions.pdf",
  },
  "40-shabads-interfaith-commentary": {
    id: "40-shabads-interfaith-commentary",
    title: "40 Shabads of Guru Ravidas: Exegesis & Musical Raag Study",
    author: "Dr. Sat Paul MBE & Research Committee",
    category: "Sacred Texts",
    year: "2023",
    pages: 260,
    fileSize: "8.5 MB",
    description: "Complete transliteration, commentary, and musical notation for all 40 Shabads enshrined across 16 Raags in Sri Guru Granth Sahib Ji.",
    chapters: [
      "Volume I: Introduction to the 16 Raags of Bhagat Ravidas Ji",
      "Volume II: Transliteration in Gurmukhi, Devanagari & English",
      "Volume III: Musical Notation (Swaras & Taal)",
      "Volume IV: Philosophical Commentary & Inter-Faith Lessons",
    ],
    pdfUrl: "/assets/Guru Ravidas Pragas Di Khoj.pdf",
  },
  "historical-chronicles-varanasi-to-uk": {
    id: "historical-chronicles-varanasi-to-uk",
    title: "From Kashi to London: Chronicles of Ravidassia Heritage",
    author: "British Ravidassia Heritage Foundation",
    category: "Historical Archives",
    year: "2022",
    pages: 192,
    fileSize: "12.1 MB",
    description: "Historical documentation tracking the preservation of sacred relics, temples, and global diaspora migrations over the past century.",
    chapters: [
      "Part I: The Birthplace Shrine at Seer Goverdhanpur, Varanasi",
      "Part II: 20th Century Diaspora Migrations to UK & Europe",
      "Part III: Establishment of Ravidassia Community Centres in Bedfordshire",
      "Part IV: UK Parliament & House of Lords Assemblies",
    ],
    pdfUrl: "/assets/ORGANISING TEAM BE-GUMPURA .pdf",
  },
  "anti-caste-governance-manual": {
    id: "anti-caste-governance-manual",
    title: "Egalitarian Governance: Lessons from Begampura for Modern Policy",
    author: "Global Dialogue Committee",
    category: "Policy & Civic",
    year: "2025",
    pages: 94,
    fileSize: "3.1 MB",
    description: "Policy recommendations for civic leaders on integrating dignity of labour, tax fairness, and non-discrimination into municipal governance.",
    chapters: [
      "Section 1: The Civic Principles of Begampura",
      "Section 2: Dignity of Physical Labour in Modern Economies",
      "Section 3: Eliminating Unfair Taxes on Working Families",
      "Section 4: Freedom of Speech and Non-Discrimination Frameworks",
    ],
    pdfUrl: "/assets/HCoI 650th Exhibitions.pdf",
  }
};

export default function LibraryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const book = libraryBooksMap[id] || libraryBooksMap["begampura-vision-and-human-rights"];

  return (
    <div className="min-h-screen bg-bg text-ink pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <Breadcrumb
          currentLabel={{
            en: "Publication Details",
            hi: "प्रकाशन विवरण",
            pa: "ਪ੍ਰਕਾਸ਼ਨ ਵੇਰਵਾ",
          }}
        />

        <div className="rounded-3xl card-glass card-saffron-glow p-6 md:p-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-saffron/15 text-xs font-bold text-saffron uppercase">
              {book.category} · Published {book.year}
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold text-gradient-saffron leading-tight mb-3">
            {book.title}
          </h1>
          <p className="text-sm font-bold text-saffron mb-8">{book.author} · {book.pages} Pages</p>

          <div className="p-6 rounded-2xl bg-surface-2/60 border border-border mb-8">
            <h3 className="font-display text-base font-bold text-ink mb-2">Abstract & Scope</h3>
            <p className="text-sm text-ink-soft leading-relaxed font-medium mb-4">
              {book.description}
            </p>
          </div>

          <div className="space-y-3 mb-8">
            <h4 className="font-display text-sm font-bold text-saffron uppercase tracking-wider">Volume Contents</h4>
            {book.chapters.map((ch, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs text-ink p-3 rounded-xl bg-surface border border-border/50">
                <CheckCircle2 className="h-4 w-4 text-saffron shrink-0" />
                <span className="font-semibold">{ch}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 p-6 rounded-2xl bg-saffron/10 border border-saffron/30">
            <div>
              <span className="text-xs font-bold text-ink-soft">Available in PDF ({book.pages} Pages)</span>
              <p className="text-xs text-saffron-deep dark:text-saffron font-bold">Free Open-Access Download ({book.fileSize})</p>
            </div>
            <a
              href={book.pdfUrl}
              download
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-saffron to-saffron-deep text-white font-bold text-xs shadow-lg shadow-saffron/20 flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Download className="h-4 w-4" /> Download PDF ({book.fileSize})
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
