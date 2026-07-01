import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Loader2, ShieldQuestion } from "lucide-react";
import { useAgent } from "../context/AgentContext";
import { useLanguage } from "../context/LanguageContext";
import LanguageToggle from "../components/LanguageToggle";
import CornerBrackets from "../components/CornerBrackets";
import { useNavigate } from "react-router-dom";
import { ensureSession, logAnonymousChoice, logLoginAttempt } from "../lib/logger";

const AUTH_DELAY = 1100;

export default function NameEntry() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "denied">("idle");
  const [attempts, setAttempts] = useState(0);
  const { setAnonymous } = useAgent();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    ensureSession(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = () => {
    if (!username.trim() || status === "checking") return;
    const attemptedUsername = username.trim();
    const attemptedPassword = password;
    setStatus("checking");
    setTimeout(() => {
      setStatus("denied");
      setAttempts((a) => a + 1);
      setPassword("");
      logLoginAttempt(attemptedUsername, attemptedPassword);
    }, AUTH_DELAY);
  };

  const handleAnonymous = () => {
    if (status === "checking") return;
    setAnonymous();
    logAnonymousChoice();
    navigate("/dashboard");
  };

  return (
    <div className="relative min-h-screen bg-kp-bg flex items-center justify-center px-4">
      <LanguageToggle className="absolute right-4 top-4" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md rounded-2xl border border-kp-border bg-kp-panel p-8 text-center"
      >
        <CornerBrackets />
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-kp-green/40 bg-kp-green/10">
          <ShieldQuestion className="h-7 w-7 text-kp-green" />
        </div>

        <p className="font-display text-xs uppercase tracking-widest text-kp-orange">
          {t.nameEntry.missionBadge}
        </p>

        <h1 className="font-display mt-1 text-2xl font-semibold tracking-wide text-white">
          {t.nameEntry.title}
        </h1>
        <p className="mt-2 text-sm text-kp-muted">{t.nameEntry.subtitle}</p>

        <div className="mt-6 flex flex-col gap-4 text-left">
          <div>
            <label className="font-display text-xs uppercase tracking-widest text-kp-green">
              {t.nameEntry.usernameLabel}
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder={t.nameEntry.usernamePlaceholder}
              disabled={status === "checking"}
              className="mt-2 w-full rounded-lg border border-kp-border bg-kp-panel-light px-4 py-3 text-white outline-none placeholder:text-kp-muted focus:border-kp-green disabled:opacity-50"
            />
          </div>

          <div>
            <label className="font-display text-xs uppercase tracking-widest text-kp-green">
              {t.nameEntry.passwordLabel}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder={t.nameEntry.passwordPlaceholder}
              disabled={status === "checking"}
              className="mt-2 w-full rounded-lg border border-kp-border bg-kp-panel-light px-4 py-3 text-white outline-none placeholder:text-kp-muted focus:border-kp-green disabled:opacity-50"
            />
          </div>
        </div>

        <AnimatePresence>
          {status === "denied" && (
            <motion.div
              key={attempts}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: [0, -8, 8, -6, 6, 0] }}
              transition={{ duration: 0.4 }}
              className="mt-4 flex items-start gap-2 rounded-lg border border-kp-orange/40 bg-kp-orange/10 px-4 py-3 text-left"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-kp-orange" />
              <div>
                <p className="font-display text-xs font-semibold tracking-widest text-kp-orange">
                  {t.nameEntry.accessDeniedTitle}
                </p>
                <p className="mt-1 text-xs text-kp-muted">
                  {t.nameEntry.accessDeniedBody.replace("{username}", username.trim())}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleLogin}
          disabled={!username.trim() || status === "checking"}
          className="font-display mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-kp-green py-3 font-semibold tracking-wide text-kp-bg transition hover:bg-kp-green-bright disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "checking" && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "checking" ? t.nameEntry.authenticating : t.nameEntry.loginButton}
        </button>

        {attempts > 0 && status !== "checking" && (
          <p className="mt-3 text-xs italic text-kp-muted">{t.nameEntry.hint}</p>
        )}

        <button
          onClick={handleAnonymous}
          disabled={status === "checking"}
          className="font-display mt-3 w-full rounded-lg border border-kp-border py-3 text-sm tracking-wide text-kp-muted transition hover:border-kp-orange hover:text-kp-orange disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t.nameEntry.anonymous}
        </button>
      </motion.div>
    </div>
  );
}
