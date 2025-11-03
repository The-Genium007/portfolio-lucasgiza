// Nouveau composant Button utilisant class-variance-authority (CVA)
// Variantes: solid | outline | ghost ; Tailles: sm | md | lg
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/cn';

// Base utilitaires : inline-flex, alignements, focus ring custom via shadow, transition, etc.
// On utilise des classes arbitraires Tailwind pour pointer sur les tokens CSS.
const buttonStyles = cva(
  [
    'inline-flex items-center justify-center font-medium outline-none relative select-none',
    // Radius et transition depuis tokens
    'rounded-md transition-colors',
    // Ombre hover/focus
    'hover:shadow-sm focus-visible:shadow-sm',
    // Désactivation
    'disabled:opacity-50 disabled:pointer-events-none'
  ].join(' '),
  {
    variants: {
      variant: {
        solid: [
          'text-[var(--color-bg)] bg-[var(--color-accent)]',
          'hover:bg-[var(--color-accent-hover)]'
        ].join(' '),
        outline: [
          'border border-[var(--color-border)] text-[var(--color-fg)] bg-transparent',
          'hover:bg-[color-mix(in_srgb,var(--color-border)_20%,transparent)]'
        ].join(' '),
        ghost: [
          'text-[var(--color-fg)] bg-transparent',
          'hover:bg-[color-mix(in_srgb,var(--color-border)_30%,transparent)]'
        ].join(' ')
      },
      size: {
        sm: 'text-[var(--text-size-xs)] h-[var(--btn-height-sm)] px-[var(--btn-pad-x-sm)]',
        md: 'text-[var(--text-size-sm)] h-[var(--btn-height-md)] px-[var(--btn-pad-x-md)]',
        lg: 'text-[var(--text-size-md)] h-[var(--btn-height-lg)] px-[var(--btn-pad-x-lg)]'
      }
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md'
    }
  }
);

export function Button({ as: Component = 'button', className, variant, size, ...props }) {
  return (
    <Component
      className={cn(buttonStyles({ variant, size }), 'focus-visible:shadow-[var(--shadow-focus-accent)]', className)}
      {...props}
    />
  );
}
