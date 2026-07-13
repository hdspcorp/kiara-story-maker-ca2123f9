import { useEffect, useRef, useState } from "react";

// Persistent iframe: mounted ONCE at document level and re-parented between
// containers so it never remounts when the user navigates videos.
let singletonNode: HTMLDivElement | null = null;

export function getKiaraNode(): HTMLDivElement {
  if (typeof document === "undefined") throw new Error("SSR");
  if (!singletonNode) {
    const wrap = document.createElement("div");
    wrap.style.cssText = "width:100%;height:100%;display:block";
    const iframe = document.createElement("iframe");
    iframe.src = "/api/kiara";
    iframe.title = "Kiara";
    iframe.setAttribute("allow", "microphone; clipboard-write");
    iframe.style.cssText = "border:0;width:100%;height:100%;display:block;background:#fff";
    wrap.appendChild(iframe);
    singletonNode = wrap;
  }
  return singletonNode;
}

export function KiaraPanel({ title, intro }: { title: string; intro: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const node = getKiaraNode();
    host.appendChild(node);
    setReady(true);
    return () => {
      if (node.parentNode === host) host.removeChild(node);
    };
  }, []);
  return (
    <div className="flex h-full flex-col">
      <div className="border-b bg-muted/40 px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{intro}</p>
      </div>
      <div ref={hostRef} className="min-h-[400px] flex-1 bg-white" aria-busy={!ready} />
    </div>
  );
}