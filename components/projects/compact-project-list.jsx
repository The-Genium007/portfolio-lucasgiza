import { Badge } from '../ui/badge';
import Image from 'next/image';
import { ArrowUpRight } from './icons';

/**
 * CompactProjectList
 * Liste compacte de projets triés par année décroissante.
 * @param {Object} props
 * @param {Array} props.projects - Tableau de projets { slug, title, description, tech[], year, repo?, links? }
 * @param {number} [props.limit] - Limite d'items affichés.
 * @param {'compact'|'full'} [props.variant] - Densité d'affichage.
 */

export function CompactProjectList({ projects, limit, variant = 'compact' }) {
  // Tri et slice - React 19 Compiler optimise automatiquement
  const sorted = [...projects].sort((a, b) => (b.year || 0) - (a.year || 0));
  const list = typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
  const isCompact = variant === 'compact';


  return (
  <ul className={isCompact ? "space-y-6 no-hover-underline" : "space-y-8 no-hover-underline"}>
      {list.map((p) => {
        const techList = Array.isArray(p.tech) ? p.tech : [];
        const highlights = Array.isArray(p.highlights) ? p.highlights : [];
        const href = p.repo || p.links?.[0]?.url;
        const hasExternalLink = Boolean(href);
        const Content = (
          <div className="gi-fade flex gap-4 relative z-10">
            <div className="bg-bgSoft/60 mt-1 h-18 w-32 flex-none rounded-sm border border-border overflow-hidden relative transition-colors duration-300 ease-out group-hover:border-(--color-fg)">
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 128px, 128px"
                  quality={75}
                  priority={false}
                />
              ) : null}
            </div>
            <div className={isCompact ? "flex-1 space-y-1.5" : "flex-1 space-y-2"}>
              <h3 className="flex items-center gap-2 text-h4 font-semibold tracking-tight text-fg transition-colors duration-300 ease-out group-hover:text-white">
                {p.title}
                {hasExternalLink && (
                  <ArrowUpRight className="shrink-0 w-[0.85em] h-[0.85em] text-fgSoft transition-colors duration-300 ease-out group-hover:text-white" />
                )}
              </h3>
              <p
                className={
                  isCompact
                    ? "line-clamp-2 text-micro leading-snug text-fgSoft transition-colors duration-300 ease-out group-hover:text-white/90"
                    : "text-micro leading-relaxed text-fgSoft transition-colors duration-300 ease-out group-hover:text-white/90"
                }
              >
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {(isCompact ? techList.slice(0, 4) : techList).map((t) => (
                  <Badge key={t} size="xs" variant="pill">
                    {t}
                  </Badge>
                ))}
              </div>
              {!isCompact && highlights.length > 0 ? (
                <ul className="space-y-1.5 pt-2 text-mini text-fgSoft/90">
                  {highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-fgSoft/70" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        );
        return (
          <li key={p.slug} className="fade-in-up">
            {hasExternalLink ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="highlight-spot glass-interactive group -mx-2 block px-2 transform-gpu transition-transform duration-300 ease-out hover:scale-[1.02] focus-visible:scale-[1.02]"
                aria-label={`${p.title} (ouvrir le dépôt)`}
              >
                {Content}
              </a>
            ) : (
              <div
                className="highlight-spot glass-interactive group flex gap-4 transform-gpu transition-transform duration-300 ease-out hover:scale-[1.02]"
              >
                {Content}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
