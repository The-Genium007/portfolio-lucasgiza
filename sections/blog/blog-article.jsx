import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatBlogDate } from '@/lib/utils';
import { site } from '@/data/site';

/**
 * BlogArticle
 * Rendu complet d'un article de blog.
 * Design 2026 : header aéré, prose lisible, navigation proéminente.
 *
 * Security note: contentHtml and jsonLd are generated at build time from
 * Markdown files committed to the git repository. No user-supplied or
 * untrusted input is ever rendered — this is the standard static-blog
 * pattern used by Next.js, Gatsby, Astro, etc.
 */
export function BlogArticle({ post }) {
  const { title, date, category, tags, description, thumbnail, contentHtml, readingTime } = post;

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
    <article className="mx-auto max-w-[720px] lg:max-w-[860px]">
      {/* JSON-LD SEO — trusted build-time data only */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HEADER ── */}
      <header className="mb-10 space-y-6 sm:mb-14">
        {/* Back link + category row */}
        <div className="flex items-center justify-between">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-lg px-3 py-2 -ml-3 text-[13px] font-medium text-fgSoft transition-all duration-200 hover:bg-white/5 hover:text-fg"
          >
            <span
              className="inline-block transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            >
              &larr;
            </span>
            Back to blog
          </Link>
          {category && (
            <Badge size="xs" variant="pill">
              {category}
            </Badge>
          )}
        </div>

        {/* Accent separator */}
        <div className="h-px bg-gradient-to-r from-accent/40 via-accent/10 to-transparent" />

        {/* Title */}
        <h1 className="text-balance text-[28px] font-bold leading-[1.15] tracking-tight text-fg sm:text-[36px] lg:text-[42px]">
          {title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] text-fgSoft sm:text-[13px]">
          {date && <time dateTime={date}>{formatBlogDate(date)}</time>}
          {readingTime && (
            <>
              <span className="text-border-strong" aria-hidden="true">
                /
              </span>
              <span>{readingTime} min read</span>
            </>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} size="xs" variant="pill">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {/* ── THUMBNAIL ── */}
      {thumbnail && (
        <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-lg border border-border sm:mb-14">
          <Image
            src={thumbnail}
            alt={`Illustration for ${title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
            quality={80}
            priority
          />
        </div>
      )}

      {/* ── PROSE CONTENT ──
           Trusted build-time HTML from git-committed Markdown files.
           Sanitized by remark-html with { sanitize: true } in lib/blog.js. */}
      <div
        className="blog-prose prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* ── FOOTER ── */}
      <footer className="mt-14 border-t border-border/40 pt-8 sm:mt-20">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 rounded-lg px-3 py-2 -ml-3 text-[14px] font-medium text-fgSoft transition-all duration-200 hover:bg-white/5 hover:text-fg"
        >
          <span
            className="inline-block transition-transform duration-200 group-hover:-translate-x-1"
            aria-hidden="true"
          >
            &larr;
          </span>
          Back to blog
        </Link>
      </footer>
    </article>
  );
}
