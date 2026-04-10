import { useTournamentStore } from '@/lib/store';
import { PLAYERS } from '@/lib/players';

export function ScreenFinalIntro() {
  const { state, setState, setScreen } = useTournamentStore();

  // Race tracking grid
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
      <h2 className="text-3xl font-bold text-gold mb-2">Grand Final</h2>
      <div className="checkered-border pb-4 mb-6" />

      <p className="text-muted-foreground leading-relaxed mb-6">
        Ein finaler GP über 4 Rennen mit 4 Startplätzen. Jedes Team belegt 2 Slots. 
        Pro Rennen können die Spieler innerhalb des Teams die Controller wechseln — 
        wichtig: jeder Spieler muss mindestens 2 der 4 Rennen fahren.
      </p>

      <div className="bg-card rounded-xl p-4 border border-border mb-4">
        <p className="text-sm text-gold mb-2">Punkte-Verteilung</p>
        <p className="text-muted-foreground text-sm">
          Slot-Platz 1 = 10, Platz 2 = 8, Platz 3 = 4, Platz 4 = 2 Punkte
        </p>
      </div>

      {/* Race tracking helper */}
      <div className="bg-card rounded-xl p-4 border border-border mb-8">
        <p className="text-sm text-gold mb-3">Renn-Tracker (optional)</p>
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
        <button onClick={() => setScreen(15)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">Zurück</button>
        <button onClick={() => setScreen(17)} className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity">
          Final-Resultat eingeben
        </button>
      </div>
    </div>
  );
}
