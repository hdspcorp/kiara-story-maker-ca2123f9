import { useState } from "react";
import type { Content } from "@/lib/default-content";

export function TreeMenu({
  content,
  currentId,
  completed,
  onSelect,
}: {
  content: Content;
  currentId: string | null;
  completed: Set<string>;
  onSelect: (videoId: string) => void;
}) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(content.groups.map((g) => [g.id, true])),
  );
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(
    Object.fromEntries(content.groups.flatMap((g) => g.menus.map((m) => [m.id, true]))),
  );
  const sortedGroups = [...content.groups].sort((a, b) => a.order - b.order);
  return (
    <nav aria-label="Estrutura de capacitação" className="space-y-2 p-2 text-sm">
      {sortedGroups.map((g) => {
        const menus = [...g.menus].sort((a, b) => a.order - b.order);
        const totalV = menus.reduce((s, m) => s + m.videos.length, 0);
        const doneV = menus.reduce(
          (s, m) => s + m.videos.filter((v) => completed.has(v.id)).length,
          0,
        );
        const isOpen = openGroups[g.id] ?? true;
        return (
          <div key={g.id} className="rounded-md">
            <button
              onClick={() => setOpenGroups({ ...openGroups, [g.id]: !isOpen })}
              className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left font-semibold hover:bg-muted"
              aria-expanded={isOpen}
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="text-muted-foreground">{isOpen ? "▾" : "▸"}</span>
                <span className="truncate">{g.title}</span>
              </span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {doneV}/{totalV}
              </span>
            </button>
            {isOpen && (
              <div className="ml-2 mt-1 space-y-1 border-l pl-2">
                {menus.map((m) => {
                  const isMOpen = openMenus[m.id] ?? true;
                  const done = m.videos.filter((v) => completed.has(v.id)).length;
                  return (
                    <div key={m.id}>
                      <button
                        onClick={() => setOpenMenus({ ...openMenus, [m.id]: !isMOpen })}
                        className="flex w-full items-center justify-between gap-2 rounded px-2 py-1 text-left text-[13px] font-medium hover:bg-muted"
                        aria-expanded={isMOpen}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="text-muted-foreground">{isMOpen ? "▾" : "▸"}</span>
                          <span className="truncate">{m.title}</span>
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {done}/{m.videos.length}
                        </span>
                      </button>
                      {isMOpen && (
                        <ul className="mt-1 space-y-0.5">
                          {[...m.videos]
                            .sort((a, b) => a.order - b.order)
                            .map((v) => {
                              const isCurrent = v.id === currentId;
                              const isDone = completed.has(v.id);
                              return (
                                <li key={v.id}>
                                  <button
                                    onClick={() => onSelect(v.id)}
                                    className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[13px] ${
                                      isCurrent
                                        ? "bg-primary/10 font-medium text-foreground"
                                        : "text-foreground/80 hover:bg-muted"
                                    }`}
                                  >
                                    <span
                                      aria-hidden
                                      className={`grid h-4 w-4 place-items-center rounded-full border text-[10px] ${
                                        isDone
                                          ? "border-primary bg-primary text-primary-foreground"
                                          : isCurrent
                                            ? "border-primary text-primary"
                                            : "border-border text-transparent"
                                      }`}
                                    >
                                      ✓
                                    </span>
                                    <span className="min-w-0 flex-1 truncate">{v.title}</span>
                                  </button>
                                </li>
                              );
                            })}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
