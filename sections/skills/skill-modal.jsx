"use client";
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export function SkillModal({ skill, onClose }) {
  const ref = useRef(null);
  const previousActiveEl = useRef(null);

  useEffect(() => {
    previousActiveEl.current = document.activeElement;
    function onKey(e) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
      if (e.key === 'Tab') {
        // Focus trap minimaliste
        const focusable = ref.current.querySelectorAll('[data-focus]');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [onClose]);

  useEffect(() => {
    // focus initial
    const first = ref.current?.querySelector('[data-focus]');
    first && first.focus();
    return () => {
      previousActiveEl.current && previousActiveEl.current.focus?.();
    };
  }, []);

  if (!skill) return null;
  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`skill-${skill.slug}-title`}
        id={`skill-${skill.slug}-dialog`}
        className="relative w-full max-w-md rounded-lg border border-white/10 bg-bgElevated shadow-lg ring-1 ring-black/50 focus:outline-none"
      >
        <div className="flex items-start gap-4 p-5">
          <div className="flex-1">
            <h2 id={`skill-${skill.slug}-title`} className="text-[1.05rem] font-semibold tracking-tight mb-2 text-fg">
              {skill.name}
            </h2>
            <p className="text-[13px] leading-relaxed text-fgSoft whitespace-pre-line">
              {skill.description}
            </p>
          </div>
          <button
            data-focus
            onClick={onClose}
            className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-mono uppercase tracking-wide text-fgSoft hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-accent focus:outline-none cursor-pointer"
          >Close</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
