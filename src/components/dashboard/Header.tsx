import { Menu, Pause, Play, Volume2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useMusic } from "../../context/MusicContext";
import LanguageToggle from "../LanguageToggle";

export default function Header() {
  const { t } = useLanguage();
  const { isPlaying, volume, toggle, setVolume, trackTitle, trackArtist } = useMusic();

  return (
    <header className="flex flex-wrap items-center gap-3 px-4 pt-4 md:px-6">
      <div className="flex items-center gap-3 rounded-xl border border-kp-border bg-kp-panel px-4 py-3">
        <Menu className="h-5 w-5 text-kp-text" />
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-bold text-kp-green">KP</span>
          <div className="leading-tight text-left">
            <p className="font-display text-sm font-bold tracking-wide text-white">
              {t.header.appName}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-kp-muted">
              {t.header.appSubtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-kp-border bg-kp-panel px-4 py-3">
        <span className="h-2 w-2 animate-pulse rounded-full bg-kp-green" />
        <span className="font-display text-xs tracking-widest text-kp-muted">
          {t.header.status} <span className="text-kp-green">{t.header.statusValue}</span>
        </span>
      </div>

      <div className="ml-auto flex flex-1 items-center gap-3 rounded-xl border border-kp-border bg-kp-panel px-4 py-2 md:max-w-md">
        <button
          onClick={toggle}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-kp-green/50 text-kp-green"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" fill="currentColor" />
          ) : (
            <Play className="h-4 w-4" fill="currentColor" />
          )}
        </button>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-medium text-white">{trackTitle}</p>
          <p className="truncate text-xs text-kp-muted">{trackArtist}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Volume2 className="h-4 w-4 shrink-0 text-kp-muted" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            style={{ accentColor: "#4ade80" }}
            className="h-1 w-20"
          />
        </div>
      </div>

      <LanguageToggle />

      <button className="rounded-xl border border-kp-border bg-kp-panel p-3">
        <Menu className="h-5 w-5 text-kp-text" />
      </button>
    </header>
  );
}
