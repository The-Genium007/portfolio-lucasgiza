import { useMemo } from 'react';
import { experience } from '@/data/experience';
import { formatDate } from '@/lib/utils';
import { SectionHeading } from '@/components/ui/section-heading';
import { Badge } from '@/components/ui/badge';
import { APP_SECTIONS } from '@/lib/constants';
import Link from 'next/link';

// props: limit? (number) pour limiter le nombre d'items affichés sur la page d'accueil
export function ExperienceList({ limit, showMoreLink = false }) {
  // Memoize le slice pour éviter les re-calculs
  const items = useMemo(() =>
    typeof limit === 'number' ? experience.slice(0, limit) : experience,
    [limit]
  );
  return (
    <section id={APP_SECTIONS.EXPERIENCE} className="pt-4">
      <SectionHeading title="Experience" minimal />
      <div className="relative pl-2">
        <div className="bg-border/60 absolute top-0 left-[118px] h-full w-px" />
        <ul className="space-y-16">
          {items.map((item, idx) => (
            <li key={idx} className="relative flex flex-col gap-5 md:flex-row">
              <div className="flex w-[120px] flex-none flex-col items-start pt-1">
                <span className="text-mini text-fgSoft font-mono font-bold tracking-widest uppercase">
                  {formatDate(item.start)} - <br />{' '}
                  {item.end === 'Present' ? 'PRESENT' : formatDate(item.end)}
                </span>
              </div>
              <div className="relative flex-1 pt-1">
                <h3 className="text-h4 text-fg mb-2 font-semibold tracking-tight">
                  {item.role}{' '}
                  <span className="text-fgSoft font-normal">
                    {item.companyUrl ? (
                      <Link
                        href={item.companyUrl}
                        className="experience-company-link inline-flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @{item.company}
                      </Link>
                    ) : (
                      <>@{item.company}</>
                    )}
                  </span>
                </h3>
                <ul className="text-micro text-fgSoft mb-3 space-y-1.5 leading-relaxed">
                  {item.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
                {item.tech?.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <li key={t}>
                        <Badge variant="pill">{t}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
        {showMoreLink && (
          <div className="mt-10">
            <Link
              href="/experience"
              className="text-micro text-fgSoft hover:text-fg font-mono transition"
            >
              Voir expérience complète →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
