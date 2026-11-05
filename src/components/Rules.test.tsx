import {test, expect} from "vitest";
import { render, screen } from "@testing-library/react";
import Rules from "./Rules";

test("renders the rules modal when show is true", () => {
  render(<Rules show={true} onClose={() => {}} />);
  expect(screen.getByText(/rules/i)).toBeInTheDocument();
});

test("no renders the rules modal when show is false", () => {
  render(<Rules show={false} onClose={() => {}} />);
  expect(screen.queryByTestId("rules-modal")).not.toBeInTheDocument();
});

test("matches snapshot", () => {
  const { container } = render(<Rules show={true} onClose={() => {}} />);
  expect(container).toMatchSnapshot();
});
