import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
  const [completed, setCompleted] = useState<string[]>([]);
  useEffect(() => { setCompleted(loadProgress().completed); }, []);
  const flat = useMemo(() => (content ? flattenVideos(content) : []), [content]);
  const currentId = search.v ?? flat[0]?.video.id ?? null;
  useEffect(() => { if (currentId) setLast(currentId); }, [currentId]);

  if (!content) return (<div className="min-h-screen"><SiteHeader compact /><div className="p-10 text-sm text-muted-foreground">Carregando...</div></div>);
  if (!currentId || flat.length === 0) return (<div className="min-h-screen"><SiteHeader compact /><div className="p-10 text-sm text-muted-foreground">Nenhum vídeo publicado.</div></div>);

  const idx = flat.findIndex((f) => f.video.id === currentId);
  const hasPrev = idx > 0;
  const hasNext = idx >= 0 && idx < flat.length - 1;
  const go = (vid: string) => nav({ search: { v: vid } });

  return (
    <div className="flex h-screen flex-col bg-background">
      <SiteHeader compact />
      <div className="grid flex-1 min-h-0 grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_360px]">
        <aside className="border-r bg-muted/20 overflow-auto">
          <div className="border-b bg-background p-3">
            <h2 className="text-sm font-semibold">Estrutura</h2>
            <p className="text-[11px] text-muted-foreground">{completed.length}/{flat.length} concluídos</p>
          </div>
          <TreeMenu content={content} currentId={currentId} completed={new Set(completed)} onSelect={go} />
        </aside>
        <section className="min-h-0 overflow-hidden bg-background">
          <VideoPanel content={content} videoId={currentId} hasPrev={hasPrev} hasNext={hasNext}
            isCompleted={completed.includes(currentId)}
            onPrev={() => hasPrev && go(flat[idx - 1].video.id)}
            onNext={() => hasNext && go(flat[idx + 1].video.id)}
            onComplete={() => { const p = markCompleted(currentId); setCompleted(p.completed); }} />
        </section>
        <aside className="border-l bg-background hidden lg:flex flex-col">
          <KiaraPanel title={content.kiara.title} intro={content.kiara.intro} />
        </aside>
      </div>
    </div>
  );
}
