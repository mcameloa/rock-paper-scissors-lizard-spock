import {test, expect} from "vitest";
import { render, screen } from "@testing-library/react";
import Buttons from "./Buttons";

test("renders Play Again button when result is available", () => {
  render(
    <Buttons result="You win!" handlePlayAgain={() => {}} setShowModal={() => {}} />
  );
  expect(screen.getByText(/play again/i)).toBeInTheDocument();
});

test("renders Rules button when no result is available", () => {
  render(<Buttons result={null} handlePlayAgain={() => {}} setShowModal={() => {}} />);
  expect(screen.getByText(/rules/i)).toBeInTheDocument();
});