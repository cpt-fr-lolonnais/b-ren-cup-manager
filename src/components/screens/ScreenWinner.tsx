import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useTournamentStore } from '@/lib/store';
import { getTotalScore } from '@/lib/scoring';
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

export function ScreenWinner() {
  const { state, setScreen, resetState } = useTournamentStore();
  const score = getTotalScore(state);
  const tied = score.kids === score.eltern;
  const winner = score.kids > score.eltern ? 'Team Kids' : 'Team Eltern';
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#F5C518', '#FFD700', '#C0C0C0', '#FFFFFF'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#F5C518', '#FFD700', '#C0C0C0', '#FFFFFF'],
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#F5C518', '#FFD700', '#C0C0C0'],
      });
    }, 500);
  }, []);

  const handleConfirmReset = () => {
    resetState();
    setScreen(1);
    setDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 fade-in px-4">
      <div className="relative">
        <div className="absolute inset-0 -m-16 bg-gold/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <img src="/logo.png" alt="Bären Cup" className="relative w-56 h-56 object-contain" />
      </div>

      <div className="text-center space-y-4">
        <p className="text-2xl text-muted-foreground tracking-widest uppercase">Bären Cup Sieger</p>
        {tied ? (
          <h1 className="text-6xl font-bold text-gold">UNENTSCHIEDEN</h1>
        ) : (
          <h1 className="text-6xl font-bold text-gold">{winner}</h1>
        )}
      </div>

      <div className="flex items-center gap-6 text-center">
        <div>
          <p className="text-sm text-muted-foreground">Team Kids</p>
          <p className="text-5xl font-bold text-gold">{score.kids}</p>
        </div>
        <span className="text-3xl text-muted-foreground">:</span>
        <div>
          <p className="text-sm text-muted-foreground">Team Eltern</p>
          <p className="text-5xl font-bold text-gold">{score.eltern}</p>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button onClick={() => setScreen(20)} className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity">
          Auswertung anzeigen
        </button>
        <button onClick={() => setDialogOpen(true)} className="px-8 py-3 border border-border text-muted-foreground rounded-lg hover:text-foreground transition-colors">
          Neues Turnier starten
        </button>
      </div>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Neues Turnier starten?</AlertDialogTitle>
            <AlertDialogDescription>
              Das aktuelle Turnier wird zurückgesetzt. Alle Eingaben gehen verloren.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmReset} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Neu starten
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
