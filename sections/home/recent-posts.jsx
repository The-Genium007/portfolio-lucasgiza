import { posts } from '../../data/posts';
import Link from 'next/link';
import { SectionHeading } from '../../components/ui/section-heading';

export function RecentPosts({ limit = 3 }) {
  const list = posts.slice(0, limit);
  return (
    <section id="posts" className="pt-4">
      <SectionHeading title="Writing" minimal />
      <ul className="space-y-6">
        {list.map((p) => (
          <li key={p.slug} className="group flex gap-4">
            <div className="border-border bg-bgSoft/50 mt-1 h-14 w-14 flex-none rounded-sm border" />
            <div className="flex-1 space-y-1">
              <h3 className="text-h4 text-fg font-semibold tracking-tight group-hover:text-white">
                <Link href={p.url}>{p.title}</Link>
              </h3>
              <p className="text-micro text-fgSoft line-clamp-2 leading-snug">{p.description}</p>
              <div className="text-mini text-fgSoft/70 flex flex-wrap gap-2 pt-1 font-mono">
                <span>{p.year}</span>
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <Link href="#" className="text-micro text-fgSoft hover:text-fg font-mono transition">
          View all notes →
        </Link>
      </div>
    </section>
  );
}
