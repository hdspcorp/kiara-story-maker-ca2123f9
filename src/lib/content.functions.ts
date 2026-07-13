import { createServerFn } from "@tanstack/react-start";
import { DEFAULT_CONTENT, type Content, ytIdFromUrl } from "./default-content";

// ---------- Helpers (server-only) ----------
async function getAdmin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

async function readChannel(channel: "published" | "draft"): Promise<Content> {
  const admin = await getAdmin();
  const { data, error } = await admin
    .from("content_state")
    .select("data")
    .eq("channel", channel)
    .maybeSingle();
  if (error) throw new Error(error.message);
  const raw = (data?.data ?? {}) as Partial<Content>;
  if (!raw || !raw.groups) return DEFAULT_CONTENT;
  return raw as Content;
}

async function writeChannel(channel: "published" | "draft", content: Content) {
  const admin = await getAdmin();
  const { error } = await admin
    .from("content_state")
    .upsert({ channel, data: content as never, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}

async function validateToken(token: string | null | undefined): Promise<boolean> {
  if (!token) return false;
  const admin = await getAdmin();
  const { data, error } = await admin
    .from("admin_sessions")
    .select("expires_at")
    .eq("token", token)
    .maybeSingle();
  if (error || !data) return false;
  if (new Date(data.expires_at).getTime() < Date.now()) {
    await admin.from("admin_sessions").delete().eq("token", token);
    return false;
  }
  return true;
}

// ---------- Public: fetch published ----------
export const fetchPublished = createServerFn({ method: "GET" }).handler(async () => {
  // seed the published row from DEFAULT_CONTENT if empty
  const c = await readChannel("published");
  if (c === DEFAULT_CONTENT) {
    await writeChannel("published", DEFAULT_CONTENT);
    await writeChannel("draft", DEFAULT_CONTENT);
  }
  return c;
});

// ---------- Public: kiara url proxy (returns only when configured) ----------
// We do NOT return the URL to the browser. Instead a route /api/kiara serves the iframe HTML server-side.
export const kiaraStatus = createServerFn({ method: "GET" }).handler(async () => {
  return { configured: Boolean(process.env.KIARA_IFRAME_URL) };
});

// ---------- Admin: login ----------
export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((d: { username: string; password: string }) => d)
  .handler(async ({ data }) => {
    const u = process.env.ADMIN_USERNAME;
    const p = process.env.ADMIN_PASSWORD;
    if (!u || !p) throw new Error("Credenciais administrativas não configuradas.");
    if (data.username !== u || data.password !== p) {
      // small delay to slow brute force
      await new Promise((r) => setTimeout(r, 400));
      throw new Error("Usuário ou senha inválidos.");
    }
    const admin = await getAdmin();
    const token =
      globalThis.crypto?.randomUUID?.() ??
      Math.random().toString(36).slice(2) + Date.now().toString(36);
    const expires = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();
    const { error } = await admin.from("admin_sessions").insert({ token, expires_at: expires });
    if (error) throw new Error(error.message);
    // cleanup expired sessions
    await admin.from("admin_sessions").delete().lt("expires_at", new Date().toISOString());
    return { token, expiresAt: expires };
  });

export const adminLogout = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string }) => d)
  .handler(async ({ data }) => {
    const admin = await getAdmin();
    await admin.from("admin_sessions").delete().eq("token", data.token);
    return { ok: true };
  });

export const adminCheck = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string }) => d)
  .handler(async ({ data }) => ({ valid: await validateToken(data.token) }));

// ---------- Admin: draft read/save ----------
export const adminGetDraft = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string }) => d)
  .handler(async ({ data }) => {
    if (!(await validateToken(data.token))) throw new Error("Sessão administrativa expirada.");
    return await readChannel("draft");
  });

export const adminSaveDraft = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string; content: Content }) => d)
  .handler(async ({ data }) => {
    if (!(await validateToken(data.token))) throw new Error("Sessão administrativa expirada.");
    await writeChannel("draft", data.content);
    return { ok: true };
  });

export const adminPublish = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string }) => d)
  .handler(async ({ data }) => {
    if (!(await validateToken(data.token))) throw new Error("Sessão administrativa expirada.");
    const draft = await readChannel("draft");
    // Validation: every video must have a valid youtube link.
    const errors: string[] = [];
    for (const g of draft.groups ?? [])
      for (const m of g.menus ?? [])
        for (const v of m.videos ?? []) {
          if (!v.url || !ytIdFromUrl(v.url))
            errors.push(`Link inválido no vídeo "${v.title || v.id}".`);
          if (!v.title?.trim()) errors.push(`Vídeo sem título (id ${v.id}).`);
        }
    if (errors.length) throw new Error(errors.join(" "));
    await writeChannel("published", draft);
    return { ok: true };
  });