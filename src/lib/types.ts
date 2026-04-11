export interface RoundRanking {
  [playerId: string]: number; // rank 1-4
}

export interface TournamentState {
  currentScreen: number;
  teamNames: {
    kids: string;
    eltern: string;
  };
  round1: {
    kidsGpPoints: { [playerId: string]: number | null };
    elternGpPoints: { [playerId: string]: number | null };
    completed: boolean;
    winnerTeam: 'kids' | 'eltern' | 'tie' | null;
  };
  round2: {
    pairing: {
      gp1: { kidsTeam: 1 | 2; elternTeam: 1 | 2 };
      gp2: { kidsTeam: 1 | 2; elternTeam: 1 | 2 };
    } | null;
    gp1Ranking: RoundRanking;
    gp2Ranking: RoundRanking;
    completed: boolean;
  };
  round3: {
    gp1Ranking: RoundRanking; // jungs vs papas
    gp2Ranking: RoundRanking; // girls vs mamas
    completed: boolean;
  };
  final: {
    slotRanking: RoundRanking; // keys: 'kids1', 'kids2', 'eltern1', 'eltern2'
    raceTracking: { [playerId: string]: boolean[] }; // 4 booleans per player
    completed: boolean;
  };
}

export const INITIAL_STATE: TournamentState = {
  currentScreen: 1,
  teamNames: {
    kids: 'Team Kids',
    eltern: 'Team Eltern',
  },
  round1: {
    kidsGpPoints: { elina: null, mio: null, milena: null, valerio: null },
    elternGpPoints: { nicole: null, maethu: null, carmen: null, micha: null },
    completed: false,
    winnerTeam: null,
  },
  round2: {
    pairing: null,
    gp1Ranking: {},
    gp2Ranking: {},
    completed: false,
  },
  round3: {
    gp1Ranking: {},
    gp2Ranking: {},
    completed: false,
  },
  final: {
    slotRanking: {},
    raceTracking: {},
    completed: false,
  },
};
