import { SkillsGrid } from './skills-grid';
import { SectionHeading } from '@/components/ui/section-heading';

export function SkillsSection() {
  return (
    <section id="skills" className="space-y-8">
      <div className="space-y-3">
        <SectionHeading title="Skills" minimal />
        <p className="max-w-2xl text-[13px] leading-relaxed text-fgSoft">Sélection de compétences techniques structurées par domaine. Cliquez sur un badge pour plus de détails.</p>
      </div>
      <SkillsGrid />
    </section>
  );
}
