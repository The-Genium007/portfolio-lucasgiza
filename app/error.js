'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button-new';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    if (error) {
      console.error('[GlobalError]', error?.message || error);
    }
  }, [error]);

  return (
      <div className="w-full py-28 lg:py-40">
          <Container className="text-center">
              <span className="inline-block font-mono text-sm tracking-widest text-[var(--color-fg-soft)] mb-4">ERROR</span>
            <h2 className="text-h1 font-bold tracking-tight">An error occurred</h2>
            <p className="mt-6 max-w-xl mx-auto text-[var(--color-fg-soft)] text-balance">
              {error?.message ? (
                <span className="block text-sm leading-relaxed font-mono bg-[color-mix(in_srgb,var(--color-border)_35%,transparent)] rounded-md py-3 px-4 text-left text-[var(--color-fg)] overflow-x-auto">
                  {error.message}
                </span>
              ) : (
                "The rendering of this page temporarily failed."
              )}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => reset()} aria-label="Retry rendering">Retry</Button>
              <Button as={Link} href="/" variant="outline" aria-label="Return home">Home</Button>
            </div>
          </Container>
        </div>
  );
}

