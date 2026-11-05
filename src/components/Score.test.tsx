import {test, expect} from "vitest";
import { render, screen } from "@testing-library/react";
import Score from "./Score";

test("renders the correct score", () => {
  render(<Score score={10} />);
  expect(screen.getByText("SCORE")).toBeInTheDocument();
  expect(screen.getByText("10")).toBeInTheDocument();
});

test("matches snapshot", () => {
  const { container } = render(<Score score={10} />);
  expect(container).toMatchSnapshot();
});