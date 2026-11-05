import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Score from "./Score";

it("renders the label and the current score", () => {
  render(<Score score={-3} />);
  expect(screen.getByText("SCORE")).toBeInTheDocument();
  expect(screen.getByTestId("score")).toHaveTextContent("-3");
});
