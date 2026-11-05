import { memo } from "react";
import { Option, Roulette, WinnerRings } from "../components";
import { TEXTS } from "../utils/constants.ts";
import type { GameOption, Outcome } from "../utils/types.ts";

interface ResultProps {
  userOption: GameOption;
  houseOption: GameOption;
  /** `null` while the roulette is still spinning. */
  outcome: Outcome | null;
}

type Standing = "winner" | "loser" | "even";

const standing = (outcome: Outcome | null, side: "user" | "house"): Standing => {
  if (outcome === null || outcome === "draw") return "even";
  const userWon = outcome === "win";
  return (side === "user") === userWon ? "winner" : "loser";
};

/** A revealed pick: rings behind the winner, the loser dimmed. */
const Pick = ({ option, status, pop }: { option: GameOption; status: Standing; pop?: boolean }) => (
  <div className={`relative ${pop ? "reveal-pop" : ""}`} data-standing={status}>
    {status === "winner" && <WinnerRings />}
    <div className={status === "loser" ? "reveal-dim" : ""}>
      <Option option={option} />
    </div>
  </div>
);

const Result = memo(({ userOption, houseOption, outcome }: ResultProps) => (
  <div className="flex w-sm justify-around animate-fade-in lg:mt-[10%] lg:w-full lg:justify-between">
    <div className="relative flex flex-col items-center justify-center lg:w-120 lg:scale-[1.5]">
      <Pick option={userOption} status={standing(outcome, "user")} />
      <span className="mt-7 text-white lg:text-4xl">{TEXTS.PICKED}</span>
    </div>

    <div className="flex flex-col items-center justify-center lg:w-120 lg:scale-[1.5]">
      {outcome ? (
        <Pick option={houseOption} status={standing(outcome, "house")} pop />
      ) : (
        <Roulette target={houseOption} />
      )}
      <span className="mt-7 text-white lg:text-4xl">{TEXTS.HOUSE_PICKED}</span>
    </div>
  </div>
));

export default Result;
