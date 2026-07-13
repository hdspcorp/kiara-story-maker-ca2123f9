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
    <section aria-labelledby="prereqs-title" className="rounded-2xl border bg-card p-6 shadow-sm">
      <h2 id="prereqs-title" className="text-lg font-semibold">
        {title}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{lead}</p>
      <ul className="mt-4 divide-y">
        {items.map((it) => {
          const isOpen = open === it.id;
          return (
            <li key={it.id}>
              <button
                className="flex w-full items-center justify-between gap-3 py-3 text-left"
                onClick={() => setOpen(isOpen ? null : it.id)}
                aria-expanded={isOpen}
              >
                <span className="text-sm font-medium">{it.title}</span>
                <span aria-hidden className="text-muted-foreground">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && <p className="pb-4 text-sm text-muted-foreground">{it.body}</p>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}