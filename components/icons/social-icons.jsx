import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

// Mapping dynamique label (normalisé) -> composant icône
export const SOCIAL_ICONS = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  email: FaEnvelope,
};

/**
 * Retourne le composant d'icône correspondant à un label.
 * On normalise : accents enlevés, minuscule.
 */
export function getSocialIcon(label) {
  if (!label) return null;
  const key = label
    .toString()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim()
    .toLowerCase();
  return SOCIAL_ICONS[key] || null;
}
