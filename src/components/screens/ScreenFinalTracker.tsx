import { useTournamentStore } from '@/lib/store';
import { PlayerAvatar } from '@/components/PlayerAvatar';

const KIDS_ORDER = ['milena', 'elina', 'valerio', 'mio'];
const ELTERN_ORDER = ['carmen', 'nicole', 'micha', 'maethu'];
const RACES = [1, 2, 3, 4];

export function ScreenFinalTracker() {
  const { state, setState, setScreen } = useTournamentStore();
  const tracking = state.final.raceTracking;

  const getRaces = (id: string): boolean[] => tracking[id] ?? [false, false, false, false];

  const toggleRace = (playerId: string, raceIndex: number) => {
    const current = getRaces(playerId);
    const updated = [...current];
    updated[raceIndex] = !updated[raceIndex];
    setState(prev => ({
      final: {
        ...prev.final,
        raceTracking: { ...prev.final.raceTracking, [playerId]: updated },
      },
    }));
  };

  // Count kids/eltern selected per race
  const kidsPerRace = RACES.map((_, ri) => KIDS_ORDER.filter(id => getRaces(id)[ri]).length);
  const elternPerRace = RACES.map((_, ri) => ELTERN_ORDER.filter(id => getRaces(id)[ri]).length);

  const isDisabled = (playerId: string, raceIndex: number, group: 'kids' | 'eltern') => {
    const playerRaces = getRaces(playerId);
    if (playerRaces[raceIndex]) return false; // always allow uncheck
    const playerCount = playerRaces.filter(Boolean).length;
    if (playerCount >= 2) return true;
    const count = group === 'kids' ? kidsPerRace[raceIndex] : elternPerRace[raceIndex];
    return count >= 2;
  };

  // Validation
  const allPlayersValid = [...KIDS_ORDER, ...ELTERN_ORDER].every(id => getRaces(id).filter(Boolean).length >= 2);
  const allRacesValid = RACES.every((_, ri) => kidsPerRace[ri] === 2 && elternPerRace[ri] === 2);
  const canProceed = allPlayersValid && allRacesValid;

  const renderGroup = (title: string, playerIds: string[], group: 'kids' | 'eltern') => (
    <>
      <tr>
        <td colSpan={6} className="pt-3 pb-1">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</span>
        </td>
      </tr>
      {playerIds.map(id => {
        const races = getRaces(id);
        const count = races.filter(Boolean).length;
        const warning = count < 2;

        return (
          <tr key={id} className="border-t border-border/30">
            <td className="py-1.5 pr-4">
              <PlayerAvatar playerId={id} size="sm" />
            </td>
            {RACES.map((_, ri) => {
              const checked = races[ri];
              const disabled = isDisabled(id, ri, group);
              return (
                <td key={ri} className="text-center py-1.5">
                  <button
                    onClick={() => toggleRace(id, ri)}
                    disabled={disabled}
                    className={`w-7 h-7 rounded-md border-2 transition-all ${
                      checked
                        ? 'bg-gold border-gold text-primary-foreground'
                        : disabled
                        ? 'border-border/20 bg-muted/10 cursor-not-allowed'
                        : 'border-border hover:border-gold/50'
                    }`}
                  >
                    {checked && (
                      <svg className="w-3.5 h-3.5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                </td>
              );
            })}
            <td className="text-center py-1.5">
              <span className={`text-base font-bold ${warning ? 'text-destructive' : 'text-gold'}`}>
                {count}
              </span>
            </td>
          </tr>
        );
      })}
    </>
  );

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 slide-up">
      <h2 className="text-xl font-bold text-gold mb-1">Final GP — Renn-Tracker</h2>
      <p className="text-muted-foreground mb-4">
        Trage ein, welcher Spieler welches Rennen fährt. Pro Rennen genau 2 Kids und 2 Eltern.
      </p>

      <div className="bg-card rounded-xl p-4 border border-border mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left text-muted-foreground pb-2 w-[180px]">Spieler</th>
              {RACES.map(r => (
                <th key={r} className="text-center text-muted-foreground pb-2 w-16">Rennen {r}</th>
              ))}
              <th className="text-center text-muted-foreground pb-2 w-16">Total</th>
            </tr>
          </thead>
          <tbody>
            {renderGroup('Kids', KIDS_ORDER, 'kids')}
            {renderGroup('Eltern', ELTERN_ORDER, 'eltern')}
          </tbody>
          <tfoot>
            <tr className="border-t border-border">
              <td className="pt-2 text-xs text-muted-foreground">Pro Rennen</td>
              {RACES.map((_, ri) => {
                const k = kidsPerRace[ri];
                const e = elternPerRace[ri];
                const valid = k === 2 && e === 2;
                return (
                  <td key={ri} className="text-center pt-2">
                    <span className={`text-xs font-medium ${valid ? 'text-gold' : 'text-muted-foreground'}`}>
                      {k + e}/4
                    </span>
                  </td>
                );
              })}
              <td />
            </tr>
          </tfoot>
        </table>
      </div>

      {!allPlayersValid && (
        <p className="text-destructive text-sm mb-3">⚠ Jeder Spieler muss genau 2 Rennen fahren.</p>
      )}
      {allPlayersValid && !allRacesValid && (
        <p className="text-destructive text-sm mb-3">⚠ Jedes Rennen braucht genau 2 Kids und 2 Eltern.</p>
      )}

      <div className="flex justify-between">
        <button onClick={() => setScreen(16)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">Zurück</button>
        <button
          onClick={() => setScreen(18)}
          disabled={!canProceed}
          className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Final-Resultat eingeben
        </button>
      </div>
    </div>
  );
}
