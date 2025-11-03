import dynamic from 'next/dynamic';
import { Hero } from '@/sections/home/hero';
import { ExperienceList } from '@/sections/experience/experience-list';
import Link from 'next/link';

// Lazy load des sections below-the-fold pour réduire le bundle initial
const SkillsSection = dynamic(() =>
  import('@/sections/skills').then(mod => ({ default: mod.SkillsSection })),
  { loading: () => <div className="h-96 animate-pulse bg-bgSoft/30 rounded-lg" /> }
);

const ProjectsGrid = dynamic(() =>
  import('@/sections/projects/projects-grid').then(mod => ({ default: mod.ProjectsGrid })),
  { loading: () => <div className="h-96 animate-pulse bg-bgSoft/30 rounded-lg" /> }
);

const PersonalProjectsGrid = dynamic(() =>
  import('@/sections/projects/personal-projects-grid').then(mod => ({ default: mod.PersonalProjectsGrid })),
  { loading: () => <div className="h-96 animate-pulse bg-bgSoft/30 rounded-lg" /> }
);

export default function Home() {
  return (
    <>
      <Hero />
      <div className="space-y-32 mb-0" aria-label="Main content">
        <ExperienceList limit={3} showMoreLink />
        <SkillsSection />
        <ProjectsGrid limit={4} />
        <PersonalProjectsGrid limit={3} />
        <div className="pt-8 border-t border-border/40">
          <div className="flex justify-center">
            <Link
              href="/cv.pdf"
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
