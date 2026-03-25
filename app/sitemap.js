// Sitemap généré statiquement par Next.js (App Router)
// Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
import { site } from '@/data/site';
import { getAllPosts } from '@/lib/blog';

export default function sitemap() {
  const base = site.url.replace(/\/$/, '');
  const now = new Date();

  // Routes statiques du portfolio
  const staticRoutes = [
    '', // homepage
    '/experience',
    '/projects',
    '/personal-projects',
    '/skills',
  ];

  const staticEntries = staticRoutes.map((path) => ({
    url: `${base}${path || '/'}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1.0 : 0.7,
  }));

  // Page liste du blog
  const blogIndex = {
    url: `${base}/blog`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  };

  // Pages individuelles des articles — la date de publication comme lastModified
  const posts = getAllPosts();
  const blogPosts = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, blogIndex, ...blogPosts];
}
