import { useTournamentStore } from '@/lib/store';

export function ScreenFinalIntro() {
  const { setScreen } = useTournamentStore();

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 slide-up">
      <h2 className="text-2xl font-bold text-gold mb-4">Final GP</h2>

      <ul className="space-y-2 mb-8">
        <li className="flex items-start gap-2 text-foreground/90">
          <span className="text-gold mt-0.5">&#9670;</span>
          <span>Das grosse Finale: ein GP über 4 Rennen</span>
        </li>
        <li className="flex items-start gap-2 text-foreground/90">
          <span className="text-gold mt-0.5">&#9670;</span>
          <span>Jedes Team steuert 2 Figuren im Spiel</span>
        </li>
        <li className="flex items-start gap-2 text-foreground/90">
          <span className="text-gold mt-0.5">&#9670;</span>
          <span>Pro Rennen darf der Controller innerhalb des Teams gewechselt werden</span>
        </li>
        <li className="flex items-start gap-2 text-foreground/90">
          <span className="text-gold mt-0.5">&#9670;</span>
          <span>Jeder und jede muss genau 2 Rennen fahren</span>
        </li>
        <li className="flex items-start gap-2 text-foreground/90">
          <span className="text-gold mt-0.5">&#9670;</span>
          <span>Am Ende zählt die Endrangliste der 4 Figuren</span>
        </li>
      </ul>

      <div className="max-w-sm mx-auto bg-card border border-gold/40 rounded-xl p-5 text-center mb-8">
        <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-2">Zu gewinnen</p>
        <p className="text-3xl font-bold text-gold mb-3">6–18 Punkte</p>
        <div className="flex justify-center gap-2 mb-2">
          {[{ rank: '1.', pts: '10' }, { rank: '2.', pts: '8' }, { rank: '3.', pts: '4' }, { rank: '4.', pts: '2' }].map(c => (
            <div key={c.rank} className="w-16 bg-card border border-border rounded-lg py-2">
              <p className="text-xs text-muted-foreground">{c.rank}</p>
              <p className="text-2xl font-bold text-gold">{c.pts}</p>
              <p className="text-xs text-muted-foreground">Pkt</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground italic">beide Figuren pro Team werden zusammengezählt</p>
      </div>

      <div className="flex justify-between">
        <button onClick={() => setScreen(16)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">Zurück</button>
        <button onClick={() => setScreen(18)} className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity">
          Weiter zum Renn-Tracker
        </button>
      </div>
    </div>
  );
}
