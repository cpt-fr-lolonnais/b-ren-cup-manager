import { useTournamentStore } from '@/lib/store';
import { RankingInput } from '@/components/RankingInput';
import { getRound2GP1Players, getRound2GP2Players, getRound2GPScore } from '@/lib/scoring';

export function ScreenRound2GP1() {
  const { state, setState, setScreen } = useTournamentStore();
  const players = getRound2GP1Players(state);
  const allPlayers = [...players.kids, ...players.eltern];
  const ranking = state.round2.gp1Ranking;
  const allRanked = allPlayers.length === 4 && Object.keys(ranking).length === 4;

  const score = allRanked ? getRound2GPScore(ranking, players.kids, players.eltern) : null;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 slide-up">
      <h2 className="text-2xl font-bold text-gold mb-1">Mixed GP — Duell 1</h2>
      <p className="text-muted-foreground mb-8">Rangfolge eintragen (1 = Erster)</p>

      <RankingInput
        playerIds={allPlayers}
        ranking={ranking}
        onChange={r => setState(prev => ({ round2: { ...prev.round2, gp1Ranking: r } }))}
      />

      {score && (
        <div className="mt-6 flex justify-center gap-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Kids</p>
            <p className="text-2xl font-bold text-gold">{score.kids}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Eltern</p>
            <p className="text-2xl font-bold text-gold">{score.eltern}</p>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button onClick={() => setScreen(9)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">Zurück</button>
        <button
          onClick={() => setScreen(11)}
          disabled={!allRanked}
          className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Weiter zum 2. Duell
        </button>
      </div>
    </div>
  );
}

export function ScreenRound2GP2() {
  const { state, setState, setScreen } = useTournamentStore();
  const players = getRound2GP2Players(state);
  const allPlayers = [...players.kids, ...players.eltern];
  const ranking = state.round2.gp2Ranking;
  const allRanked = allPlayers.length === 4 && Object.keys(ranking).length === 4;

  const score = allRanked ? getRound2GPScore(ranking, players.kids, players.eltern) : null;

  const finish = () => {
    setState(prev => ({
      round2: { ...prev.round2, completed: true },
      currentScreen: 12,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 slide-up">
      <h2 className="text-2xl font-bold text-gold mb-1">Mixed GP — Duell 2</h2>
      <p className="text-muted-foreground mb-8">Rangfolge eintragen (1 = Erster)</p>

      <RankingInput
        playerIds={allPlayers}
        ranking={ranking}
        onChange={r => setState(prev => ({ round2: { ...prev.round2, gp2Ranking: r } }))}
      />

      {score && (
        <div className="mt-6 flex justify-center gap-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Kids</p>
            <p className="text-2xl font-bold text-gold">{score.kids}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Eltern</p>
            <p className="text-2xl font-bold text-gold">{score.eltern}</p>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button onClick={() => setScreen(10)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">Zurück</button>
        <button
          onClick={finish}
          disabled={!allRanked}
          className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Mixed GP abschliessen
        </button>
      </div>
    </div>
  );
}
