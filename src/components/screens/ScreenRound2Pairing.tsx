import { useState, useCallback } from 'react';
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  DragStartEvent,
  DragEndEvent,
  pointerWithin,
} from '@dnd-kit/core';
import { useTournamentStore } from '@/lib/store';
import { PlayerAvatar } from '@/components/PlayerAvatar';
import {
  MIXED_KIDS_TEAM_1,
  MIXED_KIDS_TEAM_2,
  MIXED_ELTERN_TEAM_1,
  MIXED_ELTERN_TEAM_2,
} from '@/lib/players';

type TeamId = 'kids1' | 'kids2' | 'eltern1' | 'eltern2';
type SlotId = 'gp1-kids' | 'gp1-eltern' | 'gp2-kids' | 'gp2-eltern';

const TEAMS: Record<TeamId, { label: string; playerIds: string[]; type: 'kids' | 'eltern' }> = {
  kids1: { label: 'Milena + Mio', playerIds: MIXED_KIDS_TEAM_1, type: 'kids' },
  kids2: { label: 'Elina + Valerio', playerIds: MIXED_KIDS_TEAM_2, type: 'kids' },
  eltern1: { label: 'Carmen + Mäthu', playerIds: MIXED_ELTERN_TEAM_1, type: 'eltern' },
  eltern2: { label: 'Nicole + Michael', playerIds: MIXED_ELTERN_TEAM_2, type: 'eltern' },
};

const SLOTS: { id: SlotId; gp: number; type: 'kids' | 'eltern'; label: string }[] = [
  { id: 'gp1-kids', gp: 1, type: 'kids', label: 'Kids-Team' },
  { id: 'gp1-eltern', gp: 1, type: 'eltern', label: 'Eltern-Team' },
  { id: 'gp2-kids', gp: 2, type: 'kids', label: 'Kids-Team' },
  { id: 'gp2-eltern', gp: 2, type: 'eltern', label: 'Eltern-Team' },
];

/* ── Draggable team card ── */
function TeamCard({ teamId, overlay }: { teamId: TeamId; overlay?: boolean }) {
  const team = TEAMS[teamId];
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: teamId });

  const content = (
    <div
      ref={overlay ? undefined : setNodeRef}
      {...(overlay ? {} : { ...listeners, ...attributes })}
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 cursor-grab select-none transition-all
        ${team.type === 'kids' ? 'border-[#5A8FA0]/40 bg-[#5A8FA0]/10' : 'border-[#5C3A5F]/40 bg-[#5C3A5F]/10'}
        ${isDragging && !overlay ? 'opacity-30' : 'opacity-100'}
        ${overlay ? 'shadow-lg shadow-gold/20 scale-105 border-gold' : 'hover:border-gold/50'}
      `}
    >
      {team.playerIds.map(id => (
        <PlayerAvatar key={id} playerId={id} size="sm" />
      ))}
    </div>
  );
  return content;
}

/* ── Droppable slot ── */
function DropSlot({
  slotId,
  label,
  acceptType,
  placedTeam,
  activeType,
}: {
  slotId: SlotId;
  label: string;
  acceptType: 'kids' | 'eltern';
  placedTeam: TeamId | null;
  activeType: 'kids' | 'eltern' | null;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: slotId });
  const canAccept = activeType === acceptType;
  const highlight = canAccept && !placedTeam;

  return (
    <div
      ref={setNodeRef}
      className={`rounded-lg border-2 border-dashed p-3 min-h-[56px] flex items-center justify-center transition-all
        ${placedTeam ? 'border-gold/60 bg-gold/5' : highlight ? (isOver ? 'border-gold bg-gold/15' : 'border-gold/40 bg-gold/5') : 'border-border/40 bg-card/30'}
      `}
    >
      {placedTeam ? (
        <div className="flex items-center gap-2">
          {TEAMS[placedTeam].playerIds.map(id => (
            <PlayerAvatar key={id} playerId={id} size="sm" />
          ))}
        </div>
      ) : (
        <span className={`text-xs ${highlight ? 'text-gold' : 'text-muted-foreground/50'}`}>
          {label}
        </span>
      )}
    </div>
  );
}

/* ── Main component ── */
export function ScreenRound2Pairing() {
  const { state, setState, setScreen } = useTournamentStore();

  // Rehydrate placements from store if pairing exists (for back-navigation)
  const initPlacements = (): Record<SlotId, TeamId | null> => {
    const p = state.round2.pairing;
    if (p && typeof p === 'object' && 'gp1' in p) {
      return {
        'gp1-kids': `kids${p.gp1.kidsTeam}` as TeamId,
        'gp1-eltern': `eltern${p.gp1.elternTeam}` as TeamId,
        'gp2-kids': `kids${p.gp2.kidsTeam}` as TeamId,
        'gp2-eltern': `eltern${p.gp2.elternTeam}` as TeamId,
      };
    }
    return { 'gp1-kids': null, 'gp1-eltern': null, 'gp2-kids': null, 'gp2-eltern': null };
  };

  const [placements, setPlacements] = useState<Record<SlotId, TeamId | null>>(initPlacements);

  const [activeId, setActiveId] = useState<TeamId | null>(null);
  const activeType = activeId ? TEAMS[activeId].type : null;

  const placedTeams = new Set(Object.values(placements).filter(Boolean) as TeamId[]);
  const poolTeams = (Object.keys(TEAMS) as TeamId[]).filter(t => !placedTeams.has(t));

  const allFilled = Object.values(placements).every(Boolean);


  const handleDragStart = useCallback((e: DragStartEvent) => {
    setActiveId(e.active.id as TeamId);
  }, []);

  const handleDragEnd = useCallback((e: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = e;
    if (!over) return;

    const teamId = active.id as TeamId;
    const slotId = over.id as SlotId;
    const slot = SLOTS.find(s => s.id === slotId);
    if (!slot) return;
    if (TEAMS[teamId].type !== slot.type) return;
    if (placements[slotId]) return;

    setPlacements(prev => ({ ...prev, [slotId]: teamId }));
  }, [placements]);

  const reset = () =>
    setPlacements({ 'gp1-kids': null, 'gp1-eltern': null, 'gp2-kids': null, 'gp2-eltern': null });

  const confirm = () => {
    const toNum = (id: TeamId): 1 | 2 => id.endsWith('1') ? 1 : 2;

    const pairing = {
      gp1: { kidsTeam: toNum(placements['gp1-kids']!), elternTeam: toNum(placements['gp1-eltern']!) },
      gp2: { kidsTeam: toNum(placements['gp2-kids']!), elternTeam: toNum(placements['gp2-eltern']!) },
    };

    setState(prev => ({
      round2: { ...prev.round2, pairing },
    }));
    setScreen(9);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 slide-up">
      <h2 className="text-2xl font-bold text-gold mb-1">Paarungen festlegen</h2>
      <p className="text-muted-foreground mb-8">Kids, zieht die Teams in die GP-Slots</p>

      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={pointerWithin}
      >
        {/* GP boxes */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {[1, 2].map(gp => (
            <div key={gp} className="bg-card/50 rounded-xl border border-border/50 p-4">
              <h3 className="text-sm font-bold text-gold mb-4">GP {gp}</h3>
              <div className="space-y-3">
                {SLOTS.filter(s => s.gp === gp).map(slot => (
                  <div key={slot.id}>
                    <p className="text-xs text-muted-foreground mb-1">{slot.label}</p>
                    <DropSlot
                      slotId={slot.id}
                      label={`${slot.label} hierher ziehen`}
                      acceptType={slot.type}
                      placedTeam={placements[slot.id]}
                      activeType={activeType}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pool */}
        {poolTeams.length > 0 && (
          <div className="mb-8">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Verfügbare Teams</p>
            <div className="flex flex-wrap gap-3">
              {poolTeams.map(teamId => (
                <TeamCard key={teamId} teamId={teamId} />
              ))}
            </div>
          </div>
        )}

        <DragOverlay>
          {activeId ? <TeamCard teamId={activeId} overlay /> : null}
        </DragOverlay>
      </DndContext>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setScreen(7)}
          className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          Zurück
        </button>
        <div className="flex gap-3">
          {placedTeams.size > 0 && (
            <button
              onClick={reset}
              className="px-5 py-3 text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors"
            >
              Reset
            </button>
          )}
          <button
            onClick={confirm}
            disabled={!allFilled}
            className="px-8 py-3 bg-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Weiter zu GP 1
          </button>
        </div>
      </div>
    </div>
  );
}
