import { ExperienceList } from '@/sections/experience/experience-list';
import { SectionHeading } from '@/components/ui/section-heading';
import { baseMetadata } from '@/lib/metadata';

export const metadata = baseMetadata({
  title: 'Expérience – Lucas GIZA',
  openGraph: { title: 'Expérience – Lucas GIZA' },
  twitter: { title: 'Expérience – Lucas GIZA' }
});

export default function ExperiencePage() {
  return (
    <div className="space-y-16" id="experience">
      <div>
        <SectionHeading title="Full Experience" minimal />
        <p className="max-w-2xl text-[13px] leading-relaxed text-fgSoft">Historique détaillé des expériences professionnelles avec réalisations et pile technique. Contenu factice destiné à illustrer la mise en page.</p>
      </div>
      <ExperienceList />
    </div>
  );
}
