import { useNavigate } from "react-router-dom";
import { CheckCircle2, Circle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useMissions } from "../context/MissionContext";
import { missions } from "../data/missions";
import SubPageLayout from "../components/SubPageLayout";

export default function MissionsList() {
  const { t, language } = useLanguage();
  const { isMissionCompleted } = useMissions();
  const navigate = useNavigate();

  const missionList = Object.values(missions).sort((a, b) => a.id - b.id);

  return (
    <SubPageLayout title={t.missionsPage.title} subtitle={t.missionsPage.subtitle}>
      <div className="flex flex-col gap-3">
        {missionList.map((mission) => {
          const completed = isMissionCompleted(mission.id);
          return (
            <div
              key={mission.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-kp-border bg-kp-panel-light p-4"
            >
              <div className="flex items-center gap-3">
                {completed ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-kp-green" />
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-kp-muted" />
                )}
                <div>
                  <p className="font-display text-xs uppercase tracking-widest text-kp-orange">
                    {mission.badge[language]}
                  </p>
                  <p className="font-display text-base font-bold text-white">
                    {mission.title[language]}
                  </p>
                </div>
              </div>

              {completed ? (
                <span className="font-display text-xs font-semibold tracking-widest text-kp-green">
                  {t.missionsPage.statusCompleted}
                </span>
              ) : (
                <button
                  onClick={() => navigate(`/briefing/${mission.id}`)}
                  className="font-display rounded-lg bg-kp-green px-4 py-2 text-xs font-semibold tracking-wide text-kp-bg transition hover:bg-kp-green-bright"
                >
                  {t.missionsPage.startButton}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </SubPageLayout>
  );
}
