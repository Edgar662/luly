import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Lang = "en" | "pt";

type Step =
  | { type: "text"; text: string; emphasize?: boolean }
  | { type: "card"; icon: string; title: string; lines: string[] };

const CONTENT: Record<
  Lang,
  {
    openLabel: string;
    openButton: string;
    steps: Step[];
    continueMid: string;
    continueLast: string;
    endTitle: string;
    endSignature: string;
    restart: string;
  }
> = {
  en: {
    openLabel: "a little letter for you",
    openButton: "open 🌸",
    steps: [
      { type: "text", text: "Hey, Lily 🌸" },
      {
        type: "text",
        text: "I know today hasn't been the easiest. That everything feels a little heavier, a little more sensitive, a little harder to carry.",
      },
      {
        type: "text",
        text: "But I want you to know something: you don't have to be strong right now. You can rest, you can complain, you can be in a mood, and I'm still right here, exactly the same.",
      },
      {
        type: "card",
        icon: "🫂",
        title: "Emergency hug",
        lines: ["Please hold for as long as necessary."],
      },
      {
        type: "text",
        text: "Because I don't love you only on the easy days. I love you completely, with the PMS, the zero patience, the crying over nothing, all of it.",
      },
      {
        type: "card",
        icon: "📝",
        title: "Doctor's prescription",
        lines: ["1 chocolate bar", "1 cozy blanket", "0 responsibilities", "Unlimited rest"],
      },
      {
        type: "text",
        text: "And today, officially, I'm getting my period too 🌸 (we're going through this together, I promise).",
      },
      {
        type: "text",
        text: "Go lie down and imagine you're in my arms. Call me if you need me, I'm right here.",
      },
      { type: "text", text: "If I were there right now... 🫶" },
      { type: "text", text: "I'd probably just sit next to you." },
      { type: "text", text: "I'd ask if you wanted to talk, or just wanted quiet." },
      { type: "text", text: "If you said no, I'd stay anyway." },
      { type: "text", text: "I'd get you something you like, without even asking." },
      { type: "text", text: "And eventually..." },
      { type: "text", text: "I'd just hug you. 🤍", emphasize: true },
    ],
    continueMid: "continue →",
    continueLast: "continue 🌸",
    endTitle: "I love you so much, Lily 🌸",
    endSignature: "from your love",
    restart: "read again",
  },
  pt: {
    openLabel: "uma cartinha pra você",
    openButton: "abrir 🌸",
    steps: [
      { type: "text", text: "Oi, Lily 🌸" },
      {
        type: "text",
        text: "Eu sei que hoje não tá sendo o dia mais fácil. Que tudo parece mais pesado, mais sensível, mais difícil de aguentar.",
      },
      {
        type: "text",
        text: "Mas eu quero que você saiba uma coisa: você não precisa ser forte agora. Pode descansar, pode reclamar, pode ficar de mau humor, e eu continuo aqui do mesmo jeitinho.",
      },
      {
        type: "card",
        icon: "🫂",
        title: "Abraço de emergência",
        lines: ["Segure pelo tempo que for necessário."],
      },
      {
        type: "text",
        text: "Porque eu não te amo só nos dias fáceis. Eu te amo inteira, com TPM, sem paciência, chorando por besteira, tudo.",
      },
      {
        type: "card",
        icon: "📝",
        title: "Receita médica",
        lines: ["1 barra de chocolate", "1 cobertor quentinho", "0 responsabilidades", "Descanso ilimitado"],
      },
      {
        type: "text",
        text: "E hoje, oficialmente, eu também vou entrar na sua flor 🌸 (a gente atravessa isso junto, eu prometo).",
      },
      {
        type: "text",
        text: "Vai lá, deita, e imagina que você tá nos meus braços. Me chama se precisar de mim, tô aqui.",
      },
      { type: "text", text: "Se eu estivesse aí agora... 🫶" },
      { type: "text", text: "Eu provavelmente sentaria do seu lado." },
      { type: "text", text: "Perguntaria se você quer conversar, ou só ficar em silêncio." },
      { type: "text", text: "Se você dissesse que não, eu ficaria do mesmo jeito." },
      { type: "text", text: "Traria algo que você gosta, sem nem precisar perguntar." },
      { type: "text", text: "E no fim..." },
      { type: "text", text: "Eu só te abraçaria. 🤍", emphasize: true },
    ],
    continueMid: "continuar →",
    continueLast: "continuar 🌸",
    endTitle: "Te amo muito, Lily 🌸",
    endSignature: "do seu amor",
    restart: "ler de novo",
  },
};

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
  const [lang, setLang] = useState<Lang>("en");
  const [stage, setStage] = useState<Stage>("envelope");
  const t = CONTENT[lang];

  const openEnvelope = () => setStage(0);
  const next = () => {
    if (typeof stage !== "number") return;
    if (stage + 1 >= t.steps.length) {
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

      <div className="fixed top-4 right-4 z-20 flex rounded-full border border-white/60 shadow-sm overflow-hidden">
        {(["en", "pt"] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className="px-3 py-1.5 text-xs tracking-wide transition-colors"
            style={{
              fontFamily: "var(--font-cute-body)",
              fontWeight: 600,
              background: lang === l ? "var(--color-love-accent)" : "var(--color-love-card)",
              color: lang === l ? "white" : "var(--color-love-muted)",
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

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
                  {t.openLabel}
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
                  {t.openButton}
                </button>
              </motion.div>
            )}

            {typeof stage === "number" &&
              (() => {
                const step = t.steps[stage];
                return (
                  <motion.div
                    key={`${lang}-${stage}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45 }}
                    className="relative flex flex-col items-center gap-9 text-center"
                  >
                    {step.type === "text" ? (
                      <p
                        className={
                          step.emphasize
                            ? "text-3xl sm:text-4xl leading-snug"
                            : "text-2xl sm:text-[1.75rem] leading-snug"
                        }
                        style={{
                          fontFamily: "var(--font-cute-hand)",
                          color: step.emphasize ? "var(--color-love-accent-dark)" : "var(--color-love-heading)",
                        }}
                      >
                        {step.text}
                      </p>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <span className="text-5xl">{step.icon}</span>
                        <p
                          className="text-xs uppercase tracking-[0.2em]"
                          style={{
                            fontFamily: "var(--font-cute-body)",
                            fontWeight: 700,
                            color: "var(--color-love-accent-dark)",
                          }}
                        >
                          {step.title}
                        </p>
                        <div
                          className="rounded-2xl border-2 border-dashed px-6 py-4 flex flex-col gap-1.5"
                          style={{ borderColor: "var(--color-love-muted)", background: "var(--color-love-blush)" }}
                        >
                          {step.lines.map((line, i) => (
                            <p
                              key={i}
                              className="text-xl text-left"
                              style={{ fontFamily: "var(--font-cute-hand)", color: "var(--color-love-heading)" }}
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {(() => {
                      const growthStages = ["🌱", "🌿", "🌷", "🌸"];
                      const fraction = t.steps.length > 1 ? stage / (t.steps.length - 1) : 1;
                      const growthIndex = Math.min(
                        growthStages.length - 1,
                        Math.floor(fraction * growthStages.length),
                      );
                      return (
                        <motion.span
                          key={growthIndex}
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          style={{ fontSize: 22 + fraction * 20, display: "inline-block" }}
                        >
                          {growthStages[growthIndex]}
                        </motion.span>
                      );
                    })()}

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
                      {stage + 1 >= t.steps.length ? t.continueLast : t.continueMid}
                    </button>
                  </motion.div>
                );
              })()}

            {stage === "end" && (
              <motion.div
                key="end"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col items-center gap-7 text-center"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="text-6xl"
                >
                  🌸
                </motion.div>
                <motion.p
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  className="text-4xl sm:text-[2.75rem] leading-tight"
                  style={{ fontFamily: "var(--font-cute-hand)", color: "var(--color-love-accent-dark)" }}
                >
                  {t.endTitle}
                </motion.p>
                <p
                  className="text-lg italic"
                  style={{ fontFamily: "var(--font-cute-signature)", color: "var(--color-love-body)" }}
                >
                  {t.endSignature}
                </p>
                <button
                  onClick={restart}
                  className="mt-2 text-sm underline underline-offset-4 transition-colors"
                  style={{ fontFamily: "var(--font-cute-body)", color: "var(--color-love-muted)" }}
                >
                  {t.restart}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
