---
paths:
  - "components/**/*.jsx"
  - "sections/**/*.jsx"
---

# Règles composants React

- Utiliser `'use client'` uniquement quand nécessaire (événements, hooks, état)
- Par défaut, les composants sont des Server Components (pas de directive)
- Nommage : kebab-case pour les fichiers, PascalCase pour les composants
- Props : destructuration directe dans la signature de fonction
- Styling : classes Tailwind via `cn()` de `@/lib/cn` — jamais de CSS inline ni de CSS modules
- Icons : utiliser `react-icons` — importer uniquement l'icône nécessaire (ex: `import { FaGithub } from 'react-icons/fa'`)
- Images : toujours utiliser `next/image` avec `alt` descriptif
- Composants UI réutilisables dans `components/ui/` — utiliser `class-variance-authority` pour les variants
