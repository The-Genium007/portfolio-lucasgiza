// Import global unique (ancien chemin ../src/styles/globals.css corrigé)
import '../styles/globals.css';
import { Sidebar } from '@/components/layout/sidebar';
import { Footer } from '@/components/layout/footer';
import { MobileHeader } from '@/components/layout/mobile-header';
import { baseMetadata } from '@/lib/metadata';
import { inter, jetbrains } from '@/lib/fonts';
import { MobileHomeButton } from '@/components/navigation/mobile-home-button';

export const metadata = baseMetadata();

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`scroll-smooth ${inter.variable} ${jetbrains.variable}`}>
      <head></head>
      <body className="antialiased bg-bg text-fg">
  <a href="#home" className="skip-link">Aller au contenu principal</a>
  {/* Header mobile/tablette (caché sur large) */}
  <MobileHeader />
        <div className="relative mx-auto lg:flex" id="home">
          <div className="pointer-events-none fixed inset-0 -z-10">
            <div className="absolute left-0 top-0 h-[700px] w-[700px] -translate-x-1/3 -translate-y-1/4 rounded-full bg-[var(--gradient-accent-radial)] blur-3xl opacity-40" />
          </div>
          <Sidebar />
          <div className="w-full lg:ml-80 lg:px-16 pt-4 lg:pt-20 pb-0 lg:pb-0">
            <main className="space-y-16 lg:space-y-32">
            {children}
            {/* Footer global (masqué sur grands écrans car déjà dans la sidebar) */}
            <div className="lg:hidden mt-8 pt-6">
              <Footer />
            </div>
            </main>
          </div>
          {/* Bouton retour accueil mobile/tablette (affiché hors page d'accueil) */}
          <MobileHomeButton />
        </div>
      </body>
    </html>
  );
}
