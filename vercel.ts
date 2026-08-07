import { routes, type VercelConfig } from "@vercel/config/v1";

// Vercel project configuration for BRHF · Begampura Dialogue
// https://vercel.com/docs/project-configuration/vercel-ts
//
// Uses typed @vercel/config v1 routes.cacheControl helper for cache headers,
// and plain object literals for redirects (typed as the Redirect interface).

export const config: VercelConfig = {
  buildCommand: "npm run build",
  framework: "nextjs",
  regions: ["iad1"],

  redirects: [
    { source: "/begampura", destination: "/begampura", permanent: true },
    { source: "/raags", destination: "/shabads", permanent: true },
    { source: "/shabads", destination: "/shabads", permanent: true },
    { source: "/bhagats", destination: "/teachings", permanent: true },
    { source: "/trailers", destination: "/gallery", permanent: true },
  ],

  headers: [
    routes.cacheControl("/fonts/(.*)", {
      public: true,
      maxAge: "1 year",
      immutable: true,
    }),
    routes.cacheControl("/_next/static/(.*)", {
      public: true,
      maxAge: "1 year",
      immutable: true,
    }),
    routes.cacheControl("/favicon.svg", {
      public: true,
      maxAge: "1 week",
    }),
    routes.cacheControl("/logo.svg", {
      public: true,
      maxAge: "1 week",
    }),
    routes.cacheControl("/og-image.svg", {
      public: true,
      maxAge: "1 week",
    }),
    routes.cacheControl("/manifest.webmanifest", {
      public: true,
      maxAge: "1 day",
    }),

    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
      ],
    },
  ],
};

export default config;