import { memo } from "react";
import { Option } from "../components";
import { PENTAGON_RADIUS } from "../utils/constants.ts";
import { getPentagonPoints } from "../utils/functions.ts";
import type { GameOption } from "../utils/types.ts";

interface SelectionProps {
  onSelect: (option: GameOption) => void;
}

// The geometry never changes, so it is computed once.
const POINTS = getPentagonPoints(PENTAGON_RADIUS);
const SIZE = PENTAGON_RADIUS * 2;
const OUTLINE = POINTS.map(({ x, y }) => `${x},${y}`).join(" ");

const Selection = memo(({ onSelect }: SelectionProps) => (
  <div role="group" aria-label="Pick your move" className="relative mt-6 animate-fade-in lg:mt-40">
    <svg height={SIZE} width={SIZE} aria-hidden="true">
      <polygon points={OUTLINE} fill="none" stroke="#000" strokeWidth="15" opacity=".2" />
    </svg>

    {POINTS.map(({ x, y, option }) => (
      <div
        key={option.name}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: x, top: y }}
      >
        <Option option={option} onSelect={onSelect} />
      </div>
    ))}
  </div>
));

export default Selection;
