import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, ChevronLeft, Home, MessageCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { SiteHeader } from "@/components/SiteHeader";
import { TreeMenu } from "@/components/TreeMenu";
import { VideoPanel } from "@/components/VideoPanel";
import { KiaraPanel } from "@/components/Kiara";
import { usePublishedContent } from "@/hooks/useContent";
import { flattenVideos } from "@/lib/default-content";
import { loadProgress, markCompleted, setLast } from "@/lib/progress";

export const Route = createFileRoute("/capacitacao")({
  validateSearch: z.object({ v: z.string().optional() }),
  component: Capacitacao,
});

function Capacitacao() {
  const { content } = usePublishedContent();
  const search = Route.useSearch();
  const nav = useNavigate({ from: "/capacitacao" });
  const homeNav = useNavigate();
  const [completed, setCompleted] = useState<string[]>([]);
  useEffect(() => {
    setCompleted(loadProgress().completed);
  }, []);
  const flat = useMemo(() => (content ? flattenVideos(content) : []), [content]);
  const currentId = search.v ?? flat[0]?.video.id ?? null;
  useEffect(() => {
    if (currentId) setLast(currentId);
  }, [currentId]);

  if (!content)
    return (
      <div className="min-h-screen">
        <SiteHeader compact />
        <div className="p-10 text-sm text-muted-foreground">Carregando...</div>
      </div>
    );
  if (!currentId || flat.length === 0)
    return (
      <div className="min-h-screen">
        <SiteHeader compact />
        <div className="p-10 text-sm text-muted-foreground">Nenhum vídeo publicado.</div>
      </div>
    );

  const idx = flat.findIndex((f) => f.video.id === currentId);
  const hasPrev = idx > 0;
  const hasNext = idx >= 0 && idx < flat.length - 1;
  const percent = flat.length > 0 ? Math.round((completed.length / flat.length) * 100) : 0;
  const go = (vid: string) => nav({ search: { v: vid } });

  return (
    <div className="flex h-screen flex-col bg-[linear-gradient(180deg,oklch(0.985_0.025_155)_0%,#fff_34%)]">
      <SiteHeader compact />
      <div className="border-b bg-white/80 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => homeNav({ to: "/" })}
            className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm hover:bg-muted"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <Home className="h-3.5 w-3.5" />
            Home
          </button>
          <div className="flex min-w-[220px] flex-1 items-center justify-end gap-3">
            <span className="hidden text-xs font-semibold text-muted-foreground sm:inline">
              Progresso da capacitação
            </span>
            <div className="h-2 w-40 overflow-hidden rounded-full bg-emerald-100">
              <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
            </div>
            <span className="text-xs font-bold text-primary">
              {completed.length}/{flat.length}
            </span>
          </div>
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-7xl flex-1 min-h-0 grid-cols-1 gap-4 p-4 lg:grid-cols-[300px_minmax(0,1fr)_360px]">
        <aside className="overflow-hidden rounded-3xl border bg-white shadow-sm">
          <div className="border-b bg-emerald-50/70 p-4">
            <h2 className="flex items-center gap-2 text-sm font-bold text-slate-950">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Estrutura da trilha
            </h2>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {completed.length}/{flat.length} concluídos
            </p>
          </div>
          <div className="max-h-[calc(100vh-190px)] overflow-auto">
            <TreeMenu
              content={content}
              currentId={currentId}
              completed={new Set(completed)}
              onSelect={go}
            />
          </div>
        </aside>
        <section className="min-h-0 overflow-hidden rounded-3xl border bg-white shadow-sm">
          <VideoPanel
            content={content}
            videoId={currentId}
            hasPrev={hasPrev}
            hasNext={hasNext}
            isCompleted={completed.includes(currentId)}
            onPrev={() => hasPrev && go(flat[idx - 1].video.id)}
            onNext={() => hasNext && go(flat[idx + 1].video.id)}
            onComplete={() => {
              const p = markCompleted(currentId);
              setCompleted(p.completed);
            }}
          />
        </section>
        <aside className="hidden overflow-hidden rounded-3xl border bg-white shadow-sm lg:flex lg:flex-col">
          <div className="flex items-center gap-2 border-b bg-emerald-50/70 px-4 py-3 text-sm font-bold text-slate-950">
            <MessageCircle className="h-4 w-4 text-primary" />
            Assistente Kiara
          </div>
          <KiaraPanel title={content.kiara.title} intro={content.kiara.intro} />
        </aside>
      </div>
    </div>
  );
}
