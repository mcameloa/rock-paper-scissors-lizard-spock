import { memo } from "react";
import { Option } from "../components";
import { TEXTS } from "../utils/constants.ts";
import type { GameOption, Outcome } from "../utils/types.ts";

interface ResultProps {
  userOption: GameOption;
  /** `null` while the house is still picking. */
  houseOption: GameOption | null;
  outcome: Outcome | null;
}

const Result = memo(({ userOption, houseOption, outcome }: ResultProps) => (
  <div className="flex w-sm justify-around animate-fade-in lg:mt-[10%] lg:w-full lg:justify-between">
    <div className="relative flex flex-col items-center justify-center lg:w-120 lg:scale-[1.5]">
      <Option option={userOption} winner={outcome === "win"} />
      <span className="mt-7 text-white lg:text-4xl">{TEXTS.PICKED}</span>
    </div>

    <div
      className={`flex flex-col items-center justify-center lg:w-120 lg:scale-[1.5] ${houseOption ? "animate-fade-in" : ""}`}
    >
      <Option option={houseOption ?? undefined} winner={outcome === "lose"} />
      <span className="mt-7 text-white lg:text-4xl">{TEXTS.HOUSE_PICKED}</span>
    </div>
  </div>
));

export default Result;
