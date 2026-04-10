import { useTournamentStore } from '@/lib/store';
import { PlayerAvatar } from '@/components/PlayerAvatar';
import { JUNGS, PAPAS, GIRLS, MAMAS } from '@/lib/players';

export function ScreenRound3Intro() {
  const { setScreen } = useTournamentStore();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 slide-up">
      <h2 className="text-3xl font-bold text-gold mb-6">Runde 3 — Gender Duelle</h2>

      <p className="text-foreground/90 leading-relaxed mb-8">
        Jetzt treten Jungs gegen Papas und Girls gegen Mamas an. Auch hier gilt: Rangpunkte 4/3/2/1 pro Fahrer, Team-Summen fliessen direkt in die Gesamtwertung.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="bg-card/50 rounded-lg p-3 border border-border/50">
          <p className="text-xs text-gold font-semibold mb-3">GP 1: Jungs vs. Papas</p>
          <div className="flex items-center gap-2 mb-2">
            {JUNGS.map(id => <PlayerAvatar key={id} playerId={id} size="sm" />)}
          </div>
          <p className="text-xs text-muted-foreground my-1">vs.</p>
          <div className="flex items-center gap-2">
            {PAPAS.map(id => <PlayerAvatar key={id} playerId={id} size="sm" />)}
          </div>
        </div>
        <div className="bg-card/50 rounded-lg p-3 border border-border/50">
          <p className="text-xs text-gold font-semibold mb-3">GP 2: Girls vs. Mamas</p>
          <div className="flex items-center gap-2 mb-2">
            {GIRLS.map(id => <PlayerAvatar key={id} playerId={id} size="sm" />)}
          </div>
          <p className="text-xs text-muted-foreground my-1">vs.</p>
          <div className="flex items-center gap-2">
            {MAMAS.map(id => <PlayerAvatar key={id} playerId={id} size="sm" />)}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={() => setScreen(11)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">Zurück</button>
        <button onClick={() => setScreen(13)} className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity">
          GP 1 starten
        </button>
      </div>
    </div>
  );
}
