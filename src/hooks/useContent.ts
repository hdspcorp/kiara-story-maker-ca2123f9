import { useEffect, useState } from "react";
import { fetchPublished } from "@/lib/content.functions";
import type { Content } from "@/lib/default-content";

export function usePublishedContent() {
  const [content, setContent] = useState<Content | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);
  useEffect(() => {
    let alive = true;
    fetchPublished()
      .then((c) => {
        if (alive) setContent(c);
      })
      .catch((e) => alive && setError(String(e.message ?? e)));
    return () => {
      alive = false;
    };
  }, [version]);
  return { content, error, reload: () => setVersion((v) => v + 1) };
}