import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Language, type Translations } from "../i18n/translations";

// Language switcher is temporary, for reviewing both versions during
// development. The final site ships English-only (see project notes).
export const LANGUAGE_SWITCH_ENABLED = true;
const DEFAULT_LANGUAGE: Language = "en";
const STORAGE_KEY = "kp-comm-language";

interface LanguageState {
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageState | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    if (!LANGUAGE_SWITCH_ENABLED) return;
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && stored in translations) setLanguageState(stored);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (LANGUAGE_SWITCH_ENABLED) localStorage.setItem(STORAGE_KEY, lang);
  };

  const toggleLanguage = () => setLanguage(language === "en" ? "pt" : "en");

  return (
    <LanguageContext.Provider
      value={{ language, t: translations[language], setLanguage, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
