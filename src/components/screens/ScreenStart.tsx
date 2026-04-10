import { useTournamentStore } from '@/lib/store';

export function ScreenStartPage() {
  const { state, setScreen, hasSavedState, resetState } = useTournamentStore();

  const handleNewTournament = () => {
    if (hasSavedState) {
      if (window.confirm('Möchtest du wirklich ein neues Turnier starten? Der aktuelle Fortschritt geht verloren.')) {
        resetState();
        setScreen(1);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 fade-in">
      <img src="/logo.png" alt="Bären Cup" className="w-48 h-48 object-contain" />
      <div className="text-center space-y-3">
        <h1 className="text-6xl font-bold text-gold tracking-tight">BÄREN CUP</h1>
        <p className="text-xl text-muted-foreground">Das ultimative Familien-Mario-Kart-Turnier</p>
      </div>
      <div className="flex flex-col gap-3 mt-4">
        <button
          onClick={() => setScreen(2)}
          className="px-8 py-4 bg-gold text-primary-foreground font-bold text-lg rounded-lg hover:opacity-90 transition-opacity"
        >
          Turnier starten
        </button>
        {hasSavedState && state.currentScreen > 1 && (
          <>
            <button
              onClick={() => setScreen(state.currentScreen)}
              className="px-8 py-3 border border-gold text-gold font-medium rounded-lg hover:bg-gold/10 transition-colors"
            >
              Turnier fortsetzen
            </button>
            <button
              onClick={handleNewTournament}
              className="px-8 py-2 text-muted-foreground text-sm hover:text-foreground transition-colors"
            >
              Neu starten
            </button>
          </>
        )}
      </div>
    </div>
  );
}
