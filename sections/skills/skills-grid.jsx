'use client';

import { useState, useEffect } from 'react';
import { skills, skillCategories } from '@/data/skills';
import { Badge } from '@/components/ui/badge';
import { FaPlus } from 'react-icons/fa6';
import { SkillExpand } from './skill-expand';

const grouped = skillCategories.map((cat) => ({
  category: cat,
  items: skills.filter((s) => s.category === cat.key),
}));

export function SkillsGrid() {
  const [activeSlug, setActiveSlug] = useState(null);

  useEffect(() => {
    if (!activeSlug) return;
    function onKey(e) {
      if (e.key === 'Escape') {
        setActiveSlug(null);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [activeSlug]);

  function toggle(slug) {
    setActiveSlug((prev) => (prev === slug ? null : slug));
  }

  return (
    <div className="space-y-12">
      {grouped.map((group) => {
        const activeSkill = group.items.find((s) => s.slug === activeSlug);
        return (
          <div key={group.category.key} className="space-y-4">
            <h3 className="text-[0.8rem] font-mono tracking-widest text-fgSoft uppercase">
              {group.category.label}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <li key={skill.slug}>
                  <button
                    onClick={() => toggle(skill.slug)}
                    aria-expanded={activeSlug === skill.slug}
                    aria-controls={
                      activeSlug === skill.slug ? `skill-${skill.slug}-title` : undefined
                    }
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full group"
                  >
                    <Badge
                      variant="pill"
                      size="md"
                      mono={false}
                      className={`cursor-pointer transition-all duration-150 ease-out group-hover:scale-[1.08] group-active:scale-[0.96] hover:bg-accent/10 shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_4px_14px_-2px_rgba(0,0,0,0.55),0_2px_6px_-1px_rgba(0,0,0,0.4)] ${
                        activeSlug === skill.slug
                          ? 'ring-2 ring-accent bg-accent/10'
                          : ''
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{skill.name}</span>
                        <FaPlus
                          aria-hidden="true"
                          className={`text-[0.85em] transition-all duration-150 ease-out ${
                            activeSlug === skill.slug
                              ? 'rotate-45 text-accent'
                              : 'text-fgSoft group-hover:text-accent'
                          }`}
                        />
                      </span>
                    </Badge>
                  </button>
                </li>
              ))}
            </ul>
            <SkillExpand
              skill={activeSkill || group.items[0]}
              isOpen={Boolean(activeSkill)}
              onClose={() => setActiveSlug(null)}
            />
          </div>
        );
      })}
    </div>
  );
}
