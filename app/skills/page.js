import { SkillsSection } from '@/sections/skills';
import { baseMetadata } from '@/lib/metadata';
import { site } from '@/data/site';

export const metadata = baseMetadata({
  title: 'Skills – Lucas GIZA',
  description:
    'Technical skills of Lucas GIZA — front-end, back-end, DevOps, and tools mastered across professional and personal projects.',
  alternates: { canonical: `${site.url}/skills` },
  openGraph: {
    title: 'Skills – Lucas GIZA',
    description:
      'Technical skills of Lucas GIZA — front-end, back-end, DevOps, and tools mastered.',
    url: `${site.url}/skills`,
  },
  twitter: {
    title: 'Skills – Lucas GIZA',
    description:
      'Technical skills of Lucas GIZA — front-end, back-end, DevOps, and tools mastered.',
  },
});

export default function SkillsPage() {
  return (
    <div className="space-y-16" id="skills">
      <SkillsSection />
    </div>
  );
}
