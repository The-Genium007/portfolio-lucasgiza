import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Chemin absolu vers le dossier contenant les articles Markdown.
// process.cwd() retourne la racine du projet Next.js au moment du build.
const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Transforme une chaîne en slug URL-safe.
 * "Voilà pourquoi OpenClaw ne sert à rien" → "voila-pourquoi-openclaw-ne-sert-a-rien"
 */
function slugify(str) {
  return str
    .normalize('NFD')              // décompose les accents (à → a + ◌̀)
    .replace(/[\u0300-\u036f]/g, '') // supprime les diacritiques
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')  // remplace tout ce qui n'est pas alphanum par -
    .replace(/^-|-$/g, '');        // supprime les - en début/fin
}

/**
 * Résout le chemin thumbnail vers sa version WebP optimisée si elle existe.
 * Ex : "/images/blog/photo.png" → "/images/blog/photo.webp" (si le .webp est présent dans public/)
 * Si pas de version optimisée, retourne le chemin original tel quel.
 */
function resolveOptimizedThumbnail(thumbnail) {
  if (!thumbnail) return null;
  const ext = path.extname(thumbnail).toLowerCase();
  if (ext === '.webp' || ext === '.avif') return thumbnail;

  const webpVariant = thumbnail.replace(/\.(png|jpe?g|gif|bmp|tiff?)$/i, '.webp');
  const webpFullPath = path.join(process.cwd(), 'public', webpVariant);

  return fs.existsSync(webpFullPath) ? webpVariant : thumbnail;
}

/**
 * Construit un mapping slug URL-safe → nom de fichier réel.
 * Permet de retrouver "voilà-pourquoi-openclaw-ne-sert-à-rien.md"
 * à partir du slug "voila-pourquoi-openclaw-ne-sert-a-rien".
 */
function buildSlugMap() {
  if (!fs.existsSync(POSTS_DIR)) return new Map();
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
  const map = new Map();
  for (const filename of files) {
    const rawSlug = filename.replace(/\.md$/, '');
    map.set(slugify(rawSlug), filename);
  }
  return map;
}

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
      const slug = slugify(filename.replace(/\.md$/, ''));
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
        thumbnail: resolveOptimizedThumbnail(data.thumbnail),
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
  const normalizedSlug = slugify(slug);
  const slugMap = buildSlugMap();
  const filename = slugMap.get(normalizedSlug);

  if (!filename) return null;

  const filepath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filepath, 'utf-8');
  const { data, content } = matter(raw);

  // remark est async car certains plugins peuvent faire des opérations asynchrones.
  // .use(html) ajoute le plugin remark-html à la chaîne de transformation.
  // .process() lance toute la chaîne : parse → transform → stringify.
  const result = await remark().use(html, { sanitize: true }).process(content);

  // .toString() convertit le VFile (format interne de unified) en string HTML
  const contentHtml = result.toString();

  // Temps de lecture estimé : on compte les mots et on divise par 200 mots/min (moyenne adulte)
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return {
    slug: normalizedSlug,
    title: data.title || normalizedSlug,
    date: data.date ? new Date(data.date).toISOString() : null,
    category: data.category || null,
    tags: data.tags || [],
    description: data.description || '',
    thumbnail: resolveOptimizedThumbnail(data.thumbnail),
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
