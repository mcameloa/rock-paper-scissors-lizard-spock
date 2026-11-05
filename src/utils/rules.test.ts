import { describe, expect, it } from "vitest";
import { BEATS, OPTIONS } from "./constants";
import { getOutcome } from "./functions";
import type { OptionName, Outcome } from "./types";

const NAMES = OPTIONS.map((o) => o.name);

// The full table from the official rules, written out independently of BEATS.
const WINS: [OptionName, OptionName][] = [
  ["scissors", "paper"],
  ["paper", "rock"],
  ["rock", "lizard"],
  ["lizard", "spock"],
  ["spock", "scissors"],
  ["scissors", "lizard"],
  ["lizard", "paper"],
  ["paper", "spock"],
  ["spock", "rock"],
  ["rock", "scissors"],
];

const expected = (user: OptionName, house: OptionName): Outcome => {
  if (user === house) return "draw";
  return WINS.some(([w, l]) => w === user && l === house) ? "win" : "lose";
};

describe("rules", () => {
  const pairs = NAMES.flatMap((user) => NAMES.map((house) => [user, house] as const));

  it("covers all 25 pairs", () => {
    expect(pairs).toHaveLength(25);
  });

  it.each(pairs)("%s vs %s", (user, house) => {
    expect(getOutcome(user, house)).toBe(expected(user, house));
  });

  it.each(NAMES)("%s beats exactly two options and loses to two", (name) => {
    const losesTo = NAMES.filter((other) => BEATS[other].includes(name));
    expect(BEATS[name]).toHaveLength(2);
    expect(losesTo).toHaveLength(2);
    expect(BEATS[name]).not.toContain(name);
  });
});
