import { Metadata } from "next";

const siteUrl = "https://begampuradialogue.org";

export const metadata: Metadata = {
  title: "BRHF · Begampura Dialogue — 650th Janam Jayanti",
  description:
    "The light of Begampura — celebrating 650 years of Sant Ravidas Ji's vision of equality, dignity, and a city without sorrow.",
  keywords: ["Sant Ravidas", "Begampura", "650th Janam Jayanti", "BRHF"],
  openGraph: {
    title: "BRHF · Begampura Dialogue — 650th Janam Jayanti",
    description:
      "The light of Begampura — celebrating 650 years of Sant Ravidas Ji's vision of equality, dignity, and a city without sorrow.",
    url: siteUrl,
    siteName: "BRHF Begampura Dialogue",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BRHF · Begampura Dialogue — 650th Janam Jayanti",
    images: ["/og-image.svg"],
  },
};
