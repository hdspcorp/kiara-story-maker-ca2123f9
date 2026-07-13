import { Link } from "@tanstack/react-router";
import { AlphaLogo, KeevoLogo } from "./Brand";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className="sticky top-0 z-30 border-b border-emerald-200/70 bg-white/90 shadow-sm shadow-emerald-950/5 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div
        className={`mx-auto flex items-center justify-between gap-4 px-4 ${compact ? "h-14" : "h-16"} max-w-7xl`}
      >
        <Link to="/" className="flex items-center gap-3">
          <AlphaLogo className="h-7 w-auto" />
          <span className="hidden sm:block h-6 w-px bg-border" />
          <span className="hidden sm:block text-sm font-semibold text-emerald-800">
            Capacitação
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-xs font-medium text-muted-foreground">por</span>
          <KeevoLogo className="h-6 w-auto" />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-emerald-100 bg-emerald-50/40">
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
