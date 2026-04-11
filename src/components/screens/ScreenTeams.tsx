import { useTournamentStore } from '@/lib/store';
import { KIDS, ELTERN } from '@/lib/players';
import { PlayerAvatar } from '@/components/PlayerAvatar';

const STAGES = [
  { num: '\u2460', name: 'Warm-Up GP', pts: 'max 2 Pkt', char: 'leicht' },
  { num: '\u2461', name: 'Mixed GP', pts: 'max 14 Pkt', char: 'mittel' },
  { num: '\u2462', name: 'Boys & Girls GP', pts: 'max 14 Pkt', char: 'mittel' },
  { num: '\u2463', name: 'Final GP', pts: 'max 18 Pkt', char: 'entscheidend' },
];

export function ScreenTeams() {
  const { setScreen } = useTournamentStore();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 slide-up">
      {/* Title */}
      <h1 className="text-5xl font-bold text-gold text-center tracking-wider mb-1">BÄREN CUP</h1>
      <p className="text-lg text-muted-foreground text-center mb-8">Kids gegen Eltern in 4 Runden</p>

      {/* Teams */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 bg-card rounded-xl p-5 border border-border text-center">
          <h3 className="text-sm font-bold text-gold uppercase tracking-wider mb-3">Team Kids</h3>
          <div className="grid grid-cols-2 gap-3">
            {KIDS.map(p => (
              <div key={p.id} className="flex flex-col items-center gap-1">
                <PlayerAvatar playerId={p.id} size="md" showName={false} />
                <span className="text-xs text-foreground">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        <span className="text-3xl font-bold text-gold italic shrink-0">vs</span>

        <div className="flex-1 bg-card rounded-xl p-5 border border-border text-center">
          <h3 className="text-sm font-bold text-gold uppercase tracking-wider mb-3">Team Eltern</h3>
          <div className="grid grid-cols-2 gap-3">
            {ELTERN.map(p => (
              <div key={p.id} className="flex flex-col items-center gap-1">
                <PlayerAvatar playerId={p.id} size="md" showName={false} />
                <span className="text-xs text-foreground">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <p className="text-lg text-gold font-bold text-center mb-4">Der Weg zum Bären Cup</p>

      <div className="flex items-start gap-0 mb-6">
        {STAGES.map((s, i) => (
          <div key={s.name} className="flex items-start flex-1">
            <div className="bg-card rounded-lg p-3 border border-border text-center w-full">
              <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center mb-2 mx-auto">
                <span className="text-xl font-bold text-black">{i + 1}</span>
              </div>
              <p className="text-sm font-bold text-gold mb-0.5">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.pts}</p>
              <p className="text-xs text-muted-foreground italic">{s.char}</p>
            </div>
            {i < STAGES.length - 1 && (
              <span className="text-gold text-xl font-bold mt-8 mx-1 shrink-0">&#9656;</span>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground">In jeder Runde gibt es Punkte. Alles wird zusammengezählt.</p>
        <p className="text-sm text-gold">Im Final kann sich noch alles drehen.</p>
      </div>

      <div className="flex justify-center">
        <button onClick={() => setScreen(3)} className="px-10 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity">
          Los geht's!
        </button>
      </div>
    </div>
  );
}
