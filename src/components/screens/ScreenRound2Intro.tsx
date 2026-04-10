import { useTournamentStore } from '@/lib/store';
import { PlayerAvatar } from '@/components/PlayerAvatar';
import { MIXED_KIDS_TEAM_1, MIXED_KIDS_TEAM_2, MIXED_ELTERN_TEAM_1, MIXED_ELTERN_TEAM_2 } from '@/lib/players';

export function ScreenRound2Intro() {
  const { setScreen } = useTournamentStore();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 slide-up">
      <h2 className="text-3xl font-bold text-gold mb-2">Runde 2 — Mixed Duelle</h2>
      <div className="checkered-border pb-4 mb-8" />

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-bold text-gold mb-3">Kids-Teams</h3>
          <div className="bg-card rounded-xl p-4 border border-border mb-3">
            <p className="text-sm text-muted-foreground mb-2">Kids-Team 1</p>
            <div className="space-y-2">
              {MIXED_KIDS_TEAM_1.map(id => <PlayerAvatar key={id} playerId={id} />)}
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-2">Kids-Team 2</p>
            <div className="space-y-2">
              {MIXED_KIDS_TEAM_2.map(id => <PlayerAvatar key={id} playerId={id} />)}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gold mb-3">Eltern-Teams</h3>
          <div className="bg-card rounded-xl p-4 border border-border mb-3">
            <p className="text-sm text-muted-foreground mb-2">Eltern-Team 1</p>
            <div className="space-y-2">
              {MIXED_ELTERN_TEAM_1.map(id => <PlayerAvatar key={id} playerId={id} />)}
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-2">Eltern-Team 2</p>
            <div className="space-y-2">
              {MIXED_ELTERN_TEAM_2.map(id => <PlayerAvatar key={id} playerId={id} />)}
            </div>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground mb-8">
        Die Kids bestimmen, welches Kids-Team gegen welches Eltern-Team antritt.
      </p>

      <div className="flex justify-between">
        <button onClick={() => setScreen(6)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">Zurück</button>
        <button onClick={() => setScreen(8)} className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity">
          Paarungen festlegen
        </button>
      </div>
    </div>
  );
}
