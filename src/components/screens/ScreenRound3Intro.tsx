import { useTournamentStore } from '@/lib/store';
import { PlayerAvatar } from '@/components/PlayerAvatar';
import { JUNGS, PAPAS, GIRLS, MAMAS } from '@/lib/players';

export function ScreenRound3Intro() {
  const { setScreen } = useTournamentStore();

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 slide-up">
      <h2 className="text-2xl font-bold text-gold mb-4">Boys & Girls GP</h2>

      <ul className="space-y-2 mb-6">
        <li className="flex items-start gap-2 text-foreground/90">
          <span className="text-gold mt-0.5">&#9670;</span>
          <span>GP 1: Jungs vs. Papas</span>
        </li>
        <li className="flex items-start gap-2 text-foreground/90">
          <span className="text-gold mt-0.5">&#9670;</span>
          <span>GP 2: Girls vs. Mamas</span>
        </li>
      </ul>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-card/50 rounded-lg p-2.5 border border-border/50">
          <p className="text-xs text-gold font-semibold mb-2">GP 1: Jungs vs. Papas</p>
          <div className="flex items-center gap-2 mb-1.5">
            {JUNGS.map(id => <PlayerAvatar key={id} playerId={id} size="sm" />)}
          </div>
          <p className="text-xs text-muted-foreground my-1">vs.</p>
          <div className="flex items-center gap-2">
            {PAPAS.map(id => <PlayerAvatar key={id} playerId={id} size="sm" />)}
          </div>
        </div>
        <div className="bg-card/50 rounded-lg p-2.5 border border-border/50">
          <p className="text-xs text-gold font-semibold mb-2">GP 2: Girls vs. Mamas</p>
          <div className="flex items-center gap-2 mb-1.5">
            {GIRLS.map(id => <PlayerAvatar key={id} playerId={id} size="sm" />)}
          </div>
          <p className="text-xs text-muted-foreground my-1">vs.</p>
          <div className="flex items-center gap-2">
            {MAMAS.map(id => <PlayerAvatar key={id} playerId={id} size="sm" />)}
          </div>
        </div>
      </div>

      <div className="max-w-sm mx-auto bg-card border border-gold/40 rounded-xl p-5 text-center mb-8">
        <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-2">Zu gewinnen pro GP</p>
        <p className="text-3xl font-bold text-gold mb-1">3–7 Punkte</p>
        <p className="text-xs text-muted-foreground">pro Fahrer:  1. = 4   2. = 3   3. = 2   4. = 1</p>
        <p className="text-xs text-muted-foreground">beide Teampartner werden zusammengezählt</p>
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
