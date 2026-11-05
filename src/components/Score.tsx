import gameLogo from "../assets/logo-bonus.svg";
import { TEXTS } from "../utils/constants.ts";

interface ScoreProps {
  score: number;
}

const Score = ({ score }: ScoreProps) => (
  <header className="absolute top-5 m-3 flex w-85/100 justify-between rounded-md p-4 outline-4 outline-neutral-outline">
    <img className="h-16 p-2 md:h-30" src={gameLogo} alt={TEXTS.TITLE} />
    <div className="flex h-16 w-1/4 flex-col justify-center rounded-md bg-white text-center md:h-30 md:w-40">
      <span className="text-xs font-light text-neutral-score">{TEXTS.SCORE}</span>
      <span className="text-4xl font-bold text-neutral-dark md:text-6xl" aria-live="polite" data-testid="score">
        {score}
      </span>
    </div>
  </header>
);

export default Score;
