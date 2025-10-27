export const skills = [
  // Catégorie Front-end
  {
    slug: 'react',
    name: 'React',
    category: 'front-end',
    level: 'proficient',
    description: `Reusable components, state management (custom hooks, context), performance optimization (memoization, experimental Suspense), accessibility best practices.`
  },
  {
    slug: 'nextjs',
    name: 'Next.js',
    category: 'back-end',
    level: 'beginner',
    description: `App Router basics, pages & routes, server/client components, simple deployment.`
  },
  {
    slug: 'tailwind',
    name: 'TailwindCSS',
    category: 'front-end',
    level: 'beginner',
    description: `Core utilities, responsive, spacing/colors/typography, simple components.`
  },
  {
    slug: 'accessibility',
    name: 'Accessibility',
    category: 'front-end',
    level: 'beginner',
    description: `ARIA basics, labels, visible focus, contrast, simple keyboard navigation.`
  },
  {
    slug: 'performance',
    name: 'Web Performance',
    category: 'front-end',
    level: 'beginner',
    description: `Lighthouse basics, lazy images, basic code-splitting, simple best practices.`
  },
  {
    slug: 'javascript',
    name: 'JavaScript',
    category: 'front-end',
    level: 'proficient',
    description: `ES6+ (modules, async/await), DOM & events, patterns (FP/OOP), performance & profiling, tooling (Vite/Webpack), testing (Jest), TS interop.`
  },
  // ctégorie Back-end
  {
    slug: 'nodejs',
    name: 'Node.js',
    category: 'back-end',
    level: 'beginner',
    description: `Simple server, basic Express, routes & middleware, environment variables.`
  },
  {
    slug: 'n8n',
    name: 'n8n',
    category: 'back-end',
    level: 'proficient',
    description: `Low‑code automation: webhooks, multi‑step orchestrations, integrations (HTTP, Slack, GitHub…), encrypted credentials/variables, error handling/retries, self‑hosting (Docker), cron triggers, API rate‑limit handling.`
  },
  {
    slug: 'postgresql',
    name: 'PostgreSQL',
    category: 'back-end',
    level: 'beginner',
    description: `Simple schema, CRUD, primary/foreign keys, basic indexes, SELECT/WHERE/ORDER.`
  },
  {
    slug: 'redis',
    name: 'Redis',
    category: 'back-end',
    level: 'beginner',
    description: `Simple cache, key/value, TTL, basic data structures (lists/sets).`
  },
  {
    slug: 'directus',
    name: 'Directus CMS',
    category: 'back-end',
    level: 'beginner',
    description: `Basic collections, simple permissions, basic REST/GraphQL, asset uploads.`
  },
  // Catégorie dev-ops
  {
    slug: 'dokploy',
    name: 'Dokploy',
    category: 'dev-ops',
    level: 'beginner',
    description: `Deploy a Docker app, environment variables, domains/SSL via the UI.`
  },
  {
    slug: 'loki',
    name: 'Grafana Loki',
    category: 'dev-ops',
    level: 'beginner',
    description: `Collect logs with Promtail, simple search in Grafana, basic filters.`
  },
 
  // Catégorie Others
  {
    slug: 'notion',
    name: 'Notion',
    category: 'others',
    level: 'proficient',
    description: `Linked databases, relations/rollups, advanced templates, dashboards, permissions & sharing, light automations.`
  },
  {
    slug: 'figma',
    name: 'Figma',
    category: 'others',
    level: 'beginner',
    description: `Frames, basic Auto‑Layout, basic styles, simple components, asset export.`
  },
  {
    slug: 'github-actions',
    name: 'GitHub Actions',
    category: 'others',
    level: 'beginner',
    description: `Simple workflow (build/test), basic secrets, npm cache, basic jobs.`
  },
  {
    slug: 'git',
    name: 'Git',
    category: 'others',
    level: 'beginner',
    description: `Commit/pull/push, branches, simple PRs, basic merge/rebase.`
  },
];

export const skillCategories = [
  { key: 'front-end', label: 'Front-end' },
  { key: 'back-end', label: 'Back-end' },
  { key: 'dev-ops', label: 'Dev-ops' },
  { key: 'others', label: 'Others' },
];
