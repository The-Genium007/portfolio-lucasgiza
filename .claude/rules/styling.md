---
paths:
  - "styles/**/*.css"
  - "tailwind.config.mjs"
---

# Règles styling et design tokens

- Les design tokens sont définis dans `styles/tokens.css` comme CSS custom properties
- Ne jamais utiliser de couleurs hex directement — toujours passer par les tokens (ex: `var(--color-accent)`, `bg-accent`)
- Le thème est dark-first — toutes les couleurs sont pensées pour un fond sombre
- Tailwind v4 : la config est dans `tailwind.config.mjs`, le plugin PostCSS dans `postcss.config.mjs`
- Effets glass : utiliser les variables glass définies dans tokens.css
- Responsive : mobile-first avec breakpoint `md:` pour desktop
