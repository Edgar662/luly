import { useState } from "react";
import type { SliderQuestion } from "../../data/missions";
import type { Language } from "../../i18n/translations";
import { useLanguage } from "../../context/LanguageContext";

interface Props {
  question: SliderQuestion;
  language: Language;
  onAnswered: (answerLog: string, reaction: string) => void;
}

export default function SliderGuessCard({ question, language, onAnswered }: Props) {
  const { t } = useLanguage();
  const [value, setValue] = useState(Math.round((question.min + question.max) / 2));
  const [locked, setLocked] = useState(false);

  const handleLock = () => {
    if (locked) return;
    setLocked(true);
    const close = Math.abs(value - question.answer) <= question.tolerance;
    const reaction = close ? question.reactionClose[language] : question.reactionFar[language];
    onAnswered(
      `${value} ${question.unit[language]} (real: ${question.answer})`,
      `${reaction} (${t.mission.sliderRevealPrefix} ${question.answer} ${question.unit[language]})`,
    );
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-display text-2xl font-bold text-kp-green">{value}</span>
        <span className="text-xs uppercase tracking-widest text-kp-muted">
          {question.unit[language]}
        </span>
      </div>
      <input
        type="range"
        min={question.min}
        max={question.max}
        step={question.step}
        value={value}
        disabled={locked}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{ accentColor: "#4ade80" }}
        className="w-full disabled:opacity-60"
      />
      {!locked && (
        <button
          onClick={handleLock}
          className="font-display mt-4 rounded-lg border border-kp-green/50 px-4 py-2 text-xs font-semibold tracking-wide text-kp-green transition hover:bg-kp-green/10"
        >
          {t.mission.lockInButton}
        </button>
      )}
    </div>
  );
}
