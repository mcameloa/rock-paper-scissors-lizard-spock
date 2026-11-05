import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Rules from "./Rules";

describe("Rules", () => {
  it("renders nothing when hidden", () => {
    render(<Rules show={false} onClose={() => {}} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("is a labelled modal dialog with the close button focused", () => {
    render(<Rules show onClose={() => {}} />);
    const dialog = screen.getByRole("dialog", { name: "RULES" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByRole("button", { name: "Close rules" })).toHaveFocus();
  });

  it.each([
    ["the close button", () => userEvent.click(screen.getByRole("button", { name: "Close rules" }))],
    ["Escape", () => userEvent.keyboard("{Escape}")],
    ["a click on the backdrop", () => userEvent.click(screen.getByTestId("rules-backdrop"))],
  ])("closes with %s", async (_, act) => {
    const onClose = vi.fn();
    render(<Rules show onClose={onClose} />);
    await act();
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not close on a click inside the dialog", async () => {
    const onClose = vi.fn();
    render(<Rules show onClose={onClose} />);
    await userEvent.click(screen.getByRole("heading", { name: "RULES" }));
    expect(onClose).not.toHaveBeenCalled();
  });
});
