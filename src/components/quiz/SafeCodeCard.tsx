import { useState } from "react";
import type { SafeQuestion } from "../../data/missions";
import type { Language } from "../../i18n/translations";
import { useLanguage } from "../../context/LanguageContext";

interface Props {
  question: SafeQuestion;
  language: Language;
  onAnswered: (answerLog: string, reaction: string) => void;
}

export default function SafeCodeCard({ question, language, onAnswered }: Props) {
  const { t } = useLanguage();
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!value.trim() || submitted) return;
    setSubmitted(true);
    const correct = value.trim() === question.code;
    onAnswered(value.trim(), correct ? question.successReaction[language] : question.wrongReaction[language]);
  };

  return (
    <div>
      <p className="mb-3 text-sm italic text-kp-muted">{question.hint[language]}</p>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value.replace(/\D/g, "").slice(0, 6))}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="****"
        inputMode="numeric"
        disabled={submitted}
        className="font-terminal w-full rounded-lg border border-kp-border bg-kp-panel-light px-4 py-3 text-center text-2xl tracking-[0.5em] text-white outline-none placeholder:text-kp-muted focus:border-kp-green disabled:opacity-60"
      />
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className="font-display mt-3 w-full rounded-lg border border-kp-green/50 px-4 py-2 text-xs font-semibold tracking-wide text-kp-green transition hover:bg-kp-green/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t.mission.unlockButton}
        </button>
      )}
    </div>
  );
}
