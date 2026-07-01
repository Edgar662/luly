import { Lock, SignalHigh } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-6 flex flex-wrap items-center justify-between gap-2 px-2 pb-4 text-xs text-kp-muted">
      <div className="flex items-center gap-1.5">
        <span>{t.footer.system}</span>
        <Lock className="h-3 w-3" />
      </div>
      <div className="flex items-center gap-1.5 text-kp-green">
        <span>{t.footer.connection}</span>
        <SignalHigh className="h-3.5 w-3.5" />
      </div>
    </footer>
  );
}
