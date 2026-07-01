import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface MissionState {
  completedMissions: number[];
  completeMission: (id: number) => void;
  isMissionCompleted: (id: number) => boolean;
}

const MissionContext = createContext<MissionState | null>(null);

// Bumped to v2 after mission numbering changed (identification no longer
// counts as a mission) — avoids stale "mission 1 done" data from old saves.
const STORAGE_KEY = "kp-comm-missions-v2";

export function MissionProvider({ children }: { children: ReactNode }) {
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) setCompletedMissions(parsed);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const completeMission = (id: number) => {
    setCompletedMissions((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const isMissionCompleted = (id: number) => completedMissions.includes(id);

  return (
    <MissionContext.Provider value={{ completedMissions, completeMission, isMissionCompleted }}>
      {children}
    </MissionContext.Provider>
  );
}

export function useMissions() {
  const ctx = useContext(MissionContext);
  if (!ctx) throw new Error("useMissions must be used within MissionProvider");
  return ctx;
}
