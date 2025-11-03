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
        {featured.slice(1).map((p) => (
          <li
            key={p.slug}
            className="glass-interactive group relative transform-gpu rounded-md border border-white/[0.08] bg-transparent p-5 transition-all duration-400 ease-out hover:scale-[1.02] hover:border-white/20 hover:bg-[rgba(134,160,224,0.12)] hover:shadow-[0_8px_32px_0_rgba(134,160,224,0.2),inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:backdrop-blur-xl"
          >
            <h3 className="text-h3 mb-2 flex items-center gap-2 font-medium tracking-tight text-[var(--color-fg)] group-hover:text-white">
              {p.title}
              <FaArrowUpRightFromSquare
                aria-hidden="true"
                className="shrink-0 text-[0.85em] text-[var(--color-fg-soft)] transition-colors group-hover:text-[var(--color-accent)]"
              />
            </h3>
            <p className="text-micro mb-3 line-clamp-3 text-[var(--color-fg-soft)]">
              {p.description}
            </p>
            <div className="text-mini mb-3 flex flex-wrap gap-2 font-mono text-[var(--color-fg-soft)]/70">
              {p.tech.slice(0, 5).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <Link
              className="text-micro relative font-mono tracking-wide text-[var(--color-accent)] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-[var(--color-accent)] after:transition-all hover:after:w-full"
              href={`/projects#${p.slug}`}
            >
              Details →
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <div className="flex flex-col gap-2">
          <Link
            href="/cv"
            className="text-micro mb-5 inline-block font-mono text-[var(--color-fg-soft)] transition hover:text-[var(--color-fg)]"
          >
            View full CV →
          </Link>
          <Link
            href="/projects"
            className="text-micro font-mono text-[var(--color-fg-soft)] transition hover:text-[var(--color-fg)]"
          >
            Complete project archive →
          </Link>
        </div>
      </div>
    </section>
  );
}
