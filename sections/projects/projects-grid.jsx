import { projects } from '@/data/projects';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/section-heading';
import { CompactProjectList } from '@/components/projects/compact-project-list';
import { APP_SECTIONS } from '@/lib/constants';

export function ProjectsGrid({ limit, showArchiveLink = true }) {
  return (
    <section id={APP_SECTIONS.PROJECTS} className="pt-4">
      <SectionHeading title="Projects" minimal />
      <CompactProjectList projects={projects} limit={limit} variant="compact" />
      {showArchiveLink && (
        <div className="mt-10">
          <Link
            href="/projects"
            className="text-micro text-fgSoft hover:text-fg font-mono transition"
          >
            View complete archive →
          </Link>
        </div>
      )}
    </section>
  );
}
