import { personalProjects } from '@/data/personal-projects';
import { SectionHeading } from '@/components/ui/section-heading';
import { CompactProjectList } from '@/components/projects/compact-project-list';
import Link from 'next/link';
import { APP_SECTIONS } from '@/lib/constants';

export function PersonalProjectsGrid({ limit }) {
  return (
    <section id={APP_SECTIONS.PERSONAL_PROJECTS} className="pt-4">
      <SectionHeading title="Personal Projects" minimal />
      <CompactProjectList projects={personalProjects} limit={limit} />
      <div className="mt-10">
        <Link
          href="/personal-projects"
          className="text-micro text-fgSoft hover:text-fg font-mono transition"
        >
          View full archive →
        </Link>
      </div>
    </section>
  );
}
