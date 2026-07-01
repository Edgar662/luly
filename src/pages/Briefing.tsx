import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Radio } from "lucide-react";
import { useAgent } from "../context/AgentContext";
import { useLanguage } from "../context/LanguageContext";
import { useTypewriterLines } from "../hooks/useTypewriterLines";
import { missions } from "../data/missions";
import LanguageToggle from "../components/LanguageToggle";
import CornerBrackets from "../components/CornerBrackets";

export default function Briefing() {
  const { missionId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { codename, isAnonymous } = useAgent();
  const mission = missions[Number(missionId)] ?? missions[1];

  const introLines = isAnonymous
    ? t.briefing.introAnonymous
    : t.briefing.introRevealed.map((line) => line.replace("{name}", codename ?? ""));

  const briefingLines = [...introLines, ...mission.briefingLines[language]];

  const { displayedLines, currentText, done, skip } = useTypewriterLines(briefingLines, {
    charDelay: 18,
    linePause: 450,
  });

  return (
    <div
      onClick={skip}
      className="relative flex min-h-screen cursor-pointer items-center justify-center bg-kp-bg px-4 py-10"
    >
      <LanguageToggle className="absolute right-4 top-4" />

      <div className="w-full max-w-xl">
        <div className="mb-4 flex items-center gap-2">
          <Radio className="h-4 w-4 animate-pulse text-kp-green" />
          <span className="font-display text-xs uppercase tracking-widest text-kp-green">
            {t.briefing.eyebrow}
          </span>
          {!done && (
            <span className="text-xs text-kp-muted">{t.briefing.connecting}</span>
          )}
        </div>

        <div className="relative min-h-[220px] rounded-2xl border border-kp-border bg-kp-panel p-6">
          <CornerBrackets />
          <pre className="font-terminal whitespace-pre-wrap text-xl leading-snug text-kp-green">
            {displayedLines.join("\n")}
            {displayedLines.length > 0 && "\n"}
            {currentText}
            <span className="terminal-cursor">▊</span>
          </pre>
        </div>

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative mt-4 rounded-2xl border border-kp-green/40 bg-kp-panel-light p-6"
            >
              <CornerBrackets />
              <p className="font-display text-xs uppercase tracking-widest text-kp-orange">
                {mission.badge[language]}
              </p>
              <h1 className="font-display mt-1 text-2xl font-bold text-white">
                {mission.title[language]}
              </h1>
              <p className="mt-3 text-sm text-kp-muted">
                <span className="font-display text-xs tracking-widest text-kp-green">
                  {t.briefing.objectiveLabel}:{" "}
                </span>
                {mission.objective[language]}
              </p>
              <button
                onClick={() => navigate(`/mission/${mission.id}`)}
                className="font-display mt-5 flex items-center gap-2 rounded-lg bg-kp-green px-5 py-3 text-sm font-semibold tracking-wide text-kp-bg transition hover:bg-kp-green-bright"
              >
                {t.briefing.acceptButton}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
