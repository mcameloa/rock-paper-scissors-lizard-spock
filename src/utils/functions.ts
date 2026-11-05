import { BEATS, OPTIONS } from "./constants.ts";
import type { GameOption, OptionName, Outcome } from "./types.ts";

export const getRandomOption = (): GameOption =>
  OPTIONS[Math.floor(Math.random() * OPTIONS.length)];

export const getOutcome = (user: OptionName, house: OptionName): Outcome => {
  if (user === house) return "draw";
  return BEATS[user].includes(house) ? "win" : "lose";
};

export interface RoulettePlan {
  /** Index of the option shown first. */
  start: number;
  /** Wait before each step to the next option; grows, so the spin slows down. */
  delays: number[];
}

/**
 * Plans a roulette that steps through `count` options, slowing down, and stops
 * on `target` within `durationMs` (leaving a short pause before the reveal).
 */
export const getRoulettePlan = (
  target: number,
  count: number,
  durationMs: number,
  { firstDelay = 50, slowdown = 1.15, settleMs = 150 } = {},
): RoulettePlan => {
  const delays: number[] = [];
  let total = 0;
  for (let d = firstDelay; total + d <= durationMs - settleMs; d *= slowdown) {
    delays.push(Math.round(d));
    total += d;
  }
  const start = (((target - delays.length) % count) + count) % count;
  return { start, delays };
};

export interface PentagonPoint {
  x: number;
  y: number;
  option: GameOption;
}

/** Places each option on a vertex of a regular pentagon, first one at the top. */
export const getPentagonPoints = (radius: number): PentagonPoint[] =>
  OPTIONS.map((option, i) => {
    const angle = (i * 2 * Math.PI) / OPTIONS.length - Math.PI / 2;
    return {
      x: radius + radius * Math.cos(angle),
      y: radius + radius * Math.sin(angle),
      option,
    };
  });
