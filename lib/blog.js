import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Chemin absolu vers le dossier contenant les articles Markdown.
// process.cwd() retourne la racine du projet Next.js au moment du build.
const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Lit tous les articles publiés, triés du plus récent au plus ancien.
 * Appelée par la page /blog pour afficher la liste.
 *
 * Chaque article retourné contient uniquement les métadonnées (pas le HTML),
 * ce qui garde la page liste légère.
 */
export function getAllPosts() {
  // Si le dossier n'existe pas encore (premier build sans article), on retourne un tableau vide
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8');

      // gray-matter sépare le frontmatter YAML (data) du contenu Markdown (content)
      const { data } = matter(raw);

      return {
        slug,
        title: data.title || slug,
        date: data.date ? new Date(data.date).toISOString() : null,
        category: data.category || null,
        tags: data.tags || [],
        description: data.description || '',
        thumbnail: data.thumbnail || null,
        draft: data.draft || false,
      };
    })
    // On exclut les brouillons du site public
    .filter((post) => !post.draft)
    // Tri par date décroissante (le plus récent en premier)
    .sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date) - new Date(a.date);
    });

  return posts;
}

/**
 * Récupère un article complet par son slug : métadonnées + contenu HTML.
 * Appelée par la page /blog/[slug] pour afficher un article.
 *
 * Le pipeline de transformation :
 *   fichier .md → gray-matter (sépare frontmatter) → remark (parse MD en AST) → remark-html (AST → HTML)
 */
export async function getPostBySlug(slug) {
  const filepath = path.join(POSTS_DIR, `${slug}.md`);

  if (!fs.existsSync(filepath)) return null;

  const raw = fs.readFileSync(filepath, 'utf-8');
  const { data, content } = matter(raw);

  // remark est async car certains plugins peuvent faire des opérations asynchrones.
  // .use(html) ajoute le plugin remark-html à la chaîne de transformation.
  // .process() lance toute la chaîne : parse → transform → stringify.
  const result = await remark().use(html).process(content);

  // .toString() convertit le VFile (format interne de unified) en string HTML
  const contentHtml = result.toString();

  // Temps de lecture estimé : on compte les mots et on divise par 200 mots/min (moyenne adulte)
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return {
    slug,
    title: data.title || slug,
    date: data.date ? new Date(data.date).toISOString() : null,
    category: data.category || null,
    tags: data.tags || [],
    description: data.description || '',
    thumbnail: data.thumbnail || null,
    contentHtml,
    readingTime,
  };
}

/**
 * Extrait la liste des catégories uniques à partir de tous les articles publiés.
 * Utilisée pour les filtres de catégories sur la page /blog.
 */
export function getCategories() {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))];
  return categories.sort();
}
