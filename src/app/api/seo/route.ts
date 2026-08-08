import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "/";

  try {
    // In production with a backend, you'd read from a database here.
    // Since this site uses localStorage for admin edits, we return a basic OG page
    // that crawlers can scrape. The admin-editable values are injected client-side
    // by SEOManager for browser users.
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://begampuradialogue.org";
    const title = "BRHF · Begampura Dialogue — 650th Janam Jayanti of Sant Ravidas Ji";
    const description =
      "Celebrating 650 years of Sant Ravidas Ji — the saint who first envisioned Begampura, the city without sorrow, fear, or tax on labour.";

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${siteUrl}${path === "/" ? "" : path}" />
  <meta property="og:image" content="${siteUrl}/og-image.svg" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${siteUrl}/og-image.svg" />
  <link rel="canonical" href="${siteUrl}${path === "/" ? "" : path}" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "British Ravidassia Heritage Foundation",
    "alternateName": "BRHF",
    "url": "${siteUrl}",
    "description": "${description}",
    "foundingDate": "2022"
  }
  </script>
</head>
<body>
  <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 100px auto; padding: 0 20px; text-align: center;">
    <h1>${title}</h1>
    <p>${description}</p>
    <p><a href="${siteUrl}${path === "/" ? "" : path}">Visit the site →</a></p>
  </div>
</body>
</html>`;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
