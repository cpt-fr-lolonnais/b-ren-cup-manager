import { useTournamentStore } from '@/lib/store';
import { RankingInput } from '@/components/RankingInput';
import { JUNGS, PAPAS, GIRLS, MAMAS } from '@/lib/players';
import { getRound3GPScore } from '@/lib/scoring';

export function ScreenRound3GP1() {
  const { state, setState, setScreen } = useTournamentStore();
  const allPlayers = [...JUNGS, ...PAPAS];
  const ranking = state.round3.gp1Ranking;
  const allRanked = Object.keys(ranking).length === 4;
  const score = allRanked ? getRound3GPScore(ranking, JUNGS, PAPAS) : null;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 slide-up">
      <h2 className="text-2xl font-bold text-gold mb-1">Battle GP — Jungs vs. Papas</h2>
      <p className="text-muted-foreground mb-8">Rangfolge eintragen</p>

      <RankingInput
        playerIds={allPlayers}
        ranking={ranking}
        onChange={r => setState(prev => ({ round3: { ...prev.round3, gp1Ranking: r } }))}
      />

      {score && (
        <div className="mt-6 flex justify-center gap-8">
          <div className="text-center"><p className="text-sm text-muted-foreground">Kids</p><p className="text-2xl font-bold text-gold">{score.kids}</p></div>
          <div className="text-center"><p className="text-sm text-muted-foreground">Eltern</p><p className="text-2xl font-bold text-gold">{score.eltern}</p></div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button onClick={() => setScreen(12)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">Zurück</button>
        <button onClick={() => setScreen(14)} disabled={!allRanked}
          className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed">
          Weiter zu GP 2
        </button>
      </div>
    </div>
  );
}

export function ScreenRound3GP2() {
  const { state, setState, setScreen } = useTournamentStore();
  const allPlayers = [...GIRLS, ...MAMAS];
  const ranking = state.round3.gp2Ranking;
  const allRanked = Object.keys(ranking).length === 4;
  const score = allRanked ? getRound3GPScore(ranking, GIRLS, MAMAS) : null;

  const finish = () => {
    setState(prev => ({
      round3: { ...prev.round3, completed: true },
      currentScreen: 15,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 slide-up">
      <h2 className="text-2xl font-bold text-gold mb-1">Battle GP — Girls vs. Mamas</h2>
      <p className="text-muted-foreground mb-8">Rangfolge eintragen</p>

      <RankingInput
        playerIds={allPlayers}
        ranking={ranking}
        onChange={r => setState(prev => ({ round3: { ...prev.round3, gp2Ranking: r } }))}
      />

      {score && (
        <div className="mt-6 flex justify-center gap-8">
          <div className="text-center"><p className="text-sm text-muted-foreground">Kids</p><p className="text-2xl font-bold text-gold">{score.kids}</p></div>
          <div className="text-center"><p className="text-sm text-muted-foreground">Eltern</p><p className="text-2xl font-bold text-gold">{score.eltern}</p></div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button onClick={() => setScreen(13)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">Zurück</button>
        <button onClick={finish} disabled={!allRanked}
          className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed">
          Battle GP abschliessen
        </button>
      </div>
    </div>
  );
}
