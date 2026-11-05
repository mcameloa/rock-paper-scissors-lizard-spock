import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "./Game";
import { OPTIONS, REVEAL_DELAY_MS, SCORE_STORAGE_KEY } from "./utils/constants";
import type { OptionName } from "./utils/types";

/** Makes the house pick `name` on its next turn. */
const houseWillPick = (name: OptionName) => {
  const index = OPTIONS.findIndex((o) => o.name === name);
  vi.spyOn(Math, "random").mockReturnValue(index / OPTIONS.length);
};

const setup = () => {
  const user = userEvent.setup({ advanceTimers: (ms) => vi.advanceTimersByTime(ms) });
  const view = render(<Game />);
  return { user, ...view };
};

const reveal = () => act(() => vi.advanceTimersByTime(REVEAL_DELAY_MS));
const score = () => screen.getByTestId("score");

describe("Game", () => {
  beforeEach(() => {
    // shouldAdvanceTime lets Testing Library's internal setTimeout(0) run;
    // the 2 s reveal is still driven explicitly with reveal().
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  it("starts on the selection screen with the five options", () => {
    setup();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/lizard, spock/i);
    expect(score()).toHaveTextContent("0");
    for (const { name } of OPTIONS) {
      expect(screen.getByRole("button", { name: `Pick ${name}` })).toBeInTheDocument();
    }
  });

  it("plays a winning round: pick, wait for the house, score +1, play again", async () => {
    houseWillPick("scissors");
    const { user } = setup();

    await user.click(screen.getByRole("button", { name: "Pick rock" }));
    expect(screen.getByText("YOU PICKED")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(/house is picking/i);
    expect(screen.queryByRole("heading", { name: "YOU WIN" })).not.toBeInTheDocument();

    reveal();
    expect(screen.getByRole("heading", { name: "YOU WIN" })).toBeInTheDocument();
    expect(screen.getByAltText("scissors")).toBeInTheDocument();
    expect(screen.getAllByTestId("winner-glow")).toHaveLength(1);
    expect(score()).toHaveTextContent("1");

    await user.click(screen.getByRole("button", { name: "PLAY AGAIN" }));
    expect(screen.getByRole("button", { name: "Pick rock" })).toBeInTheDocument();
    expect(score()).toHaveTextContent("1");
  });

  it.each([
    ["lose", "scissors", "rock", "YOU LOSE", "-1"],
    ["draw", "spock", "spock", "DRAW", "0"],
  ] as const)("on a %s shows the outcome and updates the score", async (_, mine, house, text, total) => {
    houseWillPick(house);
    const { user } = setup();

    await user.click(screen.getByRole("button", { name: `Pick ${mine}` }));
    reveal();
    expect(screen.getByRole("heading", { name: text })).toBeInTheDocument();
    expect(score()).toHaveTextContent(total);
    expect(screen.queryAllByTestId("winner-glow")).toHaveLength(text === "DRAW" ? 0 : 1);
  });

  it("can be played with the keyboard", async () => {
    houseWillPick("rock");
    const { user } = setup();

    await user.tab();
    expect(screen.getByRole("button", { name: "Pick scissors" })).toHaveFocus();
    await user.keyboard("{Enter}");
    reveal();
    expect(screen.getByRole("heading", { name: "YOU LOSE" })).toBeInTheDocument();
  });

  it("cancels a pending reveal on unmount", async () => {
    const { user, unmount } = setup();

    await user.click(screen.getByRole("button", { name: "Pick rock" }));
    expect(vi.getTimerCount()).toBe(1);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("restores the saved score after a reload", () => {
    window.localStorage.setItem(SCORE_STORAGE_KEY, "12");
    setup();
    expect(score()).toHaveTextContent("12");
  });

  it("opens the rules and returns focus to the Rules button on close", async () => {
    const { user } = setup();
    const rulesButton = screen.getByRole("button", { name: "RULES" });

    await user.click(rulesButton);
    expect(screen.getByRole("dialog", { name: "RULES" })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(rulesButton).toHaveFocus();
  });
});
