import { Route, Routes } from "react-router-dom";
import LoveLetter from "./pages/LoveLetter";

// --- KP COMM (Kim Possible themed mission site) — disabled, kept for a possible comeback ---
// To restore: uncomment everything below and swap the <Routes> content back in.
//
// import { Navigate, useLocation } from "react-router-dom";
// import type { ReactNode } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import BootSequence from "./pages/BootSequence";
// import NameEntry from "./pages/NameEntry";
// import Dashboard from "./pages/Dashboard";
// import Briefing from "./pages/Briefing";
// import MissionQuiz from "./pages/MissionQuiz";
// import MissionsList from "./pages/MissionsList";
// import Dossier from "./pages/Dossier";
// import Files from "./pages/Files";
// import Communications from "./pages/Communications";
// import Achievements from "./pages/Achievements";
// import { useAgent } from "./context/AgentContext";
//
// function RequireAgent({ children }: { children: ReactNode }) {
//   const { codename, isAnonymous } = useAgent();
//   if (!codename && !isAnonymous) return <Navigate to="/identify" replace />;
//   return <>{children}</>;
// }

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoveLetter />} />
      {/*
      <Route path="/identify" element={<NameEntry />} />
      <Route path="/dashboard" element={<RequireAgent><Dashboard /></RequireAgent>} />
      <Route path="/briefing/:missionId" element={<RequireAgent><Briefing /></RequireAgent>} />
      <Route path="/mission/:missionId" element={<RequireAgent><MissionQuiz /></RequireAgent>} />
      <Route path="/missions" element={<RequireAgent><MissionsList /></RequireAgent>} />
      <Route path="/dossier" element={<RequireAgent><Dossier /></RequireAgent>} />
      <Route path="/files" element={<RequireAgent><Files /></RequireAgent>} />
      <Route path="/comms" element={<RequireAgent><Communications /></RequireAgent>} />
      <Route path="/achievements" element={<RequireAgent><Achievements /></RequireAgent>} />
      */}
    </Routes>
  );
}
