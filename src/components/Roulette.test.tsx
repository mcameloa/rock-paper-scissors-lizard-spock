import { describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import Roulette from "./Roulette";
import { OPTIONS, REVEAL_DELAY_MS } from "../utils/constants";

const shownOption = () => screen.getByTestId("roulette").querySelector("img")?.getAttribute("alt");

describe("Roulette", () => {
  it("cycles through the options and stops on the target before the reveal", () => {
    vi.useFakeTimers();
    const target = OPTIONS.find((o) => o.name === "lizard")!;
    render(<Roulette target={target} />);

    const seen = new Set<string | null | undefined>([shownOption()]);
    for (let t = 0; t < REVEAL_DELAY_MS; t += 50) {
      act(() => vi.advanceTimersByTime(50));
      seen.add(shownOption());
    }

    expect(seen.size).toBe(OPTIONS.length);
    expect(shownOption()).toBe("lizard");
    expect(vi.getTimerCount()).toBe(0);
  });

  it("announces the wait to screen readers and hides the spinning icons", () => {
    render(<Roulette target={OPTIONS[0]} />);
    expect(screen.getByRole("status")).toHaveTextContent("The house is picking");
    expect(screen.getByTestId("roulette").querySelector('[aria-hidden="true"]')).not.toBeNull();
  });

  it("shows a still slot when the user prefers reduced motion", () => {
    vi.useFakeTimers();
    vi.stubGlobal("matchMedia", (query: string) => ({ matches: query.includes("reduce") }));
    render(<Roulette target={OPTIONS[0]} />);
    expect(screen.getByTestId("roulette").querySelector("img")).toBeNull();
    expect(vi.getTimerCount()).toBe(0);
    vi.unstubAllGlobals();
  });
});
