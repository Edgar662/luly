import { Crosshair, FolderOpen, FileText, Trophy, Radio } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useMissions } from "../../context/MissionContext";
import { missions } from "../../data/missions";
import MenuCard from "./MenuCard";

const FIRST_MISSION_ID = 1;

interface OtherItemConfig {
  key: "dossier" | "files" | "achievements" | "comms";
  icon: LucideIcon;
  color: string;
}

const otherItems: OtherItemConfig[] = [
  { key: "dossier", icon: FolderOpen, color: "text-kp-green" },
  { key: "files", icon: FileText, color: "text-kp-orange" },
  { key: "achievements", icon: Trophy, color: "text-kp-green" },
  { key: "comms", icon: Radio, color: "text-kp-orange" },
];

export default function MenuGrid() {
  const { t } = useLanguage();
  const { isMissionCompleted, completedMissions } = useMissions();

  const locked = !isMissionCompleted(FIRST_MISSION_ID);
  const lockedHint = t.menu.lockedHint.replace("{id}", String(FIRST_MISSION_ID).padStart(2, "0"));

  const definedMissionIds = Object.keys(missions).map(Number);
  const activeMissionsCount = definedMissionIds.filter(
    (id) => !completedMissions.includes(id),
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
      />

      {otherItems.map(({ key, icon, color }) => {
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
          />
        );
      })}
    </div>
  );
}
