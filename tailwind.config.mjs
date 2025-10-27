/** @type {import('tailwindcss').Config} */
import tailwindForms from '@tailwindcss/forms';
import tailwindTypography from '@tailwindcss/typography';

const config = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './sections/**/*.{js,jsx,ts,tsx}',
    './data/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1280px' }
    },
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        bgAlt: 'var(--color-bg-alt)',
        bgSoft: 'var(--color-bg-soft)',
        fg: 'var(--color-fg)',
        fgSoft: 'var(--color-fg-soft)',
        accent: 'var(--color-accent)',
        accentSoft: 'var(--color-accent-soft)',
        brand: 'var(--color-accent)', // alias brand -> accent
        border: 'var(--color-border)',
        borderStrong: 'var(--color-border-strong)',
        borderHover: 'var(--color-border-hover)',
        baseDeep: 'var(--color-base-deep)'
      },
      borderRadius: {
        xl: '1rem', // conservé
        '2xl': '1.25rem',
        card: 'var(--r-card)'
      },
      fontSize: {
        xs: 'var(--text-size-xs)',
        sm: 'var(--text-size-sm)',
        base: 'var(--text-size-base)',
        md: 'var(--text-size-md)',
        '2xs': 'var(--text-size-2xs)',
        micro: 'var(--text-size-micro)',
        mini: 'var(--text-size-mini)',
        h1: 'var(--text-size-h1)',
        h2: 'var(--text-size-h2)',
        h3: 'var(--text-size-h3)',
        h4: 'var(--text-size-h4)',
        'body-xs': 'var(--text-size-body-xs)',
        'body-sm': 'var(--text-size-body-sm)',
        body: 'var(--text-size-body)',
        'body-lg': 'var(--text-size-body-lg)',
        'body-xl': 'var(--text-size-body-xl)'
      },
      spacing: {
        'btn-x-sm': 'var(--btn-pad-x-sm)',
        'btn-x-md': 'var(--btn-pad-x-md)',
        'btn-x-lg': 'var(--btn-pad-x-lg)',
        'card-pad': 'var(--card-padding)'
      },
      boxShadow: {
        focusAccent: 'var(--shadow-focus-accent)'
      }
    }
  },
  plugins: [tailwindForms, tailwindTypography, function({ addVariant }) {
    // data-open variant: .data-[open] parent ou attribut sur l'élément
    addVariant('data-open', '&[data-open="true"]');
    // Variante 'hocus' retirée pour simplification : utilisation directe de :hover et :focus-visible dans le JSX ou CSS.
  }]
};

export default config;
