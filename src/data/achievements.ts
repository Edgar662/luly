import type { LucideIcon } from "lucide-react";
import { Ghost, KeyRound, Target } from "lucide-react";

export interface AchievementContext {
  isAnonymous: boolean;
  codename: string | null;
  completedMissions: number[];
}

export interface Achievement {
  id: string;
  icon: LucideIcon;
  title: { en: string; pt: string };
  description: { en: string; pt: string };
  isUnlocked: (ctx: AchievementContext) => boolean;
}

// Only 3 real achievements exist so far — more get added alongside future
// missions. The achievements page pads the grid with locked/mystery slots
// so it doesn't look empty; see Achievements.tsx.
export const achievements: Achievement[] = [
  {
    id: "agent-activated",
    icon: KeyRound,
    title: { en: "AGENT ACTIVATED", pt: "AGENTE ATIVADA" },
    description: {
      en: "Logged into the KP COMM system for the first time.",
      pt: "Entrou no sistema KP COMM pela primeira vez.",
    },
    isUnlocked: () => true,
  },
  {
    id: "ghost-protocol",
    icon: Ghost,
    title: { en: "GHOST PROTOCOL", pt: "PROTOCOLO FANTASMA" },
    description: {
      en: "Chose to keep her real identity a secret.",
      pt: "Escolheu manter a identidade real em sigilo.",
    },
    isUnlocked: (ctx) => ctx.isAnonymous,
  },
  {
    id: "first-steps",
    icon: Target,
    title: { en: "FIRST STEPS", pt: "PRIMEIROS PASSOS" },
    description: {
      en: "Completed Mission 01.",
      pt: "Completou a Missão 01.",
    },
    isUnlocked: (ctx) => ctx.completedMissions.includes(1),
  },
];

export const TOTAL_ACHIEVEMENT_SLOTS = 12;
