import clsx from 'clsx';

/**
 * Badge
 * Variantes: subtle | solid | outline | ghost | pill
 * Tailles: xxs (ultra compact) | xs (compact) | sm (lisible / défaut) | md (accent / large)
 * - Les tailles utilisent l'échelle typographique centralisée (tokens / Tailwind extend)
 * - 'mono' applique une fonte monospace utile pour les tags techniques
 */
export function Badge({
  children,
  variant = 'subtle',
  size = 'xs', // xxs | xs | sm | md
  scaleText = false, // si true: applique une échelle typographique parallèle
  mono = true,
  as: Component = 'span',
  className = '',
}) {
  const base = 'inline-flex items-center font-medium whitespace-nowrap select-none';

  // Taille visuelle = padding + min-height + radius (pas de font-size ici)
  const SIZE_DIMENSIONS = {
    xxs: 'px-1.5 py-[1.5px] min-h-[1.1rem] text-[0.65rem]',
    xs:  'px-2 py-[3px] min-h-[1.25rem] text-[0.7rem]',
    sm:  'px-2.5 py-[5px] min-h-[1.5rem] text-[0.75rem]',
    md:  'px-3.5 py-[7px] min-h-[1.75rem] text-[0.8rem]',
  };

  // Optionnel: si scaleText = true on applique un mapping typographique basé sur vos tokens
  const SIZE_FONT = {
    xxs: 'text-mini',
    xs: 'text-micro',
    sm: 'text-body-xs',
    md: 'text-body-sm',
  };

  const VARIANT_BASE = 'rounded-sm';
  const VARIANT_STYLES = {
    subtle:  `${VARIANT_BASE} bg-[var(--badge-bg-subtle)]/60 text-[var(--badge-fg-subtle)]`,
    solid:   `${VARIANT_BASE} font-semibold bg-[var(--badge-bg-solid)] text-[var(--badge-fg-solid)]`,
    outline: `${VARIANT_BASE} border border-[var(--badge-border-outline)] text-[var(--badge-fg-outline)] bg-[var(--badge-bg-outline)]`,
    ghost:   `${VARIANT_BASE} bg-[var(--badge-bg-ghost)] text-[var(--badge-fg-ghost)]`,
    pill:    'rounded-full border border-[var(--badge-border-pill)] bg-[var(--badge-bg-pill)] text-[var(--badge-fg-pill)] backdrop-blur-sm',
  };

  const dimClass = SIZE_DIMENSIONS[size] || SIZE_DIMENSIONS.xs;
  const fontScaleClass = scaleText ? (SIZE_FONT[size] || SIZE_FONT.xs) : '';
  const variantClass = VARIANT_STYLES[variant] || VARIANT_STYLES.subtle;
  const fontFamily = mono ? 'font-mono tracking-wide' : '';

  return (
    <Component className={clsx(base, dimClass, fontScaleClass, variantClass, fontFamily, className)}>
      {children}
    </Component>
  );
}
