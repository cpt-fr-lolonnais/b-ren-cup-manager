import { useTournamentStore } from '@/lib/store';

export function ScreenRound1Intro() {
  const { setScreen } = useTournamentStore();

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 slide-up">
      <h2 className="text-2xl font-bold text-gold mb-4">Warm-Up GP</h2>

      <ul className="space-y-2 mb-8">
        <li className="flex items-start gap-2 text-foreground/90">
          <span className="text-gold mt-0.5">&#9670;</span>
          <span>Erst fahren die Kids einen GP untereinander, dann die Eltern</span>
        </li>
        <li className="flex items-start gap-2 text-foreground/90">
          <span className="text-gold mt-0.5">&#9670;</span>
          <span>Die GP-Punkte werden pro Team zusammengezählt</span>
        </li>
        <li className="flex items-start gap-2 text-foreground/90">
          <span className="text-gold mt-0.5">&#9670;</span>
          <span>Wer als Team mehr Punkte holt, gewinnt diese Runde</span>
        </li>
      </ul>

      <div className="max-w-sm mx-auto bg-card border border-gold/40 rounded-xl p-5 text-center mb-8">
        <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-2">Zu gewinnen</p>
        <p className="text-3xl font-bold text-gold mb-1">2 Punkte</p>
        <p className="text-xs text-muted-foreground">(1 / 1 bei Unentschieden)</p>
      </div>

      <div className="flex justify-between">
        <button onClick={() => setScreen(2)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">
          Zurück
        </button>
        <button onClick={() => setScreen(4)} className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity">
          Warm-Up GP starten
        </button>
      </div>
    </div>
  );
}
