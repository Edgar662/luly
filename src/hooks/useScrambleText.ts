import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@!?";

function randomString(length: number) {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return out;
}

export function useScrambleText(length = 8, intervalMs = 90) {
  const [text, setText] = useState(() => randomString(length));

  useEffect(() => {
    const id = setInterval(() => setText(randomString(length)), intervalMs);
    return () => clearInterval(id);
  }, [length, intervalMs]);

  return text;
}
