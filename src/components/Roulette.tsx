import { useEffect, useMemo, useState } from "react";
import Option from "./Option";
import { OPTIONS, REVEAL_DELAY_MS } from "../utils/constants.ts";
import { getRoulettePlan } from "../utils/functions.ts";
import type { GameOption } from "../utils/types.ts";

interface RouletteProps {
  /** The house's pick; the spin stops on it. */
  target: GameOption;
}

const prefersReducedMotion = () =>
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Shown while the house "thinks": cycles through the options, slowing down,
 * and lands on the house's pick just before the reveal. With reduced motion
 * it falls back to a still, pulsing slot.
 */
const Roulette = ({ target }: RouletteProps) => {
  const [reduceMotion] = useState(prefersReducedMotion);
  const plan = useMemo(
    () =>
      getRoulettePlan(
        OPTIONS.findIndex((o) => o.name === target.name),
        OPTIONS.length,
        REVEAL_DELAY_MS,
      ),
    [target],
  );
  const [index, setIndex] = useState(plan.start);

  useEffect(() => {
    if (reduceMotion) return;
    let step = 0;
    let timer: ReturnType<typeof setTimeout>;

    const next = () => {
      if (step >= plan.delays.length) return;
      timer = setTimeout(() => {
        step += 1;
        setIndex((i) => (i + 1) % OPTIONS.length);
        next();
      }, plan.delays[step]);
    };
    next();

    return () => clearTimeout(timer);
  }, [plan, reduceMotion]);

  return (
    <div role="status" data-testid="roulette">
      <span className="sr-only">The house is picking</span>
      {reduceMotion ? (
        <div
          aria-hidden="true"
          className="h-24 w-24 animate-pulse rounded-full bg-secondary-radial"
        />
      ) : (
        // Remounting on every step replays the "tick" animation.
        <div aria-hidden="true" key={index} className="animate-tick">
          <Option option={OPTIONS[index]} />
        </div>
      )}
    </div>
  );
};

export default Roulette;
