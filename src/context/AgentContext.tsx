import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AgentState {
  codename: string | null;
  isAnonymous: boolean;
  setName: (name: string) => void;
  setAnonymous: () => void;
  reset: () => void;
}

const AgentContext = createContext<AgentState | null>(null);

const STORAGE_KEY = "kp-comm-agent";

export function AgentProvider({ children }: { children: ReactNode }) {
  const [codename, setCodename] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      setCodename(parsed.codename ?? null);
      setIsAnonymous(Boolean(parsed.isAnonymous));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const persist = (codename: string | null, isAnonymous: boolean) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ codename, isAnonymous }));
  };

  const setName = (name: string) => {
    setCodename(name);
    setIsAnonymous(false);
    persist(name, false);
  };

  const setAnonymous = () => {
    setCodename(null);
    setIsAnonymous(true);
    persist(null, true);
  };

  const reset = () => {
    setCodename(null);
    setIsAnonymous(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AgentContext.Provider value={{ codename, isAnonymous, setName, setAnonymous, reset }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const ctx = useContext(AgentContext);
  if (!ctx) throw new Error("useAgent must be used within AgentProvider");
  return ctx;
}
