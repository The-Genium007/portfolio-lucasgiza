"use client";

import Link from 'next/link';
import { useScrollSpy } from '../../lib/useScrollSpy';
import { APP_SECTIONS } from '../../lib/constants';

const IDS = [APP_SECTIONS.ABOUT, APP_SECTIONS.EXPERIENCE, APP_SECTIONS.PROJECTS];

export function MobileAnchorNav() {
  const active = useScrollSpy([APP_SECTIONS.HOME, ...IDS], { offset: 100 });
  return (
    <nav aria-label="Sections" className="lg:hidden mb-10">
  <ul className="flex flex-wrap gap-4 text-mini font-mono tracking-widest text-fgSoft">
        {IDS.map(id => {
          const isActive = active === id;
          return (
            <li key={id}>
              <Link href={`/#${id}`} className={`relative px-1 py-1 transition-colors ${isActive ? 'text-fg' : 'hover:text-fg'}`}>
                <span className="relative z-10">{id.toUpperCase()}</span>
                {isActive && <span className="absolute inset-0 -z-10 rounded-sm bg-accent/10" aria-hidden="true" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
