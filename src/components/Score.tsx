import gameLogo from '../assets/logo-bonus.svg';
import {TEXTS} from "../utils/constants.ts";

interface ScoreProps {
  score: number;
}

const Score = (props: ScoreProps) => {
  return (
    <div className="flex justify-between absolute top-5 w-85/100 outline-neutral-outline outline-4 rounded-md m-3 p-4">
      <img className="h-16 p-2 md:h-30" src={gameLogo} alt="logo-bonus"/>
      <div className="flex flex-col justify-center bg-white rounded-md text-center w-1/4 h-16 md:h-30 md:w-40">
        <span className="text-neutral-score text-xs font-light">{TEXTS.SCORE}</span>
        <span className="text-neutral-dark font-bold text-4xl md:text-6xl">{props.score}</span>
      </div>
    </div>
  )
}

export default Score;
