import { useState } from "react";
import type { ChoiceQuestion } from "../../data/missions";
import type { Language } from "../../i18n/translations";

interface Props {
  question: ChoiceQuestion;
  language: Language;
  onAnswered: (answerLog: string, reaction: string) => void;
}

export default function ChoiceQuestionCard({ question, language, onAnswered }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (optionId: string) => {
    setSelectedId(optionId);
    const option = question.options.find((o) => o.id === optionId);
    if (option) onAnswered(option.text[language], option.reaction[language]);
  };

  return (
    <div className="flex flex-col gap-3">
      {question.options.map((option) => {
        const isSelected = option.id === selectedId;
        return (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`rounded-lg border px-4 py-3 text-left text-sm transition ${
              isSelected
                ? "border-kp-green bg-kp-green/10 text-white"
                : "border-kp-border text-kp-text hover:border-kp-green/50"
            }`}
          >
            {option.text[language]}
          </button>
        );
      })}
    </div>
  );
}
