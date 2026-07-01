import { useMemo, useState } from "react";
import type { MatchPairsQuestion } from "../../data/missions";
import type { Language } from "../../i18n/translations";

interface Props {
  question: MatchPairsQuestion;
  language: Language;
  onAnswered: (answerLog: string, reaction: string) => void;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function MatchPairsCard({ question, language, onAnswered }: Props) {
  const leftItems = useMemo(
    () => shuffle(question.pairs.map((p, i) => ({ label: p.left[language], pairIndex: i }))),
    [question, language],
  );
  const rightItems = useMemo(
    () => shuffle(question.pairs.map((p, i) => ({ label: p.right[language], pairIndex: i }))),
    [question, language],
  );

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [shakeRight, setShakeRight] = useState<number | null>(null);

  const handleLeftClick = (pairIndex: number) => {
    if (matched.has(pairIndex)) return;
    setSelectedLeft(pairIndex);
  };

  const handleRightClick = (pairIndex: number) => {
    if (selectedLeft === null || matched.has(pairIndex)) return;
    if (pairIndex === selectedLeft) {
      const next = new Set(matched);
      next.add(pairIndex);
      setMatched(next);
      setSelectedLeft(null);
      if (next.size === question.pairs.length) {
        onAnswered(
          question.pairs.map((p) => `${p.left[language]} = ${p.right[language]}`).join("; "),
          question.reaction[language],
        );
      }
    } else {
      setShakeRight(pairIndex);
      setTimeout(() => setShakeRight(null), 300);
      setSelectedLeft(null);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-2">
        {leftItems.map(({ label, pairIndex }) => (
          <button
            key={pairIndex}
            onClick={() => handleLeftClick(pairIndex)}
            disabled={matched.has(pairIndex)}
            className={`rounded-lg border px-3 py-2 text-left text-xs transition ${
              matched.has(pairIndex)
                ? "border-kp-green/40 bg-kp-green/10 text-kp-green"
                : selectedLeft === pairIndex
                  ? "border-kp-green bg-kp-green/10 text-white"
                  : "border-kp-border text-kp-text hover:border-kp-green/50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {rightItems.map(({ label, pairIndex }) => (
          <button
            key={pairIndex}
            onClick={() => handleRightClick(pairIndex)}
            disabled={matched.has(pairIndex)}
            className={`rounded-lg border px-3 py-2 text-left text-xs transition ${
              matched.has(pairIndex)
                ? "border-kp-green/40 bg-kp-green/10 text-kp-green"
                : shakeRight === pairIndex
                  ? "border-kp-orange animate-pulse"
                  : "border-kp-border text-kp-text hover:border-kp-green/50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
