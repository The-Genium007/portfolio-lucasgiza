export function SectionHeading({ number, title, className = '', minimal = true }) {
  if (minimal) {
    return (
      <div className={`mb-8 ${className}`}>
  <h2 className="text-micro font-mono tracking-widest text-[var(--color-fg-soft)]">{title.toUpperCase()}</h2>
      </div>
    );
  }
  return (
    <div className={`flex items-center gap-4 mb-8 ${className}`}>      
      <span className="font-mono text-sm text-[var(--color-accent)] tabular-nums">{number?.toString().padStart(2,'0')}.</span>
  <h2 className="text-h2 font-semibold tracking-tight text-[var(--color-fg)]">{title}</h2>
      <span className="h-px flex-1 bg-[var(--color-border)]" />
    </div>
  );
}
