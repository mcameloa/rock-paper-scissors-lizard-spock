import { useCallback, useEffect, useRef, useState } from "react";
import { REVEAL_DELAY_MS, SCORE_DELTA } from "../utils/constants.ts";
import { getOutcome, getRandomOption } from "../utils/functions.ts";
import type { GameOption, GameState } from "../utils/types.ts";
import { useStoredScore } from "./useStoredScore.ts";

/**
 * Game state machine: picking → revealing (house is "thinking") → result.
 * The pending reveal is cancelled on "play again" and on unmount, so a late
 * timer can never change the score.
 */
export const useGame = () => {
  const [score, setScore] = useStoredScore();
  const [state, setState] = useState<GameState>({ phase: "picking" });
  const revealTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const cancelReveal = useCallback(() => {
    clearTimeout(revealTimer.current);
    revealTimer.current = undefined;
  }, []);

  useEffect(() => cancelReveal, [cancelReveal]);

  const pick = useCallback(
    (user: GameOption) => {
      cancelReveal();
      setState({ phase: "revealing", user });

      revealTimer.current = setTimeout(() => {
        revealTimer.current = undefined;
        const house = getRandomOption();
        const outcome = getOutcome(user.name, house.name);
        setState({ phase: "result", user, house, outcome });
        setScore((current) => current + SCORE_DELTA[outcome]);
      }, REVEAL_DELAY_MS);
    },
    [cancelReveal, setScore],
  );

  const playAgain = useCallback(() => {
    cancelReveal();
    setState({ phase: "picking" });
  }, [cancelReveal]);

  return { score, state, pick, playAgain };
};
