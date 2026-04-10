import { PlayerAvatar } from '@/components/PlayerAvatar';
import { getPlayer } from '@/lib/players';
import { RoundRanking } from '@/lib/types';

interface RankingInputProps {
  playerIds: string[];
  ranking: RoundRanking;
  onChange: (ranking: RoundRanking) => void;
  pointsMap?: Record<number, number>;
}

const DEFAULT_POINTS: Record<number, number> = { 1: 4, 2: 3, 3: 2, 4: 1 };

export function RankingInput({ playerIds, ranking, onChange, pointsMap = DEFAULT_POINTS }: RankingInputProps) {
  const usedRanks = new Set(Object.values(ranking));

  const setRank = (playerId: string, rank: number) => {
    // Remove this rank from any other player
    const newRanking = { ...ranking };
    for (const [pid, r] of Object.entries(newRanking)) {
      if (r === rank && pid !== playerId) {
        delete newRanking[pid];
      }
    }
    newRanking[playerId] = rank;
    onChange(newRanking);
  };

  const maxRank = playerIds.length;

  return (
    <div className="space-y-3">
      {playerIds.map(pid => {
        const currentRank = ranking[pid];
        return (
          <div key={pid} className="flex items-center gap-4 bg-card rounded-lg p-4 border border-border">
            <PlayerAvatar playerId={pid} size="md" />
            <div className="ml-auto flex items-center gap-3">
              <div className="flex gap-1">
                {Array.from({ length: maxRank }, (_, i) => i + 1).map(rank => (
                  <button
                    key={rank}
                    onClick={() => setRank(pid, rank)}
                    className={`w-10 h-10 rounded-lg font-bold text-lg transition-colors ${
                      currentRank === rank
                        ? 'bg-gold text-primary-foreground'
                        : usedRanks.has(rank) && currentRank !== rank
                        ? 'bg-muted/30 text-muted-foreground/30 cursor-not-allowed'
                        : 'bg-secondary text-foreground hover:bg-gold/20'
                    }`}
                    disabled={usedRanks.has(rank) && currentRank !== rank}
                  >
                    {rank}
                  </button>
                ))}
              </div>
              {currentRank && (
                <span className="text-gold font-bold text-lg w-12 text-right">
                  {pointsMap[currentRank] ?? 0}P
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
