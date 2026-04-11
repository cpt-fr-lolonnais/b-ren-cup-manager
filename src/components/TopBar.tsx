import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { getTotalScore } from '@/lib/scoring';
import { useTournamentStore } from '@/lib/store';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

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
  const resetState = useTournamentStore(s => s.resetState);
  const setScreen = useTournamentStore(s => s.setScreen);
  const score = getTotalScore(state);
  const currentRound = getRoundIndex(state.currentScreen);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleReset = () => {
    resetState();
    setScreen(1);
    setDialogOpen(false);
  };

  return (
    <div className="w-full border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50 relative">
      {/* Logo — absolutely positioned, overflows below header */}
      <div className="absolute left-4 md:left-8 top-2 z-10">
        <img src="/logo.png" alt="Bären Cup" className="w-28 h-28 object-contain drop-shadow-lg" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left spacer matching logo + reset button width */}
        <div className="w-44" />

        {/* Score */}
        <div className="flex items-center gap-4 text-center">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Team Kids</span>
          <span className="text-3xl font-bold text-gold tabular-nums">{score.kids}</span>
          <span className="text-xl text-muted-foreground">:</span>
          <span className="text-3xl font-bold text-gold tabular-nums">{score.eltern}</span>
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Team Eltern</span>
        </div>

        {/* Right: round indicator + reset button */}
        <div className="flex items-center gap-4">
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

          <button
            onClick={() => setDialogOpen(true)}
            className="text-xs text-muted-foreground hover:text-gold transition-colors flex items-center gap-1 ml-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Zurücksetzen
          </button>
        </div>
      </div>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Turnier zurücksetzen?</AlertDialogTitle>
            <AlertDialogDescription>
              Alle Eingaben gehen verloren. Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Zurücksetzen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
