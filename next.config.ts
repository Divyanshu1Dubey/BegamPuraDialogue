import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "begampuradialogue.org" },
    ],
  },
  poweredByHeader: false,
};

export default nextConfig;
