import { MetadataRoute } from "next";

const siteUrl = "https://begampuradialogue.org";

export default function robots(): MetadataRoute.Robots {
  const base = {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };

  return base;
}
