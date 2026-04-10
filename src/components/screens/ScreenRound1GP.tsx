import { useTournamentStore } from '@/lib/store';
import { KIDS, ELTERN } from '@/lib/players';
import { PlayerAvatar } from '@/components/PlayerAvatar';

export function ScreenRound1Kids() {
  const { state, setState, setScreen } = useTournamentStore();
  const points = state.round1.kidsGpPoints;

  const allFilled = KIDS.every(p => points[p.id] != null && points[p.id]! >= 0);
  const total = KIDS.reduce((sum, p) => sum + (points[p.id] ?? 0), 0);

  const updatePoints = (playerId: string, val: string) => {
    const num = val === '' ? null : Math.max(0, parseInt(val) || 0);
    setState(prev => ({
      round1: {
        ...prev.round1,
        kidsGpPoints: { ...prev.round1.kidsGpPoints, [playerId]: num },
      },
    }));
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 slide-up">
      <h2 className="text-2xl font-bold text-gold mb-1">Runde 1 — Kids-GP</h2>
      <p className="text-muted-foreground mb-8">GP-Punkte der Kids eintragen</p>

      <div className="space-y-4 mb-8">
        {KIDS.map(p => (
          <div key={p.id} className="flex items-center gap-4 bg-card rounded-lg p-4 border border-border">
            <PlayerAvatar playerId={p.id} size="md" />
            <div className="ml-auto">
              <input
                type="number"
                min={0}
                value={points[p.id] ?? ''}
                onChange={e => updatePoints(p.id, e.target.value)}
                placeholder="0"
                className="w-24 bg-secondary text-foreground text-center text-2xl font-bold rounded-lg px-3 py-2 border border-border focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mb-8">
        <span className="text-muted-foreground">Team Kids Total: </span>
        <span className="text-3xl font-bold text-gold">{total}</span>
      </div>

      <div className="flex justify-between">
        <button onClick={() => setScreen(3)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">
          Zurück
        </button>
        <button
          onClick={() => setScreen(5)}
          disabled={!allFilled}
          className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Weiter zum Eltern-GP
        </button>
      </div>
    </div>
  );
}

export function ScreenRound1Eltern() {
  const { state, setState, setScreen } = useTournamentStore();
  const points = state.round1.elternGpPoints;

  const allFilled = ELTERN.every(p => points[p.id] != null && points[p.id]! >= 0);
  const total = ELTERN.reduce((sum, p) => sum + (points[p.id] ?? 0), 0);

  const updatePoints = (playerId: string, val: string) => {
    const num = val === '' ? null : Math.max(0, parseInt(val) || 0);
    setState(prev => ({
      round1: {
        ...prev.round1,
        elternGpPoints: { ...prev.round1.elternGpPoints, [playerId]: num },
      },
    }));
  };

  const finish = () => {
    setState(prev => {
      const kidsTotal = KIDS.reduce((s, p) => s + (prev.round1.kidsGpPoints[p.id] ?? 0), 0);
      const elternTotal = ELTERN.reduce((s, p) => s + (prev.round1.elternGpPoints[p.id] ?? 0), 0);
      return {
        round1: {
          ...prev.round1,
          completed: true,
          winnerTeam: kidsTotal > elternTotal ? 'kids' : elternTotal > kidsTotal ? 'eltern' : 'tie',
        },
        currentScreen: 6,
      };
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 slide-up">
      <h2 className="text-2xl font-bold text-gold mb-1">Runde 1 — Eltern-GP</h2>
      <p className="text-muted-foreground mb-8">GP-Punkte der Eltern eintragen</p>

      <div className="space-y-4 mb-8">
        {ELTERN.map(p => (
          <div key={p.id} className="flex items-center gap-4 bg-card rounded-lg p-4 border border-border">
            <PlayerAvatar playerId={p.id} size="md" />
            <div className="ml-auto">
              <input
                type="number"
                min={0}
                value={points[p.id] ?? ''}
                onChange={e => updatePoints(p.id, e.target.value)}
                placeholder="0"
                className="w-24 bg-secondary text-foreground text-center text-2xl font-bold rounded-lg px-3 py-2 border border-border focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mb-8">
        <span className="text-muted-foreground">Team Eltern Total: </span>
        <span className="text-3xl font-bold text-gold">{total}</span>
      </div>

      <div className="flex justify-between">
        <button onClick={() => setScreen(4)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">
          Zurück
        </button>
        <button
          onClick={finish}
          disabled={!allFilled}
          className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Runde 1 abschliessen
        </button>
      </div>
    </div>
  );
}
