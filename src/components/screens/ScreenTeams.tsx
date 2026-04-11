import { useTournamentStore } from '@/lib/store';
import { KIDS, ELTERN } from '@/lib/players';
import { PlayerAvatar } from '@/components/PlayerAvatar';

export function ScreenTeams() {
  const { setScreen } = useTournamentStore();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 slide-up">
      <h2 className="text-3xl font-bold text-center text-gold mb-10">Teams & Modus</h2>

      <div className="grid grid-cols-2 gap-8 mb-10">
        {/* Team Kids */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-xl font-bold text-gold mb-4 text-center">Team Kids</h3>
          <div className="space-y-3">
            {KIDS.map(p => (
              <PlayerAvatar key={p.id} playerId={p.id} size="lg" />
            ))}
          </div>
        </div>

        {/* Team Eltern */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-xl font-bold text-gold mb-4 text-center">Team Eltern</h3>
          <div className="space-y-3">
            {ELTERN.map(p => (
              <PlayerAvatar key={p.id} playerId={p.id} size="lg" />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 border border-border mb-8">
        <h3 className="text-lg font-bold text-gold mb-2">Spielmodus</h3>
        <p className="text-muted-foreground leading-relaxed">
          Das Turnier besteht aus <span className="text-foreground font-medium">4 Runden</span>: 
          Warm-Up GP, Mixed GP, Battle GP und dem grossen Final GP. 
          Die Punkte werden über alle Runden aufsummiert. Das Final hat das höchste Gewicht.
        </p>
      </div>

      <div className="flex justify-between">
        <button onClick={() => setScreen(1)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">
          Zurück
        </button>
        <button onClick={() => setScreen(3)} className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity">
          Los geht's!
        </button>
      </div>
    </div>
  );
}
