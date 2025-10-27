"use client";
import { useState, useMemo } from 'react';
import { skills, skillCategories } from '@/data/skills';
import { Badge } from '@/components/ui/badge';
import { FaPlus } from 'react-icons/fa6';
import { SkillModal } from './skill-modal';

export function SkillsGrid() {
  const [activeSlug, setActiveSlug] = useState(null);
  const activeSkill = useMemo(() => skills.find(s => s.slug === activeSlug), [activeSlug]);

  const grouped = useMemo(() => {
    return skillCategories.map(cat => ({
      category: cat,
      items: skills.filter(s => s.category === cat.key)
    }));
  }, []);

  return (
    <div className="space-y-12">
      {grouped.map(group => (
        <div key={group.category.key} className="space-y-4">
          <div>
            <h3 className="text-[0.8rem] font-mono tracking-widest text-fgSoft uppercase">{group.category.label}</h3>
          </div>
          <ul className="flex flex-wrap gap-2">
            {group.items.map(skill => (
              <li key={skill.slug}>
                <button
                  onClick={() => setActiveSlug(skill.slug)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveSlug(skill.slug); } }}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full group"
                  aria-haspopup="dialog"
                  aria-controls={activeSlug === skill.slug ? `skill-${skill.slug}-dialog` : undefined}
                >
                  <Badge
                    variant="pill"
                    size="md"
                    mono={false}
                    className="cursor-pointer transition-all duration-150 ease-out group-hover:scale-[1.08] group-active:scale-[0.96] hover:bg-accent/10 shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_4px_14px_-2px_rgba(0,0,0,0.55),0_2px_6px_-1px_rgba(0,0,0,0.4)]"
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{skill.name}</span>
                      <FaPlus
                        aria-hidden="true"
                        className="text-[0.85em] text-fgSoft transition-colors duration-150 ease-out group-hover:text-accent"
                      />
                    </span>
                  </Badge>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <SkillModal skill={activeSkill} onClose={() => setActiveSlug(null)} />
    </div>
  );
}
