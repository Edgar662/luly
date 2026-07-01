import { useEffect, useState } from "react";
import type { TimedChallengeQuestion } from "../../data/missions";
import type { Language } from "../../i18n/translations";

interface Props {
  question: TimedChallengeQuestion;
  language: Language;
  onAnswered: (answerLog: string, reaction: string) => void;
}

export default function TimedChallengeCard({ question, language, onAnswered }: Props) {
  const [msLeft, setMsLeft] = useState(question.seconds * 1000);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    if (resolved) return;
    if (msLeft <= 0) {
      setResolved(true);
      onAnswered("timeout", question.timeoutReaction[language]);
      return;
    }
    const id = setTimeout(() => setMsLeft((m) => Math.max(0, m - 100)), 100);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msLeft, resolved]);

  const handleDisarm = () => {
    if (resolved) return;
    setResolved(true);
    onAnswered("disarmed", question.successReaction[language]);
  };

  const percent = (msLeft / (question.seconds * 1000)) * 100;

  return (
    <div className="text-center">
      <div className="mb-4 h-3 w-full rounded-full bg-kp-border">
        <div
          className={`h-3 rounded-full transition-all ${percent < 30 ? "bg-kp-orange" : "bg-kp-green"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="font-terminal mb-4 text-4xl text-kp-green">{(msLeft / 1000).toFixed(1)}s</p>
      <button
        onClick={handleDisarm}
        disabled={resolved}
        className="font-display rounded-lg bg-kp-orange px-6 py-3 text-sm font-bold tracking-widest text-kp-bg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {question.buttonLabel[language]}
      </button>
    </div>
  );
}
