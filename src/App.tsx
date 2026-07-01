import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BootSequence from "./pages/BootSequence";
import NameEntry from "./pages/NameEntry";
import Dashboard from "./pages/Dashboard";
import Briefing from "./pages/Briefing";
import MissionQuiz from "./pages/MissionQuiz";
import { useAgent } from "./context/AgentContext";

function RequireAgent({ children }: { children: ReactNode }) {
  const { codename, isAnonymous } = useAgent();
  if (!codename && !isAnonymous) return <Navigate to="/identify" replace />;
  return <>{children}</>;
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <div className="mystery-veil" />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Routes location={location}>
            <Route path="/" element={<BootSequence />} />
            <Route path="/identify" element={<NameEntry />} />
            <Route
              path="/dashboard"
              element={
                <RequireAgent>
                  <Dashboard />
                </RequireAgent>
              }
            />
            <Route
              path="/briefing/:missionId"
              element={
                <RequireAgent>
                  <Briefing />
                </RequireAgent>
              }
            />
            <Route
              path="/mission/:missionId"
              element={
                <RequireAgent>
                  <MissionQuiz />
                </RequireAgent>
              }
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
