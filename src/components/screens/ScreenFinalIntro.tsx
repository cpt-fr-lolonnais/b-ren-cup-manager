import { useTournamentStore } from '@/lib/store';

export function ScreenFinalIntro() {
  const { setScreen } = useTournamentStore();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 slide-up">
      <h2 className="text-3xl font-bold text-gold mb-6">Final GP</h2>

      <p className="text-foreground/90 leading-relaxed mb-6">
        Der Final-GP geht über 4 Rennen mit 4 Figuren. Jedes Team belegt 2 Figuren im Spiel. Pro Rennen können die Spieler innerhalb des Teams rotieren — wichtig: jeder der 8 Spieler muss mindestens 2 der 4 Rennen fahren. Am Ende zählt die Endrangliste der 4 Figuren: Platz 1 = 10, Platz 2 = 8, Platz 3 = 4, Platz 4 = 2 Punkte für das jeweilige Team.
      </p>

      <div className="flex justify-between">
        <button onClick={() => setScreen(15)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">Zurück</button>
        <button onClick={() => setScreen(17)} className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity">
          Weiter zum Renn-Tracker
        </button>
      </div>
    </div>
  );
}
