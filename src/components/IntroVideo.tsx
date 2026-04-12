import { useRef } from 'react';
import { SkipForward } from 'lucide-react';

interface IntroVideoProps {
  onComplete: () => void;
}

export function IntroVideo({ onComplete }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src="/BC-IntroMovie.mp4"
        autoPlay
        playsInline
        preload="auto"
        onEnded={onComplete}
        className="w-full h-full object-contain"
      />

      <button
        onClick={onComplete}
        className="fixed bottom-4 right-4 z-[101] text-xs text-muted-foreground hover:text-gold transition-colors flex items-center gap-1.5 bg-card/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50"
        aria-label="Intro überspringen"
      >
        <SkipForward className="w-3.5 h-3.5" />
        Skip
      </button>
    </div>
  );
}
