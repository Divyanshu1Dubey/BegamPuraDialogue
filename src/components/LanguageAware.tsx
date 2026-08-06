"use client";

import { useLanguage } from "@/i18n/LanguageContext";

interface LanguageAwareProps {
  en: string;
  hi: string;
  pa: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
}

/**
 * Renders one of three language strings based on the active language.
 * Provides dev-friendly inline labels for multilingual UI.
 */
export function LanguageAware({ en, hi, pa, as: Tag = "span", className }: LanguageAwareProps) {
  const { language } = useLanguage();
  const text = language === "hi" ? hi : language === "pa" ? pa : en;
  return <Tag className={className}>{text}</Tag>;
}