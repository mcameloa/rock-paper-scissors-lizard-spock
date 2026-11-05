import {test, expect} from "vitest";
import { render } from "@testing-library/react";
import Option from "./Option";
import {OPTIONS} from "../utils/constants.ts";

test("matches snapshot", () => {
  const { container } = render(<Option {...OPTIONS[0]} />);
  expect(container).toMatchSnapshot();
});