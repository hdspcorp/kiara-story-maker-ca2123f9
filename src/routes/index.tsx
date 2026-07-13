import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { PrereqsAccordion } from "@/components/Prereqs";
import { AdminLoginDialog, useAdmin } from "@/components/AdminBar";
import { AdminEditor } from "@/components/AdminEditor";
import { usePublishedContent } from "@/hooks/useContent";
import { loadProgress, resetProgress } from "@/lib/progress";
import { flattenVideos } from "@/lib/default-content";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { content, reload } = usePublishedContent();
  const nav = useNavigate();
  const admin = useAdmin();
  const [loginOpen, setLoginOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [progress, setProg] = useState<{ completed: string[]; lastVideoId: string | null }>({ completed: [], lastVideoId: null });
  useEffect(() => { setProg(loadProgress()); }, []);

  if (!content) return (<div className="min-h-screen"><SiteHeader /><div className="p-10 text-sm text-muted-foreground">Carregando...</div></div>);
  const flat = flattenVideos(content);
  const totalDone = flat.filter((f) => progress.completed.includes(f.video.id)).length;
  const total = flat.length;
  const state: "new" | "in_progress" | "finished" = totalDone === 0 ? "new" : totalDone >= total ? "finished" : "in_progress";
  const ctaLabel = state === "new" ? content.page.ctaFirst : state === "in_progress" ? content.page.ctaContinue : content.page.ctaReview;

  function start() {
    const target = state === "in_progress" && progress.lastVideoId ? progress.lastVideoId : flat[0]?.video.id;
    if (!target) return;
    nav({ to: "/capacitacao", search: { v: target } });
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
          <span className="inline-block rounded-full border bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">{content.page.heroBadge}</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{content.page.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{content.page.subtitle}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button onClick={start} className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95">{ctaLabel}</button>
            {state !== "new" && (<span className="text-xs text-muted-foreground">Progresso: {totalDone}/{total} vídeos</span>)}
            {state !== "new" && (<button onClick={() => { resetProgress(); setProg({ completed: [], lastVideoId: null }); }} className="rounded-md border px-3 py-2 text-xs text-muted-foreground hover:bg-muted">Reiniciar progresso</button>)}
          </div>
        </section>
        <section className="mx-auto max-w-5xl px-4 pb-16">
          <PrereqsAccordion title={content.prerequisitesTitle} lead={content.prerequisitesLead} items={content.prerequisites} />
        </section>
      </main>
      <SiteFooter />
      <button onClick={() => (admin.isAdmin ? setEditorOpen(true) : setLoginOpen(true))} className="fixed bottom-4 right-4 rounded-full border bg-card px-3 py-2 text-xs text-muted-foreground shadow hover:bg-muted" aria-label="Modo administrativo">{admin.isAdmin ? "⚙ Admin" : "Admin"}</button>
      {admin.isAdmin && (<button onClick={() => admin.logout()} className="fixed bottom-4 right-24 rounded-full border bg-card px-3 py-2 text-xs text-muted-foreground shadow hover:bg-muted">Sair</button>)}
      <AdminLoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} onLoggedIn={() => setEditorOpen(true)} />
      {admin.token && (<AdminEditor token={admin.token} open={editorOpen} onClose={() => setEditorOpen(false)} onPublished={reload} />)}
    </div>
  );
}
