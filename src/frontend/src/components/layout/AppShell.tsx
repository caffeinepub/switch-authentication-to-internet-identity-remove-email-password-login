import { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
  showHero?: boolean;
}

export default function AppShell({ children, showHero = false }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background relative">
      {showHero && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="/assets/generated/auth-hero-illustration.dim_1600x900.png"
            alt=""
            className="w-full h-full object-cover opacity-[0.03]"
          />
        </div>
      )}
      
      <div className="relative">
        <header className="border-b border-border bg-card/80 backdrop-blur-sm">
          <div className="container max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/logo-quill-book.dim_512x512.png"
                alt="Logo"
                className="w-10 h-10"
              />
              <h1 className="text-xl font-serif font-bold text-foreground">
                StorySpace
              </h1>
            </div>
          </div>
        </header>

        <main className="container max-w-6xl mx-auto px-4">
          {children}
        </main>

        <footer className="border-t border-border mt-16 py-8">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center text-sm text-muted-foreground">
              <p>
                © {new Date().getFullYear()} StorySpace. Built with love using{' '}
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:underline"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
