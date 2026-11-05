import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { SCORE_STORAGE_KEY } from "../utils/constants";
import { readStoredScore, useStoredScore } from "./useStoredScore";

describe("readStoredScore", () => {
  it.each([
    ["missing", null, 0],
    ["a saved score", "7", 7],
    ["a negative score", "-2", -2],
    ["corrupt text", "abc", 0],
    ["a fraction", "1.5", 0],
  ])("returns the right value for %s", (_, raw, score) => {
    if (raw !== null) window.localStorage.setItem(SCORE_STORAGE_KEY, raw);
    expect(readStoredScore()).toBe(score);
  });

  it("returns 0 when storage throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(readStoredScore()).toBe(0);
  });
});

describe("useStoredScore", () => {
  it("starts from the saved score and saves every change", () => {
    window.localStorage.setItem(SCORE_STORAGE_KEY, "4");
    const { result } = renderHook(() => useStoredScore());
    expect(result.current[0]).toBe(4);

    act(() => result.current[1]((s) => s + 1));
    expect(window.localStorage.getItem(SCORE_STORAGE_KEY)).toBe("5");
  });

  it("keeps working when storage cannot be written", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    const { result } = renderHook(() => useStoredScore());
    act(() => result.current[1](3));
    expect(result.current[0]).toBe(3);
  });
});
