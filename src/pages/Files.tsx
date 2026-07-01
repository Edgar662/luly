import { useLanguage } from "../context/LanguageContext";
import { useMissions } from "../context/MissionContext";
import { missions } from "../data/missions";
import SubPageLayout from "../components/SubPageLayout";

export default function Files() {
  const { t, language } = useLanguage();
  const { completedMissions } = useMissions();

  const unlockedMissions = Object.values(missions).filter((m) =>
    completedMissions.includes(m.id),
  );

  return (
    <SubPageLayout title={t.filesPage.title} subtitle={t.filesPage.subtitle}>
      {unlockedMissions.length === 0 ? (
        <p className="py-8 text-center text-sm text-kp-muted">{t.filesPage.emptyState}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {unlockedMissions.map((mission) => (
            <div
              key={mission.id}
              className="overflow-hidden rounded-xl border border-kp-border bg-kp-panel-light"
            >
              <div className="flex justify-center bg-kp-bg/40 p-4">
                <img
                  src={mission.image}
                  alt={mission.title[language]}
                  className="h-48 w-auto object-contain"
                />
              </div>
              <div className="p-4">
                <p className="font-display text-xs uppercase tracking-widest text-kp-orange">
                  {mission.badge[language]}
                </p>
                <p className="font-display text-sm font-bold text-white">
                  {mission.title[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </SubPageLayout>
  );
}
