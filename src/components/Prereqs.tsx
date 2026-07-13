import { ChevronDown, FileCheck2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import type { PrereqItem } from "@/lib/default-content";

export function PrereqsAccordion({
  title,
  lead,
  items,
}: {
  title: string;
  lead: string;
  items: PrereqItem[];
}) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section
      aria-labelledby="prereqs-title"
      className="relative overflow-hidden rounded-3xl border border-primary/25 bg-white p-6 shadow-[0_22px_60px_rgba(15,118,110,0.12)]"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-emerald-300 to-cyan-300" />
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Checklist obrigatório
          </p>
          <h2 id="prereqs-title" className="mt-1 text-2xl font-black tracking-tight text-slate-950">
            {title}
          </h2>
        </div>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{lead}</p>
      <ul className="mt-5 space-y-3">
        {items.map((it) => {
          const isOpen = open === it.id;
          return (
            <li
              key={it.id}
              className={`overflow-hidden rounded-2xl border transition ${isOpen ? "border-primary/25 bg-primary/5 shadow-sm" : "bg-white hover:border-primary/20"}`}
            >
              <button
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                onClick={() => setOpen(isOpen ? null : it.id)}
                aria-expanded={isOpen}
              >
                <span className="flex items-center gap-3 text-sm font-bold text-slate-900">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary/10 text-primary">
                    <FileCheck2 className="h-4 w-4" />
                  </span>
                  {it.title}
                </span>
                <ChevronDown
                  aria-hidden
                  className={`h-4 w-4 text-primary transition ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="whitespace-pre-line px-4 pb-4 pl-16 text-sm leading-7 text-slate-600">
                  {it.body}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
