import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Game from "./Game";

it("starts on the selection screen with the five options", () => {
  render(<Game />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/lizard, spock/i);
  expect(screen.getByTestId("score")).toHaveTextContent("0");
  for (const name of ["rock", "paper", "scissors", "lizard", "spock"]) {
    expect(screen.getByRole("button", { name: `Pick ${name}` })).toBeInTheDocument();
  }
  expect(screen.getByRole("button", { name: "RULES" })).toBeInTheDocument();
});
