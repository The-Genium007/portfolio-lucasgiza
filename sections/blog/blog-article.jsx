import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatBlogDate } from '@/lib/utils';
import { site } from '@/data/site';
import { addHeadingIds } from '@/lib/blog';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { TableOfContents } from '@/components/ui/table-of-contents';
import { BlogNav } from './blog-nav';
import { BlogRelated } from './blog-related';

/**
 * BlogArticle
 * Rendu complet d'un article de blog avec TOC, progress bar, navigation et articles connexes.
 *
 * Security note: contentHtml and jsonLd are generated at build time from
 * Markdown files committed to the git repository. No user-supplied or
 * untrusted input is ever rendered. HTML is sanitized by remark-html
 * with { sanitize: true } in lib/blog.js.
 */
export function BlogArticle({ post, adjacentPosts, relatedPosts }) {
  const { title, date, category, tags, description, thumbnail, contentHtml, readingTime, headings } = post;
  const { prev, next } = adjacentPosts || {};

  // Injecte les id sur les h2/h3 pour les ancres de la TOC
  const contentWithIds = addHeadingIds(contentHtml);

  // JSON-LD BlogPosting
  const blogPostingLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Person',
      name: site.name,
      url: site.url,
    },
    publisher: {
      '@type': 'Person',
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site.url}/blog/${post.slug}`,
    },
    ...(thumbnail && { image: `${site.url}${thumbnail}` }),
    ...(tags && tags.length > 0 && { keywords: tags.join(', ') }),
  };

  // JSON-LD BreadcrumbList pour les rich snippets Google
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site.url}/blog` },
      { '@type': 'ListItem', position: 3, name: title, item: `${site.url}/blog/${post.slug}` },
    ],
  };

  // Build-time only JSON — safe to inject
  const jsonLdHtml = JSON.stringify([blogPostingLd, breadcrumbLd]);

  return (
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-[720px] lg:max-w-[860px]">
        {/* JSON-LD SEO — trusted build-time data only, sanitized by remark-html */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdHtml }}
        />

        {/* -- HEADER -- */}
        <header className="mb-10 space-y-6 sm:mb-14">
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

          <div className="h-px bg-gradient-to-r from-accent/40 via-accent/10 to-transparent" />

          <h1 className="text-balance text-[28px] font-bold leading-[1.15] tracking-tight text-fg sm:text-[36px] lg:text-[42px]">
            {title}
          </h1>

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

        {/* -- THUMBNAIL -- */}
        {thumbnail && (
          <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-lg border border-border sm:mb-14">
            <Image
              src={thumbnail}
              alt={`Illustration for ${title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 720px, 860px"
              quality={80}
              priority
              fetchPriority="high"
            />
          </div>
        )}

        {/* -- TABLE OF CONTENTS -- */}
        <TableOfContents headings={headings} />

        {/* -- PROSE CONTENT --
             Trusted build-time HTML from git-committed Markdown files.
             Sanitized by remark-html with { sanitize: true } in lib/blog.js. */}
        <div
          className="blog-prose prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: contentWithIds }}
        />

        {/* -- PREV / NEXT -- */}
        <BlogNav prev={prev} next={next} />

        {/* -- RELATED ARTICLES -- */}
        <BlogRelated posts={relatedPosts} />

        {/* -- FOOTER -- */}
        <footer className="mt-10 border-t border-border/40 pt-8 sm:mt-14">
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
    </>
  );
}
