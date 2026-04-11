import { getTotalScore } from '@/lib/scoring';
import { useTournamentStore } from '@/lib/store';

const ROUND_NAMES = ['Warm-Up', 'Mixed', 'Boys & Girls', 'Final'];

function getRoundIndex(screen: number): number {
  if (screen < 3) return -1;
  if (screen <= 6) return 0;
  if (screen <= 11) return 1;
  if (screen <= 15) return 2;
  if (screen <= 18) return 3;
  return 3;
}

export function TopBar() {
  const state = useTournamentStore(s => s.state);
  const score = getTotalScore(state);
  const currentRound = getRoundIndex(state.currentScreen);

  return (
    <div className="w-full border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50 relative">
      {/* Logo — absolutely positioned, overflows below header */}
      <div className="absolute left-4 md:left-8 top-2 z-10">
        <img src="/logo.png" alt="Bären Cup" className="w-28 h-28 object-contain drop-shadow-lg" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Spacer matching logo width */}
        <div className="w-28" />

        {/* Score */}
        <div className="flex items-center gap-4 text-center">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Team Kids</span>
          <span className="text-3xl font-bold text-gold tabular-nums">{score.kids}</span>
          <span className="text-xl text-muted-foreground">:</span>
          <span className="text-3xl font-bold text-gold tabular-nums">{score.eltern}</span>
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Team Eltern</span>
        </div>

        {/* Round indicator */}
        <div className="flex items-center gap-2">
          {ROUND_NAMES.map((name, i) => {
            const isActive = i === currentRound;
            const isPast = i < currentRound;
            return (
              <div
                key={name}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  isActive ? 'bg-gold text-black' : isPast ? 'bg-gold/40 text-black/60' : 'bg-muted text-transparent'
                }`}
                title={name}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
