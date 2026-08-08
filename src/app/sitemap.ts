import { MetadataRoute } from "next";

const siteUrl = "https://begampuradialogue.org";

const staticPages = [
  { path: "/", changeFrequency: "daily" as const, priority: 1 },
  { path: "/about", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/teachings", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/shabads", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/begampura", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/events", changeFrequency: "daily" as const, priority: 0.9 },
  { path: "/gallery", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/library", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/connect", changeFrequency: "monthly" as const, priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPages.map((page) => ({
      url: `${siteUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    // Admin routes (restricted, low priority)
    {
      url: `${siteUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.3,
    },
  ];
}
