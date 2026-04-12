import { Play } from 'lucide-react';

interface IntroSplashProps {
  onPlay: () => void;
}

export function IntroSplash({ onPlay }: IntroSplashProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <button
        onClick={onPlay}
        className="group w-24 h-24 rounded-full border-2 border-gold/60 hover:border-gold flex items-center justify-center transition-all hover:scale-110"
        aria-label="Intro starten"
      >
        <Play className="w-10 h-10 text-gold/60 group-hover:text-gold transition-colors ml-1" fill="currentColor" />
      </button>
    </div>
  );
}
