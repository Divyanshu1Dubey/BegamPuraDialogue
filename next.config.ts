import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "begampuradialogue.org" },
    ],
  },
  async redirects() {
    return [
      { source: "/begampura", destination: "/#begampura", permanent: false },
      { source: "/raags", destination: "/#shabads", permanent: false },
    ];
  },
};

export default nextConfig;
