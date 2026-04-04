import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatBlogDate } from '@/lib/utils';

/**
 * BlogRelated
 * Affiche les articles connexes en bas d'un article.
 * Les articles sont scores par nombre de tags en commun.
 */
export function BlogRelated({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-14 sm:mt-20" aria-labelledby="related-heading">
      <div className="border-t border-border/40 pt-8">
        <h2
          id="related-heading"
          className="mb-6 text-[16px] font-semibold text-fg"
        >
          Related articles
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-lg border border-border/60 bg-glass-a04 p-4 transition-all duration-200 hover:border-border-strong hover:bg-glass-a08"
            >
              {post.thumbnail && (
                <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-md border border-border">
                  <Image
                    src={post.thumbnail}
                    alt={`Illustration for ${post.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={70}
                  />
                </div>
              )}
              <h3 className="text-[14px] font-semibold text-fg leading-snug transition-colors duration-200 group-hover:text-white">
                {post.title}
              </h3>
              {post.date && (
                <time
                  dateTime={post.date}
                  className="mt-1 block font-mono text-[11px] text-fgSoft"
                >
                  {formatBlogDate(post.date)}
                </time>
              )}
              {post.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} size="xs" variant="pill">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
