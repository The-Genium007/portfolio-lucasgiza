import { getAllPosts } from '@/lib/blog';
import { site } from '@/data/site';

// Force le pre-rendu statique au build (sinon Next.js le rend dynamique a cause de new Date())
export const dynamic = 'force-static';

/**
 * Route Handler RSS 2.0 — genere un flux XML statique au build time.
 * Accessible sur : /blog/feed.xml
 */
export function GET() {
  const posts = getAllPosts();
  const base = site.url.replace(/\/$/, '');

  const items = posts
    .map((post) => {
      const url = `${base}/blog/${post.slug}`;
      const pubDate = post.date ? new Date(post.date).toUTCString() : '';
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${pubDate}</pubDate>
      ${post.category ? `<category>${escapeXml(post.category)}</category>` : ''}
      ${post.tags.map((t) => `<category>${escapeXml(t)}</category>`).join('\n      ')}
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)} — Blog</title>
    <link>${base}/blog</link>
    <description>${escapeXml('Articles about web development, technology, and creative projects.')}</description>
    <language>${site.locale || 'en'}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${base}/blog/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
