// Import global unique (ancien chemin ../src/styles/globals.css corrigé)
import '../styles/globals.css';
import { Sidebar } from '@/components/layout/sidebar';
import { Footer } from '@/components/layout/footer';
import { MobileHeader } from '@/components/layout/mobile-header';
import { baseMetadata } from '@/lib/metadata';
import { inter, jetbrains } from '@/lib/fonts';
import { MobileFloatingNav } from '@/components/navigation/mobile-floating-nav';

export const metadata = baseMetadata();

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`scroll-smooth ${inter.variable} ${jetbrains.variable}`}>
      <head>
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
      </head>
      <body className="antialiased bg-bg text-fg">
  <a href="#home" className="skip-link">Skip to main content</a>
  {/* Mobile/tablet header (hidden on large) */}
  <MobileHeader />
        <div className="relative mx-auto lg:flex" id="home">
          <div className="pointer-events-none fixed inset-0 -z-10">
            <div className="absolute left-0 top-0 h-[700px] w-[700px] -translate-x-1/3 -translate-y-1/4 rounded-full bg-[var(--gradient-accent-radial)] blur-3xl opacity-40" />
          </div>
          <Sidebar />
          <div className="w-full lg:ml-80 lg:px-16 pt-4 lg:pt-20 pb-0 lg:pb-0">
            <main className="space-y-16 lg:space-y-32">
            {children}
            {/* Global footer (hidden on large screens as already in sidebar) */}
            <div className="lg:hidden mt-8 pt-6">
              <Footer />
            </div>
            </main>
          </div>
          {/* Mobile/tablet hamburger menu */}
          <MobileFloatingNav />
        </div>
      </body>
    </html>
  );
}
