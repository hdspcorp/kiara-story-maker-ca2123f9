import { Link } from "@tanstack/react-router";
import { AlphaLogo, KeevoLogo } from "./Brand";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className={`mx-auto flex items-center justify-between gap-4 px-4 ${compact ? "h-14" : "h-16"} max-w-7xl`}>
        <Link to="/" className="flex items-center gap-3">
          <AlphaLogo className="h-7 w-auto" />
          <span className="hidden sm:block h-6 w-px bg-border" />
          <span className="hidden sm:block text-sm font-medium text-muted-foreground">
            Capacitação
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-xs text-muted-foreground">por</span>
          <KeevoLogo className="h-6 w-auto" />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Keevo. Todos os direitos reservados.</span>
        </div>
        <div className="flex items-center gap-3">
          <AlphaLogo className="h-5 w-auto opacity-80" />
          <span className="text-xs text-muted-foreground">×</span>
          <KeevoLogo className="h-5 w-auto opacity-80" />
        </div>
      </div>
    </footer>
  );
}