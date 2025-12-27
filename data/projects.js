export const projects = [
  {
    title: 'Tumult',
    slug: 'tumult',
    description: 'Application for game masters running tabletop RPGs. It lets you launch polls across multiple livestreams and aggregate data from several streams at once.',
    highlights: [
      'Vue.js front-end with Nuxt 3 and Nuxt UI',
      'AdonisJS v6 API with Lucid ORM (PostgreSQL)',
      'Real-time polls via Transmit (WebSocket)',
      'Redis 7 caching + session/JWT auth',
      'Dockerized infra with Dokploy and GitHub Actions'
    ],
    tech: [
      'Vue.js',
      'Nuxt 3',
      'AdonisJS v6',
      'PostgreSQL',
      'Redis',
      'Transmit',
      'Vite PWA',
      'Docker',
      'Dokploy',
      'GitHub Actions',
      'Twitch Helix API',
      'Sentry'
    ],
    repo: 'https://github.com/The-Genium007/Tumulte',
    image: '/images/projects/tumulte.png',
    year: 2025
  },
  {
    title: 'Personal Portfolio',
    slug: 'personal-portfolio',
    description: 'My personal portfolio built with Next.js, React and Tailwind CSS. Simple, fast, and easy to maintain.',
    highlights: [
      'Next.js App Router',
      'Tailwind CSS v4 tokens',
      'Accessible, responsive navigation',
      'Modular sections (projects, experience, skills)',
      'Basic SEO metadata'
    ],
    repo: "https://github.com/The-Genium007/portfolio-lucasgiza",
    tech: ['Next.js','React','TailwindCSS','React Icons','ESLint','Prettier'],
    image: '/images/projects/portfolio-lucasgiza.png',
    year: 2025,
    featured: true
  }
];
