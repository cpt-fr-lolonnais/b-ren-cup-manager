import { useTournamentStore } from '@/lib/store';
import { PlayerAvatar } from '@/components/PlayerAvatar';
import { JUNGS, PAPAS, GIRLS, MAMAS } from '@/lib/players';

export function ScreenRound3Intro() {
  const { setScreen } = useTournamentStore();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 slide-up">
      <h2 className="text-3xl font-bold text-gold mb-2">Runde 3 — Gender Duelle</h2>
      <div className="checkered-border pb-4 mb-8" />

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-gold mb-3">GP 1: Jungs vs. Papas</p>
          <div className="space-y-2 mb-3">
            {JUNGS.map(id => <PlayerAvatar key={id} playerId={id} />)}
          </div>
          <p className="text-sm text-muted-foreground">vs.</p>
          <div className="space-y-2 mt-2">
            {PAPAS.map(id => <PlayerAvatar key={id} playerId={id} />)}
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-gold mb-3">GP 2: Girls vs. Mamas</p>
          <div className="space-y-2 mb-3">
            {GIRLS.map(id => <PlayerAvatar key={id} playerId={id} />)}
          </div>
          <p className="text-sm text-muted-foreground">vs.</p>
          <div className="space-y-2 mt-2">
            {MAMAS.map(id => <PlayerAvatar key={id} playerId={id} />)}
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
