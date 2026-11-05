import Button from "./Button";
import {TEXTS} from "../utils/constants.ts";

interface ButtonsProps {
  result: string | null;
  handlePlayAgain: () => void;
  setShowModal: (value: boolean) => void;
}

const Buttons = ({ result, handlePlayAgain, setShowModal }: ButtonsProps) => {
  return result ? (
    <Button
      invert={false}
      text={TEXTS.PLAY_AGAIN}
      action={handlePlayAgain}
      result={result}
    />
  ) : (
    <Button
      invert={true}
      text={TEXTS.RULES}
      action={() => setShowModal(true)}
    />
  );
};

export default Buttons;
