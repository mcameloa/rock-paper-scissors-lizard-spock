export type OptionName = "rock" | "paper" | "scissors" | "lizard" | "spock";

export type Outcome = "win" | "lose" | "draw";

export interface GameOption {
  name: OptionName;
  icon: string;
  /** Tailwind classes for the option's gradient and shadow. */
  styles: string;
}

export type GameState =
  | { phase: "picking" }
  | { phase: "revealing"; user: GameOption }
  | { phase: "result"; user: GameOption; house: GameOption; outcome: Outcome };
