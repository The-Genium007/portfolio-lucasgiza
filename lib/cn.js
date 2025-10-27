// Helper de fusion de classes Tailwind
// Utilise clsx pour conditions + tailwind-merge pour éviter les conflits.
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
