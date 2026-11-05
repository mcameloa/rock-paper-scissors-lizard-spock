import { memo, type ReactNode } from "react";
import { Option, Roulette, WinnerRings } from "../components";
import { OUTCOME_TEXT, TEXTS } from "../utils/constants.ts";
import type { GameOption, Outcome } from "../utils/types.ts";

interface ResultProps {
  userOption: GameOption;
  houseOption: GameOption;
  /** `null` while the roulette is still spinning. */
  outcome: Outcome | null;
  onPlayAgain: () => void;
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

/**
 * One side of the board. The 96 px option is scaled to the design size
 * (130 px mobile, 200 px tablet, 293 px desktop) inside a slot of that size,
 * so layout and scale agree. The label sits below on mobile, above from md.
 */
const Side = ({ label, className, children }: { label: string; className: string; children: ReactNode }) => (
  <div className={`flex flex-col items-center gap-6 md:flex-col-reverse md:gap-12 lg:gap-16 ${className}`}>
    <div className="flex size-[130px] items-center justify-center md:size-[200px] lg:size-[293px]">
      <div className="scale-[1.354] md:scale-[2.083] lg:scale-[3.052]">{children}</div>
    </div>
    <span className="text-[15px] font-bold tracking-[1.875px] whitespace-nowrap text-white max-[359px]:text-[13px] max-[359px]:tracking-[1px] md:text-xl md:tracking-[2.5px] lg:text-2xl lg:tracking-[3px]">
      {label}
    </span>
  </div>
);

const Result = memo(({ userOption, houseOption, outcome, onPlayAgain }: ResultProps) => (
  // Mobile: picks side by side, outcome below. From md: pick, outcome, pick.
  <div className="mt-12 grid w-full max-w-78 animate-fade-in grid-cols-2 items-start justify-items-center gap-y-20 short:mt-0 short:gap-y-8 md:mt-8 md:max-w-235 md:grid-cols-[200px_1fr_200px] md:items-center lg:grid-cols-[293px_1fr_293px]">
    <Side label={TEXTS.PICKED} className="col-start-1 row-start-1">
      <Pick option={userOption} status={standing(outcome, "user")} />
    </Side>

    <Side label={TEXTS.HOUSE_PICKED} className="col-start-2 row-start-1 md:col-start-3">
      {outcome ? (
        <Pick option={houseOption} status={standing(outcome, "house")} pop />
      ) : (
        <Roulette target={houseOption} />
      )}
    </Side>

    {outcome && (
      <div className="col-span-2 row-start-2 flex flex-col items-center md:col-span-1 md:col-start-2 md:row-start-1 md:self-center md:pt-16">
        {/* Rises in after the winner's rings (see "Result reveal" in index.css). */}
        <h2 className="reveal-rise text-[56px] leading-none font-bold text-white [--rise-delay:700ms]" aria-live="polite">
          {OUTCOME_TEXT[outcome]}
        </h2>
        <button
          type="button"
          className="reveal-rise mt-4 h-12 w-55 cursor-pointer rounded-lg bg-white text-base tracking-[2.5px] text-neutral-dark transition-colors [--rise-delay:850ms] hover:text-primary-rock focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={onPlayAgain}
        >
          {TEXTS.PLAY_AGAIN}
        </button>
      </div>
    )}
  </div>
));

export default Result;
