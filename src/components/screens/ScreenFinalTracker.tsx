import { useTournamentStore } from '@/lib/store';
import { PLAYERS } from '@/lib/players';

export function ScreenFinalTracker() {
  const { state, setState, setScreen } = useTournamentStore();

  const tracking = state.final.raceTracking;

  const toggleRace = (playerId: string, raceIndex: number) => {
    const current = tracking[playerId] ?? [false, false, false, false];
    const updated = [...current];
    updated[raceIndex] = !updated[raceIndex];
    setState(prev => ({
      final: {
        ...prev.final,
        raceTracking: { ...prev.final.raceTracking, [playerId]: updated },
      },
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 slide-up">
      <h2 className="text-2xl font-bold text-gold mb-1">Grand Final — Renn-Tracker</h2>
      <p className="text-muted-foreground mb-6">Tracke welcher Spieler welches Rennen fährt (optional)</p>

      <div className="bg-card rounded-xl p-4 border border-border mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left text-muted-foreground py-1">Spieler</th>
                {[1, 2, 3, 4].map(r => (
                  <th key={r} className="text-center text-muted-foreground py-1 w-16">R{r}</th>
                ))}
                <th className="text-center text-muted-foreground py-1 w-16">Total</th>
              </tr>
            </thead>
            <tbody>
              {PLAYERS.map(p => {
                const races = tracking[p.id] ?? [false, false, false, false];
                const count = races.filter(Boolean).length;
                return (
                  <tr key={p.id}>
                    <td className="py-1 text-foreground">{p.name}</td>
                    {races.map((checked, i) => (
                      <td key={i} className="text-center py-1">
                        <button
                          onClick={() => toggleRace(p.id, i)}
                          className={`w-6 h-6 rounded border transition-colors ${
                            checked ? 'bg-gold border-gold' : 'border-border hover:border-gold/50'
                          }`}
                        />
                      </td>
                    ))}
                    <td className={`text-center py-1 font-bold ${count < 2 ? 'text-destructive' : 'text-gold'}`}>
                      {count}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {PLAYERS.some(p => {
          const races = tracking[p.id] ?? [false, false, false, false];
          return races.filter(Boolean).length < 2 && races.some(Boolean);
        }) && (
          <p className="text-destructive text-xs mt-2">⚠ Einige Spieler haben weniger als 2 Rennen!</p>
        )}
      </div>

      <div className="flex justify-between">
        <button onClick={() => setScreen(16)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">Zurück</button>
        <button onClick={() => setScreen(18)} className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity">
          Final-Resultat eingeben
        </button>
      </div>
    </div>
  );
}
