import { BEATS, OPTIONS } from "./constants.ts";
import type { GameOption, OptionName, Outcome } from "./types.ts";

export const getRandomOption = (): GameOption =>
  OPTIONS[Math.floor(Math.random() * OPTIONS.length)];

export const getOutcome = (user: OptionName, house: OptionName): Outcome => {
  if (user === house) return "draw";
  return BEATS[user].includes(house) ? "win" : "lose";
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
