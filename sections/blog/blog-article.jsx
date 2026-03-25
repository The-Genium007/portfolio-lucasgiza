import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatBlogDate } from '@/lib/utils';
import { site } from '@/data/site';

/**
 * BlogArticle
 * Rendu complet d'un article de blog.
 * - Header : lien retour, titre, date, temps de lecture, tags
 * - Thumbnail optionnel en pleine largeur
 * - Contenu HTML rendu dans un conteneur `prose` (plugin @tailwindcss/typography)
 * - JSON-LD structured data pour le SEO (schema BlogPosting)
 * - Lien retour en bas de page
 */
export function BlogArticle({ post }) {
  const { title, date, category, tags, description, thumbnail, contentHtml, readingTime } = post;

  // JSON-LD : données structurées pour Google (schema.org BlogPosting)
  // Google lit ce bloc pour comprendre que c'est un article, qui l'a écrit, quand, etc.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: date,
    author: {
      '@type': 'Person',
      name: site.name,
      url: site.url,
    },
    publisher: {
      '@type': 'Person',
      name: site.name,
    },
    ...(thumbnail && { image: `${site.url}${thumbnail}` }),
  };

  return (
    <article className="space-y-8">
      {/* JSON-LD injecté dans le <head> via un <script> — invisible pour l'utilisateur */}
      <script
        type="application/ld+json"
        // Safe: HTML is generated at build time from our own Markdown files in the git repo.
        // No user-supplied content is rendered here — this is the standard pattern for static blogs.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header de l'article */}
      <header className="space-y-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-micro font-mono text-fgSoft hover:text-fg transition-colors"
        >
          ← Back to blog
        </Link>

        <h1 className="text-h1 font-semibold tracking-tight text-fg lg:text-[36px]">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-micro font-mono text-fgSoft">
          {date && <time dateTime={date}>{formatBlogDate(date)}</time>}
          {readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span>{readingTime} min read</span>
            </>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {category && (
            <Badge size="xs" variant="pill">
              {category}
            </Badge>
          )}
          {tags.map((tag) => (
            <Badge key={tag} size="xs" variant="pill">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      {/* Thumbnail pleine largeur */}
      {thumbnail && (
        <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-border">
          <Image
            src={thumbnail}
            alt={`Illustration for ${title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            quality={80}
            priority
          />
        </div>
      )}

      {/* Contenu Markdown rendu en HTML.
          La classe "prose" vient du plugin @tailwindcss/typography.
          On override les couleurs dans globals.css pour matcher notre thème.
          Safe: HTML is generated at build time from our own Markdown files — no untrusted input. */}
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Lien retour en bas */}
      <div className="pt-8 border-t border-border/40">
        <Link
          href="/blog"
          className="text-micro text-fgSoft hover:text-fg font-mono transition"
        >
          ← Back to blog
        </Link>
      </div>
    </article>
  );
}
