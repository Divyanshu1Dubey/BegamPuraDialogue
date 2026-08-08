"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Search, Download, Eye, Sparkles, Filter, X, FileText } from "lucide-react";
import { LanguageAware } from "@/components/LanguageAware";
import { Breadcrumb } from "@/components/Breadcrumb";

const mockBooks = [
  {
    id: "begampura-vision-and-human-rights",
    title: "Begampura: The Vision of Human Rights & Social Equality",
    author: "BRHF Academic Research Council",
    category: "Research Papers",
    year: "2024",
    pages: 148,
    fileSize: "4.2 MB",
    description: "An in-depth scholarly treatise examining Sant Ravidas Ji's 14th-century blueprint of Begampura alongside the UN Universal Declaration of Human Rights.",
    pdfUrl: "/assets/HCoI 650th Exhibitions.pdf",
  },
  {
    id: "40-shabads-interfaith-commentary",
    title: "40 Shabads of Guru Ravidas: Exegesis & Musical Raag Study",
    author: "Dr. Sat Paul MBE & Research Committee",
    category: "Sacred Texts",
    year: "2023",
    pages: 260,
    fileSize: "8.5 MB",
    description: "Complete transliteration, commentary, and musical notation for all 40 Shabads enshrined across 16 Raags in Sri Guru Granth Sahib Ji.",
    pdfUrl: "/assets/Guru Ravidas Pragas Di Khoj.pdf",
  },
  {
    id: "historical-chronicles-varanasi-to-uk",
    title: "From Kashi to London: Chronicles of Ravidassia Heritage",
    author: "British Ravidassia Heritage Foundation",
    category: "Historical Archives",
    year: "2022",
    pages: 192,
    fileSize: "12.1 MB",
    description: "Historical documentation tracking the preservation of sacred relics, temples, and global diaspora migrations over the past century.",
    pdfUrl: "/assets/ORGANISING TEAM BE-GUMPURA .pdf",
  },
  {
    id: "anti-caste-governance-manual",
    title: "Egalitarian Governance: Lessons from Begampura for Modern Policy",
    author: "Global Dialogue Committee",
    category: "Policy & Civic",
    year: "2025",
    pages: 94,
    fileSize: "3.1 MB",
    description: "Policy recommendations for civic leaders on integrating dignity of labour, tax fairness, and non-discrimination into municipal governance.",
    pdfUrl: "/assets/HCoI 650th Exhibitions.pdf",
  }
];

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [previewPdf, setPreviewPdf] = useState<(typeof mockBooks)[number] | null>(null);

  const filtered = mockBooks.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === "all" || b.category.toLowerCase() === selectedCat.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-bg text-ink pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <Breadcrumb currentLabel={{ en: "E-Library", hi: "ई-लाइब्रेरी", pa: "ਈ-ਲਾਇਬ੍ਰੇਰੀ" }} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-saffron/10 border border-saffron/30 text-xs font-semibold text-saffron uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            <LanguageAware en="Digital Heritage Archives" hi="डिजिटल धरोहर आर्काइव" pa="ਡਿਜੀਟਲ ਵਿਰਾਸਤ ਆਰਕਾਈਵ" />
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-gradient-saffron leading-tight">
            <LanguageAware
              en="BRHF Digital E-Library"
              hi="बीआरएचएफ डिजिटल ई-लाइब्रेरी"
              pa="ਬੀ.ਆਰ.ਐਚ.ਐਫ. ਡਿਜੀਟਲ ਈ-ਲਾਇਬ੍ਰੇਰੀ"
            />
          </h1>
          <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed font-medium">
            <LanguageAware
              en="Search, read online, and download rare historical manuscripts, research publications, and Gurbani exegesis curated by the Foundation."
              hi="फाउंडेशन द्वारा क्यूरेट की गई दुर्लभ ऐतिहासिक पांडुलिपियां, शोध प्रकाशन और गुरबाणी की किताबें पढ़ें।"
              pa="ਫਾਊਂਡੇਸ਼ਨ ਦੁਆਰਾ ਸਾਂਭੀਆਂ ਗਈਆਂ ਦੁਰਲੱਭ ਇਤਿਹਾਸਕ ਪੋਥੀਆਂ, ਖੋਜ ਕਿਤਾਬਾਂ ਪੜ੍ਹੋ ਅਤੇ ਡਾਊਨਲੋਡ ਕਰੋ।"
            />
          </p>
        </motion.div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 card-glass p-4 rounded-2xl">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-saffron" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search library books, papers..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-saffron/50"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <Filter className="h-4 w-4 text-saffron shrink-0" />
            {["all", "Research Papers", "Sacred Texts", "Historical Archives", "Policy & Civic"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCat === cat
                    ? "bg-saffron text-white shadow-md shadow-saffron/20"
                    : "bg-surface text-ink-soft hover:text-saffron hover:bg-surface-2"
                }`}
              >
                {cat === "all" ? "All Volumes" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Library Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filtered.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative flex flex-col sm:flex-row gap-6 p-6 rounded-3xl card-glass card-saffron-glow hover:scale-[1.01] transition-all duration-300"
            >
              {/* Book Spine Icon Box */}
              <div className="w-full sm:w-36 h-48 shrink-0 rounded-2xl bg-gradient-to-br from-saffron-deep to-violet-deep flex flex-col justify-between p-4 text-white shadow-xl relative overflow-hidden">
                <FileText className="h-8 w-8 text-saffron-bright opacity-80" />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-saffron-bright font-bold block mb-1">
                    {b.category}
                  </span>
                  <h4 className="font-display text-xs font-bold line-clamp-3 leading-snug">
                    {b.title}
                  </h4>
                </div>
              </div>

              {/* Book Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-saffron/15 text-[11px] font-bold text-saffron uppercase">
                      {b.year} · {b.pages} Pages
                    </span>
                    <span className="text-xs text-ink-soft font-semibold">{b.fileSize}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-ink group-hover:text-saffron transition-colors leading-snug mb-1">
                    {b.title}
                  </h3>
                  <p className="text-xs text-saffron font-bold mb-3">{b.author}</p>
                  <p className="text-xs text-ink-soft line-clamp-3 leading-relaxed mb-4 font-medium">
                    {b.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/50 flex items-center gap-3">
                  <button
                    onClick={() => setPreviewPdf(b)}
                    className="flex-1 py-2 px-3 rounded-xl bg-saffron text-white text-xs font-bold hover:bg-saffron-deep transition-colors shadow-md shadow-saffron/20 flex items-center justify-center gap-1.5"
                  >
                    <Eye className="h-3.5 w-3.5" /> Read PDF Online
                  </button>
                  <Link
                    href={`/library/${b.id}`}
                    className="py-2 px-3 rounded-xl bg-surface border border-border text-ink-soft hover:text-saffron text-xs font-bold transition-colors"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PDF Reader Modal */}
      <AnimatePresence>
        {previewPdf && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl h-[85vh] rounded-3xl bg-bg border border-border flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
                <div>
                  <h3 className="font-display text-base font-bold text-ink">{previewPdf.title}</h3>
                  <p className="text-xs text-ink-soft">{previewPdf.author} · {previewPdf.pages} Pages</p>
                </div>
                <button
                  onClick={() => setPreviewPdf(null)}
                  className="p-2 text-ink-soft hover:text-ink rounded-full hover:bg-surface-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 bg-surface-2/40 p-6 flex flex-col items-center justify-center text-center">
                <BookOpen className="h-16 w-16 text-saffron mb-4 animate-bounce" />
                <h4 className="font-display text-2xl font-bold text-ink mb-2">Digital Reader Preview</h4>
                <p className="text-sm text-ink-soft max-w-md mb-6">
                  {previewPdf.description}
                </p>
                <a
                  href={previewPdf.pdfUrl}
                  download
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-saffron to-saffron-deep text-white font-bold text-xs shadow-lg shadow-saffron/20 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" /> Download Complete Volume ({previewPdf.fileSize})
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
