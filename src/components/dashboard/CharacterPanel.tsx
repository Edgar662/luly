import kimDesconhecida from "../../assets/characters/kim-desconhecida.png";
import { useLanguage } from "../../context/LanguageContext";
import CornerBrackets from "../CornerBrackets";

export default function CharacterPanel() {
  const { t } = useLanguage();

  return (
    <div className="relative flex items-end justify-center overflow-hidden rounded-2xl border border-kp-border bg-kp-panel-light px-4 pt-4">
      <CornerBrackets />
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
        <span className="font-display text-xs uppercase tracking-widest text-kp-green">
          {t.character.liveFeed}
        </span>
        <span className="h-2 w-2 rounded-full bg-kp-green" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,222,128,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.25) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <img
        src={kimDesconhecida}
        alt="Agent Kim"
        className="relative z-[1] max-h-[420px] w-auto select-none object-contain"
        draggable={false}
      />

      <div className="absolute bottom-4 left-4 z-10 -rotate-3 rounded-sm bg-[#e8de9c] px-4 py-3 shadow-lg">
        <p className="font-display text-[11px] uppercase tracking-widest text-kp-bg/70">
          {t.character.noteTitle}
        </p>
        <p className="font-hand max-w-[160px] text-xl leading-tight text-kp-bg">
          {t.character.noteBody}
        </p>
      </div>
    </div>
  );
}
