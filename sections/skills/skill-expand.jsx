'use client';

import { cn } from '@/lib/cn';

const LEVEL_MAP = {
  beginner: { dots: 1, label: 'Beginner' },
  intermediate: { dots: 3, label: 'Intermediate' },
  proficient: { dots: 4, label: 'Proficient' },
  expert: { dots: 5, label: 'Expert' },
};

function LevelDots({ level }) {
  const { dots, label } = LEVEL_MAP[level] || LEVEL_MAP.beginner;
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={cn(
              'inline-block h-2.5 w-2.5 rounded-full',
              i < dots
                ? 'bg-(--color-accent)'
                : 'bg-(--color-fg-soft) opacity-20'
            )}
          />
        ))}
      </div>
      <span className="text-mini font-mono tracking-wide text-fgSoft">{label}</span>
    </div>
  );
}

export function SkillExpand({ skill, isOpen, onClose }) {
  return (
    <div
      className={cn(
        'grid transition-all duration-300 ease-out',
        'motion-reduce:transition-none',
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      )}
    >
      <div className="overflow-hidden">
        <div
          role="region"
          aria-labelledby={skill ? `skill-${skill.slug}-title` : undefined}
          className="mt-3 rounded-2xl border border-(--badge-border-pill) bg-(--badge-bg-pill) backdrop-blur-sm px-6 py-5"
        >
          {skill && (
            <>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <h4
                    id={`skill-${skill.slug}-title`}
                    className="text-[1.05rem] font-semibold tracking-tight text-fg"
                  >
                    {skill.name}
                  </h4>
                  <LevelDots level={skill.level} />
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close skill details"
                  className="rounded-full border border-(--badge-border-pill) bg-(--badge-bg-pill) px-3 py-1 text-[11px] font-mono uppercase tracking-wide text-(--badge-fg-pill) hover:bg-(--color-accent)/20 focus-visible:ring-2 focus-visible:ring-accent focus:outline-none cursor-pointer transition-colors duration-150"
                >
                  Close
                </button>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-fgSoft">
                {skill.description}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
