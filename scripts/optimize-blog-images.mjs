/**
 * optimize-blog-images.mjs
 *
 * Pipeline build-time : scanne les articles de blog, détecte les thumbnails
 * PNG/JPG et génère des copies WebP compressées + redimensionnées.
 *
 * - Exécuté automatiquement via le hook "prebuild" dans package.json
 * - Utilise sharp (déjà présent via Next.js) — zéro dépendance ajoutée
 * - Cache basé sur taille+mtime pour ne pas re-traiter les images inchangées
 * - Ne modifie PAS les fichiers markdown (la résolution WebP se fait dans lib/blog.js)
 *
 * Usage : node scripts/optimize-blog-images.mjs
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

// gray-matter est un CJS module — on utilise createRequire pour l'importer depuis un .mjs
const require = createRequire(import.meta.url);
const matter = require('gray-matter');

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const PUBLIC_DIR = path.join(ROOT, 'public');
const CACHE_FILE = path.join(ROOT, '.blog-image-cache.json');

// Paramètres d'optimisation
const MAX_WIDTH = 1200;
const WEBP_QUALITY = 80;
const PROCESSABLE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff']);

// ── Helpers ──

function loadCache() {
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function saveCache(cache) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function toWebpPath(filePath) {
  return filePath.replace(/\.(png|jpe?g|gif|bmp|tiff?)$/i, '.webp');
}

// ── Main ──

async function main() {
  // sharp est un module natif optionnel — on le charge dynamiquement
  // pour que le script échoue gracieusement si sharp n'est pas disponible
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.log('[optimize-blog-images] sharp not available, skipping optimization');
    return;
  }

  if (!fs.existsSync(CONTENT_DIR)) {
    console.log('[optimize-blog-images] No content/blog/ directory, nothing to optimize');
    return;
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
  if (files.length === 0) {
    console.log('[optimize-blog-images] No markdown files found');
    return;
  }

  const cache = loadCache();
  let optimized = 0;
  let skipped = 0;
  let totalSaved = 0;

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    const { data } = matter(raw);

    if (!data.thumbnail) continue;

    const ext = path.extname(data.thumbnail).toLowerCase();

    // Déjà un format optimisé — rien à faire
    if (!PROCESSABLE_EXTS.has(ext)) {
      skipped++;
      continue;
    }

    const sourcePath = path.join(PUBLIC_DIR, data.thumbnail);
    if (!fs.existsSync(sourcePath)) {
      console.log(`[skip] ${data.thumbnail} — file not found in public/`);
      continue;
    }

    // Vérifier le cache (clé = chemin + taille + date de modification)
    const stat = fs.statSync(sourcePath);
    const cacheKey = `${stat.size}:${stat.mtimeMs}`;
    const webpPublicPath = toWebpPath(sourcePath);

    if (cache[data.thumbnail] === cacheKey && fs.existsSync(webpPublicPath)) {
      skipped++;
      continue;
    }

    // Créer le dossier de destination si nécessaire
    const destDir = path.dirname(webpPublicPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Optimiser : resize + conversion WebP
    await sharp(sourcePath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpPublicPath);

    const optimizedSize = fs.statSync(webpPublicPath).size;
    const saved = stat.size - optimizedSize;
    const percent = ((saved / stat.size) * 100).toFixed(1);

    console.log(
      `[optimized] ${data.thumbnail} → .webp (${formatBytes(stat.size)} → ${formatBytes(optimizedSize)}, -${percent}%)`
    );

    cache[data.thumbnail] = cacheKey;
    optimized++;
    totalSaved += saved;
  }

  saveCache(cache);

  console.log(
    `\n[optimize-blog-images] Done: ${optimized} optimized, ${skipped} skipped` +
      (totalSaved > 0 ? `, ${formatBytes(totalSaved)} saved` : '')
  );
}

main().catch((err) => {
  console.error('[optimize-blog-images] Error:', err);
  // Ne pas faire échouer le build si l'optimisation échoue
  process.exit(0);
});
