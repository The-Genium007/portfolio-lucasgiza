export function HomeIcon({ size = 22, className = '', strokeWidth = 2 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Base maison stylisée avec léger dynamisme (toit asymétrique) */}
      <path d="M4 11.2l8-6.2 8 6.2" />
      <path d="M6.5 10.5V18a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-7.5" />
      {/* Porte centrée */}
      <path d="M11 18v-3.5a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1V18" />
    </svg>
  );
}
