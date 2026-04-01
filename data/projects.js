export const projects = [
  {
    title: 'Nerva',
    slug: 'nerva',
    description:
      'Nutrition application designed for endurance athletes. Helps track and optimize dietary intake for peak performance.',
    highlights: [
      'Vue.js + Capacitor cross-platform mobile app',
      'Rust backend powered by Axum',
      'PostgreSQL database for reliable data storage',
    ],
    tech: ['Rust', 'Axum', 'Vue.js', 'TypeScript', 'Capacitor', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
    // image: '/images/projects/nerva.png',
    year: 2025,
    wip: true,
  },
  {
    title: 'Tumulte',
    slug: 'tumulte',
    description: 'Application for game masters running tabletop RPGs. It lets you launch polls across multiple livestreams and aggregate data from several streams at once.',
    highlights: [
      'Vue.js front-end with Nuxt 3 and Nuxt UI',
      'AdonisJS v6 API with Lucid ORM (PostgreSQL)',
      'Real-time polls via Transmit (WebSocket)',
      'Redis 7 caching + session/JWT auth',
      'Dockerized infra with Dokploy and GitHub Actions'
    ],
    tech: ['Vue.js', 'Nuxt 3', 'AdonisJS v6', 'TypeScript', 'PostgreSQL', 'Redis', 'Foundry VTT API', 'Docker', 'Prometheus', 'GitHub Actions'],
    link: 'https://tumulte.app',
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
    tech: ['Next.js','React','Decap CMS','TailwindCSS','React Icons','ESLint','Prettier'],
    image: '/images/projects/portfolio-lucasgiza.png',
    year: 2025,
    featured: true
  }
];
