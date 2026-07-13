import { ChevronDown, FileCheck2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import type { PrereqItem } from "@/lib/default-content";

function formatBody(body: string) {
  return body
    .split("✔")
    .map((part, index) => ({ text: part.trim(), checked: index > 0 }))
    .filter((part) => part.text.length > 0);
}

export function PrereqsAccordion({
  title,
  lead,
  items,
}: {
  title: string;
  lead: string;
  items: PrereqItem[];
}) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  return (
    <section
      aria-labelledby="prereqs-title"
      className="relative overflow-hidden rounded-[2rem] border border-emerald-200/80 bg-white p-6 shadow-[0_24px_80px_rgba(15,118,110,0.12)]"
    >
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-emerald-300 to-cyan-300" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-primary ring-1 ring-primary/15">
            <ShieldCheck className="h-3.5 w-3.5" /> Checklist obrigatório
          </span>
          <h2
            id="prereqs-title"
            className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950"
          >
            {title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{lead}</p>
        </div>
      </div>
      <ul className="mt-6 grid gap-3">
        {items.map((it) => {
          const isOpen = open === it.id;
          return (
            <li
              key={it.id}
              className={`overflow-hidden rounded-2xl border transition ${
                isOpen
                  ? "border-primary/30 bg-gradient-to-br from-emerald-50 to-white shadow-md shadow-emerald-950/5"
                  : "bg-white hover:border-primary/25 hover:shadow-sm"
              }`}
            >
              <button
                className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                onClick={() => setOpen(isOpen ? null : it.id)}
                aria-expanded={isOpen}
              >
                <span className="flex items-center gap-3 text-sm font-extrabold text-slate-900">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <FileCheck2 className="h-5 w-5" />
                  </span>
                  {it.title}
                </span>
                <ChevronDown
                  aria-hidden
                  className={`h-4 w-4 shrink-0 text-primary transition ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="space-y-2 px-4 pb-5 pl-16 text-sm leading-6 text-muted-foreground">
                  {formatBody(it.body).map((part, index) =>
                    part.checked ? (
                      <p key={index} className="flex gap-2 text-slate-700">
                        <span className="font-bold text-primary">✔</span>
                        <span>{part.text}</span>
                      </p>
                    ) : (
                      <p key={index}>{part.text}</p>
                    ),
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
