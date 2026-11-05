import lizardLogo from "../assets/icon-lizard.svg"
import paperLogo from "../assets/icon-paper.svg"
import rockLogo from "../assets/icon-rock.svg"
import scissorsLogo from "../assets/icon-scissors.svg"
import spockLogo from "../assets/icon-spock.svg"

import {OptionType, RulesType} from "./types.ts";

export const OPTIONS: OptionType[] = [
  {
    name: "scissors",
    styles: "from-secondary-scissors to-primary-scissors shadow-scissors-shadow scissors",
    icon: scissorsLogo,
  },
  {
    name: "paper",
    styles: "from-secondary-paper to-primary-paper shadow-paper-shadow paper",
    icon: paperLogo,
  },
  {
    name: "rock",
    styles: "from-secondary-rock to-primary-rock shadow-rock-shadow rock",
    icon: rockLogo,
  },
  {
    name: "lizard",
    styles: "from-secondary-lizard to-primary-lizard shadow-lizard-shadow lizard",
    icon: lizardLogo,
  },
  {
    name: "spock",
    styles: "from-secondary-spock to-primary-spock shadow-spock-shadow spock",
    icon: spockLogo,
  },
];

export const RULES: RulesType = {
  rock: {
    beats: ["scissors", "lizard"],
  },
  paper: {
    beats: ["rock", "spock"],
  },
  scissors: {
    beats: ["paper", "lizard"],
  },
  lizard: {
    beats: ["spock", "paper"],
  },
  spock: {
    beats: ["rock", "scissors"],
  },
};

export const PENTAGON_RADIUS = 150;
export const TEXTS = {
  DRAW: "DRAW",
  WIN: "YOU WIN",
  LOSE: "YOU LOSE",
  PICKED: "YOU PICKED",
  HOUSE_PICKED: "THE HOUSE PICKED",
  PLAY_AGAIN: "PLAY AGAIN",
  RULES: "RULES",
  SCORE: "SCORE",
};
