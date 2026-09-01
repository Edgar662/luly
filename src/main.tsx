import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { AgentProvider } from "./context/AgentContext.tsx";
import { LanguageProvider } from "./context/LanguageContext.tsx";
import { MissionProvider } from "./context/MissionContext.tsx";
// KP COMM theme song ("New Year's Day") — disabled along with the old
// site. Restore by uncommenting this import and the <MusicProvider> below.
// import { MusicProvider } from "./context/MusicContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AgentProvider>
          <MissionProvider>
            <App />
          </MissionProvider>
        </AgentProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);
