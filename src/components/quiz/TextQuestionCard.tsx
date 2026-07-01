import { useState } from "react";
import type { TextQuestion } from "../../data/missions";
import type { Language } from "../../i18n/translations";
import { useLanguage } from "../../context/LanguageContext";

interface Props {
  question: TextQuestion;
  language: Language;
  onAnswered: (answerLog: string, reaction: string) => void;
}

export default function TextQuestionCard({ question, language, onAnswered }: Props) {
  const { t } = useLanguage();
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!value.trim() || submitted) return;
    setSubmitted(true);
    onAnswered(value.trim(), question.reaction[language]);
  };

  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={question.placeholder[language]}
        disabled={submitted}
        rows={3}
        className="w-full resize-none rounded-lg border border-kp-border bg-kp-panel-light px-4 py-3 text-sm text-white outline-none placeholder:text-kp-muted focus:border-kp-green disabled:opacity-60"
      />
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className="font-display mt-3 rounded-lg border border-kp-green/50 px-4 py-2 text-xs font-semibold tracking-wide text-kp-green transition hover:bg-kp-green/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t.mission.submitButton}
        </button>
      )}
    </div>
  );
}
