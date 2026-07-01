// Caesar shift — only shifts A-Z (case-insensitive), everything else
// (spaces, punctuation) passes through untouched.
export function caesarShift(text: string, shift: number): string {
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      const isUpper = code >= 65 && code <= 90;
      const isLower = code >= 97 && code <= 122;
      if (!isUpper && !isLower) return char;
      const base = isUpper ? 65 : 97;
      return String.fromCharCode(((code - base + shift) % 26 + 26) % 26 + base);
    })
    .join("");
}
