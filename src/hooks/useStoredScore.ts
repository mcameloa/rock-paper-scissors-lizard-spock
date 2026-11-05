import { useEffect, useState } from "react";
import { SCORE_STORAGE_KEY } from "../utils/constants.ts";

/** Reads the saved score; any missing, corrupt or inaccessible value counts as 0. */
export const readStoredScore = (): number => {
  try {
    const raw = window.localStorage.getItem(SCORE_STORAGE_KEY);
    const value = raw === null ? 0 : Number(raw);
    return Number.isSafeInteger(value) ? value : 0;
  } catch {
    return 0;
  }
};

/** Score state that survives reloads. Storage errors (private mode, quota) are ignored. */
export const useStoredScore = () => {
  const [score, setScore] = useState(readStoredScore);

  useEffect(() => {
    try {
      window.localStorage.setItem(SCORE_STORAGE_KEY, String(score));
    } catch {
      // Storage unavailable: the score still works for this visit.
    }
  }, [score]);

  return [score, setScore] as const;
};
