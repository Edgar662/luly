import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface MusicState {
  isPlaying: boolean;
  volume: number;
  toggle: () => void;
  setVolume: (v: number) => void;
  trackTitle: string;
  trackArtist: string;
}

const MusicContext = createContext<MusicState | null>(null);

const TRACK_TITLE = "New Year's Day";
const TRACK_ARTIST = "Taylor Swift";
const DEFAULT_VOLUME = 0.5;

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Browsers block autoplay with sound, but muted autoplay is always
  // allowed. Start muted immediately, then unmute at real volume on her
  // very first tap/click/keypress anywhere on the site — which happens
  // almost instantly since the boot screen itself needs a tap to continue.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = true;
    audio.volume = DEFAULT_VOLUME;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // even muted autoplay was blocked — she'll just use the play button.
      });

    const unmute = () => {
      audio.muted = false;
      if (audio.paused) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };
    window.addEventListener("pointerdown", unmute, { once: true });
    window.addEventListener("keydown", unmute, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unmute);
      window.removeEventListener("keydown", unmute);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = false;
      audio.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  };

  const setVolume = (v: number) => setVolumeState(Math.min(1, Math.max(0, v)));

  return (
    <MusicContext.Provider
      value={{ isPlaying, volume, toggle, setVolume, trackTitle: TRACK_TITLE, trackArtist: TRACK_ARTIST }}
    >
      <audio ref={audioRef} src="/audio/new-years-day.mp3" loop preload="auto" />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}
