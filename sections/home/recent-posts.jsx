import { posts } from '../../data/posts';
import Link from 'next/link';
import { SectionHeading } from '../../components/ui/section-heading';

export function RecentPosts({ limit = 3 }) {
  const list = posts.slice(0, limit);
  return (
    <section id="posts" className="pt-4">
      <SectionHeading title="Writing" minimal />
      <ul className="space-y-6">
        {list.map(p => (
          <li key={p.slug} className="group flex gap-4">
            <div className="mt-1 h-14 w-14 flex-none rounded-sm border border-border bg-bgSoft/50" />
            <div className="flex-1 space-y-1">
              <h3 className="text-h4 font-semibold tracking-tight text-fg group-hover:text-white">
                <Link href={p.url}>{p.title}</Link>
              </h3>
              <p className="text-micro leading-snug text-fgSoft line-clamp-2">{p.description}</p>
              <div className="flex flex-wrap gap-2 pt-1 text-mini font-mono text-fgSoft/70">
                <span>{p.year}</span>
                {p.tags.map(t => <span key={t}>{t}</span>)}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-10">
  <Link href="#" className="text-micro font-mono text-fgSoft hover:text-fg transition">Voir toutes les notes →</Link>
      </div>
    </section>
  );
}
