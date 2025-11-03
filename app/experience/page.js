import { ExperienceList } from '@/sections/experience/experience-list';
import { SectionHeading } from '@/components/ui/section-heading';
import { baseMetadata } from '@/lib/metadata';

export const metadata = baseMetadata({
  title: 'Experience – Lucas GIZA',
  openGraph: { title: 'Experience – Lucas GIZA' },
  twitter: { title: 'Experience – Lucas GIZA' }
});

export default function ExperiencePage() {
  return (
    <div className="space-y-16" id="experience">
      <div>
        <SectionHeading title="Full Experience" minimal />
        <p className="max-w-2xl text-[13px] leading-relaxed text-fgSoft">Detailed history of professional experiences with achievements and technical stack. Placeholder content intended to illustrate the layout.</p>
      </div>
      <ExperienceList />
    </div>
  );
}
