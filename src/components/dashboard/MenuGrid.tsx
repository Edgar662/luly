import { Crosshair, FolderOpen, FileText, Trophy, Radio } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAgent } from "../../context/AgentContext";
import { useLanguage } from "../../context/LanguageContext";
import { useMissions } from "../../context/MissionContext";
import { missions } from "../../data/missions";
import { achievements } from "../../data/achievements";
import MenuCard from "./MenuCard";

const FIRST_MISSION_ID = 1;

interface OtherItemConfig {
  key: "dossier" | "files";
  icon: LucideIcon;
  color: string;
  path: string;
}

const otherItems: OtherItemConfig[] = [
  { key: "dossier", icon: FolderOpen, color: "text-kp-green", path: "/dossier" },
  { key: "files", icon: FileText, color: "text-kp-orange", path: "/files" },
];

export default function MenuGrid() {
  const { t } = useLanguage();
  const { codename, isAnonymous } = useAgent();
  const { isMissionCompleted, completedMissions } = useMissions();
  const navigate = useNavigate();

  const locked = !isMissionCompleted(FIRST_MISSION_ID);
  const lockedHint = t.menu.lockedHint.replace("{id}", String(FIRST_MISSION_ID).padStart(2, "0"));

  const definedMissionIds = Object.keys(missions).map(Number);
  const activeMissionsCount = definedMissionIds.filter(
    (id) => !completedMissions.includes(id),
  ).length;

  const unlockedAchievements = achievements.filter((a) =>
    a.isUnlocked({ codename, isAnonymous, completedMissions }),
  ).length;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      <MenuCard
        title={t.menu.missions.title}
        status={`${activeMissionsCount} ${t.menu.missions.activeSuffix}`}
        icon={Crosshair}
        color="text-kp-orange"
        locked={locked}
        lockedLabel={t.menu.lockedLabel}
        lockedHint={lockedHint}
        onClick={() => navigate("/missions")}
      />

      {otherItems.map(({ key, icon, color, path }) => {
        const { title, status } = t.menu[key];
        return (
          <MenuCard
            key={key}
            title={title}
            status={status}
            icon={icon}
            color={color}
            locked={locked}
            lockedLabel={t.menu.lockedLabel}
            lockedHint={lockedHint}
            onClick={() => navigate(path)}
          />
        );
      })}

      <MenuCard
        title={t.menu.achievements.title}
        status={`${unlockedAchievements}/${achievements.length} ${t.menu.achievements.suffix}`}
        icon={Trophy}
        color="text-kp-green"
        locked={locked}
        lockedLabel={t.menu.lockedLabel}
        lockedHint={lockedHint}
        onClick={() => navigate("/achievements")}
      />

      <MenuCard
        title={t.menu.comms.title}
        status={t.menu.comms.status}
        icon={Radio}
        color="text-kp-orange"
        locked={locked}
        lockedLabel={t.menu.lockedLabel}
        lockedHint={lockedHint}
        onClick={() => navigate("/comms")}
      />
    </div>
  );
}
