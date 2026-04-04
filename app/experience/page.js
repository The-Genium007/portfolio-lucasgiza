import { ExperienceList } from '@/sections/experience/experience-list';
import { SectionHeading } from '@/components/ui/section-heading';
import { baseMetadata } from '@/lib/metadata';
import { site } from '@/data/site';

export const metadata = baseMetadata({
  title: 'Experience – Lucas GIZA',
  description:
    'Professional experience of Lucas GIZA as a Full-Stack Developer. Roles, achievements, and technical stacks across web development projects.',
  alternates: { canonical: `${site.url}/experience` },
  openGraph: {
    title: 'Experience – Lucas GIZA',
    description:
      'Professional experience of Lucas GIZA as a Full-Stack Developer. Roles, achievements, and technical stacks.',
    url: `${site.url}/experience`,
  },
  twitter: {
    title: 'Experience – Lucas GIZA',
    description:
      'Professional experience of Lucas GIZA as a Full-Stack Developer. Roles, achievements, and technical stacks.',
  },
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
