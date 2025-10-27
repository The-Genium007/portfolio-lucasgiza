import { useMemo } from 'react';
import { projects } from '../../data/projects';
import Link from 'next/link';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { SectionHeading } from '../../components/ui/section-heading';
import { HighlightProjectCard } from '../../components/projects/highlight-project-card';

export function HighlightProjects() {
  // Memoize le filtrage des projets featured
  const featured = useMemo(() =>
    projects.filter(p => p.featured).slice(0, 4),
    []
  );
  return (
    <section id="featured-projects" className="pt-4">
        {featured[0] && (
          <div className="mb-12">
            <HighlightProjectCard project={featured[0]} />
          </div>
        )}
        <ul className="grid gap-8 md:grid-cols-2">
          {featured.slice(1).map(p => (
            <li key={p.slug} className="glass-interactive group relative rounded-md border border-white/[0.08] bg-transparent p-5 transform-gpu transition-all duration-400 ease-out hover:bg-[rgba(134,160,224,0.12)] hover:backdrop-blur-xl hover:border-white/20 hover:shadow-[0_8px_32px_0_rgba(134,160,224,0.2),inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:scale-[1.02]">
              <h3 className="mb-2 flex items-center gap-2 font-medium text-h3 tracking-tight text-[var(--color-fg)] group-hover:text-white">
                {p.title}
                <FaArrowUpRightFromSquare
                  aria-hidden="true"
                  className="shrink-0 text-[0.85em] text-[var(--color-fg-soft)] transition-colors group-hover:text-[var(--color-accent)]"
                />
              </h3>
              <p className="text-micro text-[var(--color-fg-soft)] mb-3 line-clamp-3">{p.description}</p>
              <div className="flex gap-2 flex-wrap text-mini font-mono text-[var(--color-fg-soft)]/70 mb-3">
                {p.tech.slice(0,5).map(t => <span key={t}>{t}</span>)}
              </div>
              <Link className="relative text-[var(--color-accent)] text-micro font-mono tracking-wide after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[var(--color-accent)] after:transition-all hover:after:w-full" href={`/projects#${p.slug}`}>Détails →</Link>
            </li>
          ))}
        </ul>
      <div>
        <div className="flex flex-col gap-2">
          <Link href="/cv" className="text-[var(--color-fg-soft)] text-micro font-mono hover:text-[var(--color-fg)] transition mb-5 inline-block">Voir CV complet →</Link>
          <Link href="/projects" className="text-[var(--color-fg-soft)] text-micro font-mono hover:text-[var(--color-fg)] transition">Archive projets complète →</Link>
        </div>
      </div>
    </section>
  );
}
