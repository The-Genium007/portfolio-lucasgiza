import { projects } from '@/data/projects';
import { SectionHeading } from '@/components/ui/section-heading';
import { CompactProjectList } from '@/components/projects/compact-project-list';
import { baseMetadata } from '@/lib/metadata';

export const metadata = baseMetadata({
  title: 'Projets – Lucas GIZA',
  openGraph: { title: 'Projets – Lucas GIZA' },
  twitter: { title: 'Projets – Lucas GIZA' }
});

export default function ProjectsPage() {
  return (
    <div className="space-y-16" id="projects">
      <div>
        <SectionHeading title="Tous les projets" minimal />
        <p className="max-w-2xl text-[13px] leading-relaxed text-fgSoft">Archive complète de projets techniques variés (démonstrations, prototypes, explorations front). Chaque entrée présente une description courte et technologies principales.</p>
      </div>
      <CompactProjectList projects={projects} />
    </div>
  );
}
