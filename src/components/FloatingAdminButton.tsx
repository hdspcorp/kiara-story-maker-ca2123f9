import { useState } from "react";
import { AdminEditor } from "@/components/AdminEditor";
import { AdminLoginDialog, useAdmin } from "@/components/AdminBar";

export function FloatingAdminButton({ onPublished }: { onPublished: () => void }) {
  const admin = useAdmin();
  const [loginOpen, setLoginOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);

  return (
    <>
      <div className="fixed right-4 top-4 z-50 flex items-center gap-2">
        {admin.isAdmin && (
          <button
            onClick={() => admin.logout()}
            className="rounded-full border border-slate-200 bg-white/95 px-3 py-2 text-xs font-semibold text-slate-600 shadow-lg shadow-slate-950/10 backdrop-blur transition hover:-translate-y-0.5 hover:bg-slate-50"
          >
            Sair
          </button>
        )}
        <button
          onClick={() => (admin.isAdmin ? setEditorOpen(true) : setLoginOpen(true))}
          className="rounded-full border border-primary/20 bg-slate-950 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-xl shadow-slate-950/20 backdrop-blur transition hover:-translate-y-0.5 hover:bg-primary"
          aria-label="Modo administrativo"
        >
          {admin.isAdmin ? "⚙ Modo Admin" : "Modo Admin"}
        </button>
      </div>
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
          onPublished={onPublished}
        />
      )}
    </>
  );
}
