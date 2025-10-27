import { SkillsSection } from '@/sections/skills';
import { baseMetadata } from '@/lib/metadata';

export const metadata = baseMetadata({
  title: 'Skills – Lucas GIZA',
  openGraph: { title: 'Skills – Lucas GIZA' },
  twitter: { title: 'Skills – Lucas GIZA' }
});

export default function SkillsPage() {
  return (
    <div className="space-y-16" id="skills">
      <SkillsSection />
    </div>
  );
}
