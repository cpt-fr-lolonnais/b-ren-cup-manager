import { useTournamentStore } from '@/lib/store';
import { RankingInput } from '@/components/RankingInput';

const FINAL_POINTS: Record<number, number> = { 1: 10, 2: 8, 3: 4, 4: 2 };
const SLOTS = ['kids1', 'kids2', 'eltern1', 'eltern2'];
const SLOT_LABELS: Record<string, string> = {
  kids1: 'Kids Slot 1',
  kids2: 'Kids Slot 2',
  eltern1: 'Eltern Slot 1',
  eltern2: 'Eltern Slot 2',
};

// Custom slot avatar component
function SlotAvatar({ slotId }: { slotId: string }) {
  const isKids = slotId.startsWith('kids');
  return (
    <div className="flex items-center gap-2">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${
        isKids ? 'bg-blue-300' : 'bg-pink-500'
      } text-foreground`}>
        {slotId.startsWith('kids') ? 'K' : 'E'}{slotId.slice(-1)}
      </div>
      <span className="text-foreground font-medium">{SLOT_LABELS[slotId]}</span>
    </div>
  );
}

export function ScreenFinalResult() {
  const { state, setState, setScreen } = useTournamentStore();
  const ranking = state.final.slotRanking;
  const allRanked = Object.keys(ranking).length === 4;

  // Calculate team totals
  let kidsTotal = 0, elternTotal = 0;
  if (allRanked) {
    for (const [slot, rank] of Object.entries(ranking)) {
      const pts = FINAL_POINTS[rank] ?? 0;
      if (slot.startsWith('kids')) kidsTotal += pts;
      else elternTotal += pts;
    }
  }

  const finish = () => {
    setState(prev => ({
      final: { ...prev.final, completed: true },
      currentScreen: 19,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 slide-up">
      <h2 className="text-2xl font-bold text-gold mb-1">Final GP — Resultat</h2>
      <p className="text-muted-foreground mb-8">Endplatzierung der 4 Slots eintragen</p>

      {/* Custom ranking for slots since they aren't players */}
      <div className="space-y-3 mb-8">
        {SLOTS.map(slotId => {
          const currentRank = ranking[slotId];

          return (
            <div key={slotId} className="flex items-center gap-4 bg-card rounded-lg p-4 border border-border">
              <SlotAvatar slotId={slotId} />
              <div className="ml-auto flex items-center gap-3">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map(rank => (
                    <button
                      key={rank}
                      onClick={() => {
                        const newRanking = { ...ranking };
                        if (newRanking[slotId] === rank) {
                          delete newRanking[slotId];
                        } else {
                          const previousRankOfClickedSlot = newRanking[slotId];
                          const otherSlot = Object.entries(newRanking).find(([s, r]) => r === rank && s !== slotId)?.[0];
                          if (otherSlot) {
                            if (previousRankOfClickedSlot !== undefined) {
                              newRanking[otherSlot] = previousRankOfClickedSlot;
                            } else {
                              delete newRanking[otherSlot];
                            }
                          }
                          newRanking[slotId] = rank;
                        }
                        setState(prev => ({ final: { ...prev.final, slotRanking: newRanking } }));
                      }}
                      className={`w-10 h-10 rounded-lg font-bold text-lg transition-colors ${
                        currentRank === rank
                          ? 'bg-gold text-primary-foreground'
                          : 'bg-secondary text-foreground hover:bg-gold/20'
                      }`}
                    >
                      {rank}
                    </button>
                  ))}
                </div>
                {currentRank && (
                  <span className="text-gold font-bold text-lg w-14 text-right">
                    {FINAL_POINTS[currentRank]}P
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {allRanked && (
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Team Kids</p>
            <p className="text-3xl font-bold text-gold">{kidsTotal}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Team Eltern</p>
            <p className="text-3xl font-bold text-gold">{elternTotal}</p>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button onClick={() => setScreen(17)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">Zurück</button>
        <button onClick={finish} disabled={!allRanked}
          className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed">
          Turnier beenden
        </button>
      </div>
    </div>
  );
}
