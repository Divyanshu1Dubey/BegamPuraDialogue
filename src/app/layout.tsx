import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Playfair_Display, Inter, Noto_Serif_Devanagari, Noto_Sans_Gurmukhi } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SEOManager } from "@/components/SEOManager";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SkipToContent } from "@/components/SkipToContent";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoDevanagari = Noto_Serif_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  display: "swap",
});

const notoGurmukhi = Noto_Sans_Gurmukhi({
  variable: "--font-noto-gurmukhi",
  subsets: ["gurmukhi"],
  display: "swap",
});

const siteUrl = "https://begampuradialogue.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BRHF · Begampura Dialogue — 650th Janam Jayanti of Sant Ravidas Ji",
    template: "%s · BRHF Begampura Dialogue",
  },
  description:
    "Celebrating 650 years of Sant Ravidas Ji — the saint who first envisioned Begampura, the city without sorrow, fear, or tax on labour. Initiated by the British Ravidassia Heritage Foundation.",
  keywords: [
    "Sant Ravidas",
    "Ravidas Ji",
    "Begampura",
    "650th Janam Jayanti",
    "Guru Ravidas",
    "British Ravidassia Heritage Foundation",
    "BRHF",
    "Guru Granth Sahib",
    "Ravidassia",
    "Be-gumpura",
    "National Dialogue",
    "Delhi 2026",
    "interfaith",
    "equality",
    "anti-caste",
    "Sangat",
    "Punjab",
    "Varanasi",
  ],
  authors: [{ name: "British Ravidassia Heritage Foundation" }],
  creator: "British Ravidassia Heritage Foundation",
  publisher: "BRHF",
  category: "Spirituality, Heritage, Community",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "BRHF Begampura Dialogue",
    title: "BRHF · Begampura Dialogue — 650th Janam Jayanti",
    description:
      "The light of Begampura — celebrating 650 years of Sant Ravidas Ji's vision of equality, dignity, and a city without sorrow.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "BRHF Begampura Dialogue — 650th Janam Jayanti of Sant Ravidas Ji",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BRHF · Begampura Dialogue — 650th Janam Jayanti",
    description:
      "Celebrating 650 years of Sant Ravidas Ji's vision of Begampura — the city without sorrow.",
    images: ["/og-image.svg"],
    creator: "@BRHFofficial",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      en: "/",
      hi: "/?lang=hi",
      pa: "/?lang=pa",
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0710" },
    { media: "(prefers-color-scheme: light)", color: "#fff7ec" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(pathname.startsWith("/admin"));
  }, [pathname]);

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} ${notoDevanagari.variable} ${notoGurmukhi.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-bg text-ink font-unicode overflow-x-hidden"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LoadingOverlay />
          <LanguageProvider>
            <TooltipProvider delay={150}>
              <SkipToContent />
              <SEOManager />
              {!isAdmin && <Navbar />}
              <main id="main-content" className="flex-1 min-h-0">{children}</main>
              {!isAdmin && <Footer />}
              {isAdmin && <ScrollToTop />}
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
