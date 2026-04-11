export interface Player {
  id: string;
  name: string;
  initials: string;
  role: 'mom' | 'dad' | 'girl' | 'boy';
  family: 'A' | 'B';
  team: 'kids' | 'eltern';
  colorHex: string;
}

export const PLAYERS: Player[] = [
  { id: 'nicole', name: 'Nicole', initials: 'NL', role: 'mom', family: 'A', team: 'eltern', colorHex: '#5C3A5F' },
  { id: 'maethu', name: 'Mäthu', initials: 'MR', role: 'dad', family: 'A', team: 'eltern', colorHex: '#1F5F6B' },
  { id: 'elina', name: 'Elina', initials: 'er', role: 'girl', family: 'A', team: 'kids', colorHex: '#9B7AA1' },
  { id: 'mio', name: 'Mio', initials: 'mr', role: 'boy', family: 'A', team: 'kids', colorHex: '#5A8FA0' },
  { id: 'carmen', name: 'Carmen', initials: 'CB', role: 'mom', family: 'B', team: 'eltern', colorHex: '#5C3A5F' },
  { id: 'micha', name: 'Michael', initials: 'MB', role: 'dad', family: 'B', team: 'eltern', colorHex: '#1F5F6B' },
  { id: 'milena', name: 'Milena', initials: 'mb', role: 'girl', family: 'B', team: 'kids', colorHex: '#9B7AA1' },
  { id: 'valerio', name: 'Valerio', initials: 'vb', role: 'boy', family: 'B', team: 'kids', colorHex: '#5A8FA0' },
];

export const KIDS = PLAYERS.filter(p => p.team === 'kids');
export const ELTERN = PLAYERS.filter(p => p.team === 'eltern');

export const getPlayer = (id: string) => PLAYERS.find(p => p.id === id)!;

// Mixed teams
export const MIXED_KIDS_TEAM_1 = ['mio', 'milena']; // Mio + Milena
export const MIXED_KIDS_TEAM_2 = ['valerio', 'elina']; // Valerio + Elina
export const MIXED_ELTERN_TEAM_1 = ['maethu', 'carmen']; // Mäthu + Carmen
export const MIXED_ELTERN_TEAM_2 = ['nicole', 'micha']; // Nicole + Michael

// Gender teams
export const JUNGS = ['mio', 'valerio'];
export const PAPAS = ['maethu', 'micha'];
export const GIRLS = ['elina', 'milena'];
export const MAMAS = ['nicole', 'carmen'];
