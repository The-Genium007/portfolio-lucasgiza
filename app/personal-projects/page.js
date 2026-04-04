import { personalProjects } from '@/data/personal-projects';
import { SectionHeading } from '@/components/ui/section-heading';
import { CompactProjectList } from '@/components/projects/compact-project-list';
import { baseMetadata } from '@/lib/metadata';
import { site } from '@/data/site';

export const metadata = baseMetadata({
  title: 'Personal Projects – Lucas GIZA',
  description:
    'Personal and experimental projects by Lucas GIZA — internal tools, learning prototypes, and side projects exploring new technologies.',
  alternates: { canonical: `${site.url}/personal-projects` },
  openGraph: {
    title: 'Personal Projects – Lucas GIZA',
    description:
      'Personal and experimental projects by Lucas GIZA — internal tools, prototypes, and side projects.',
    url: `${site.url}/personal-projects`,
  },
  twitter: {
    title: 'Personal Projects – Lucas GIZA',
    description:
      'Personal and experimental projects by Lucas GIZA — internal tools, prototypes, and side projects.',
  },
});

export default function PersonalProjectsArchivePage() {
  return (
    <div className="space-y-16" id="personal-projects">
      <div>
        <SectionHeading title="All Personal Projects" minimal />
        <p className="max-w-2xl text-[13px] leading-relaxed text-fgSoft">Complete archive of my experimental personal projects, internal tools and learning prototypes.</p>
      </div>
      <CompactProjectList projects={personalProjects} variant="full" />
    </div>
  );
}
