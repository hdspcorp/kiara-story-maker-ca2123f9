import { useEffect, useState } from "react";
import {
  adminCheck,
  adminLogin,
  adminLogout,
  adminGetDraft,
  adminSaveDraft,
  adminPublish,
} from "@/lib/content.functions";
import type { Content } from "@/lib/default-content";

const TOKEN_KEY = "alpha_admin_token_v1";

export function useAdmin() {
  const [token, setToken] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (!t) { setChecking(false); return; }
    adminCheck({ data: { token: t } })
      .then((r) => { if (r.valid) setToken(t); else localStorage.removeItem(TOKEN_KEY); })
      .finally(() => setChecking(false));
  }, []);
  async function login(username: string, password: string) {
    const r = await adminLogin({ data: { username, password } });
    localStorage.setItem(TOKEN_KEY, r.token);
    setToken(r.token);
  }
  async function logout() {
    if (token) await adminLogout({ data: { token } });
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }
  return { token, isAdmin: !!token, checking, login, logout };
}

export async function apiGetDraft(token: string): Promise<Content> {
  return await adminGetDraft({ data: { token } });
}
export async function apiSaveDraft(token: string, content: Content) {
  return await adminSaveDraft({ data: { token, content } });
}
export async function apiPublish(token: string) {
  return await adminPublish({ data: { token } });
}

export function AdminLoginDialog({
  open, onClose, onLoggedIn,
}: { open: boolean; onClose: () => void; onLoggedIn: () => void }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { login } = useAdmin();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" role="dialog" aria-modal="true">
      <form className="w-full max-w-sm rounded-xl border bg-card p-5 shadow-xl"
        onSubmit={async (e) => {
          e.preventDefault();
          setErr(null); setBusy(true);
          try { await login(u, p); onLoggedIn(); onClose(); }
          catch (e: unknown) { setErr(e instanceof Error ? e.message : "Falha ao autenticar."); }
          finally { setBusy(false); }
        }}>
        <h2 className="text-lg font-semibold">Acesso administrativo</h2>
        <p className="mt-1 text-xs text-muted-foreground">Informe suas credenciais para editar a capacitação.</p>
        <label className="mt-4 block text-xs font-medium">Usuário</label>
        <input value={u} onChange={(e) => setU(e.target.value)} autoComplete="username" required
          className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
        <label className="mt-3 block text-xs font-medium">Senha</label>
        <input type="password" value={p} onChange={(e) => setP(e.target.value)} autoComplete="current-password" required
          className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
        {err && <p className="mt-3 text-xs text-destructive">{err}</p>}
        <div className="mt-5 flex items-center justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted">Cancelar</button>
          <button type="submit" disabled={busy} className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">
            {busy ? "Entrando..." : "Entrar"}
          </button>
        </div>
      </form>
    </div>
  );
}