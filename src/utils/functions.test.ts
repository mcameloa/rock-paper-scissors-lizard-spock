import { expect, test } from 'vitest'
import { determineResult } from './functions';

test("returns draw when options are the same", () => {
  const obj = { name: "rock", icon: "✊", styles: "" };
  const result = determineResult(obj, obj);
  expect(result.result).toBe("DRAW");
});

test("returns draw when options are the same", () => {
  const user = { name: "rock", icon: "✊", styles: "" };
  const house = { name: "scissors", icon: "✂️", styles: "" };

  const result = determineResult(user, house);
  expect(result.result).toBe("YOU WIN");
});

test("returns draw when options are the same", () => {
  const user = { name: "scissors", icon: "✂️", styles: "" };
  const house = { name: "spock", icon: "🖖🏻", styles: "" };

  const result = determineResult(user, house);
  expect(result.result).toBe("YOU LOSE");
});