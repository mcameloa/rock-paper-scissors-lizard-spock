import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Buttons from "./Buttons";

describe("Buttons", () => {
  it("shows the outcome and Play again once the round is over", async () => {
    const onPlayAgain = vi.fn();
    render(<Buttons outcome="win" onPlayAgain={onPlayAgain} onShowRules={() => {}} />);

    expect(screen.getByRole("heading", { name: "YOU WIN" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "PLAY AGAIN" }));
    expect(onPlayAgain).toHaveBeenCalledOnce();
  });

  it("shows the Rules button while there is no outcome", async () => {
    const onShowRules = vi.fn();
    render(<Buttons outcome={null} onPlayAgain={() => {}} onShowRules={onShowRules} />);

    expect(screen.queryByRole("button", { name: "PLAY AGAIN" })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "RULES" }));
    expect(onShowRules).toHaveBeenCalledOnce();
  });
});
