import { useState } from "react";
import type { TwoTruthsOneLieQuestion } from "../../data/missions";
import type { Language } from "../../i18n/translations";

interface Props {
  question: TwoTruthsOneLieQuestion;
  language: Language;
  onAnswered: (answerLog: string, reaction: string) => void;
}

export default function TwoTruthsOneLieCard({ question, language, onAnswered }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    const statement = question.statements[index];
    const reaction = statement.isLie ? question.correctReaction[language] : question.wrongReaction[language];
    onAnswered(statement.text[language], reaction);
  };

  return (
    <div className="flex flex-col gap-3">
      {question.statements.map((statement, index) => {
        const isSelected = index === selectedIndex;
        return (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`rounded-lg border px-4 py-3 text-left text-sm transition ${
              isSelected
                ? "border-kp-green bg-kp-green/10 text-white"
                : "border-kp-border text-kp-text hover:border-kp-green/50"
            }`}
          >
            {statement.text[language]}
          </button>
        );
      })}
    </div>
  );
}
