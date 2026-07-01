import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { AgentProvider } from "./context/AgentContext.tsx";
import { LanguageProvider } from "./context/LanguageContext.tsx";
import { MissionProvider } from "./context/MissionContext.tsx";
import { MusicProvider } from "./context/MusicContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AgentProvider>
          <MissionProvider>
            <MusicProvider>
              <App />
            </MusicProvider>
          </MissionProvider>
        </AgentProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);
