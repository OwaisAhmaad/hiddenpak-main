"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Lang, translations, TranslationKey } from "./translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
  isRTL: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Persist language choice
  useEffect(() => {
    const saved = localStorage.getItem("hiddenpak_lang") as Lang | null;
    if (saved === "en" || saved === "ur") setLangState(saved);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("hiddenpak_lang", l);
    // Update html dir + lang attributes for RTL
    document.documentElement.setAttribute("lang", l);
    document.documentElement.setAttribute("dir", l === "ur" ? "rtl" : "ltr");
  }

  function t(key: TranslationKey): string {
    return (translations[lang] as Record<string, string>)[key] ?? key;
  }

  const isRTL = lang === "ur";

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
