import { useEffect } from 'react';
import { useTournamentStore } from '@/lib/store';
import { TopBar } from '@/components/TopBar';
import { ResetButton } from '@/components/ResetButton';
import { ScreenStartPage } from '@/components/screens/ScreenStart';
import { ScreenTeams } from '@/components/screens/ScreenTeams';
import { ScreenRound1Intro } from '@/components/screens/ScreenRound1Intro';
import { ScreenRound1Kids, ScreenRound1Eltern } from '@/components/screens/ScreenRound1GP';
import { ScreenRound1Result } from '@/components/screens/ScreenRound1Result';
import { ScreenRound2Intro } from '@/components/screens/ScreenRound2Intro';
import { ScreenRound2Pairing } from '@/components/screens/ScreenRound2Pairing';
import { ScreenRound2GP1, ScreenRound2GP2 } from '@/components/screens/ScreenRound2GP';
import { ScreenRound2Result } from '@/components/screens/ScreenRound2Result';
import { ScreenRound3Intro } from '@/components/screens/ScreenRound3Intro';
import { ScreenRound3GP1, ScreenRound3GP2 } from '@/components/screens/ScreenRound3GP';
import { ScreenRound3Result } from '@/components/screens/ScreenRound3Result';
import { ScreenFinalIntro } from '@/components/screens/ScreenFinalIntro';
import { ScreenFinalTracker } from '@/components/screens/ScreenFinalTracker';
import { ScreenFinalResult } from '@/components/screens/ScreenFinalResult';
import { ScreenWinner } from '@/components/screens/ScreenWinner';
import { ScreenSummary } from '@/components/screens/ScreenSummary';

const SCREENS: Record<number, React.ComponentType> = {
  1: ScreenStartPage,
  2: ScreenTeams,
  3: ScreenRound1Intro,
  4: ScreenRound1Kids,
  5: ScreenRound1Eltern,
  6: ScreenRound1Result,
  7: ScreenRound2Intro,
  8: ScreenRound2Pairing,
  9: ScreenRound2GP1,
  10: ScreenRound2GP2,
  11: ScreenRound2Result,
  12: ScreenRound3Intro,
  13: ScreenRound3GP1,
  14: ScreenRound3GP2,
  15: ScreenRound3Result,
  16: ScreenFinalIntro,
  17: ScreenFinalTracker,
  18: ScreenFinalResult,
  19: ScreenWinner,
  20: ScreenSummary,
};

const HIDE_TOPBAR = [1, 19];

export default function Index() {
  const { state, loading, loadState } = useTournamentStore();

  useEffect(() => {
    loadState();
  }, [loadState]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <img src="/logo.png" alt="Bären Cup" className="w-24 h-24 object-contain mx-auto animate-pulse" />
          <p className="text-muted-foreground">Lade Turnier...</p>
        </div>
      </div>
    );
  }

  const ScreenComponent = SCREENS[state.currentScreen] ?? ScreenStartPage;
  const showTopBar = !HIDE_TOPBAR.includes(state.currentScreen);

  return (
    <div className="min-h-screen">
      {showTopBar && <TopBar />}
      <ScreenComponent />
    </div>
  );
}
