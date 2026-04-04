import Link from 'next/link';

/**
 * BlogNav
 * Navigation article precedent / suivant en bas de page.
 * prev = article plus recent, next = article plus ancien (ordre chrono desc).
 */
export function BlogNav({ prev, next }) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Article navigation"
      className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group rounded-lg border border-border/60 bg-glass-a04 px-5 py-4 transition-all duration-200 hover:border-border-strong hover:bg-glass-a08"
        >
          <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-fgSoft">
            <span
              className="mr-1 inline-block transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            >
              &larr;
            </span>
            Previous
          </span>
          <span className="block text-[14px] font-semibold leading-snug text-fg transition-colors duration-200 group-hover:text-white">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group rounded-lg border border-border/60 bg-glass-a04 px-5 py-4 text-right transition-all duration-200 hover:border-border-strong hover:bg-glass-a08"
        >
          <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-fgSoft">
            Next
            <span
              className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </span>
          <span className="block text-[14px] font-semibold leading-snug text-fg transition-colors duration-200 group-hover:text-white">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
