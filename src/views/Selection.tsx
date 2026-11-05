import { memo } from "react";
import { Option } from "../components";
import { getPentagonPoints } from "../utils/functions.ts";
import type { GameOption } from "../utils/types.ts";

interface SelectionProps {
  onSelect: (option: GameOption) => void;
}

// my-12: room for the half of each option that sticks out of the board.
// Nudged down from md to match the design (translate, so it takes no layout space).
// Positions in percent of the board, so the board can be sized in CSS:
// 224 px on mobile and 344 px from md (the design's pentagon radius 112 / 172).
const POINTS = getPentagonPoints(50);
const OUTLINE = POINTS.map(({ x, y }) => `${x},${y}`).join(" ");

const Selection = memo(({ onSelect }: SelectionProps) => (
  <div role="group" aria-label="Pick your move" className="relative my-12 size-56 animate-fade-in md:my-0 md:size-86 md:translate-y-10">
    <svg viewBox="0 0 100 100" className="size-full overflow-visible" aria-hidden="true">
      <polygon
        points={OUTLINE}
        fill="none"
        stroke="#000"
        strokeWidth="15"
        vectorEffect="non-scaling-stroke"
        opacity=".2"
      />
    </svg>

    {POINTS.map(({ x, y, option }) => (
      <div
        key={option.name}
        // 96 px option, 144 px from md (design: 145 px).
        className="absolute -translate-x-1/2 -translate-y-1/2 md:scale-150"
        style={{ left: `${x}%`, top: `${y}%` }}
      >
        <Option option={option} onSelect={onSelect} />
      </div>
    ))}
  </div>
));

export default Selection;
