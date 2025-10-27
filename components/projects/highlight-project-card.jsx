import Link from 'next/link';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { Badge } from '../ui/badge';

/**
 * HighlightProjectCard
 * Carte large ou compacte (selon layout parent) mettant en avant un projet.
 * @param {{ project: { title: string, description: string, tech: string[], repo?: string, demo?: string } }} props
 */

export function HighlightProjectCard({ project }) {
  const hasExternalLink = Boolean(project.repo || project.demo);

  return (
    <article className="glass-interactive group relative flex flex-col overflow-hidden rounded-md border border-border/70 bg-bgAlt/40 backdrop-blur-sm transform-gpu transition-transform duration-500 ease-out hover:scale-[1.03] md:flex-row">
  <div className="relative aspect-video w-full flex-none bg-bgSoft md:w-64">
        <div className="absolute inset-0 flex items-center justify-center text-mini font-mono tracking-widest text-fgSoft/60">Aperçu</div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-7">
        <header className="space-y-2">
          <h3 className="flex items-center gap-2 text-h3 font-semibold tracking-tight text-fg transition-colors duration-300 ease-out group-hover:text-white">
            {project.title}
            {hasExternalLink && (
              <FaArrowUpRightFromSquare
                aria-hidden="true"
                className="shrink-0 text-[0.85em] text-fgSoft transition-colors duration-300 ease-out group-hover:text-white"
              />
            )}
          </h3>
          <p className="text-micro leading-relaxed text-fgSoft transition-colors duration-300 ease-out group-hover:text-white/90 line-clamp-3">
            {project.description}
          </p>
        </header>
        <ul className="flex flex-wrap gap-2 text-mini">
          {project.tech.slice(0, 6).map((t) => (
            <li key={t}>
              <Badge size="xs" variant="subtle">
                {t}
              </Badge>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex gap-4 text-micro font-mono">
          {project.repo && (
            <Link href={project.repo} className="text-accent">
              Code
            </Link>
          )}
          {project.demo && (
            <Link href={project.demo} className="text-accent">
              Demo
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
