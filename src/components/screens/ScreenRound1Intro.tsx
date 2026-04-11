import { useTournamentStore } from '@/lib/store';

export function ScreenRound1Intro() {
  const { setScreen } = useTournamentStore();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 slide-up">
      <h2 className="text-3xl font-bold text-gold mb-2">Warm-Up GP</h2>
      <div className="checkered-border pb-4 mb-8" />
      <p className="text-lg text-muted-foreground leading-relaxed mb-8">
        Zuerst fahren die Kids einen GP, dann die Eltern. 
        Tragt am Ende die Mario-Kart-GP-Punkte jedes Fahrers ein. 
        Das Team mit der höheren Summe gewinnt <span className="text-gold font-bold">2 Punkte</span>.
      </p>
      <div className="flex justify-between">
        <button onClick={() => setScreen(2)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">
          Zurück
        </button>
        <button onClick={() => setScreen(4)} className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity">
          Kids-GP starten
        </button>
      </div>
    </div>
  );
}
