import { UserRound } from "lucide-react";
import { useAgent } from "../context/AgentContext";
import { useLanguage } from "../context/LanguageContext";
import { useMissions } from "../context/MissionContext";
import SubPageLayout from "../components/SubPageLayout";

export default function Dossier() {
  const { codename, isAnonymous } = useAgent();
  const { t } = useLanguage();
  const { completedMissions } = useMissions();

  return (
    <SubPageLayout title={t.dossierPage.title} subtitle={t.dossierPage.subtitle}>
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-kp-border bg-kp-panel">
          <UserRound className="h-8 w-8 text-kp-muted" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-kp-muted">
            {t.profile.codenameLabel}
          </p>
          <p className="font-display text-lg font-bold text-kp-orange">
            {codename ? codename.toUpperCase() : t.profile.unknown}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-kp-border bg-kp-panel-light p-4">
          <p className="text-xs uppercase tracking-widest text-kp-muted">
            {t.profile.levelLabel}
          </p>
          <p
            className={`font-display mt-1 text-sm font-bold ${
              isAnonymous ? "text-kp-green" : "text-white"
            }`}
          >
            {isAnonymous ? t.dossierPage.anonymousStatus : t.dossierPage.identifiedStatus}
          </p>
        </div>

        <div className="rounded-xl border border-kp-border bg-kp-panel-light p-4">
          <p className="text-xs uppercase tracking-widest text-kp-muted">
            {t.profile.missionsLabel}
          </p>
          <p className="font-display mt-1 text-sm font-bold text-kp-orange">
            {completedMissions.length}
          </p>
        </div>
      </div>
    </SubPageLayout>
  );
}
