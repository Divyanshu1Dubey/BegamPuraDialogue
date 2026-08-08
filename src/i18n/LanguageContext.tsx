"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Language, languageMeta } from "./translations";

interface LanguageContextValue {
  language: Language;
  setLanguage: (l: Language) => void;
  t: (key: keyof typeof languageMeta | string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("brhf-language") as Language | null;
      if (stored && ["en", "hi", "pa"].includes(stored)) {
        return stored;
      }
    }
    return "en";
  });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((l: Language) => {
    setLanguageState(l);
    localStorage.setItem("brhf-language", l);
  }, []);

  const t = useCallback(
    () => languageMeta[language].native,
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}