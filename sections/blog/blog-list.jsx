'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { BlogCard } from './blog-card';

/**
 * BlogList
 * Affiche la liste des articles avec recherche textuelle et filtre par categorie.
 *
 * "use client" car on utilise useState pour le filtre actif et la recherche.
 * Les donnees (posts, categories) sont passees en props depuis la page serveur
 * pour garder le data-fetching cote serveur.
 */
export function BlogList({ posts, categories }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState('');

  // Filtrage cote client : categorie + recherche textuelle
  const filtered = posts.filter((p) => {
    if (activeCategory && p.category !== activeCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const inTitle = p.title.toLowerCase().includes(q);
      const inDesc = p.description.toLowerCase().includes(q);
      const inTags = p.tags.some((t) => t.toLowerCase().includes(q));
      if (!inTitle && !inDesc && !inTags) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Search input */}
      <div className="relative">
        <input
          type="search"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search articles"
          className="w-full rounded-lg border border-border/60 bg-glass-a04 px-4 py-2.5 pl-10 text-[13px] text-fg placeholder:text-fgSoft/60 outline-none transition-colors duration-200 focus:border-accent focus:bg-glass-a08"
        />
        <svg
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-fgSoft"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>

      {/* Filtres de categories — scroll horizontal sur mobile */}
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
