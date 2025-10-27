"use client";

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useScrollSpy } from '../../lib/useScrollSpy';
import { site } from '@/data/site';
import { APP_SECTIONS } from '../../lib/constants';
import { Footer } from './footer';

const SECTION_IDS = [APP_SECTIONS.HOME, APP_SECTIONS.ABOUT, APP_SECTIONS.EXPERIENCE, APP_SECTIONS.SKILLS, APP_SECTIONS.PROJECTS];
const LABELS = {
  [APP_SECTIONS.HOME]: 'Home',
  [APP_SECTIONS.ABOUT]: 'About',
  [APP_SECTIONS.EXPERIENCE]: 'Experience',
  [APP_SECTIONS.PROJECTS]: 'Projects',
  [APP_SECTIONS.SKILLS]: 'Skills'
};

/**
 * Sidebar
 * Affiche: identité, navigation ancrée (scroll spy), liens sociaux.
 * - Active section déterminée par `useScrollSpy` avec offset 140.
 * - Sur la home, si aucune section encore détectée, on force 'about'.
 */
export function Sidebar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Memoize navigation items pour éviter les re-calculs
  const navIds = useMemo(() =>
    isHome ? SECTION_IDS.filter(id => id !== 'home') : SECTION_IDS,
    [isHome]
  );

  const active = useScrollSpy(SECTION_IDS, { offset: 140 });

  // Par défaut sur la home on force 'about' si aucun actif encore détecté
  const effectiveActive = isHome && !active ? 'about' : active;
  return (
    <aside className="pointer-events-auto hidden lg:fixed lg:inset-y-0 lg:flex lg:w-80 lg:flex-col px-10 py-14">
      {/* Bloc en-tête */}
      <div>
        <div className="relative mb-14">
          <h1 className="relative mb-3 text-h1 font-semibold tracking-tight text-fg">Lucas Giza</h1>
          <p className="relative text-body leading-relaxed text-fgSoft max-w-[230px]">{site.description}</p>
        </div>
      </div>
      {/* Navigation centrée verticalement */}
      <nav aria-label="Navigation principale" className="relative my-auto">
        <ul className="flex flex-col gap-3 text-[18px] font-mono font-medium tracking-wider">
          {navIds.map((id, index) => {
            const isActive = effectiveActive === id;
            const delay = 80 + index * 70; // ms
            return (
              <li key={id} className="fade-in-seq" style={{ '--_delay': `${delay}ms` }}>
                <Link
                  href={`/#${id}`}
                  aria-current={isActive ? 'page' : undefined}
                  className="group flex items-center py-1"
                >
                  <span
                    className={`nav-link-anim relative inline-block ${isActive ? 'is-active text-white scale-105' : 'text-fgSoft'} `}
                  >
                    {LABELS[id]}
                    {isActive && <span className="sr-only"> (section en cours)</span>}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Footer variant="sidebar" />
    </aside>
  );
}
