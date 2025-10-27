// Sitemap généré statiquement par Next.js (App Router)
// Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
import { site } from '@/data/site';

// Si tu ajoutes de nouvelles routes pages, complète simplement le tableau staticRoutes.
// Pour des routes dynamiques, on pourrait plus tard aller chercher des données.

export default function sitemap() {
  const base = site.url.replace(/\/$/, '');

  // Routes principales (ajouter si besoin)
  const staticRoutes = [
    '', // homepage
    '/experience',
    '/projects',
    '/personal-projects',
    '/skills'
  ];

  const now = new Date();

  return staticRoutes.map((path) => ({
    url: `${base}${path || '/'}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1.0 : 0.7
  }));
}
