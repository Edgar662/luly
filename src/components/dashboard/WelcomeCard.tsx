import { Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAgent } from "../../context/AgentContext";
import { useLanguage } from "../../context/LanguageContext";
import { useMissions } from "../../context/MissionContext";
import CornerBrackets from "../CornerBrackets";

export default function WelcomeCard() {
  const { codename, isAnonymous } = useAgent();
  const { t } = useLanguage();
  const { isMissionCompleted } = useMissions();
  const navigate = useNavigate();
  const revealed = Boolean(codename);

  return (
    <div className="relative flex flex-col justify-between rounded-2xl border border-kp-border bg-kp-panel-light p-6">
      <CornerBrackets />
      <div>
        <h1 className="font-display text-3xl font-bold leading-tight text-white">
          {t.welcome.welcomeLine}
          <br />
          <span className="text-kp-green">
            {t.welcome.agentPrefix} {revealed ? codename?.toUpperCase() : t.welcome.unknownName}
          </span>
        </h1>
        <p className="mt-4 max-w-sm text-sm text-kp-muted">
          {revealed
            ? t.welcome.revealedDesc
            : isAnonymous
              ? t.welcome.anonymousDesc
              : t.welcome.mysteryDesc}
        </p>
      </div>

      {!isMissionCompleted(1) && (
        <button
          onClick={() => navigate("/briefing/1")}
          className="font-display mt-6 flex w-fit items-center gap-2 rounded-lg bg-kp-green px-5 py-3 text-sm font-semibold tracking-wide text-kp-bg transition hover:bg-kp-green-bright"
        >
          <Target className="h-4 w-4" />
          {t.welcome.missionButton}
        </button>
      )}

      <div className="mt-6 flex gap-1.5">
        <span className="h-1.5 w-4 rounded-full bg-kp-green" />
        <span className="h-1.5 w-1.5 rounded-full bg-kp-border" />
        <span className="h-1.5 w-1.5 rounded-full bg-kp-border" />
      </div>
    </div>
  );
}
