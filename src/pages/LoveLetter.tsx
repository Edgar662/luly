import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PARAGRAPHS = [
  "Oi, Lily 🌸",
  "Eu sei que hoje não tá sendo o dia mais fácil. Que tudo parece mais pesado, mais sensível, mais difícil de aguentar.",
  "Mas eu quero que você saiba uma coisa: você não precisa ser forte agora. Pode descansar, pode reclamar, pode ficar de mau humor — eu continuo aqui do mesmo jeitinho.",
  "Porque eu não te amo só nos dias fáceis. Eu te amo inteira — com TPM, sem paciência, chorando por besteira, tudo.",
  "E hoje, oficialmente, eu também vou entrar na sua flor 🌸 (a gente atravessa isso junto, eu prometo).",
  "Vai lá, deita, come um chocolate, assiste aquela série boba — e me chama se precisar de mim, tô aqui.",
];

function Petals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 10 + Math.random() * 9,
        size: 14 + Math.random() * 14,
        drift: `${Math.random() * 80 - 40}px`,
        opacity: 0.5 + Math.random() * 0.4,
      })),
    [],
  );

  return (
    <>
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            fontSize: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ["--drift" as string]: p.drift,
          }}
        >
          🌸
        </span>
      ))}
    </>
  );
}

type Stage = "envelope" | number | "end";

export default function LoveLetter() {
  const [stage, setStage] = useState<Stage>("envelope");

  const openEnvelope = () => setStage(0);
  const next = () => {
    if (typeof stage !== "number") return;
    if (stage + 1 >= PARAGRAPHS.length) {
      setStage("end");
    } else {
      setStage(stage + 1);
    }
  };
  const restart = () => setStage("envelope");

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-6 py-12"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% 0%, var(--color-love-peach), var(--color-love-blush) 55%, var(--color-love-lilac) 100%)",
      }}
    >
      <Petals />

      <div className="relative z-10 w-full max-w-md">
        <div
          className="relative rounded-[2rem] px-8 py-10 sm:px-12 sm:py-14 shadow-[0_20px_60px_-15px_rgba(196,74,120,0.35)] border border-white/60"
          style={{ background: "var(--color-love-card)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, var(--color-love-accent) 0px, transparent 1px, transparent 32px)",
            }}
          />

          <AnimatePresence mode="wait">
            {stage === "envelope" && (
              <motion.div
                key="envelope"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col items-center gap-7 text-center"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="text-6xl"
                >
                  💌
                </motion.div>
                <p
                  className="text-3xl"
                  style={{ fontFamily: "var(--font-cute-hand)", color: "var(--color-love-heading)" }}
                >
                  uma cartinha pra você
                </p>
                <button
                  onClick={openEnvelope}
                  className="rounded-full px-8 py-3 text-white text-base tracking-wide shadow-md transition-transform hover:scale-105 active:scale-95"
                  style={{
                    fontFamily: "var(--font-cute-body)",
                    fontWeight: 600,
                    background: "var(--color-love-accent)",
                    boxShadow: "0 10px 25px -8px var(--color-love-accent)",
                  }}
                >
                  abrir 🌸
                </button>
              </motion.div>
            )}

            {typeof stage === "number" && (
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45 }}
                className="relative flex flex-col items-center gap-9 text-center"
              >
                <p
                  className="text-2xl sm:text-[1.75rem] leading-snug"
                  style={{ fontFamily: "var(--font-cute-hand)", color: "var(--color-love-heading)" }}
                >
                  {PARAGRAPHS[stage]}
                </p>

                <div className="flex items-center gap-2">
                  {PARAGRAPHS.map((_, i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full transition-colors"
                      style={{
                        background:
                          i === stage ? "var(--color-love-accent)" : "var(--color-love-muted)",
                        opacity: i === stage ? 1 : 0.4,
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="rounded-full px-7 py-2.5 text-white text-sm tracking-wide shadow-md transition-transform hover:scale-105 active:scale-95"
                  style={{
                    fontFamily: "var(--font-cute-body)",
                    fontWeight: 600,
                    background: "var(--color-love-accent)",
                    boxShadow: "0 10px 25px -8px var(--color-love-accent)",
                  }}
                >
                  {stage + 1 >= PARAGRAPHS.length ? "continuar 🌸" : "continuar →"}
                </button>
              </motion.div>
            )}

            {stage === "end" && (
              <motion.div
                key="end"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col items-center gap-7 text-center"
              >
                <motion.p
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  className="text-4xl sm:text-[2.75rem] leading-tight"
                  style={{ fontFamily: "var(--font-cute-hand)", color: "var(--color-love-accent-dark)" }}
                >
                  Te amo muito, Lily 🌸
                </motion.p>
                <p
                  className="text-lg italic"
                  style={{ fontFamily: "var(--font-cute-signature)", color: "var(--color-love-body)" }}
                >
                  — do seu amor
                </p>
                <button
                  onClick={restart}
                  className="mt-2 text-sm underline underline-offset-4 transition-colors"
                  style={{ fontFamily: "var(--font-cute-body)", color: "var(--color-love-muted)" }}
                >
                  ler de novo
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
