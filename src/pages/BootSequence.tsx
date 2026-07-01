import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useTypewriterLines } from "../hooks/useTypewriterLines";
import LanguageToggle from "../components/LanguageToggle";

export default function BootSequence() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { displayedLines, currentText, done, skip } = useTypewriterLines(t.boot.lines);

  const handleClick = () => {
    if (done) {
      navigate("/identify");
      return;
    }
    skip();
  };

  return (
    <div
      onClick={handleClick}
      className="terminal-scanlines terminal-flicker relative flex min-h-screen cursor-pointer items-start justify-center overflow-hidden bg-black px-6 py-10 md:items-center"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(74,222,128,0.12), transparent 60%)",
        }}
      />

      <LanguageToggle className="absolute right-4 top-4 z-10" />

      <pre className="font-terminal relative z-[1] w-full max-w-2xl whitespace-pre-wrap text-xl leading-snug text-kp-green md:text-2xl">
        {displayedLines.join("\n")}
        {displayedLines.length > 0 && "\n"}
        {currentText}
        <span className="terminal-cursor">▊</span>
      </pre>
    </div>
  );
}
