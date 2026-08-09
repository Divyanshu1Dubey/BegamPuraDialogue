"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type { AdminSettings, AdminSeoPageOverride } from "@/lib/admin-data";

export function SEOManager() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("brhf-admin-data");
      if (!stored) return;
      const parsed = JSON.parse(stored) as { settings?: AdminSettings };
      const s = parsed.settings;
      if (!s) return;

      // Resolve per-page override for current pathname
      const override = (s.pageOverrides || []).find(
        (o: AdminSeoPageOverride) => o.path === pathname
      );

      const title = override?.title || s.seoTitle;
      const description = override?.description || s.seoDescription;
      const keywords = override?.keywords || s.seoKeywords;
      const ogTitle = override?.title || s.ogTitle;
      const ogDesc = override?.description || s.ogDescription;

      // Document title
      if (title) {
        document.title = `${title} · BRHF Be-gumpura Dialogue`;
      }

      // Helper: set or create a <meta> tag
      const setMeta = (attr: "name" | "property", key: string, content: string) => {
        let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
        if (!el) {
          el = document.createElement("meta");
          el.setAttribute(attr, key);
          document.head.appendChild(el);
        }
        if (el.content !== content) el.content = content;
      };

      // Helper: set or create a <link> tag
      const setLink = (rel: string, href: string) => {
        let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
        if (!el) {
          el = document.createElement("link");
          el.rel = rel;
          document.head.appendChild(el);
        }
        if (el.href !== href) el.href = href;
      };

      // Standard meta tags
      if (description) setMeta("name", "description", description);
      if (keywords) {
        const kwList = keywords.split(",").map((k) => k.trim()).filter(Boolean);
        // Remove old keyword metas
        document.querySelectorAll('meta[name="keywords"]').forEach((el) => el.remove());
        kwList.forEach((kw) => setMeta("name", "keywords", kw));
      }

      // Open Graph
      setMeta("property", "og:title", ogTitle);
      setMeta("property", "og:description", ogDesc);
      setMeta("property", "og:url", `${s.ogUrl || "https://begampuradialogue.org"}${pathname}`);
      setMeta("property", "og:image", s.ogImage || "/og-image.svg");
      setMeta("property", "og:type", "website");
      setMeta("property", "og:site_name", s.siteName || "BRHF Be-gumpura Dialogue");

      // Twitter Card
      setMeta("name", "twitter:card", s.twitterCardType || "summary_large_image");
      setMeta("name", "twitter:title", ogTitle);
      setMeta("name", "twitter:description", ogDesc);
      if (s.twitterHandle) setMeta("name", "twitter:creator", s.twitterHandle);
      setMeta("name", "twitter:image", s.ogImage || "/og-image.svg");

      // Canonical
      if (s.ogUrl) {
        setLink("canonical", `${s.ogUrl}${pathname === "/" ? "" : pathname}`);
      }
    } catch {
      // localStorage unavailable or data corrupted
    }
  }, [pathname]);

  return null;
}
