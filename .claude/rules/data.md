---
paths:
  - "data/**/*.js"
---

# Règles fichiers de données

- Les fichiers dans `data/` sont des exports nommés d'objets/tableaux JS
- Structure plate : pas de fetch, pas de logique — uniquement des données statiques
- Chaque fichier correspond à une section du portfolio
- Les URLs, descriptions et métadonnées sont ici — pas dans les composants
- Quand on ajoute un projet : mettre à jour `data/projects.js` ou `data/personal-projects.js`
