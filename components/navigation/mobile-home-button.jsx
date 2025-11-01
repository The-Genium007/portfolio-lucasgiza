"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useReducer, useCallback, useRef } from 'react';
import { Button } from '../ui/button-new';
import { HomeIcon } from '@/components/icons/home-icon';
import Link from 'next/link';
import { cn } from '@/lib/cn';

// Reducer pour gérer l'état du bouton de manière optimisée
const buttonReducer = (state, action) => {
  switch (action.type) {
    case 'MOUNT':
      return { ...state, mounted: true };
    case 'SHOW':
      return { ...state, visible: true };
    case 'SET_INACTIVE':
      return { ...state, inactive: action.payload };
    default:
      return state;
  }
};

const initialState = {
  mounted: false,
  visible: false,
  inactive: false,
};

/**
 * Bouton flottant retour accueil (mobile / tablette).
 * Affiché uniquement si on n'est pas sur la page d'accueil (pathname !== '/').
 */
export function MobileHomeButton({ className }) {
  const pathname = usePathname();
  const [state, dispatch] = useReducer(buttonReducer, initialState);
  const inactivityTimer = useRef(null);

  // Gestion de l'inactivité avec useCallback pour éviter les re-créations
  const resetInactivity = useCallback(() => {
    dispatch({ type: 'SET_INACTIVE', payload: false });
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      dispatch({ type: 'SET_INACTIVE', payload: true });
    }, 4000);
  }, []);

  useEffect(() => {
    dispatch({ type: 'MOUNT' });
    const t = setTimeout(() => dispatch({ type: 'SHOW' }), 20);

    // évènements d'activité
    window.addEventListener('pointermove', resetInactivity, { passive: true });
    window.addEventListener('scroll', resetInactivity, { passive: true });
    window.addEventListener('keydown', resetInactivity);
    resetInactivity();

    return () => {
      clearTimeout(t);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      window.removeEventListener('pointermove', resetInactivity);
      window.removeEventListener('scroll', resetInactivity);
      window.removeEventListener('keydown', resetInactivity);
    };
  }, [resetInactivity]);

  // vibration haptique si supporté
  const handleHaptic = useCallback(() => {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate?.(30); // vibration courte
      }
    } catch (_) {}
  }, []);

  if (!pathname || pathname === '/') return null;

  const tooltipId = 'tt-home-btn';

  return (
    <div
      className={cn(
        'fixed right-4 bottom-4 z-50 md:right-6 md:bottom-6 lg:hidden',
        'group flex items-center justify-center',
        'transition-all duration-300',
        state.visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        state.inactive && 'opacity-40 focus-within:opacity-100 hover:opacity-100',
        className
      )}
    >
      <Button
        as={Link}
        href="/"
        aria-label="Retour à l'accueil"
        aria-describedby={tooltipId}
        onClick={handleHaptic}
        variant="solid"
        size="md"
        className={cn(
          'relative h-12 w-12 rounded-full p-0',
          // Glassmorphism base
          'bg-[var(--glass-a12)] backdrop-blur-md hover:bg-[var(--glass-a18)]',
          'border border-[var(--glass-a18)] hover:border-[var(--glass-a25)]',
          // Glow / ring custom
          'shadow-[0_2px_8px_-2px_rgba(0,0,0,0.6),0_0_0_1px_var(--glass-a15)]',
          'hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.75),0_0_0_1px_var(--glass-a25)]',
          // Interaction
          'transition-all duration-300 active:scale-95',
          // Focus visible ring accent + glass outline
          'focus-visible:shadow-[0_0_0_2px_var(--color-bg),0_0_0_4px_var(--color-accent)]',
          // Before pseudo pour halo interne gradient léger
          'before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(circle_at_35%_30%,var(--glass-a22),transparent_72%)]',
          // After pseudo pour anneau externe flou en hover
          'after:absolute after:-inset-1 after:rounded-full after:bg-[radial-gradient(circle,var(--color-accent-hover)_0%,transparent_60%)] after:opacity-0 after:blur after:transition-opacity hover:after:opacity-40'
        )}
      >
        <HomeIcon
          size={22}
          className="text-[var(--color-fg)] transition-transform duration-500 group-hover:rotate-[-12deg]"
        />
        <span id={tooltipId} className="sr-only">
          Back to home
        </span>
      </Button>
    </div>
  );
}
