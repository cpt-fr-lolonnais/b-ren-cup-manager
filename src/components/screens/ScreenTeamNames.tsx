import { useState } from 'react';
import { useTournamentStore } from '@/lib/store';
import { INITIAL_STATE } from '@/lib/types';

export function ScreenTeamNames() {
  const { state, setState, setScreen } = useTournamentStore();

  const [kidsName, setKidsName] = useState(
    state.teamNames.kids !== INITIAL_STATE.teamNames.kids ? state.teamNames.kids : ''
  );
  const [elternName, setElternName] = useState(
    state.teamNames.eltern !== INITIAL_STATE.teamNames.eltern ? state.teamNames.eltern : ''
  );

  const handleContinue = () => {
    const kids = kidsName.trim() || INITIAL_STATE.teamNames.kids;
    const eltern = elternName.trim() || INITIAL_STATE.teamNames.eltern;
    setState(() => ({ teamNames: { kids, eltern } }));
    setScreen(3);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 fade-in px-4">
      <img src="/logo.png" alt="Bären Cup" className="w-32 object-contain" />

      <div className="text-center space-y-2">
        <p className="text-xl text-muted-foreground">Bevor wir starten:</p>
        <h1 className="text-4xl font-bold text-gold">Wie heissen eure Teams?</h1>
      </div>

      <div className="flex items-center gap-4 w-full max-w-2xl">
        <div className="flex-1 bg-card rounded-xl p-5 border border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">TEAM KIDS</p>
          <input
            type="text"
            value={kidsName}
            onChange={e => setKidsName(e.target.value)}
            placeholder="Team Kids"
            maxLength={20}
            className="w-full bg-secondary border border-border focus:border-gold text-center text-lg font-bold rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors"
          />
        </div>

        <div className="flex-1 bg-card rounded-xl p-5 border border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">TEAM ELTERN</p>
          <input
            type="text"
            value={elternName}
            onChange={e => setElternName(e.target.value)}
            placeholder="Team Eltern"
            maxLength={20}
            className="w-full bg-secondary border border-border focus:border-gold text-center text-lg font-bold rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setScreen(1)}
          className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          Zurück
        </button>
        <button
          onClick={handleContinue}
          className="px-10 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity"
        >
          Weiter
        </button>
      </div>
    </div>
  );
}
