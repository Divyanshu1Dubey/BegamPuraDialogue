import { Metadata } from "next";

const siteUrl = "https://begampuradialogue.org";

export const metadata: Metadata = {
  title: "BRHF · Be-gumpura Dialogue — 650th Janam Jayanti",
  description:
    "The light of Be-gumpura — celebrating 650 years of Sant Ravidas Ji's vision of equality, dignity, and a city without sorrow.",
  keywords: ["Sant Ravidas", "Be-gumpura", "650th Janam Jayanti", "BRHF"],
  openGraph: {
    title: "BRHF · Be-gumpura Dialogue — 650th Janam Jayanti",
    description:
      "The light of Be-gumpura — celebrating 650 years of Sant Ravidas Ji's vision of equality, dignity, and a city without sorrow.",
    url: siteUrl,
    siteName: "BRHF Be-gumpura Dialogue",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BRHF · Be-gumpura Dialogue — 650th Janam Jayanti",
    images: ["/og-image.svg"],
  },
};
