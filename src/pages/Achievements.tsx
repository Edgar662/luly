import { Lock } from "lucide-react";
import { useAgent } from "../context/AgentContext";
import { useLanguage } from "../context/LanguageContext";
import { useMissions } from "../context/MissionContext";
import { achievements, TOTAL_ACHIEVEMENT_SLOTS } from "../data/achievements";
import { useScrambleText } from "../hooks/useScrambleText";
import SubPageLayout from "../components/SubPageLayout";

function MysterySlot() {
  const scrambled = useScrambleText(6, 100);
  return (
    <div className="flex flex-col items-center rounded-xl border border-kp-border/50 bg-kp-panel-light/50 p-4 text-center">
      <Lock className="h-8 w-8 text-kp-muted opacity-40" />
      <p className="font-terminal mt-2 text-sm tracking-wide text-kp-muted/70">{scrambled}</p>
    </div>
  );
}

export default function Achievements() {
  const { t, language } = useLanguage();
  const { codename, isAnonymous } = useAgent();
  const { completedMissions } = useMissions();

  const ctx = { codename, isAnonymous, completedMissions };
  const unlockedCount = achievements.filter((a) => a.isUnlocked(ctx)).length;
  const mysterySlots = Math.max(0, TOTAL_ACHIEVEMENT_SLOTS - achievements.length);

  return (
    <SubPageLayout
      title={t.achievementsPage.title}
      subtitle={`${t.achievementsPage.subtitle} (${unlockedCount}/${TOTAL_ACHIEVEMENT_SLOTS})`}
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {achievements.map((achievement) => {
          const unlocked = achievement.isUnlocked(ctx);
          const Icon = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={`flex flex-col items-center rounded-xl border p-4 text-center ${
                unlocked
                  ? "border-kp-green/40 bg-kp-panel-light"
                  : "border-kp-border/50 bg-kp-panel-light/50"
              }`}
            >
              <Icon
                className={`h-8 w-8 ${unlocked ? "text-kp-green" : "text-kp-muted opacity-40"}`}
              />
              <p
                className={`font-display mt-2 text-xs font-bold tracking-wide ${
                  unlocked ? "text-white" : "text-kp-muted"
                }`}
              >
                {unlocked ? achievement.title[language] : t.menu.lockedLabel}
              </p>
              {unlocked && (
                <p className="mt-1 text-xs text-kp-muted">{achievement.description[language]}</p>
              )}
            </div>
          );
        })}

        {Array.from({ length: mysterySlots }).map((_, i) => (
          <MysterySlot key={i} />
        ))}
      </div>
    </SubPageLayout>
  );
}
