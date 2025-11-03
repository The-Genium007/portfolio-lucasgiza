import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button-new';

export const metadata = {
  title: 'Page not found • 404'
};

// Page 404 statique (Next.js app router: not-found.js)
export default function NotFound() {
  return (
    <div className="w-full py-28 lg:py-40">
      <Container className="text-center">
        <span className="inline-block font-mono text-sm tracking-widest text-[var(--color-fg-soft)] mb-4">404</span>
        <h1 className="text-h1 font-bold tracking-tight">Page not found</h1>
        <p className="mt-6 max-w-xl mx-auto text-[var(--color-fg-soft)] text-balance">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button as={Link} href="/" variant="outline">Return home</Button>
        </div>
      </Container>
    </div>
  );
}
