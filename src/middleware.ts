import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // --- Core security headers ---
  response.headers.set("x-content-type-options", "nosniff");
  response.headers.set("x-frame-options", "DENY");
  response.headers.set("referrer-policy", "strict-origin-when-cross-origin");
  response.headers.set("permissions-policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  );

  // --- Content Security Policy ---
  // Allows: same-origin, Google Analytics (gtag), Google Fonts, inline styles,
  //          Next.js dev IDs, Vercel OG preview, images from own origin.
  const csp = [
    "default-src 'self'",
    // Scripts: self + gtag.js + gtag inline config + next.js internals
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    // Styles: self + inline styles (framer-motion / shadcn) + Google Fonts
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    // Fonts: Google Fonts + self
    "font-src 'self' https://fonts.gstatic.com data:",
    // Images: self + data URIs (og-image.svg inline)
    "img-src 'self' data: blob: https:",
    // Connect: self + GA collect endpoint
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
    // Frames: none (DENY via X-Frame-Options already set)
    "frame-ancestors 'none'",
    // Form actions: self only
    "form-action 'self'",
    // Base URI: self only
    "base-uri 'self'",
    // Upgrade insecure requests (harmless if already HTTPS)
    "upgrade-insecure-requests",
  ].join("; ");

  response.headers.set("content-security-policy", csp);

  // --- Strict-Transport-Security (HTTPS only) ---
  if (request.nextUrl.protocol === "https:") {
    response.headers.set(
      "strict-transport-security",
      "max-age=63072000; includeSubDomains; preload"
    );
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.svg|assets/.*).*)"],
};
