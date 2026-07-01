import { useState } from "react";
import type { CipherQuestion } from "../../data/missions";
import type { Language } from "../../i18n/translations";
import { useLanguage } from "../../context/LanguageContext";
import { caesarShift } from "../../lib/cipher";

interface Props {
  question: CipherQuestion;
  language: Language;
  onAnswered: (answerLog: string, reaction: string) => void;
}

export default function CipherQuestionCard({ question, language, onAnswered }: Props) {
  const { t } = useLanguage();
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const encoded = caesarShift(question.message[language], question.shift);

  const handleSubmit = () => {
    if (!value.trim() || submitted) return;
    setSubmitted(true);
    const correct = value.trim().toUpperCase() === question.message[language].toUpperCase();
    const reaction = correct ? question.successReaction[language] : question.failReaction[language];
    onAnswered(value.trim(), correct ? reaction : `${reaction} "${question.message[language]}"`);
  };

  return (
    <div>
      <p className="mb-3 text-sm text-kp-muted">{question.intro[language]}</p>
      <p className="font-terminal rounded-lg border border-kp-border bg-kp-bg/40 px-4 py-3 text-xl tracking-widest text-kp-green">
        {encoded}
      </p>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder={question.placeholder[language]}
        disabled={submitted}
        className="mt-3 w-full rounded-lg border border-kp-border bg-kp-panel-light px-4 py-3 text-sm text-white outline-none placeholder:text-kp-muted focus:border-kp-green disabled:opacity-60"
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
