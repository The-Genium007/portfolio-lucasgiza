'use client';

import { useState, useEffect } from 'react';

/**
 * TableOfContents
 * Sommaire genere a partir des headings h2/h3 de l'article.
 * Affiche un indicateur "active" sur le heading visible dans le viewport.
 */
export function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prend le premier heading visible (le plus haut dans la page)
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    const ids = headings.map((h) => h.id);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="mb-10 sm:mb-14">
      <div className="rounded-lg border border-border/60 bg-glass-a04 px-5 py-4">
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-fgSoft">
          Table of contents
        </p>
        <ul className="space-y-1.5">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block text-[13px] leading-snug transition-colors duration-150 ${
                  h.level === 3 ? 'pl-4' : ''
                } ${
                  activeId === h.id
                    ? 'text-accent font-medium'
                    : 'text-fgSoft hover:text-fg'
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
