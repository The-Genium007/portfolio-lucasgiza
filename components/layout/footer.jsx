import { memo } from 'react';
import Link from 'next/link';
import { social } from '../../data/social';
import { getSocialIcon } from '../icons/social-icons';
import pkg from '../../package.json';

/**
 * Composant SocialLink memoizé pour optimiser le rendu
 */
const SocialLink = memo(({ social: s, isSidebar }) => {
  const Icon = getSocialIcon(s.label);
  const isEmail = s.label.toLowerCase() === 'email' && Array.isArray(s.parts);
  const email = isEmail ? s.parts.join('') : null;
  const mailto = isEmail ? `mailto:${email}` : s.href;
  const Wrapper = isEmail ? 'a' : Link;
  const props = isEmail
    ? { href: mailto, title: email, 'aria-label': 'Envoyer un email' }
    : { href: s.href, title: s.label, 'aria-label': s.label };

  return (
    <li key={mailto || s.href || s.label}>
      <Wrapper
        {...props}
        className="group transition hover:text-fg flex items-center justify-center w-5 h-5"
      >
        {Icon ? (
          <Icon
            className="w-5 h-5 transition-transform duration-200 ease-out group-hover:scale-110"
            aria-hidden="true"
          />
        ) : (
          <span className="text-micro font-mono transition-transform duration-200 ease-out group-hover:scale-110">
            {isEmail ? '@' : s.label}
          </span>
        )}
        <span className="sr-only">{s.label}</span>
      </Wrapper>
    </li>
  );
});

SocialLink.displayName = 'SocialLink';

/**
 * Footer unifié.
 * variant="sidebar" => style compact utilisé dans la colonne latérale.
 */
export function Footer({ variant = 'default', className = '' }) {
  const isSidebar = variant === 'sidebar';
  const year = new Date().getFullYear();
  const version = pkg?.version ? `v${pkg.version}` : null;

  return (
    <footer
      role="contentinfo"
      className={`text-fgSoft/70 ${isSidebar ? 'space-y-6' : 'py-12 text-center space-y-6'} ${className}`}
    >
      <ul
        className={`flex items-center justify-center gap-4 ${isSidebar ? 'text-sm' : 'text-xs'} `}
      >
        {social.map(s => (
          <SocialLink key={s.href || s.label} social={s} isSidebar={isSidebar} />
        ))}
      </ul>
      {!isSidebar ? (
        <p className="text-mini leading-relaxed text-fgSoft/70">
          Design inspiré. Construit avec Next.js & Tailwind. {version && (
            <span className="ml-1 text-[10px] font-mono text-fgSoft/60" aria-label="Version du site">
              {version}
            </span>
          )}
        </p>
      ) : (
        <div className="space-y-2">
          <p className="text-[11px]">&copy; {year} Lucas GIZA. Tous droits réservés {version && (
            <span className="ml-1 font-mono text-fgSoft/60" aria-label="Version du site">{version}</span>
          )}</p>
        </div>
      )}
    </footer>
  );
}
