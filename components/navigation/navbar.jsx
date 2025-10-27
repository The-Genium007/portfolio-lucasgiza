import Link from 'next/link';
import { navigation } from '../../data/navigation';

export function Navbar() {
  return (
    <header className="py-6">
      <nav className="flex items-center gap-6 text-sm font-medium text-fgSoft">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href} className="hover:text-white transition">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
