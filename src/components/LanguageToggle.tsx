import { LANGUAGE_SWITCH_ENABLED, useLanguage } from "../context/LanguageContext";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, toggleLanguage } = useLanguage();

  if (!LANGUAGE_SWITCH_ENABLED) return null;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleLanguage();
      }}
      className={`font-display rounded-lg border border-kp-border bg-kp-panel px-3 py-2 text-xs font-semibold tracking-widest text-kp-muted transition hover:border-kp-green hover:text-kp-green ${className}`}
    >
      {language === "en" ? "PT" : "EN"}
    </button>
  );
}
