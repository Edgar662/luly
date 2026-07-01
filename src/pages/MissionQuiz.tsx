import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useMissions } from "../context/MissionContext";
import { missions } from "../data/missions";
import LanguageToggle from "../components/LanguageToggle";
import CornerBrackets from "../components/CornerBrackets";
import { logMissionComplete, logQuizAnswer } from "../lib/logger";

export default function MissionQuiz() {
  const { missionId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { completeMission } = useMissions();
  const mission = missions[Number(missionId)] ?? missions[1];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [textSubmitted, setTextSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = mission.questions[questionIndex];
  const isLast = questionIndex === mission.questions.length - 1;
  const progressPercent = ((questionIndex + 1) / mission.questions.length) * 100;

  const selectedOption =
    question.type === "choice"
      ? (question.options.find((o) => o.id === selectedOptionId) ?? null)
      : null;
  const hasAnswered = question.type === "choice" ? Boolean(selectedOption) : textSubmitted;
  const currentReaction =
    question.type === "choice" ? selectedOption?.reaction[language] : question.reaction[language];

  const handleSelectOption = (optionId: string) => {
    if (question.type !== "choice") return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitText = () => {
    if (question.type !== "text" || !textAnswer.trim() || textSubmitted) return;
    setTextSubmitted(true);
  };

  const handleNext = () => {
    if (question.type === "choice" && selectedOption) {
      logQuizAnswer(mission.id, question.prompt[language], selectedOption.text[language]);
    } else if (question.type === "text" && textAnswer.trim()) {
      logQuizAnswer(mission.id, question.prompt[language], textAnswer.trim());
    }

    if (isLast) {
      completeMission(mission.id);
      logMissionComplete(mission.id);
      setFinished(true);
      return;
    }
    setQuestionIndex((i) => i + 1);
    setSelectedOptionId(null);
    setTextAnswer("");
    setTextSubmitted(false);
  };

  if (finished) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-kp-bg px-4">
        <LanguageToggle className="absolute right-4 top-4" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-md rounded-2xl border border-kp-green/40 bg-kp-panel p-8 text-center"
        >
          <CornerBrackets />
          <CheckCircle2 className="mx-auto h-12 w-12 text-kp-green" />
          <h1 className="font-display mt-4 text-2xl font-bold text-white">
            {t.mission.completeTitle}
          </h1>
          <p className="mt-2 text-sm text-kp-muted">{t.mission.completeBody}</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="font-display mt-6 rounded-lg bg-kp-green px-5 py-3 text-sm font-semibold tracking-wide text-kp-bg transition hover:bg-kp-green-bright"
          >
            {t.mission.backButton}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-kp-bg px-4 py-8 md:px-8">
      <LanguageToggle className="absolute right-4 top-4" />

      <div className="mx-auto max-w-5xl">
        <div className="mb-4">
          <p className="font-display text-xs uppercase tracking-widest text-kp-orange">
            {mission.badge[language]}
          </p>
          <h1 className="font-display text-2xl font-bold text-white">
            {mission.title[language]}
          </h1>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative flex items-end justify-center overflow-hidden rounded-2xl border border-kp-border bg-kp-panel-light">
            <CornerBrackets />
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(74,222,128,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.25) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <img
              src={mission.image}
              alt="Agent Kim"
              className="relative z-[1] max-h-[420px] w-auto select-none object-contain"
              draggable={false}
            />
          </div>

          <div className="relative rounded-2xl border border-kp-border bg-kp-panel p-6">
            <CornerBrackets />
            <div className="mb-4 flex items-center justify-between gap-4">
              <span className="shrink-0 font-display text-xs uppercase tracking-widest text-kp-muted">
                {t.mission.questionLabel} {questionIndex + 1} {t.mission.ofLabel}{" "}
                {mission.questions.length}
              </span>
              <div className="h-1.5 flex-1 rounded-full bg-kp-border">
                <div
                  className="h-1.5 rounded-full bg-kp-green transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <h2 className="font-display text-xl font-semibold text-white">
              {question.prompt[language]}
            </h2>

            {question.type === "choice" ? (
              <div className="mt-5 flex flex-col gap-3">
                {question.options.map((option) => {
                  const isSelected = option.id === selectedOptionId;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
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
            ) : (
              <div className="mt-5">
                <textarea
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  placeholder={question.placeholder[language]}
                  disabled={textSubmitted}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-kp-border bg-kp-panel-light px-4 py-3 text-sm text-white outline-none placeholder:text-kp-muted focus:border-kp-green disabled:opacity-60"
                />
                {!textSubmitted && (
                  <button
                    onClick={handleSubmitText}
                    disabled={!textAnswer.trim()}
                    className="font-display mt-3 rounded-lg border border-kp-green/50 px-4 py-2 text-xs font-semibold tracking-wide text-kp-green transition hover:bg-kp-green/10 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {t.mission.submitButton}
                  </button>
                )}
              </div>
            )}

            <AnimatePresence mode="wait">
              {hasAnswered && currentReaction && (
                <motion.p
                  key={question.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-lg border border-kp-border bg-kp-panel-light px-4 py-3 text-sm italic text-kp-green"
                >
                  {currentReaction}
                </motion.p>
              )}
            </AnimatePresence>

            {hasAnswered && (
              <button
                onClick={handleNext}
                className="font-display mt-5 flex items-center gap-2 rounded-lg bg-kp-green px-5 py-3 text-sm font-semibold tracking-wide text-kp-bg transition hover:bg-kp-green-bright"
              >
                {isLast ? t.mission.finishButton : t.mission.nextButton}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
