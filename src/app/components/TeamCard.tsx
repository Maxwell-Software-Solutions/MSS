import React from 'react';
// Avatar generation removed; placeholder used instead.
export type PresetKey = 'maxwell' | 'petras' | 'marek'; // retained type for existing props

export interface TeamCardProps {
  name: string;
  title: string;
  bio: string;
  className?: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ name, title, bio, className = '' }) => {
  // Placeholder avatar (empty) until real images provided.
  return (
    <div
      className={`rounded-3xl border border-foreground/10 shadow-soft bg-gradient-to-br from-background/60 to-background/30 p-6 flex gap-6 items-start ${className}`}
    >
      <div className="flex-shrink-0">
        <div
          role="img"
          aria-label={`${name} — ${title}`}
          className="w-24 h-24 rounded-2xl shadow-lg bg-foreground/5 flex items-center justify-center text-[10px] font-medium uppercase text-foreground/40"
        >
          Pending
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
          <p className="text-sm text-foreground/60 font-medium">{title}</p>
        </div>
        <p className="text-sm text-foreground/75 leading-relaxed max-w-prose">{bio}</p>
      </div>
    </div>
  );
};

export default TeamCard;
