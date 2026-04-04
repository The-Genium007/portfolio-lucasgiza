import { Hero } from '@/sections/home/hero';
import { ExperienceList } from '@/sections/experience/experience-list';
import { SkillsSection } from '@/sections/skills';
import { ProjectsGrid } from '@/sections/projects/projects-grid';
import { PersonalProjectsGrid } from '@/sections/projects/personal-projects-grid';
import Link from 'next/link';
import { baseMetadata } from '@/lib/metadata';
import { site } from '@/data/site';

export const metadata = baseMetadata({
  title: `${site.name} – Full-Stack Developer | Portfolio`,
  description:
    'Portfolio of Lucas GIZA, Full-Stack Developer specializing in React, Next.js, Node.js, and DevOps. Explore projects, experience, and technical articles.',
  alternates: { canonical: site.url },
  openGraph: {
    title: `${site.name} – Full-Stack Developer | Portfolio`,
    description:
      'Full-Stack Developer specializing in React, Next.js, Node.js, and DevOps. Explore projects, experience, and technical articles.',
    url: site.url,
  },
  twitter: {
    title: `${site.name} – Full-Stack Developer | Portfolio`,
    description:
      'Full-Stack Developer specializing in React, Next.js, Node.js, and DevOps. Explore projects, experience, and technical articles.',
  },
});

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: 'Full-Stack Developer',
  url: site.url,
  sameAs: [
    'https://github.com/The-Genium007',
    'https://linkedin.com/in/lucas-giza-610093138',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'Node.js',
    'JavaScript',
    'TypeScript',
    'Docker',
    'DevOps',
    'Tailwind CSS',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
  description: site.description,
  author: { '@type': 'Person', name: site.name },
};

export default function Home() {
  return (
    <>
      {/* JSON-LD structured data — static build-time constants, no user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Hero />
      <div className="space-y-32 mb-0" aria-label="Main content">
        <ExperienceList limit={3} showMoreLink />
        <SkillsSection />
        <ProjectsGrid limit={4} />
        <PersonalProjectsGrid limit={3} />
        <div className="pt-8 border-t border-border/40">
          <div className="flex justify-center">
            <Link
              href="/resume/CV Full-stack 2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-accent text-[16px] font-mono tracking-wide after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full mb-5 inline-block"
            >
              Download my resume →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
