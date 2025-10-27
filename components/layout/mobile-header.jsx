import { site } from '@/data/site';

// En-tête affiché uniquement sur mobile/tablette (caché sur large où la sidebar contient déjà le h1 principal)
export function MobileHeader() {
  return (
    <header className="lg:hidden pt-8 pb-6" aria-label="En-tête du site">
      <h1 className="text-h2 font-semibold tracking-tight text-fg">{site.name}</h1>
    </header>
  );
}
