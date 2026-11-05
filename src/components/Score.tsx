import gameLogo from "../assets/logo-bonus.svg";
import { TEXTS } from "../utils/constants.ts";

interface ScoreProps {
  score: number;
}

// Design: 311×100 on mobile, 700×150 from md; score box 80×72 / 150×114.
const Score = ({ score }: ScoreProps) => (
  <header className="relative z-10 flex w-full max-w-175 items-center justify-between rounded-md py-3.5 pr-3 pl-6 outline-3 outline-neutral-outline md:rounded-2xl md:py-4.5 md:pr-6 md:pl-8">
    <img className="h-12 md:h-28" src={gameLogo} alt={TEXTS.TITLE} />
    <div className="flex h-18 w-20 flex-col items-center justify-center rounded-md bg-white md:h-28.5 md:w-37.5 md:rounded-lg">
      <span className="text-[10px] font-semibold tracking-[1.5px] text-neutral-score md:text-base md:tracking-[2.5px]">
        {TEXTS.SCORE}
      </span>
      <span
        className="text-[40px] leading-none font-bold text-neutral-dark md:text-[64px]"
        aria-live="polite"
        data-testid="score"
      >
        {score}
      </span>
    </div>
  </header>
);

export default Score;
