import { TournamentState, RoundRanking } from './types';
import {
  KIDS, ELTERN,
  MIXED_KIDS_TEAM_1, MIXED_KIDS_TEAM_2,
  MIXED_ELTERN_TEAM_1, MIXED_ELTERN_TEAM_2,
  JUNGS, PAPAS, GIRLS, MAMAS,
} from './players';

const RANK_POINTS: Record<number, number> = { 1: 4, 2: 3, 3: 2, 4: 1 };
const FINAL_POINTS: Record<number, number> = { 1: 10, 2: 8, 3: 4, 4: 2 };

export function getRound1Score(state: TournamentState) {
  const kidsTotal = Object.values(state.round1.kidsGpPoints).reduce((a, b) => a + (b ?? 0), 0);
  const elternTotal = Object.values(state.round1.elternGpPoints).reduce((a, b) => a + (b ?? 0), 0);
  return { kidsTotal, elternTotal };
}

export function getRound1TeamPoints(state: TournamentState): { kids: number; eltern: number } {
  if (!state.round1.completed) return { kids: 0, eltern: 0 };
  const { kidsTotal, elternTotal } = getRound1Score(state);
  if (kidsTotal > elternTotal) return { kids: 2, eltern: 0 };
  if (elternTotal > kidsTotal) return { kids: 0, eltern: 2 };
  return { kids: 1, eltern: 1 };
}

function getTeamPointsFromRanking(
  ranking: RoundRanking,
  kidsPlayers: string[],
  elternPlayers: string[],
  pointsMap: Record<number, number> = RANK_POINTS
): { kids: number; eltern: number } {
  let kids = 0, eltern = 0;
  for (const [playerId, rank] of Object.entries(ranking)) {
    const pts = pointsMap[rank] ?? 0;
    if (kidsPlayers.includes(playerId)) kids += pts;
    else if (elternPlayers.includes(playerId)) eltern += pts;
  }
  return { kids, eltern };
}

function getKidsTeam(num: 1 | 2) {
  return num === 1 ? MIXED_KIDS_TEAM_1 : MIXED_KIDS_TEAM_2;
}

function getElternTeam(num: 1 | 2) {
  return num === 1 ? MIXED_ELTERN_TEAM_1 : MIXED_ELTERN_TEAM_2;
}

export function getRound2GP1Players(state: TournamentState) {
  if (!state.round2.pairing) return { kids: [] as string[], eltern: [] as string[] };
  const { gp1 } = state.round2.pairing;
  return { kids: getKidsTeam(gp1.kidsTeam), eltern: getElternTeam(gp1.elternTeam) };
}

export function getRound2GP2Players(state: TournamentState) {
  if (!state.round2.pairing) return { kids: [] as string[], eltern: [] as string[] };
  const { gp2 } = state.round2.pairing;
  return { kids: getKidsTeam(gp2.kidsTeam), eltern: getElternTeam(gp2.elternTeam) };
}

export function getRound2Points(state: TournamentState): { kids: number; eltern: number } {
  if (!state.round2.completed) return { kids: 0, eltern: 0 };
  const gp1Players = getRound2GP1Players(state);
  const gp2Players = getRound2GP2Players(state);
  const gp1 = getTeamPointsFromRanking(state.round2.gp1Ranking, gp1Players.kids, gp1Players.eltern);
  const gp2 = getTeamPointsFromRanking(state.round2.gp2Ranking, gp2Players.kids, gp2Players.eltern);
  return { kids: gp1.kids + gp2.kids, eltern: gp1.eltern + gp2.eltern };
}

export function getRound2GPScore(ranking: RoundRanking, kidsPlayers: string[], elternPlayers: string[]) {
  return getTeamPointsFromRanking(ranking, kidsPlayers, elternPlayers);
}

export function getRound3Points(state: TournamentState): { kids: number; eltern: number } {
  if (!state.round3.completed) return { kids: 0, eltern: 0 };
  const gp1 = getTeamPointsFromRanking(state.round3.gp1Ranking, JUNGS, PAPAS);
  const gp2 = getTeamPointsFromRanking(state.round3.gp2Ranking, GIRLS, MAMAS);
  return { kids: gp1.kids + gp2.kids, eltern: gp1.eltern + gp2.eltern };
}

export function getRound3GPScore(ranking: RoundRanking, kidsPlayers: string[], elternPlayers: string[]) {
  return getTeamPointsFromRanking(ranking, kidsPlayers, elternPlayers);
}

export function getFinalPoints(state: TournamentState): { kids: number; eltern: number } {
  if (!state.final.completed) return { kids: 0, eltern: 0 };
  const ranking = state.final.slotRanking;
  let kids = 0, eltern = 0;
  for (const [slot, rank] of Object.entries(ranking)) {
    const pts = FINAL_POINTS[rank] ?? 0;
    if (slot.startsWith('kids')) kids += pts;
    else eltern += pts;
  }
  return { kids, eltern };
}

export function getTotalScore(state: TournamentState): { kids: number; eltern: number } {
  const r1 = getRound1TeamPoints(state);
  const r2 = getRound2Points(state);
  const r3 = getRound3Points(state);
  const fin = getFinalPoints(state);
  return {
    kids: r1.kids + r2.kids + r3.kids + fin.kids,
    eltern: r1.eltern + r2.eltern + r3.eltern + fin.eltern,
  };
}

export function getCumulativeScores(state: TournamentState) {
  const r1 = getRound1TeamPoints(state);
  const r2 = getRound2Points(state);
  const r3 = getRound3Points(state);
  const fin = getFinalPoints(state);
  return [
    { round: 'Warm-Up', kids: r1.kids, eltern: r1.eltern },
    { round: 'Mixed', kids: r1.kids + r2.kids, eltern: r1.eltern + r2.eltern },
    { round: 'Battle', kids: r1.kids + r2.kids + r3.kids, eltern: r1.eltern + r2.eltern + r3.eltern },
    { round: 'Final', kids: r1.kids + r2.kids + r3.kids + fin.kids, eltern: r1.eltern + r2.eltern + r3.eltern + fin.eltern },
  ];
}
