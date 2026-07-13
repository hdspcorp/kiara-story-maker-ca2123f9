import { useEffect, useMemo, useState } from "react";
import type { Content, Group, Menu, Video } from "@/lib/default-content";
import { ytIdFromUrl } from "@/lib/default-content";
import { apiGetDraft, apiSaveDraft, apiPublish } from "./AdminBar";

const uid = (p: string) => `${p}_${Math.random().toString(36).slice(2, 8)}`;

export function AdminEditor({
  token,
  open,
  onClose,
  onPublished,
}: {
  token: string;
  open: boolean;
  onClose: () => void;
  onPublished: () => void;
}) {
  const [draft, setDraft] = useState<Content | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setMsg(null);
    apiGetDraft(token)
      .then(setDraft)
      .catch((e) => setMsg(String(e.message ?? e)));
  }, [open, token]);

  const invalid = useMemo(() => {
    if (!draft) return 0;
    let n = 0;
    draft.groups.forEach((g) =>
      g.menus.forEach((m) =>
        m.videos.forEach((v) => {
          if (!v.title.trim() || (v.url.trim() && !ytIdFromUrl(v.url || ""))) n++;
        }),
      ),
    );
    return n;
  }, [draft]);

  if (!open) return null;
  const update = (fn: (c: Content) => Content) => setDraft((d) => (d ? fn(structuredClone(d)) : d));

  async function save(publish = false) {
    if (!draft) return;
    setBusy(true);
    setMsg(null);
    try {
      await apiSaveDraft(token, draft);
      if (publish) {
        await apiPublish(token);
        setMsg("Publicado com sucesso.");
        onPublished();
      } else setMsg("Rascunho salvo.");
    } catch (e: unknown) {
      setMsg(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-background" role="dialog" aria-modal="true">
      <div className="flex items-center justify-between border-b p-4">
        <div>
          <h2 className="text-lg font-semibold">Modo administrativo</h2>
          <p className="text-xs text-muted-foreground">
            Alterações ficam em rascunho até você publicar.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => save(false)}
            disabled={busy || !draft}
            className="rounded-md border px-3 py-2 text-sm hover:bg-muted disabled:opacity-60"
          >
            {busy ? "Salvando..." : "Salvar rascunho"}
          </button>
          <button
            onClick={() => save(true)}
            disabled={busy || !draft || invalid > 0}
            title={invalid > 0 ? `${invalid} vídeo(s) com dados inválidos` : ""}
            className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            Publicar
          </button>
          <button
            onClick={onClose}
            className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
          >
            Fechar
          </button>
        </div>
      </div>
      {msg && (
        <div className="border-b bg-accent px-4 py-2 text-xs text-accent-foreground">{msg}</div>
      )}
      <div className="flex-1 overflow-auto p-4">
        {!draft ? (
          <div className="text-sm text-muted-foreground">Carregando rascunho...</div>
        ) : (
          <div className="space-y-6">
            <ContentEditor draft={draft} update={update} />
            <TreeEditor draft={draft} update={update} />
          </div>
        )}
      </div>
    </div>
  );
}

function ContentEditor({
  draft,
  update,
}: {
  draft: Content;
  update: (fn: (c: Content) => Content) => void;
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <section className="rounded-lg border p-4">
        <h3 className="text-sm font-bold">Página inicial</h3>
        <div className="mt-3 grid gap-3">
          <Field
            label="Título"
            value={draft.page.title}
            onChange={(value) => update((c) => ({ ...c, page: { ...c.page, title: value } }))}
          />
          <TextField
            label="Subtítulo"
            value={draft.page.subtitle}
            onChange={(value) => update((c) => ({ ...c, page: { ...c.page, subtitle: value } }))}
          />
          <Field
            label="Selo do topo"
            value={draft.page.heroBadge}
            onChange={(value) => update((c) => ({ ...c, page: { ...c.page, heroBadge: value } }))}
          />
          <div className="grid gap-3 md:grid-cols-3">
            <Field
              label="CTA inicial"
              value={draft.page.ctaFirst}
              onChange={(value) => update((c) => ({ ...c, page: { ...c.page, ctaFirst: value } }))}
            />
            <Field
              label="CTA continuar"
              value={draft.page.ctaContinue}
              onChange={(value) =>
                update((c) => ({ ...c, page: { ...c.page, ctaContinue: value } }))
              }
            />
            <Field
              label="CTA revisar"
              value={draft.page.ctaReview}
              onChange={(value) => update((c) => ({ ...c, page: { ...c.page, ctaReview: value } }))}
            />
          </div>
        </div>
      </section>
      <section className="rounded-lg border p-4">
        <h3 className="text-sm font-bold">Kiara</h3>
        <div className="mt-3 grid gap-3">
          <Field
            label="Título"
            value={draft.kiara.title}
            onChange={(value) => update((c) => ({ ...c, kiara: { ...c.kiara, title: value } }))}
          />
          <TextField
            label="Introdução"
            value={draft.kiara.intro}
            onChange={(value) => update((c) => ({ ...c, kiara: { ...c.kiara, intro: value } }))}
          />
          <Field
            label="Mensagem inicial"
            value={draft.kiara.initialMessage}
            onChange={(value) =>
              update((c) => ({ ...c, kiara: { ...c.kiara, initialMessage: value } }))
            }
          />
          <Field
            label="Placeholder"
            value={draft.kiara.placeholder}
            onChange={(value) =>
              update((c) => ({ ...c, kiara: { ...c.kiara, placeholder: value } }))
            }
          />
        </div>
      </section>
      <section className="rounded-lg border p-4 xl:col-span-2">
        <h3 className="text-sm font-bold">Antes de começar no Alpha</h3>
        <div className="mt-3 grid gap-3">
          <Field
            label="Título da seção"
            value={draft.prerequisitesTitle}
            onChange={(value) => update((c) => ({ ...c, prerequisitesTitle: value }))}
          />
          <TextField
            label="Texto introdutório"
            value={draft.prerequisitesLead}
            onChange={(value) => update((c) => ({ ...c, prerequisitesLead: value }))}
          />
          {draft.prerequisites.map((item) => (
            <div key={item.id} className="rounded-md border bg-muted/20 p-3">
              <Field
                label="Título do requisito"
                value={item.title}
                onChange={(value) =>
                  update((c) => ({
                    ...c,
                    prerequisites: c.prerequisites.map((p) =>
                      p.id === item.id ? { ...p, title: value } : p,
                    ),
                  }))
                }
              />
              <div className="mt-2">
                <TextField
                  label="Conteúdo"
                  value={item.body}
                  onChange={(value) =>
                    update((c) => ({
                      ...c,
                      prerequisites: c.prerequisites.map((p) =>
                        p.id === item.id ? { ...p, body: value } : p,
                      ),
                    }))
                  }
                />
              </div>
              <button
                className="mt-2 text-xs text-destructive hover:underline"
                onClick={() =>
                  update((c) => ({
                    ...c,
                    prerequisites: c.prerequisites.filter((p) => p.id !== item.id),
                  }))
                }
              >
                Remover requisito
              </button>
            </div>
          ))}
          <button
            className="w-fit rounded-md border px-3 py-2 text-sm hover:bg-muted"
            onClick={() =>
              update((c) => ({
                ...c,
                prerequisites: [
                  ...c.prerequisites,
                  { id: uid("p"), title: "Novo requisito", body: "Descreva o requisito." },
                ],
              }))
            }
          >
            + Adicionar requisito
          </button>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-xs font-medium text-muted-foreground">
      {label}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded border bg-background px-2 py-1.5 text-sm text-foreground"
      />
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-xs font-medium text-muted-foreground">
      {label}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="mt-1 w-full rounded border bg-background px-2 py-1.5 text-sm text-foreground"
      />
    </label>
  );
}

function TreeEditor({
  draft,
  update,
}: {
  draft: Content;
  update: (fn: (c: Content) => Content) => void;
}) {
  const sorted = [...draft.groups].sort((a, b) => a.order - b.order);
  return (
    <div className="space-y-4">
      {sorted.map((g, gi) => {
        const menus = [...g.menus].sort((a, b) => a.order - b.order);
        return (
          <div key={g.id} className="rounded-lg border">
            <div className="flex items-center gap-2 border-b bg-muted/30 p-3">
              <input
                value={g.title}
                onChange={(e) =>
                  update((c) => ({
                    ...c,
                    groups: c.groups.map((x) =>
                      x.id === g.id ? { ...x, title: e.target.value } : x,
                    ),
                  }))
                }
                className="flex-1 rounded border bg-background px-2 py-1 text-sm font-semibold"
              />
              <OrderCtl
                first={gi === 0}
                last={gi === sorted.length - 1}
                onUp={() => reorderGroup(g.id, "up", draft, update)}
                onDown={() => reorderGroup(g.id, "down", draft, update)}
              />
              <button
                className="text-xs text-destructive hover:underline"
                onClick={() =>
                  update((c) => ({ ...c, groups: c.groups.filter((x) => x.id !== g.id) }))
                }
              >
                Remover grupo
              </button>
            </div>
            <div className="space-y-3 p-3">
              {menus.map((m, mi) => {
                const vids = [...m.videos].sort((a, b) => a.order - b.order);
                return (
                  <div key={m.id} className="rounded-md border">
                    <div className="flex items-center gap-2 border-b bg-muted/20 p-2">
                      <input
                        value={m.title}
                        onChange={(e) =>
                          update((c) => ({
                            ...c,
                            groups: c.groups.map((gg) =>
                              gg.id === g.id
                                ? {
                                    ...gg,
                                    menus: gg.menus.map((mm) =>
                                      mm.id === m.id ? { ...mm, title: e.target.value } : mm,
                                    ),
                                  }
                                : gg,
                            ),
                          }))
                        }
                        className="flex-1 rounded border bg-background px-2 py-1 text-sm font-medium"
                      />
                      <OrderCtl
                        first={mi === 0}
                        last={mi === menus.length - 1}
                        onUp={() => reorderMenu(g.id, m.id, "up", draft, update)}
                        onDown={() => reorderMenu(g.id, m.id, "down", draft, update)}
                      />
                      <button
                        className="text-xs text-destructive hover:underline"
                        onClick={() =>
                          update((c) => ({
                            ...c,
                            groups: c.groups.map((gg) =>
                              gg.id === g.id
                                ? { ...gg, menus: gg.menus.filter((mm) => mm.id !== m.id) }
                                : gg,
                            ),
                          }))
                        }
                      >
                        Remover menu
                      </button>
                    </div>
                    <div className="space-y-2 p-2">
                      {vids.map((v, vi) => (
                        <div
                          key={v.id}
                          className="grid gap-2 rounded border p-2 md:grid-cols-[1fr_1fr_auto]"
                        >
                          <input
                            value={v.title}
                            placeholder="Título do vídeo"
                            onChange={(e) =>
                              updateVideo(g.id, m.id, v.id, { title: e.target.value }, update)
                            }
                            className="rounded border bg-background px-2 py-1 text-sm"
                          />
                          <input
                            value={v.url}
                            placeholder="URL do YouTube"
                            onChange={(e) =>
                              updateVideo(g.id, m.id, v.id, { url: e.target.value }, update)
                            }
                            className={`rounded border bg-background px-2 py-1 text-sm ${v.url && !ytIdFromUrl(v.url) ? "border-destructive" : ""}`}
                          />
                          <div className="flex items-center gap-1">
                            <OrderCtl
                              first={vi === 0}
                              last={vi === vids.length - 1}
                              onUp={() => reorderVideo(g.id, m.id, v.id, "up", draft, update)}
                              onDown={() => reorderVideo(g.id, m.id, v.id, "down", draft, update)}
                            />
                            <button
                              className="text-xs text-destructive hover:underline"
                              onClick={() =>
                                update((c) => ({
                                  ...c,
                                  groups: c.groups.map((gg) =>
                                    gg.id === g.id
                                      ? {
                                          ...gg,
                                          menus: gg.menus.map((mm) =>
                                            mm.id === m.id
                                              ? {
                                                  ...mm,
                                                  videos: mm.videos.filter((vv) => vv.id !== v.id),
                                                }
                                              : mm,
                                          ),
                                        }
                                      : gg,
                                  ),
                                }))
                              }
                            >
                              Excluir
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        className="rounded-md border px-2 py-1 text-xs hover:bg-muted"
                        onClick={() => addVideo(g.id, m.id, update)}
                      >
                        + Adicionar vídeo
                      </button>
                    </div>
                  </div>
                );
              })}
              <button
                className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
                onClick={() => addMenu(g.id, update)}
              >
                + Adicionar menu
              </button>
            </div>
          </div>
        );
      })}
      <button
        className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
        onClick={() => addGroup(update)}
      >
        + Adicionar grupo
      </button>
    </div>
  );
}

function OrderCtl({
  onUp,
  onDown,
  first,
  last,
}: {
  onUp: () => void;
  onDown: () => void;
  first: boolean;
  last: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        disabled={first}
        onClick={onUp}
        className="rounded border px-2 py-1 text-xs disabled:opacity-30"
        title="Subir"
      >
        ↑
      </button>
      <button
        disabled={last}
        onClick={onDown}
        className="rounded border px-2 py-1 text-xs disabled:opacity-30"
        title="Descer"
      >
        ↓
      </button>
    </div>
  );
}

function reorderGroup(
  id: string,
  dir: "up" | "down",
  draft: Content,
  update: (fn: (c: Content) => Content) => void,
) {
  const arr = [...draft.groups].sort((a, b) => a.order - b.order);
  const i = arr.findIndex((x) => x.id === id);
  const j = dir === "up" ? i - 1 : i + 1;
  if (j < 0 || j >= arr.length) return;
  [arr[i], arr[j]] = [arr[j], arr[i]];
  arr.forEach((x, idx) => (x.order = idx + 1));
  update((c) => ({ ...c, groups: arr }));
}
function reorderMenu(
  gId: string,
  mId: string,
  dir: "up" | "down",
  draft: Content,
  update: (fn: (c: Content) => Content) => void,
) {
  const g = draft.groups.find((x) => x.id === gId);
  if (!g) return;
  const arr = [...g.menus].sort((a, b) => a.order - b.order);
  const i = arr.findIndex((x) => x.id === mId);
  const j = dir === "up" ? i - 1 : i + 1;
  if (j < 0 || j >= arr.length) return;
  [arr[i], arr[j]] = [arr[j], arr[i]];
  arr.forEach((x, idx) => (x.order = idx + 1));
  update((c) => ({
    ...c,
    groups: c.groups.map((gg) => (gg.id === gId ? { ...gg, menus: arr } : gg)),
  }));
}
function reorderVideo(
  gId: string,
  mId: string,
  vId: string,
  dir: "up" | "down",
  draft: Content,
  update: (fn: (c: Content) => Content) => void,
) {
  const m = draft.groups.find((x) => x.id === gId)?.menus.find((x) => x.id === mId);
  if (!m) return;
  const arr = [...m.videos].sort((a, b) => a.order - b.order);
  const i = arr.findIndex((x) => x.id === vId);
  const j = dir === "up" ? i - 1 : i + 1;
  if (j < 0 || j >= arr.length) return;
  [arr[i], arr[j]] = [arr[j], arr[i]];
  arr.forEach((x, idx) => (x.order = idx + 1));
  update((c) => ({
    ...c,
    groups: c.groups.map((gg) =>
      gg.id === gId
        ? { ...gg, menus: gg.menus.map((mm) => (mm.id === mId ? { ...mm, videos: arr } : mm)) }
        : gg,
    ),
  }));
}
function updateVideo(
  gId: string,
  mId: string,
  vId: string,
  patch: Partial<Video>,
  update: (fn: (c: Content) => Content) => void,
) {
  update((c) => ({
    ...c,
    groups: c.groups.map((g) =>
      g.id === gId
        ? {
            ...g,
            menus: g.menus.map((m) =>
              m.id === mId
                ? { ...m, videos: m.videos.map((v) => (v.id === vId ? { ...v, ...patch } : v)) }
                : m,
            ),
          }
        : g,
    ),
  }));
}
function addGroup(update: (fn: (c: Content) => Content) => void) {
  update((c) => {
    const g: Group = { id: uid("g"), title: "Novo grupo", order: c.groups.length + 1, menus: [] };
    return { ...c, groups: [...c.groups, g] };
  });
}
function addMenu(gId: string, update: (fn: (c: Content) => Content) => void) {
  update((c) => ({
    ...c,
    groups: c.groups.map((g) =>
      g.id === gId
        ? {
            ...g,
            menus: [
              ...g.menus,
              { id: uid("m"), title: "Novo menu", order: g.menus.length + 1, videos: [] } as Menu,
            ],
          }
        : g,
    ),
  }));
}
function addVideo(gId: string, mId: string, update: (fn: (c: Content) => Content) => void) {
  update((c) => ({
    ...c,
    groups: c.groups.map((g) =>
      g.id === gId
        ? {
            ...g,
            menus: g.menus.map((m) =>
              m.id === mId
                ? {
                    ...m,
                    videos: [
                      ...m.videos,
                      {
                        id: uid("v"),
                        title: "Novo vídeo",
                        url: "",
                        order: m.videos.length + 1,
                        required: true,
                        duration: "",
                        description: "",
                        objectives: [],
                      } as Video,
                    ],
                  }
                : m,
            ),
          }
        : g,
    ),
  }));
}
