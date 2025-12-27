export const skills = [
  // Catégorie Front-end
  {
    slug: 'html-css',
    name: 'HTML/CSS',
    category: 'front-end',
    level: 'proficient',
    description: `Semantic markup, forms & validation, SEO best practices, accessibility attributes, Flexbox & Grid, animations, responsive design, CSS variables, modern layouts.`
  },
  {
    slug: 'javascript-typescript',
    name: 'JavaScript/TypeScript',
    category: 'front-end',
    level: 'proficient',
    description: `ES6+ (modules, async/await), DOM & events, patterns (FP/OOP), TypeScript typing & tooling, performance & profiling, tooling (Vite/Webpack), testing (Jest).`
  },
  {
    slug: 'react-nextjs',
    name: 'React/Next.js',
    category: 'front-end',
    level: 'proficient',
    description: `Reusable components, state management (custom hooks, context), performance basics, Next.js App Router, pages & routes, server/client components, deployment basics.`
  },
  {
    slug: 'vuejs-nuxtjs',
    name: 'Vue.js/Nuxt.js',
    category: 'front-end',
    level: 'proficient',
    description: `Single-file components, component composition, reactivity, directives, routing basics, Nuxt app structure, SSR/SSG basics.`
  },
  {
    slug: 'redux',
    name: 'Redux',
    category: 'front-end',
    level: 'beginner',
    description: `Basic state management, simple actions/reducers, connecting components to store.`
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
  // ctégorie Back-end
  {
    slug: 'nodejs',
    name: 'Node.js',
    category: 'back-end',
    level: 'beginner',
    description: `Simple server, basic Express, routes & middleware, environment variables. Currently learning; my #1 priority.`
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
  // Catégorie dev-ops
  {
    slug: 'docker',
    name: 'Docker',
    category: 'dev-ops',
    level: 'beginner',
    description: `Images & containers, Dockerfiles, volumes, networking, Compose basics.`
  },
  {
    slug: 'docker-swarm',
    name: 'Docker Swarm',
    category: 'dev-ops',
    level: 'beginner',
    description: `Swarm mode, services & stacks, replicas, rolling updates, overlay networks.`
  },
  {
    slug: 'dokploy',
    name: 'Dokploy',
    category: 'dev-ops',
    level: 'beginner',
    description: `Deploy a Docker app, environment variables, domains/SSL via the UI.`
  },
  {
    slug: 'cloudflare-tunnel',
    name: 'Cloudflare Tunnel',
    category: 'dev-ops',
    level: 'beginner',
    description: `Secure tunnels, expose private services, basic access policies, DNS routing.`
  },
 
  // Catégorie Others
  {
    slug: 'git',
    name: 'Git',
    category: 'others',
    level: 'beginner',
    description: `Commit/pull/push, branches, simple PRs, basic merge/rebase.`
  },
  {
    slug: 'github-actions',
    name: 'GitHub Actions',
    category: 'others',
    level: 'beginner',
    description: `Simple workflow (build/test), basic secrets, npm cache, basic jobs.`
  },
  {
    slug: 'figma',
    name: 'Figma',
    category: 'others',
    level: 'beginner',
    description: `Frames, basic Auto‑Layout, basic styles, simple components, asset export.`
  },
  {
    slug: 'notion',
    name: 'Notion',
    category: 'others',
    level: 'proficient',
    description: `Linked databases, relations/rollups, advanced templates, dashboards, permissions & sharing, light automations.`
  },
];

export const skillCategories = [
  { key: 'front-end', label: 'Front-end' },
  { key: 'back-end', label: 'Back-end' },
  { key: 'dev-ops', label: 'Dev-ops' },
  { key: 'others', label: 'Others' },
];
