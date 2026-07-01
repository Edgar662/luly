import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Lock } from "lucide-react";
import { useScrambleText } from "../../hooks/useScrambleText";

interface MenuCardProps {
  title: string;
  status: string;
  icon: LucideIcon;
  color: string;
  locked: boolean;
  lockedLabel: string;
  lockedHint: string;
  onClick?: () => void;
}

export default function MenuCard({
  title,
  status,
  icon: Icon,
  color,
  locked,
  lockedLabel,
  lockedHint,
  onClick,
}: MenuCardProps) {
  const scrambledTitle = useScrambleText(8, 90);

  return (
    <button
      onClick={onClick}
      disabled={locked}
      className={`group flex flex-col items-center rounded-2xl border p-5 text-center transition ${
        locked
          ? "cursor-not-allowed border-kp-border/50 bg-kp-panel-light/50"
          : "border-kp-border bg-kp-panel-light hover:border-kp-green/50"
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <span
          className={`font-terminal text-base tracking-wide ${
            locked ? "text-kp-muted/70" : "font-display text-sm font-bold text-white"
          }`}
        >
          {locked ? scrambledTitle : title}
        </span>
        {locked ? (
          <Lock className="h-4 w-4 text-kp-muted" />
        ) : (
          <ArrowUpRight className="h-4 w-4 text-kp-muted transition group-hover:text-kp-green" />
        )}
      </div>

      <Icon
        className={`my-6 h-12 w-12 ${locked ? "text-kp-muted opacity-40" : color}`}
        strokeWidth={1.5}
      />

      {locked && (
        <p className="font-display text-[10px] font-semibold tracking-widest text-kp-orange">
          {lockedLabel}
        </p>
      )}
      <p className="mt-1 text-xs uppercase tracking-widest text-kp-muted">
        {locked ? lockedHint : status}
      </p>
      <span
        className={`mt-3 h-0.5 w-8 rounded-full ${
          locked ? "bg-kp-border" : color === "text-kp-orange" ? "bg-kp-orange" : "bg-kp-green"
        }`}
      />
    </button>
  );
}
