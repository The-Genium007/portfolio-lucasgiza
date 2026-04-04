import { getAllPosts, getCategories } from '@/lib/blog';
import { BlogList } from '@/sections/blog/blog-list';
import { baseMetadata } from '@/lib/metadata';
import { site } from '@/data/site';

// Metadata statique pour la page /blog — utilisée par Next.js pour générer les balises <head>.
// Open Graph (og:) est utilisé par Facebook, LinkedIn, Discord quand quelqu'un partage ton lien.
// Twitter Card est utilisé par Twitter/X pour afficher un aperçu.
export const metadata = baseMetadata({
  title: `Blog – ${site.name}`,
  description: 'Articles about web development, technology, and creative projects.',
  alternates: { canonical: `${site.url}/blog` },
  openGraph: {
    title: `Blog – ${site.name}`,
    description: 'Articles about web development, technology, and creative projects.',
    url: `${site.url}/blog`,
    type: 'website',
  },
  twitter: {
    title: `Blog – ${site.name}`,
    description: 'Articles about web development, technology, and creative projects.',
  },
});

// Cette fonction est un Server Component : elle s'exécute au build time sur Node.js.
// Elle a accès au filesystem (fs) via getAllPosts() — ce code ne sera jamais envoyé au navigateur.
export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <div className="space-y-16" id="blog">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-micro font-mono tracking-widest text-fgSoft">BLOG</h2>
          <a
            href="/blog/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-glass-a04 px-3 py-1.5 text-[12px] font-medium text-fgSoft transition-all duration-200 hover:border-accent hover:text-accent hover:bg-glass-a08"
            title="Subscribe via RSS"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="6.18" cy="17.82" r="2.18" />
              <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
            </svg>
            RSS
          </a>
        </div>
        <p className="max-w-2xl text-[13px] leading-relaxed text-fgSoft">
          Thoughts on web development, technology, and creative projects.
        </p>
      </div>
      {/* BlogList est un Client Component ("use client") pour gérer les filtres interactifs.
          On lui passe les données pré-calculées depuis le serveur. */}
      <BlogList posts={posts} categories={categories} />
    </div>
  );
}
