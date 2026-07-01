import { Radio } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useMissions } from "../context/MissionContext";
import { missions } from "../data/missions";
import SubPageLayout from "../components/SubPageLayout";

export default function Communications() {
  const { t, language } = useLanguage();
  const { completedMissions } = useMissions();

  const receivedMissions = Object.values(missions).filter((m) =>
    completedMissions.includes(m.id),
  );

  return (
    <SubPageLayout title={t.commsPage.title} subtitle={t.commsPage.subtitle}>
      {receivedMissions.length === 0 ? (
        <p className="py-8 text-center text-sm text-kp-muted">{t.commsPage.emptyState}</p>
      ) : (
        <div className="flex flex-col gap-4">
          {receivedMissions.map((mission) => (
            <div key={mission.id} className="rounded-xl border border-kp-border bg-kp-panel-light p-4">
              <div className="mb-2 flex items-center gap-2">
                <Radio className="h-4 w-4 text-kp-green" />
                <p className="font-display text-xs uppercase tracking-widest text-kp-orange">
                  {mission.badge[language]}
                </p>
              </div>
              <pre className="font-terminal whitespace-pre-wrap text-lg leading-snug text-kp-green">
                {mission.briefingLines[language].join("\n")}
              </pre>
            </div>
          ))}
        </div>
      )}
    </SubPageLayout>
  );
}
