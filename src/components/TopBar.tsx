import { getTotalScore } from '@/lib/scoring';
import { useTournamentStore } from '@/lib/store';

const ROUND_NAMES = ['Einwärmen', 'Mixed', 'Gender', 'Final'];

function getRoundIndex(screen: number): number {
  if (screen <= 6) return 0;
  if (screen <= 11) return 1;
  if (screen <= 15) return 2;
  return 3;
}

export function TopBar() {
  const state = useTournamentStore(s => s.state);
  const score = getTotalScore(state);
  const currentRound = getRoundIndex(state.currentScreen);

  return (
    <div className="w-full border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Bären Cup" className="w-10 h-10 object-contain" />
        </div>

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
          {ROUND_NAMES.map((name, i) => (
            <div
              key={name}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === currentRound ? 'bg-gold' : i < currentRound ? 'bg-gold/40' : 'bg-muted'
              }`}
              title={name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
