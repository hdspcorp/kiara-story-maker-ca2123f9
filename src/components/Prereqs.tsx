import { ChevronDown, FileCheck2 } from "lucide-react";
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
    <section aria-labelledby="prereqs-title" className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 id="prereqs-title" className="text-xl font-bold text-slate-950">
        {title}
      </h2>
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
                <p className="px-4 pb-4 pl-16 text-sm leading-6 text-muted-foreground">{it.body}</p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
