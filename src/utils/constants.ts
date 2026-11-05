import lizardIcon from "../assets/icon-lizard.svg";
import paperIcon from "../assets/icon-paper.svg";
import rockIcon from "../assets/icon-rock.svg";
import scissorsIcon from "../assets/icon-scissors.svg";
import spockIcon from "../assets/icon-spock.svg";

import type { GameOption, OptionName, Outcome } from "./types.ts";

/** Clockwise from the top of the pentagon, matching the design. */
export const OPTIONS: readonly GameOption[] = [
  {
    name: "scissors",
    styles: "from-secondary-scissors to-primary-scissors shadow-scissors-shadow",
    icon: scissorsIcon,
  },
  {
    name: "paper",
    styles: "from-secondary-paper to-primary-paper shadow-paper-shadow",
    icon: paperIcon,
  },
  {
    name: "rock",
    styles: "from-secondary-rock to-primary-rock shadow-rock-shadow",
    icon: rockIcon,
  },
  {
    name: "lizard",
    styles: "from-secondary-lizard to-primary-lizard shadow-lizard-shadow",
    icon: lizardIcon,
  },
  {
    name: "spock",
    styles: "from-secondary-spock to-primary-spock shadow-spock-shadow",
    icon: spockIcon,
  },
];

/** What each option defeats. Every option beats exactly two others. */
export const BEATS: Readonly<Record<OptionName, readonly OptionName[]>> = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["spock", "paper"],
  spock: ["rock", "scissors"],
};

export const SCORE_DELTA: Readonly<Record<Outcome, number>> = {
  win: 1,
  lose: -1,
  draw: 0,
};

export const OUTCOME_TEXT: Readonly<Record<Outcome, string>> = {
  win: "YOU WIN",
  lose: "YOU LOSE",
  draw: "DRAW",
};

export const TEXTS = {
  TITLE: "Rock, Paper, Scissors, Lizard, Spock",
  PICKED: "YOU PICKED",
  HOUSE_PICKED: "THE HOUSE PICKED",
  PLAY_AGAIN: "PLAY AGAIN",
  RULES: "RULES",
  SCORE: "SCORE",
} as const;

/** Time the house "thinks" before revealing its pick. */
export const REVEAL_DELAY_MS = 2000;


export const SCORE_STORAGE_KEY = "rpsls:score";
