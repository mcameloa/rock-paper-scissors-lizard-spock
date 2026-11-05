import { describe, expect, it, vi } from "vitest";
import { OPTIONS } from "./constants";
import { getOutcome, getPentagonPoints, getRandomOption } from "./functions";

describe("getOutcome", () => {
  it("is a draw when both pick the same option", () => {
    expect(getOutcome("rock", "rock")).toBe("draw");
  });

  it("is a win when the user's option beats the house's", () => {
    expect(getOutcome("rock", "scissors")).toBe("win");
  });

  it("is a loss when the house's option beats the user's", () => {
    expect(getOutcome("scissors", "spock")).toBe("lose");
  });
});

describe("getRandomOption", () => {
  it("maps the random number onto the option list", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    expect(getRandomOption().name).toBe(OPTIONS[0].name);

    vi.spyOn(Math, "random").mockReturnValue(0.999);
    expect(getRandomOption().name).toBe(OPTIONS[OPTIONS.length - 1].name);
  });
});

describe("getPentagonPoints", () => {
  it("puts the first option at the top center", () => {
    const [top] = getPentagonPoints(150);
    expect(top.x).toBeCloseTo(150);
    expect(top.y).toBeCloseTo(0);
  });

  it("places every option on the circle", () => {
    for (const { x, y } of getPentagonPoints(150)) {
      expect(Math.hypot(x - 150, y - 150)).toBeCloseTo(150);
    }
  });
});
