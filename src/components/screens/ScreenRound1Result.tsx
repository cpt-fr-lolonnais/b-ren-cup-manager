import { useTournamentStore } from '@/lib/store';
import { getRound1Score } from '@/lib/scoring';
import { useCountUp } from '@/hooks/useCountUp';

export function ScreenRound1Result() {
  const { state, setScreen } = useTournamentStore();
  const { kidsTotal, elternTotal } = getRound1Score(state);
  const winner = state.round1.winnerTeam;

  const animatedKids = useCountUp(kidsTotal, 800);
  const animatedEltern = useCountUp(elternTotal, 800);

  const winnerName = winner === 'kids' ? 'Team Kids' : winner === 'eltern' ? 'Team Eltern' : 'Unentschieden';

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 slide-up text-center">
      <h2 className="text-3xl font-bold text-gold mb-8">Runde 1 — Ergebnis</h2>

      <div className="grid grid-cols-2 gap-8 mb-10">
        <div className="bg-card rounded-xl p-8 border border-border">
          <p className="text-muted-foreground mb-2">Team Kids</p>
          <p className="text-5xl font-bold text-gold">{animatedKids}</p>
        </div>
        <div className="bg-card rounded-xl p-8 border border-border">
          <p className="text-muted-foreground mb-2">Team Eltern</p>
          <p className="text-5xl font-bold text-gold">{animatedEltern}</p>
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 border border-gold mb-10">
        <p className="text-xl">
          {winner === 'tie' ? (
            <span className="text-gold font-bold">Unentschieden — 1 Punkt pro Team</span>
          ) : (
            <>
              <span className="text-gold font-bold">{winnerName}</span> gewinnt das Einwärmen →{' '}
              <span className="text-gold font-bold">+2 Punkte</span>
            </>
          )}
        </p>
      </div>

      <div className="flex justify-between">
        <button onClick={() => setScreen(5)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">
          Zurück
        </button>
        <button onClick={() => setScreen(7)} className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity">
          Weiter zu Runde 2
        </button>
      </div>
    </div>
  );
}
