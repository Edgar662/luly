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
import ChoiceQuestionCard from "../components/quiz/ChoiceQuestionCard";
import TextQuestionCard from "../components/quiz/TextQuestionCard";
import CipherQuestionCard from "../components/quiz/CipherQuestionCard";
import TwoTruthsOneLieCard from "../components/quiz/TwoTruthsOneLieCard";
import MatchPairsCard from "../components/quiz/MatchPairsCard";
import SliderGuessCard from "../components/quiz/SliderGuessCard";
import TimedChallengeCard from "../components/quiz/TimedChallengeCard";
import SafeCodeCard from "../components/quiz/SafeCodeCard";

export default function MissionQuiz() {
  const { missionId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { completeMission } = useMissions();
  const mission = missions[Number(missionId)] ?? missions[1];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answerState, setAnswerState] = useState<{ log: string; reaction: string } | null>(null);

  const question = mission.questions[questionIndex];
  const isLast = questionIndex === mission.questions.length - 1;
  const progressPercent = ((questionIndex + 1) / mission.questions.length) * 100;

  const handleAnswered = (log: string, reaction: string) => {
    setAnswerState({ log, reaction });
  };

  const handleNext = () => {
    if (answerState) {
      logQuizAnswer(mission.id, question.prompt[language], answerState.log);
    }

    if (isLast) {
      completeMission(mission.id);
      logMissionComplete(mission.id);
      setFinished(true);
      return;
    }
    setQuestionIndex((i) => i + 1);
    setAnswerState(null);
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

            <div className="mt-5">
              {question.type === "choice" && (
                <ChoiceQuestionCard
                  key={question.id}
                  question={question}
                  language={language}
                  onAnswered={handleAnswered}
                />
              )}
              {question.type === "text" && (
                <TextQuestionCard
                  key={question.id}
                  question={question}
                  language={language}
                  onAnswered={handleAnswered}
                />
              )}
              {question.type === "cipher" && (
                <CipherQuestionCard
                  key={question.id}
                  question={question}
                  language={language}
                  onAnswered={handleAnswered}
                />
              )}
              {question.type === "twoTruthsOneLie" && (
                <TwoTruthsOneLieCard
                  key={question.id}
                  question={question}
                  language={language}
                  onAnswered={handleAnswered}
                />
              )}
              {question.type === "matchPairs" && (
                <MatchPairsCard
                  key={question.id}
                  question={question}
                  language={language}
                  onAnswered={handleAnswered}
                />
              )}
              {question.type === "slider" && (
                <SliderGuessCard
                  key={question.id}
                  question={question}
                  language={language}
                  onAnswered={handleAnswered}
                />
              )}
              {question.type === "timedChallenge" && (
                <TimedChallengeCard
                  key={question.id}
                  question={question}
                  language={language}
                  onAnswered={handleAnswered}
                />
              )}
              {question.type === "safe" && (
                <SafeCodeCard
                  key={question.id}
                  question={question}
                  language={language}
                  onAnswered={handleAnswered}
                />
              )}
            </div>

            <AnimatePresence mode="wait">
              {answerState && (
                <motion.p
                  key={question.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-lg border border-kp-border bg-kp-panel-light px-4 py-3 text-sm italic text-kp-green"
                >
                  {answerState.reaction}
                </motion.p>
              )}
            </AnimatePresence>

            {answerState && (
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
