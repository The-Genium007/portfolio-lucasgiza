import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatBlogDate } from '@/lib/utils';

/**
 * BlogCard
 * Carte d'un article de blog dans la liste.
 * Reprend le pattern visuel de CompactProjectList :
 * - glass-interactive + highlight-spot pour le hover glassmorphism
 * - Image à gauche (desktop) ou au-dessus (mobile)
 * - scale 1.02 au hover, titre passe en blanc
 */
export function BlogCard({ post }) {
  const { slug, title, date, category, tags, description, thumbnail } = post;

  return (
    <li className="fade-in-up">
      <Link
        href={`/blog/${slug}`}
        className="highlight-spot glass-interactive group -mx-2 block px-2 transform-gpu transition-transform duration-300 ease-out hover:scale-[1.02] focus-visible:scale-[1.02]"
      >
        <div className="gi-fade flex flex-col lg:flex-row gap-4 relative z-10">
          {/* Thumbnail : pleine largeur sur mobile, fixe à gauche sur desktop */}
          {thumbnail && (
            <div className="bg-bgSoft/60 h-40 lg:h-18 w-full lg:w-32 flex-none rounded-sm border border-border overflow-hidden relative transition-colors duration-300 ease-out group-hover:border-(--color-fg)">
              <Image
                src={thumbnail}
                alt={`Illustration for ${title}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 128px"
                quality={75}
              />
            </div>
          )}
          <div className="flex-1 space-y-1.5">
            <h3 className="flex items-center gap-2 text-h4 font-semibold tracking-tight text-fg transition-colors duration-300 ease-out group-hover:text-white">
              {title}
              <span className="shrink-0 text-fgSoft transition-colors duration-300 ease-out group-hover:text-white" aria-hidden="true">
                →
              </span>
            </h3>
            {/* Date avec balise sémantique <time> pour le SEO */}
            {date && (
              <time
                dateTime={date}
                className="block text-micro font-mono text-fgSoft"
              >
                {formatBlogDate(date)}
              </time>
            )}
            {description && (
              <p className="line-clamp-2 text-micro leading-snug text-fgSoft transition-colors duration-300 ease-out group-hover:text-white/90">
                {description}
              </p>
            )}
            <div className="flex flex-wrap gap-2 pt-1">
              {category && (
                <Badge size="xs" variant="pill">
                  {category}
                </Badge>
              )}
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} size="xs" variant="pill">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
