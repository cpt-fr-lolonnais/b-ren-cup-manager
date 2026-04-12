import { useEffect, useRef, useState } from 'react';
import { useTournamentStore } from '@/lib/store';
import { TopBar } from '@/components/TopBar';
import { ResetButton } from '@/components/ResetButton';
import { IntroSplash } from '@/components/IntroSplash';
import { IntroVideo } from '@/components/IntroVideo';
import { ScreenStartPage } from '@/components/screens/ScreenStart';
import { ScreenTeamNames } from '@/components/screens/ScreenTeamNames';
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
  2: ScreenTeamNames,
  3: ScreenTeams,
  4: ScreenRound1Intro,
  5: ScreenRound1Kids,
  6: ScreenRound1Eltern,
  7: ScreenRound1Result,
  8: ScreenRound2Intro,
  9: ScreenRound2Pairing,
  10: ScreenRound2GP1,
  11: ScreenRound2GP2,
  12: ScreenRound2Result,
  13: ScreenRound3Intro,
  14: ScreenRound3GP1,
  15: ScreenRound3GP2,
  16: ScreenRound3Result,
  17: ScreenFinalIntro,
  18: ScreenFinalTracker,
  19: ScreenFinalResult,
  20: ScreenWinner,
  21: ScreenSummary,
};

const HIDE_TOPBAR = [1, 2, 20];

type IntroPhase = 'splash' | 'video' | 'done' | null;

export default function Index() {
  const { state, loading, loaded, hasSavedState, loadState } = useTournamentStore();
  const [introPhase, setIntroPhase] = useState<IntroPhase>(null);
  const prevHasSavedState = useRef<boolean | null>(null);

  useEffect(() => {
    loadState();
  }, [loadState]);

  // Initialize intro phase once store has loaded
  useEffect(() => {
    if (!loading && loaded) {
      if (introPhase === null) {
        setIntroPhase(hasSavedState ? 'done' : 'splash');
      }
    }
  }, [loading, loaded, hasSavedState, introPhase]);

  // Replay intro when reset happens (hasSavedState flips true → false)
  useEffect(() => {
    if (loaded && prevHasSavedState.current === true && hasSavedState === false) {
      setIntroPhase('splash');
    }
    prevHasSavedState.current = hasSavedState;
  }, [hasSavedState, loaded]);

  // Show nothing while loading or phase undetermined
  if (loading || introPhase === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
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
      {showTopBar && introPhase === 'done' && <TopBar />}
      <ScreenComponent />
      {showTopBar && introPhase === 'done' && <ResetButton />}

      {introPhase === 'splash' && <IntroSplash onPlay={() => setIntroPhase('video')} />}
      {introPhase === 'video' && <IntroVideo onComplete={() => setIntroPhase('done')} />}
    </div>
  );
}
