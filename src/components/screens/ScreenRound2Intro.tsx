import { useTournamentStore } from '@/lib/store';
import { PlayerAvatar } from '@/components/PlayerAvatar';
import { MIXED_KIDS_TEAM_1, MIXED_KIDS_TEAM_2, MIXED_ELTERN_TEAM_1, MIXED_ELTERN_TEAM_2 } from '@/lib/players';

export function ScreenRound2Intro() {
  const { setScreen } = useTournamentStore();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 slide-up">
      <h2 className="text-3xl font-bold text-gold mb-6">Mixed GP</h2>

      <p className="text-foreground/90 leading-relaxed mb-4">
        In dieser Runde treten gemischte Zweierteams gegeneinander an — jeweils ein Kind oder Elternteil aus beiden Familien. Es werden zwei GPs gefahren mit je einem Kids-Team gegen ein Eltern-Team. Pro GP gibt es Rangpunkte (4/3/2/1) für jeden Fahrer, die Punkte der beiden Teampartner werden addiert und fliessen direkt in die Gesamtwertung ein.
      </p>

      <p className="text-gold font-semibold mb-8">
        Die Kids dürfen entscheiden, welches Kids-Team gegen welches Eltern-Team antritt.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Kids-Teams</h3>
          <div className="bg-card/50 rounded-lg p-3 border border-border/50 mb-2">
            <p className="text-xs text-muted-foreground mb-2">Kids-Team 1</p>
            <div className="flex items-center gap-2">
              {MIXED_KIDS_TEAM_1.map(id => <PlayerAvatar key={id} playerId={id} size="sm" />)}
            </div>
          </div>
          <div className="bg-card/50 rounded-lg p-3 border border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Kids-Team 2</p>
            <div className="flex items-center gap-2">
              {MIXED_KIDS_TEAM_2.map(id => <PlayerAvatar key={id} playerId={id} size="sm" />)}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Eltern-Teams</h3>
          <div className="bg-card/50 rounded-lg p-3 border border-border/50 mb-2">
            <p className="text-xs text-muted-foreground mb-2">Eltern-Team 1</p>
            <div className="flex items-center gap-2">
              {MIXED_ELTERN_TEAM_1.map(id => <PlayerAvatar key={id} playerId={id} size="sm" />)}
            </div>
          </div>
          <div className="bg-card/50 rounded-lg p-3 border border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Eltern-Team 2</p>
            <div className="flex items-center gap-2">
              {MIXED_ELTERN_TEAM_2.map(id => <PlayerAvatar key={id} playerId={id} size="sm" />)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={() => setScreen(6)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">Zurück</button>
        <button onClick={() => setScreen(8)} className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity">
          Paarungen festlegen
        </button>
      </div>
    </div>
  );
}
