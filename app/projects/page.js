import { projects } from '@/data/projects';
import { SectionHeading } from '@/components/ui/section-heading';
import { CompactProjectList } from '@/components/projects/compact-project-list';
import { baseMetadata } from '@/lib/metadata';

export const metadata = baseMetadata({
  title: 'Projects – Lucas GIZA',
  openGraph: { title: 'Projects – Lucas GIZA' },
  twitter: { title: 'Projects – Lucas GIZA' }
});

export default function ProjectsPage() {
  return (
    <div className="space-y-16" id="projects">
      <div>
        <SectionHeading title="All Projects" minimal />
        <p className="max-w-2xl text-[13px] leading-relaxed text-fgSoft">Complete archive of various technical projects (demos, prototypes, front-end explorations). Each entry presents a short description and main technologies.</p>
      </div>
      <CompactProjectList projects={projects} />
    </div>
  );
}
