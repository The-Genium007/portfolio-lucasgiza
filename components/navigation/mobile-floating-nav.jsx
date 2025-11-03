"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { APP_SECTIONS, SECTION_ORDER } from '@/lib/constants';
import { useScrollSpy } from '@/lib/useScrollSpy';

// Liste de navigation mobile : on force HOME en premier puis les autres sections (sauf personal-projects si ajoutée plus tard)
const NAV_IDS = [APP_SECTIONS.HOME, ...SECTION_ORDER.filter(id => id !== APP_SECTIONS.HOME && id !== APP_SECTIONS.PERSONAL_PROJECTS)];

export function MobileFloatingNav() {
  const [open, setOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [dragY, setDragY] = useState(0); // déplacement vertical courant durant un swipe
  const [isDragging, setIsDragging] = useState(false);
  const panelRef = useRef(null);
  const btnRef = useRef(null);
  const pathname = usePathname();
  const active = useScrollSpy(SECTION_ORDER, { offset: 120 });
  const isHomePath = pathname === '/';
  const effectiveActive = isHomePath
    ? (active && active !== APP_SECTIONS.HOME ? active : APP_SECTIONS.ABOUT)
    : APP_SECTIONS.HOME;
  const touchStartY = useRef(null);
  const touchLastY = useRef(null);

  // Callbacks memoizés pour optimiser les performances
  const toggle = useCallback(() => setOpen(o => !o), []);
  const close = useCallback(() => setOpen(false), []);

  // Fermer avec ESC
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Focus trap minimal (ramener le focus sur le bouton à la fermeture)
  useEffect(() => {
    if (!open && btnRef.current) {
      btnRef.current.focus({ preventScroll: true });
    }
  }, [open]);

  // Fermer si clic extérieur
  const handleClickOutside = useCallback((e) => {
    if (!open) return;
    if (panelRef.current && !panelRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
      setOpen(false);
    }
  }, [open]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  // Annonce aria-live à chaque changement d'état d'ouverture
  useEffect(() => {
    setAnnouncement(open ? 'Menu ouvert' : 'Menu fermé');
  }, [open]);

  // Gestion du swipe vers le bas pour fermer le panneau.
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    function onTouchStart(e) {
      if (!open) return;
      if (e.touches.length !== 1) return;
      touchStartY.current = e.touches[0].clientY;
      touchLastY.current = e.touches[0].clientY;
      setIsDragging(true);
    }
    function onTouchMove(e) {
      if (!open || touchStartY.current == null) return;
      touchLastY.current = e.touches[0].clientY;
      const delta = touchLastY.current - touchStartY.current;
      // On ne garde que les deltas positifs (vers le bas). On limite le drag à 140px pour éviter des extrapolations extrêmes.
      setDragY(delta > 0 ? Math.min(delta, 140) : 0);
    }
    function onTouchEnd() {
      if (!open || touchStartY.current == null || touchLastY.current == null) return;
      const delta = touchLastY.current - touchStartY.current;
      // Seuil: glissement vers le bas > 60px
      if (delta > 60) {
        setOpen(false);
      }
      // Reset animation state après fin du geste
      setTimeout(() => {
        setDragY(0);
        setIsDragging(false);
      }, 0);
      touchStartY.current = null;
      touchLastY.current = null;
    }
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd);
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      {/* Bouton flottant bas-droite */}
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="mobile-float-nav"
        className="shadow-accent/30 after:border-accent/40 focus-visible:ring-accent/70 fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-accent text-white shadow-lg backdrop-blur-sm after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:border after:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <span className="sr-only">
          {open ? 'Fermer le menu navigation' : 'Ouvrir le menu navigation'}
        </span>
        <div className="relative h-6 w-6" aria-hidden="true">
          <span
            className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 -translate-y-2 bg-current transition-transform ${open ? 'translate-y-0 rotate-45' : ''}`}
          ></span>
          <span
            className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 -translate-y-0.5 bg-current transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`}
          ></span>
          <span
            className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 translate-y-1 bg-current transition-transform ${open ? 'translate-y-[0] -rotate-45' : ''}`}
          ></span>
        </div>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="animate-fade-in fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Panneau avec animation de glissement lors du swipe */}
      <div
        ref={panelRef}
        id="mobile-float-nav"
        /*
          Transform dynamique :
          - translateY suit dragY (max 140px)
          - scale et opacity se réduisent légèrement avec le drag (facteur progressif)
          - Pendant le drag on désactive la transition pour une sensation directe
        */
        style={{
          transform: open
            ? `translateY(${dragY}px) scale(${1 - Math.min(dragY, 140) / 900})`
            : 'translateY(12px) scale(0.9)',
          opacity: open ? 1 - Math.min(dragY, 140) / 300 : 0,
          transition: isDragging
            ? 'none'
            : 'transform 300ms var(--ease-out, cubic-bezier(.22,.95,.51,1)) , opacity 260ms ease',
        }}
        className={`border-border/50 bg-bg/95 fixed bottom-24 right-4 z-50 w-[min(85vw,260px)] origin-bottom-right rounded-xl border p-4 shadow-xl backdrop-blur-md ${open ? '' : 'pointer-events-none'}`}
      >
        <nav aria-label="Navigation mobile">
          <ul className="flex flex-col gap-2 font-mono text-sm tracking-wide">
            {NAV_IDS.filter((id) => !(isHomePath && id === APP_SECTIONS.HOME)).map((id) => {
              const isActive = effectiveActive === id;
              return (
                <li key={id}>
                  <Link
                    href={`/#${id}`}
                    aria-current={isActive ? 'page' : undefined}
                    className={`focus-visible:ring-accent/60 group focus-visible:ring-offset-bg flex items-center justify-between rounded-md px-3 py-2 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${isActive ? 'bg-accent/15 text-fg font-semibold' : 'hover:bg-accent/10 text-fgSoft hover:text-fg'}`}
                    onClick={close}
                  >
                    <span>
                      {id === APP_SECTIONS.HOME ? 'HOME' : id.toUpperCase()}
                      {isActive && <span className="sr-only"> (current section)</span>}
                    </span>
                    {isActive && (
                      <span
                        className="bg-accent ml-3 inline-block h-2 w-2 rounded-full shadow-[0_0_0_2px_var(--color-bg)]"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* Région aria-live pour annoncer ouvert/fermé (visuellement masquée) */}
        <span aria-live="polite" className="sr-only">
          {announcement}
        </span>
      </div>
    </div>
  );
}
