import { CheckCircle2, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
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
      <header className="border-b bg-emerald-50/60 p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-primary">
          {found.group} · {found.menu}
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-950">{found.title}</h1>
      </header>
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-5xl p-5">
          <div className="aspect-video overflow-hidden rounded-2xl border bg-black shadow-xl shadow-emerald-950/10">
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
              className="inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm font-semibold hover:bg-muted disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Anterior
            </button>
            <button
              onClick={onComplete}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold ${
                isCompleted
                  ? "border bg-emerald-50 text-primary"
                  : "bg-primary text-primary-foreground shadow-lg shadow-emerald-900/10 hover:opacity-90"
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Concluído
                </>
              ) : (
                <>
                  <PlayCircle className="h-4 w-4" />
                  Marcar como concluído
                </>
              )}
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className="inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm font-semibold hover:bg-muted disabled:opacity-40"
            >
              Próximo <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
