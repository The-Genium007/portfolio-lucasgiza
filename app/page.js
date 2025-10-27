import { Hero } from '@/sections/home/hero';
import { ExperienceList } from '@/sections/experience/experience-list';
import { ProjectsGrid } from '@/sections/projects/projects-grid';
import { PersonalProjectsGrid } from '@/sections/projects/personal-projects-grid';
import Link from 'next/link';
import { SkillsSection } from '@/sections/skills';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="space-y-32 mb-0" aria-label="Contenu principal">
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
              Télécharger mon CV →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
