import { useTournamentStore } from '@/lib/store';
import { getRound3Points } from '@/lib/scoring';
import { useCountUp } from '@/hooks/useCountUp';

export function ScreenRound3Result() {
  const { state, setScreen } = useTournamentStore();
  const pts = getRound3Points(state);
  const animKids = useCountUp(pts.kids, 800);
  const animEltern = useCountUp(pts.eltern, 800);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 slide-up text-center">
      <h2 className="text-3xl font-bold text-gold mb-8">Runde 3 — Ergebnis</h2>

      <div className="grid grid-cols-2 gap-8 mb-10">
        <div className="bg-card rounded-xl p-8 border border-border">
          <p className="text-muted-foreground mb-2">Team Kids</p>
          <p className="text-5xl font-bold text-gold">+{animKids}</p>
        </div>
        <div className="bg-card rounded-xl p-8 border border-border">
          <p className="text-muted-foreground mb-2">Team Eltern</p>
          <p className="text-5xl font-bold text-gold">+{animEltern}</p>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={() => setScreen(14)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">Zurück</button>
        <button onClick={() => setScreen(16)} className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity">
          Weiter zum Final
        </button>
      </div>
    </div>
  );
}
