import Button from "./Button";
import { OUTCOME_TEXT, TEXTS } from "../utils/constants.ts";
import type { Outcome } from "../utils/types.ts";

interface ButtonsProps {
  outcome: Outcome | null;
  onPlayAgain: () => void;
  onShowRules: () => void;
}

const Buttons = ({ outcome, onPlayAgain, onShowRules }: ButtonsProps) =>
  outcome ? (
    <Button
      variant="solid"
      label={TEXTS.PLAY_AGAIN}
      heading={OUTCOME_TEXT[outcome]}
      onClick={onPlayAgain}
    />
  ) : (
    <Button variant="outline" label={TEXTS.RULES} onClick={onShowRules} />
  );

export default Buttons;
