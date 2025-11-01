import { SkillsGrid } from './skills-grid';
import { SectionHeading } from '@/components/ui/section-heading';

export function SkillsSection() {
  return (
    <section id="skills" className="space-y-8">
      <div className="space-y-3">
        <SectionHeading title="Skills" minimal />
        <p className="text-fgSoft max-w-2xl text-[13px] leading-relaxed">
          Selection of technical skills structured by domain. Click on a badge for more details.
        </p>
      </div>
      <SkillsGrid />
    </section>
  );
}
