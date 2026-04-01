"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { APP_SECTIONS, SECTION_ORDER } from '@/lib/constants';
import { useScrollSpy } from '@/lib/useScrollSpy';
import { cn } from '@/lib/cn';

const NAV_ITEMS = [
  { id: APP_SECTIONS.HOME, label: 'Home', href: '/#home' },
  { id: APP_SECTIONS.ABOUT, label: 'About', href: '/#about' },
  { id: APP_SECTIONS.EXPERIENCE, label: 'Experience', href: '/#experience' },
  { id: APP_SECTIONS.SKILLS, label: 'Skills', href: '/#skills' },
  { id: APP_SECTIONS.PROJECTS, label: 'Projects', href: '/#projects' },
  { id: APP_SECTIONS.BLOG, label: 'Blog', href: '/blog', isPage: true },
];

export function MobileFloatingNav() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const panelRef = useRef(null);
  const pathname = usePathname();
  const active = useScrollSpy(SECTION_ORDER, { offset: 120 });
  const isHome = pathname === '/';
  const isBlog = pathname.startsWith('/blog');

  const toggle = useCallback(() => setOpen((o) => !o), []);
  const close = useCallback(() => setOpen(false), []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus trap: contain focus within panel when open, return to button on close
  useEffect(() => {
    if (!open) {
      if (btnRef.current) btnRef.current.focus({ preventScroll: true });
      return;
    }
    const panel = panelRef.current;
    if (!panel) return;
    function handleTab(e) {
      if (e.key !== 'Tab') return;
      const focusable = [
        ...panel.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])'),
        btnRef.current,
      ].filter(Boolean);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', handleTab);
    // Auto-focus first link when opening
    const firstLink = panel.querySelector('a[href]');
    if (firstLink) firstLink.focus({ preventScroll: true });
    return () => document.removeEventListener('keydown', handleTab);
  }, [open]);

  const getIsActive = (item) => {
    if (item.isPage) return isBlog;
    if (isHome) {
      if (item.id === APP_SECTIONS.HOME) return false;
      return active === item.id || (!active && item.id === APP_SECTIONS.ABOUT);
    }
    return false;
  };

  // Filter out Home on homepage
  const visibleItems = NAV_ITEMS.filter(
    (item) => !(isHome && item.id === APP_SECTIONS.HOME)
  );

  return (
    <div className="lg:hidden">
      {/* Hamburger button — bottom right */}
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        className={cn(
          'fixed bottom-6 right-6 z-60 flex h-14 w-14 items-center justify-center rounded-full',
          'border border-white/20 shadow-lg backdrop-blur-md transition-all duration-300',
          open
            ? 'bg-white/10 shadow-white/5'
            : 'bg-accent/90 shadow-accent/30'
        )}
      >
        <span className="sr-only">
          {open ? 'Close navigation menu' : 'Open navigation menu'}
        </span>
        <div className="relative h-5 w-6" aria-hidden="true">
          <span
            className={cn(
              'absolute left-0 block h-0.5 w-6 rounded-full bg-white transition-all duration-300',
              open ? 'top-2.5 rotate-45' : 'top-0.5'
            )}
          />
          <span
            className={cn(
              'absolute left-0 top-2.5 block h-0.5 w-6 rounded-full bg-white transition-all duration-300',
              open ? 'scale-x-0 opacity-0' : 'opacity-100'
            )}
          />
          <span
            className={cn(
              'absolute left-0 block h-0.5 w-6 rounded-full bg-white transition-all duration-300',
              open ? 'top-2.5 -rotate-45' : 'top-4.5'
            )}
          />
        </div>
      </button>

      {/* Backdrop overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={close}
        aria-hidden="true"
      />

      {/* Full-height slide panel — right to left */}
      <nav
        ref={panelRef}
        id="mobile-menu-panel"
        aria-label="Mobile navigation"
        className={cn(
          'fixed inset-y-0 right-0 z-55 flex w-[min(80vw,320px)] flex-col',
          'border-l border-white/10 bg-[#0a0a1a]/95 backdrop-blur-xl',
          'transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header area */}
        <div className="flex items-center justify-between px-8 pt-10 pb-6">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-fgSoft">
            Navigation
          </span>
        </div>

        {/* Separator */}
        <div className="mx-8 h-px bg-white/10" />

        {/* Nav links */}
        <ul className="flex flex-1 flex-col justify-center gap-2 px-8">
          {visibleItems.map((item, index) => {
            const isItemActive = getIsActive(item);
            return (
              <li
                key={item.id}
                style={{
                  transitionDelay: open ? `${80 + index * 50}ms` : '0ms',
                }}
                className={cn(
                  'transition-all duration-300',
                  open
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-8 opacity-0'
                )}
              >
                <Link
                  href={item.href}
                  aria-current={isItemActive ? 'page' : undefined}
                  onClick={close}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-4 py-3 font-mono text-lg tracking-wide transition-colors',
                    isItemActive
                      ? 'bg-accent/15 text-fg font-semibold'
                      : 'text-fgSoft hover:bg-white/5 hover:text-fg'
                  )}
                >
                  {/* Active indicator dot */}
                  <span
                    className={cn(
                      'h-1.5 w-1.5 rounded-full transition-all duration-300',
                      isItemActive ? 'bg-accent scale-100' : 'bg-transparent scale-0'
                    )}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="px-8 pb-10">
          <div className="h-px bg-white/10 mb-4" />
          <p className="font-mono text-[11px] text-fgSoft/50 tracking-wide">
            Lucas Giza &mdash; Portfolio
          </p>
        </div>
      </nav>

      {/* Aria live for screen readers */}
      <span aria-live="polite" className="sr-only">
        {open ? 'Menu open' : 'Menu closed'}
      </span>
    </div>
  );
}
