import { useState } from 'react';
import { useTournamentStore } from '@/lib/store';
import { PlayerAvatar } from '@/components/PlayerAvatar';
import { MIXED_KIDS_TEAM_1, MIXED_KIDS_TEAM_2, MIXED_ELTERN_TEAM_1, MIXED_ELTERN_TEAM_2 } from '@/lib/players';

export function ScreenRound2Pairing() {
  const { state, setState, setScreen } = useTournamentStore();
  const [selection, setSelection] = useState<number>(state.round2.pairing?.[0] ?? 0);

  // selection: which kids team faces eltern team 1
  // 1 = kids team 1 vs eltern team 1, 2 = kids team 2 vs eltern team 1
  const confirm = () => {
    const pairing: [number, number] = selection === 1 ? [1, 2] : [2, 1];
    setState(prev => ({
      round2: { ...prev.round2, pairing },
    }));
    setScreen(9);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 slide-up">
      <h2 className="text-2xl font-bold text-gold mb-6">Paarungen festlegen</h2>
      <p className="text-muted-foreground mb-8">Welches Kids-Team tritt gegen Eltern-Team 1 (Mäthu + Carmen) an?</p>

      <div className="space-y-4 mb-8">
        <button
          onClick={() => setSelection(1)}
          className={`w-full p-4 rounded-xl border text-left transition-colors ${
            selection === 1 ? 'border-gold bg-gold/10' : 'border-border bg-card hover:border-gold/50'
          }`}
        >
          <p className="text-sm text-gold mb-2">Kids-Team 1 vs. Eltern-Team 1</p>
          <div className="flex gap-4">
            {MIXED_KIDS_TEAM_1.map(id => <PlayerAvatar key={id} playerId={id} size="sm" />)}
            <span className="text-muted-foreground self-center">vs.</span>
            {MIXED_ELTERN_TEAM_1.map(id => <PlayerAvatar key={id} playerId={id} size="sm" />)}
          </div>
        </button>
        <button
          onClick={() => setSelection(2)}
          className={`w-full p-4 rounded-xl border text-left transition-colors ${
            selection === 2 ? 'border-gold bg-gold/10' : 'border-border bg-card hover:border-gold/50'
          }`}
        >
          <p className="text-sm text-gold mb-2">Kids-Team 2 vs. Eltern-Team 1</p>
          <div className="flex gap-4">
            {MIXED_KIDS_TEAM_2.map(id => <PlayerAvatar key={id} playerId={id} size="sm" />)}
            <span className="text-muted-foreground self-center">vs.</span>
            {MIXED_ELTERN_TEAM_1.map(id => <PlayerAvatar key={id} playerId={id} size="sm" />)}
          </div>
        </button>
      </div>

      <p className="text-sm text-muted-foreground mb-8">
        Die andere Paarung ergibt sich automatisch.
      </p>

      <div className="flex justify-between">
        <button onClick={() => setScreen(7)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">Zurück</button>
        <button
          onClick={confirm}
          disabled={selection === 0}
          className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Weiter zu GP 1
        </button>
      </div>
    </div>
  );
}
