'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { BlogCard } from './blog-card';

/**
 * BlogList
 * Affiche la liste des articles avec un filtre par catégorie.
 *
 * "use client" car on utilise useState pour le filtre actif.
 * Les données (posts, categories) sont passées en props depuis la page serveur
 * pour garder le data-fetching côté serveur.
 */
export function BlogList({ posts, categories }) {
  const [activeCategory, setActiveCategory] = useState(null);

  // Filtrage côté client : rapide car la liste est déjà en mémoire
  const filtered = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  return (
    <div className="space-y-8">
      {/* Filtres de catégories — scroll horizontal sur mobile */}
      {categories.length > 0 && (
        <div
          role="group"
          aria-label="Filter articles by category"
          className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-none"
        >
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            aria-pressed={activeCategory === null}
          >
            <Badge
              size="sm"
              variant={activeCategory === null ? 'solid' : 'outline'}
              className="cursor-pointer transition-colors"
            >
              All
            </Badge>
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              <Badge
                size="sm"
                variant={activeCategory === cat ? 'solid' : 'outline'}
                className="cursor-pointer transition-colors capitalize"
              >
                {cat}
              </Badge>
            </button>
          ))}
        </div>
      )}

      {/* Liste des articles */}
      <div aria-live="polite">
        {filtered.length > 0 ? (
          <ul className="space-y-6 no-hover-underline">
            {filtered.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </ul>
        ) : (
          <p className="text-micro text-fgSoft py-8">No articles found.</p>
        )}
      </div>
    </div>
  );
}
