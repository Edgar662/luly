import { useEffect, useRef, useState } from "react";

interface Options {
  charDelay?: number;
  linePause?: number;
  startDelay?: number;
}

export function useTypewriterLines(lines: string[], options: Options = {}) {
  const { charDelay = 12, linePause = 140, startDelay = 300 } = options;
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [done, setDone] = useState(false);
  const skippedRef = useRef(false);

  useEffect(() => {
    skippedRef.current = false;
    setDisplayedLines([]);
    setCurrentText("");
    setDone(false);

    let lineIndex = 0;
    let charIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      if (skippedRef.current) return;

      if (lineIndex >= lines.length) {
        setDone(true);
        return;
      }

      const targetLine = lines[lineIndex];

      if (charIndex <= targetLine.length) {
        setCurrentText(targetLine.slice(0, charIndex));
        charIndex += 1;
        timeoutId = setTimeout(typeNext, targetLine === "" ? 0 : charDelay);
      } else {
        setDisplayedLines((prev) => [...prev, targetLine]);
        setCurrentText("");
        lineIndex += 1;
        charIndex = 0;
        timeoutId = setTimeout(typeNext, linePause);
      }
    };

    timeoutId = setTimeout(typeNext, startDelay);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(lines)]);

  const skip = () => {
    if (done) return;
    skippedRef.current = true;
    setDisplayedLines(lines);
    setCurrentText("");
    setDone(true);
  };

  return { displayedLines, currentText, done, skip };
}
