import { useEffect, useRef } from "react";

type SaveFn<T> = (payload: T) => Promise<void> | void;

export function useAutosaveDraft<T>(
  key: string,
  payload: T,
  isDirty: boolean,
  saveFn?: SaveFn<T>,
  delayMs: number = 900
) {
  const timer = useRef<number | null>(null);
  const last = useRef<string>("");

  useEffect(() => {
    if (!isDirty) return;

    const serialized = JSON.stringify(payload);
    if (serialized === last.current) return;

    if (timer.current) window.clearTimeout(timer.current);

    timer.current = window.setTimeout(async () => {
      // Local fallback
      localStorage.setItem(key, serialized);
      last.current = serialized;

      // Optional: server save
      if (saveFn) await saveFn(payload);
    }, delayMs);

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [key, payload, isDirty, saveFn, delayMs]);
}
