import { FolderClosed, UserRound } from "lucide-react";
import { useAgent } from "../../context/AgentContext";
import { useLanguage } from "../../context/LanguageContext";
import { useMissions } from "../../context/MissionContext";
import { useScrambleText } from "../../hooks/useScrambleText";
import CornerBrackets from "../CornerBrackets";

export default function ProfileCard() {
  const { codename } = useAgent();
  const { t } = useLanguage();
  const { completedMissions } = useMissions();
  const scrambledLevel = useScrambleText(7, 90);
  const hasProgress = completedMissions.length > 0;

  return (
    <div className="relative rounded-2xl border border-kp-border bg-kp-panel-light p-6">
      <CornerBrackets />
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-semibold tracking-widest text-kp-green">
          {t.profile.title}
        </p>
        <FolderClosed className="h-4 w-4 text-kp-muted" />
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-kp-border bg-kp-panel">
          <UserRound className="h-8 w-8 text-kp-muted" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-kp-muted">
            {t.profile.codenameLabel}
          </p>
          <p className="font-display text-base font-bold text-kp-orange">
            {codename ? codename.toUpperCase() : t.profile.unknown}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs uppercase tracking-widest text-kp-muted">
          {t.profile.levelLabel}
        </p>
        <p
          className={`font-display text-sm font-bold ${hasProgress ? "text-white" : "font-terminal text-base tracking-wide text-kp-muted/70"}`}
        >
          {hasProgress ? t.profile.levelValue : scrambledLevel}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-kp-border">
            <div
              className={`h-1.5 rounded-full bg-kp-green transition-all ${hasProgress ? "w-1/5" : "w-0"}`}
            />
          </div>
          <span className="text-xs text-kp-muted">{hasProgress ? "20%" : "0%"}</span>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs uppercase tracking-widest text-kp-muted">
          {t.profile.missionsLabel}
        </p>
        <p className="font-display text-lg font-bold text-kp-orange">
          {completedMissions.length}
        </p>
      </div>
    </div>
  );
}
