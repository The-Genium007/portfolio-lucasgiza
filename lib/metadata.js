import { site } from '../data/site';

/**
 * Construit la metadata de base du site.
 * Permet d'étendre plus tard avec des overrides spécifiques page.
 * @param {Partial<import('next').Metadata>} overrides - valeurs à surcharger.
 * @returns {import('next').Metadata}
 */
export function baseMetadata(overrides = {}) {
  const baseTitle = `${site.title} – ${site.name}`;
  const base = {
    title: baseTitle,
    description: site.description,
    metadataBase: new URL(site.url || 'https://example.com'),
    alternates: {
      canonical: site.url || 'https://example.com'
    },
    manifest: '/site.webmanifest',
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
      ],
      apple: '/apple-touch-icon.png',
    },
    openGraph: {
      title: baseTitle,
      description: site.description,
      locale: site.locale,
      type: 'website',
      url: site.url || 'https://example.com'
    },
    twitter: {
      card: 'summary_large_image',
      title: baseTitle,
      description: site.description
    }
  };
  // Merge superficiel suffisant ici
  return { ...base, ...overrides };
}
