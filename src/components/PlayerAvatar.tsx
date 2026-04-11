import { getPlayer } from '@/lib/players';

interface PlayerAvatarProps {
  playerId: string;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-base',
};

export function PlayerAvatar({ playerId, size = 'md', showName = true }: PlayerAvatarProps) {
  const player = getPlayer(playerId);
  if (!player) return null;

  return (
    <div className="flex items-center gap-2">
      <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold text-white shrink-0`} style={{ backgroundColor: player.colorHex }}>
        {player.initials}
      </div>
      {showName && <span className="text-foreground font-medium">{player.name}</span>}
    </div>
  );
}
