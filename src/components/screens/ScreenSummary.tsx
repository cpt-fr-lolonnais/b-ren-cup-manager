import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTournamentStore } from '@/lib/store';
import { getCumulativeScores, getTotalScore, getRound1Score, getRound1TeamPoints, getRound2Points, getRound3Points, getFinalPoints } from '@/lib/scoring';

export function ScreenSummary() {
  const { state, setScreen } = useTournamentStore();
  const summaryRef = useRef<HTMLDivElement>(null);
  const data = getCumulativeScores(state);
  const total = getTotalScore(state);
  const r1 = getRound1TeamPoints(state);
  const r1Score = getRound1Score(state);
  const r2 = getRound2Points(state);
  const r3 = getRound3Points(state);
  const fin = getFinalPoints(state);

  const exportPng = async () => {
    if (!summaryRef.current) return;
    const canvas = await html2canvas(summaryRef.current, {
      backgroundColor: '#000000',
      scale: 2,
    });
    const link = document.createElement('a');
    link.download = 'baeren-cup-auswertung.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 slide-up">
      <div ref={summaryRef} className="bg-background p-8 rounded-xl">
        <div className="flex items-center gap-4 mb-8">
          <img src="/logo.png" alt="Bären Cup" className="w-12 h-12 object-contain" />
          <h2 className="text-3xl font-bold text-gold">Turnier-Auswertung</h2>
        </div>

        {/* Chart */}
        <div className="bg-card rounded-xl p-6 border border-border mb-8">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
              <XAxis dataKey="round" stroke="hsl(0 0% 65%)" />
              <YAxis stroke="hsl(0 0% 65%)" />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(0 0% 6%)', border: '1px solid hsl(0 0% 20%)', borderRadius: '8px' }}
                labelStyle={{ color: 'white' }}
              />
              <Legend />
              <Line type="monotone" dataKey="kids" stroke="#F5C518" strokeWidth={3} name="Team Kids" dot={{ r: 5 }} />
              <Line type="monotone" dataKey="eltern" stroke="#C0C0C0" strokeWidth={3} name="Team Eltern" dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Final score */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Team Kids</p>
            <p className="text-4xl font-bold text-gold">{total.kids}</p>
          </div>
          <span className="text-3xl text-muted-foreground self-center">:</span>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Team Eltern</p>
            <p className="text-4xl font-bold text-gold">{total.eltern}</p>
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gold">Runden-Details</h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              { name: 'Einwärmen', kids: r1.kids, eltern: r1.eltern, detail: `Kids GP: ${r1Score.kidsTotal}, Eltern GP: ${r1Score.elternTotal}` },
              { name: 'Mixed', kids: r2.kids, eltern: r2.eltern },
              { name: 'Gender', kids: r3.kids, eltern: r3.eltern },
              { name: 'Final', kids: fin.kids, eltern: fin.eltern },
            ].map(round => (
              <div key={round.name} className="bg-card rounded-lg p-4 border border-border text-center">
                <p className="text-sm text-muted-foreground mb-2">{round.name}</p>
                <p className="text-gold font-bold">{round.kids} : {round.eltern}</p>
                {round.detail && <p className="text-xs text-muted-foreground mt-1">{round.detail}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={() => setScreen(18)} className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">
          Zurück zum Sieger-Screen
        </button>
        <button onClick={exportPng} className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity">
          Als Bild speichern
        </button>
      </div>
    </div>
  );
}
