"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(pathname.startsWith("/admin"));
  }, [pathname]);

  return (
    <>
      {!isAdmin && <Navbar />}
      <main id="main-content" className="flex-1 min-h-0">{children}</main>
      {!isAdmin && <Footer />}
      {isAdmin && <ScrollToTop />}
    </>
  );
}
