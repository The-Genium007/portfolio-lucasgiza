import { personalProjects } from '@/data/personal-projects';
import { SectionHeading } from '@/components/ui/section-heading';
import { CompactProjectList } from '@/components/projects/compact-project-list';
import { baseMetadata } from '@/lib/metadata';

export const metadata = baseMetadata({
  title: 'Projets Personnels – Lucas GIZA',
  openGraph: { title: 'Projets Personnels – Lucas GIZA' },
  twitter: { title: 'Projets Personnels – Lucas GIZA' }
});

export default function PersonalProjectsArchivePage() {
  return (
    <div className="space-y-16" id="personal-projects">
      <div>
        <SectionHeading title="Tous les projets personnels" minimal />
        <p className="max-w-2xl text-[13px] leading-relaxed text-fgSoft">Archive complète de mes projets personnels expérimentaux, outils internes et prototypes d’apprentissage.</p>
      </div>
      <CompactProjectList projects={personalProjects} />
    </div>
  );
}
