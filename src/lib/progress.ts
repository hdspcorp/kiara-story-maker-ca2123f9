const KEY = "alpha_training_progress_v1";

export type Progress = { completed: string[]; lastVideoId: string | null };

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadProgress(): Progress {
  if (!isBrowser()) return { completed: [], lastVideoId: null };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { completed: [], lastVideoId: null };
    const p = JSON.parse(raw);
    return {
      completed: Array.isArray(p.completed) ? p.completed : [],
      lastVideoId: typeof p.lastVideoId === "string" ? p.lastVideoId : null,
    };
  } catch {
    return { completed: [], lastVideoId: null };
  }
}

export function saveProgress(p: Progress) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

export function markCompleted(videoId: string): Progress {
  const p = loadProgress();
  if (!p.completed.includes(videoId)) p.completed.push(videoId);
  p.lastVideoId = videoId;
  saveProgress(p);
  return p;
}

export function setLast(videoId: string): Progress {
  const p = loadProgress();
  p.lastVideoId = videoId;
  saveProgress(p);
  return p;
}

export function resetProgress(): Progress {
  const empty = { completed: [], lastVideoId: null };
  saveProgress(empty);
  return empty;
}