import { create } from 'zustand';
import { TournamentState, INITIAL_STATE } from './types';
import { supabase } from '@/integrations/supabase/client';

const SINGLETON_ID = '00000000-0000-0000-0000-000000000001';
let saveTimeout: ReturnType<typeof setTimeout> | null = null;

interface TournamentStore {
  state: TournamentState;
  loading: boolean;
  loaded: boolean;
  hasSavedState: boolean;
  setState: (updater: (prev: TournamentState) => Partial<TournamentState>) => void;
  setScreen: (screen: number) => void;
  loadState: () => Promise<void>;
  resetState: () => void;
}

function debouncedSave(state: TournamentState) {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(async () => {
    await supabase.from('tournament_state').upsert({
      id: SINGLETON_ID,
      state: state as any,
      updated_at: new Date().toISOString(),
    });
  }, 500);
}

export const useTournamentStore = create<TournamentStore>((set, get) => ({
  state: INITIAL_STATE,
  loading: true,
  loaded: false,
  hasSavedState: false,

  setState: (updater) => {
    const current = get().state;
    const updates = updater(current);
    const newState = { ...current, ...updates };
    set({ state: newState });
    debouncedSave(newState);
  },

  setScreen: (screen: number) => {
    const current = get().state;
    const newState = { ...current, currentScreen: screen };
    set({ state: newState });
    debouncedSave(newState);
  },

  loadState: async () => {
    set({ loading: true });
    const { data } = await supabase
      .from('tournament_state')
      .select('state')
      .eq('id', SINGLETON_ID)
      .maybeSingle();

    if (data?.state) {
      const saved = data.state as unknown as TournamentState;
      set({ state: saved, loading: false, loaded: true, hasSavedState: true });
    } else {
      set({ loading: false, loaded: true, hasSavedState: false });
    }
  },

  resetState: () => {
    set({ state: INITIAL_STATE, hasSavedState: false });
    debouncedSave(INITIAL_STATE);
  },
}));
