"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageAware } from "./LanguageAware";

const routeLabels: Record<string, { en: string; hi: string; pa: string }> = {
  about: { en: "About", hi: "परिचय", pa: "ਜਾਣ-ਪਛਾਣ" },
  teachings: { en: "Teachings", hi: "शिक्षाएँ", pa: "ਸਿੱਖਿਆਵਾਂ" },
  shabads: { en: "Raags & Shabads", hi: "राग और शबद", pa: "ਰਾਗ ਅਤੇ ਸ਼ਬਦ" },
  begampura: { en: "Begampura", hi: "बेगमपुरा", pa: "ਬੇਗਮਪੁਰਾ" },
  events: { en: "Events", hi: "कार्यक्रम", pa: "ਪ੍ਰੋਗਰਾਮ" },
  library: { en: "E-Library", hi: "पुस्तकालय", pa: "ਪੁਸਤਕਾਲੇ" },
  gallery: { en: "Gallery", hi: "गैलरी", pa: "ਗੈਲਰੀ" },
  connect: { en: "Connect", hi: "जुड़ें", pa: "ਜੁੜੋ" },
};

export function Breadcrumb({ currentLabel }: { currentLabel?: { en: string; hi: string; pa: string } }) {
  const pathname = usePathname();
  const { language } = useLanguage();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs: { href: string; label: { en: string; hi: string; pa: string } }[] = [
    { href: "/", label: { en: "Home", hi: "मुख्य", pa: "ਮੁੱਖ" } },
  ];

  let accum = "";
  segments.forEach((seg, i) => {
    accum += "/" + seg;
    // Handle dynamic [id] segments
    if (seg === "admin") {
      crumbs.push({ href: accum, label: { en: "Admin", hi: "प्रबंधन", pa: "ਪ੍ਰਬੰਧਨ" } });
    } else if (routeLabels[seg]) {
      crumbs.push({ href: accum, label: routeLabels[seg] });
    }
  });

  if (currentLabel) {
    crumbs.push({ href: pathname, label: currentLabel });
  }

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 lg:px-8 pt-4">
      <ol className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 flex-wrap">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.href + i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3" />}
              {i === 0 ? (
                <Link href={crumb.href} className="hover:text-saffron transition-colors flex items-center gap-1">
                  <Home className="h-3 w-3" />
                </Link>
              ) : isLast ? (
                <span className="text-saffron font-medium truncate max-w-[200px]" aria-current="page">
                  {crumb.label[language]}
                </span>
              ) : (
                <Link href={crumb.href} className="hover:text-saffron transition-colors truncate max-w-[200px]">
                  {crumb.label[language]}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
