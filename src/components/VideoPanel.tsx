import { ytIdFromUrl, type Content } from "@/lib/default-content";

export function VideoPanel({
  content,
  videoId,
  onPrev,
  onNext,
  onComplete,
  isCompleted,
  hasPrev,
  hasNext,
}: {
  content: Content;
  videoId: string;
  onPrev: () => void;
  onNext: () => void;
  onComplete: () => void;
  isCompleted: boolean;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  let found: { title: string; url: string; group: string; menu: string } | null = null;
  for (const g of content.groups)
    for (const m of g.menus)
      for (const v of m.videos)
        if (v.id === videoId) found = { title: v.title, url: v.url, group: g.title, menu: m.title };
  if (!found) return <div className="p-6 text-sm text-muted-foreground">Vídeo não encontrado.</div>;
  const yt = ytIdFromUrl(found.url);
  return (
    <article className="flex h-full flex-col">
      <header className="border-b p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {found.group} · {found.menu}
        </p>
        <h1 className="mt-1 text-xl font-semibold text-foreground">{found.title}</h1>
      </header>
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-4xl p-4">
          <div className="aspect-video overflow-hidden rounded-xl border bg-black shadow-sm">
            {yt ? (
              <iframe
                key={yt}
                title={found.title}
                src={`https://www.youtube.com/embed/${yt}?rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            ) : (
              <div className="grid h-full place-items-center p-6 text-sm text-white/70">
                URL inválida.
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className="rounded-md border px-3 py-2 text-sm hover:bg-muted disabled:opacity-40"
            >
              ← Anterior
            </button>
            <button
              onClick={onComplete}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                isCompleted
                  ? "border bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground hover:opacity-90"
              }`}
            >
              {isCompleted ? "Concluído ✓" : "Marcar como concluído"}
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className="rounded-md border px-3 py-2 text-sm hover:bg-muted disabled:opacity-40"
            >
              Próximo →
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}