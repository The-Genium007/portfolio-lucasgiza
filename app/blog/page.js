import { getAllPosts, getCategories } from '@/lib/blog';
import { SectionHeading } from '@/components/ui/section-heading';
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
        <SectionHeading title="Blog" minimal />
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
