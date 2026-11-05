import Game from './Game';
import {test, expect} from "vitest";
import {render, screen} from "@testing-library/react";

test('renders Selection view', () => {
  render(<Game />);
  expect(screen.getByText(/SCORE/i)).toBeInTheDocument();
  expect(screen.getByText(/RULES/i)).toBeInTheDocument();
});

test('render Result page', () => {
  render(<Game />);

  const button = screen.getAllByTestId("scissors");
  button[0].click();
  // wait for the animation to finish
  setTimeout(() => {
    expect(screen.getByText(/YOU PICKED/i)).toBeInTheDocument();
    expect(screen.getByText(/THE HOUSE PICKED/i)).toBeInTheDocument();
    expect(screen.getByText(/PLAY AGAIN/i)).toBeInTheDocument();
  }, 1000);
});

test("matches snapshot", () => {
  const { container } = render(<Game />);
  expect(container).toMatchSnapshot();
});