import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { PrereqsAccordion } from "@/components/Prereqs";
import { AdminLoginDialog, useAdmin } from "@/components/AdminBar";
import { AdminEditor } from "@/components/AdminEditor";
import { AlphaLogo } from "@/components/Brand";
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
  const [progress, setProg] = useState<{ completed: string[]; lastVideoId: string | null }>({
    completed: [],
    lastVideoId: null,
  });
  useEffect(() => {
    setProg(loadProgress());
  }, []);

  const flat = useMemo(() => (content ? flattenVideos(content) : []), [content]);

  if (!content)
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,oklch(0.96_0.05_155),transparent_34%),var(--color-background)]">
        <SiteHeader />
        <div className="p-10 text-sm text-muted-foreground">Carregando...</div>
      </div>
    );

  const totalDone = flat.filter((f) => progress.completed.includes(f.video.id)).length;
  const total = flat.length;
  const percent = total > 0 ? Math.round((totalDone / total) * 100) : 0;
  const state: "new" | "in_progress" | "finished" =
    totalDone === 0 ? "new" : totalDone >= total ? "finished" : "in_progress";
  const ctaLabel =
    state === "new"
      ? content.page.ctaFirst
      : state === "in_progress"
        ? content.page.ctaContinue
        : content.page.ctaReview;

  function start() {
    const target =
      state === "in_progress" && progress.lastVideoId ? progress.lastVideoId : flat[0]?.video.id;
    if (!target) return;
    nav({ to: "/capacitacao", search: { v: target } });
  }

  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,oklch(0.985_0.025_155)_0%,#fff_42%)] text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 pt-8 sm:pt-12">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-200/80 bg-white/85 p-6 shadow-[0_24px_70px_rgba(15,118,110,0.12)] backdrop-blur sm:p-8 lg:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,oklch(0.9_0.11_155_/_0.45),transparent_30%),linear-gradient(135deg,transparent_45%,oklch(0.9_0.08_165_/_0.5)_45%,transparent_70%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_280px] lg:items-center">
              <div>
                <div className="flex items-center gap-4">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 shadow-inner ring-1 ring-primary/15">
                    <AlphaLogo className="h-11 w-auto" />
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    {content.page.heroBadge}
                  </span>
                </div>
                <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  {content.page.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {content.page.subtitle}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    onClick={start}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:opacity-95"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    {ctaLabel}
                  </button>
                  {state !== "new" && (
                    <button
                      onClick={() => {
                        resetProgress();
                        setProg({ completed: [], lastVideoId: null });
                      }}
                      className="inline-flex items-center gap-2 rounded-xl border bg-white/80 px-4 py-3 text-sm font-semibold text-muted-foreground shadow-sm hover:bg-muted"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reiniciar
                    </button>
                  )}
                </div>
                <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" /> Ambiente de treinamento guiado,
                  seguro e organizado para sua jornada no Alpha.
                </p>
              </div>
              <div className="rounded-2xl border bg-white/90 p-5 shadow-xl shadow-emerald-950/10">
                <p className="text-sm font-semibold text-slate-800">Progresso geral</p>
                <div className="mt-3 text-4xl font-black text-primary">{percent}%</div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-emerald-100">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  {totalDone} de {total} vídeos concluídos
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-5">
          <div className="grid gap-3 rounded-2xl border bg-white/90 p-3 shadow-sm md:grid-cols-3">
            {[
              { icon: FileCheck2, title: "Preparação inicial", text: "Reúna o que você precisa" },
              {
                icon: Play,
                title: "Capacitação dentro da trilha",
                text: "Aprenda e pratique no sistema",
              },
              {
                icon: Trophy,
                title: "Conteúdos complementares",
                text: "Aprofunde seu conhecimento",
              },
            ].map((step, idx) => (
              <div key={step.title} className="flex items-center gap-3 rounded-xl px-3 py-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {idx + 1}
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <step.icon className="h-4 w-4 text-primary" />
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 lg:grid-cols-[1fr_360px]">
          <PrereqsAccordion
            title={content.prerequisitesTitle}
            lead={content.prerequisitesLead}
            items={content.prerequisites}
          />
          <aside className="rounded-3xl border bg-white p-6 text-center shadow-sm">
            <div className="mx-auto grid h-36 w-36 place-items-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-20 w-20 text-primary" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-slate-950">Tudo pronto para seu sucesso</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Siga as etapas e aproveite ao máximo os recursos do Alpha.
            </p>
            <button
              onClick={start}
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              Começar agora <ChevronRight className="h-4 w-4" />
            </button>
          </aside>
        </section>
      </main>
      <SiteFooter />
      <button
        onClick={() => (admin.isAdmin ? setEditorOpen(true) : setLoginOpen(true))}
        className="fixed bottom-4 right-4 rounded-full border bg-card px-3 py-2 text-xs text-muted-foreground shadow hover:bg-muted"
        aria-label="Modo administrativo"
      >
        {admin.isAdmin ? "⚙ Admin" : "Admin"}
      </button>
      {admin.isAdmin && (
        <button
          onClick={() => admin.logout()}
          className="fixed bottom-4 right-24 rounded-full border bg-card px-3 py-2 text-xs text-muted-foreground shadow hover:bg-muted"
        >
          Sair
        </button>
      )}
      <AdminLoginDialog
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoggedIn={() => setEditorOpen(true)}
      />
      {admin.token && (
        <AdminEditor
          token={admin.token}
          open={editorOpen}
          onClose={() => setEditorOpen(false)}
          onPublished={reload}
        />
      )}
    </div>
  );
}
