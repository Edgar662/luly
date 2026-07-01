import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import CornerBrackets from "./CornerBrackets";
import LanguageToggle from "./LanguageToggle";

interface SubPageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function SubPageLayout({ title, subtitle, children }: SubPageLayoutProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen bg-kp-bg px-4 py-8 md:px-8">
      <LanguageToggle className="absolute right-4 top-4" />

      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => navigate("/dashboard")}
          className="font-display mb-4 flex items-center gap-2 text-xs uppercase tracking-widest text-kp-muted transition hover:text-kp-green"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.common.backToDashboard}
        </button>

        <h1 className="font-display text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-kp-muted">{subtitle}</p>}

        <div className="relative mt-6 rounded-2xl border border-kp-border bg-kp-panel p-6">
          <CornerBrackets />
          {children}
        </div>
      </div>
    </div>
  );
}
