import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { BlogArticle } from '@/sections/blog/blog-article';
import { baseMetadata } from '@/lib/metadata';
import { site } from '@/data/site';

/**
 * generateStaticParams — exécuté au build time.
 *
 * Next.js appelle cette fonction pour savoir quelles pages statiques créer.
 * On retourne un tableau d'objets { slug } — un par article.
 * Chaque slug génère une page HTML statique : /blog/mon-article → blog/mon-article.html
 *
 * Sans cette fonction, Next.js ne saurait pas quels articles existent
 * et ne pourrait pas les pré-rendre.
 */
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/**
 * generateMetadata — exécuté au build time pour chaque page.
 *
 * Génère les balises <head> dynamiquement pour chaque article :
 * - <title> et <meta description> pour Google
 * - Open Graph (og:title, og:description, og:image) pour le partage social
 * - Twitter Card pour Twitter/X
 * - type "article" avec publishedTime et tags (schema Open Graph spécifique aux articles)
 *
 * C'est ce qui fait que quand quelqu'un partage ton article sur LinkedIn ou Discord,
 * il voit le bon titre, la bonne description et la bonne image.
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return baseMetadata({ title: 'Post Not Found' });
  }

  const title = `${post.title} – ${site.name}`;
  const url = `${site.url}/blog/${slug}`;

  return baseMetadata({
    title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [site.name],
      tags: post.tags,
      ...(post.thumbnail && {
        images: [{ url: post.thumbnail, width: 1200, height: 630, alt: post.title }],
      }),
    },
    twitter: {
      title,
      description: post.description,
      ...(post.thumbnail && { images: [post.thumbnail] }),
    },
  });
}

/**
 * Page article — Server Component.
 *
 * params.slug est fourni par Next.js à partir de l'URL.
 * getPostBySlug lit le fichier .md, parse le frontmatter et transforme le Markdown en HTML.
 * Si le slug ne correspond à aucun fichier, notFound() affiche la page 404.
 */
export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return <BlogArticle post={post} />;
}
