export interface Player {
  id: string;
  name: string;
  initials: string;
  role: 'mom' | 'dad' | 'girl' | 'boy';
  family: 'A' | 'B';
  team: 'kids' | 'eltern';
  color: string; // tailwind bg class
}

export const PLAYERS: Player[] = [
  { id: 'nicole', name: 'Nicole', initials: 'NL', role: 'mom', family: 'A', team: 'eltern', color: 'bg-pink-500' },
  { id: 'maethu', name: 'Mäthu', initials: 'MR', role: 'dad', family: 'A', team: 'eltern', color: 'bg-blue-500' },
  { id: 'elina', name: 'Elina', initials: 'er', role: 'girl', family: 'A', team: 'kids', color: 'bg-pink-300' },
  { id: 'mio', name: 'Mio', initials: 'mr', role: 'boy', family: 'A', team: 'kids', color: 'bg-blue-300' },
  { id: 'carmen', name: 'Carmen', initials: 'CB', role: 'mom', family: 'B', team: 'eltern', color: 'bg-pink-500' },
  { id: 'micha', name: 'Micha', initials: 'MB', role: 'dad', family: 'B', team: 'eltern', color: 'bg-blue-500' },
  { id: 'milena', name: 'Milena', initials: 'mb', role: 'girl', family: 'B', team: 'kids', color: 'bg-pink-300' },
  { id: 'valerio', name: 'Valerio', initials: 'vb', role: 'boy', family: 'B', team: 'kids', color: 'bg-blue-300' },
];

export const KIDS = PLAYERS.filter(p => p.team === 'kids');
export const ELTERN = PLAYERS.filter(p => p.team === 'eltern');

export const getPlayer = (id: string) => PLAYERS.find(p => p.id === id)!;

// Mixed teams
export const MIXED_KIDS_TEAM_1 = ['mio', 'milena']; // Mio + Milena
export const MIXED_KIDS_TEAM_2 = ['valerio', 'elina']; // Valerio + Elina
export const MIXED_ELTERN_TEAM_1 = ['maethu', 'carmen']; // Mäthu + Carmen
export const MIXED_ELTERN_TEAM_2 = ['nicole', 'micha']; // Nicole + Micha

// Gender teams
export const JUNGS = ['mio', 'valerio'];
export const PAPAS = ['maethu', 'micha'];
export const GIRLS = ['elina', 'milena'];
export const MAMAS = ['nicole', 'carmen'];
