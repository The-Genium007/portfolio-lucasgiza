import { useEffect, useRef, useState } from 'react';

/**
 * useScrollSpy
 * Observe une liste d'IDs de sections et renvoie l'ID actuellement active dans le viewport.
 * Priorité à la section la plus haute visible; fallback sur la dernière dépassée lors du scroll.
 *
 * @param {string[]} sectionIds - Identifiants DOM des sections à observer.
 * @param {Object} options
 * @param {number} [options.offset=120] - Décalage top appliqué pour activer plus tôt (ex: hauteur header).
 * @param {string} [options.rootMargin] - Override rootMargin complet si besoin (sinon calculé depuis offset).
 * @returns {string|null}
 */
export function useScrollSpy(sectionIds, options = {}) {
  const { offset = 120, rootMargin } = options;
  const [active, setActive] = useState(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    if (!Array.isArray(sectionIds) || sectionIds.length === 0) return;

    // Récupère les éléments valides
    const elements = sectionIds
      .map((id) => (typeof id === 'string' ? document.getElementById(id) : null))
      .filter(Boolean);
    if (elements.length === 0) return;

    let frame = null;

    const handleIntersect = (entries) => {
      // Regrouper logique dans un RAF pour éviter rafales setState
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) {
          const next = visible[0].target.id;
          if (next && next !== activeRef.current) {
            activeRef.current = next;
            setActive(next);
          }
          return;
        }

        // Fallback: dernière section au-dessus du seuil
        let current = activeRef.current;
        for (const el of elements) {
          const rect = el.getBoundingClientRect();
            if (rect.top - offset <= 0) current = el.id;
        }
        if (current !== activeRef.current) {
          activeRef.current = current;
          setActive(current);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: rootMargin || `-${offset}px 0px -60% 0px`,
      threshold: [0, 0.15, 0.33, 0.66, 1]
    });
    elements.forEach((el) => observer.observe(el));
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [sectionIds, offset, rootMargin]);

  return active;
}

