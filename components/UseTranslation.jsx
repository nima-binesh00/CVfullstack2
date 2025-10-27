"use client";
import { createContext, useContext, useState, useEffect } from "react";
import en from "../app/locales/en.json";
import fa from "../app/locales/fa.json";

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState(en);

  useEffect(() => {
    if (language === "fa") {
      setTranslations(fa);
      document.documentElement.dir = "rtl";
    } else {
      setTranslations(en);
      document.documentElement.dir = "ltr";
    }
  }, [language]);

  const t = (key) => translations[key] || key;
  const changeLanguage = (lang) => setLanguage(lang);

  return (
    <TranslationContext.Provider value={{ t, language, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
