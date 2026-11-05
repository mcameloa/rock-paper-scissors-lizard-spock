import {useState, useEffect} from "react";
import {PENTAGON_RADIUS, TEXTS} from "./utils/constants.ts";
import {OptionType} from "./utils/types.ts";
import {getRandomOption, determineResult} from "./utils/functions.ts";

import {Buttons, Rules, Score} from "./components";
import {Selection, Result} from "./views";

const Game = () => {
  const [score, setScore] = useState(() => {
    const storedScore = sessionStorage.getItem("score");
    return storedScore ? parseInt(storedScore) : 0;
  });
  const [userOption, setUserOption] = useState<OptionType | null>(null);
  const [houseOption, setHouseOption] = useState<OptionType | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("score", score.toString());
  }, [score]);

  const handleSelectOption = (option: OptionType) => {
    setUserOption(option);

    setTimeout(() => {
      const houseOption = getRandomOption();

      const { result, updatedUserOption, updatedHouseOption } = determineResult(
        option,
        houseOption
      );

      setUserOption(updatedUserOption);
      setHouseOption(updatedHouseOption);
      setResult(result);

      if (result === TEXTS.WIN) setScore((prev) => prev + 1);
      if (result === TEXTS.LOSE) setScore((prev) => prev - 1);
    }, 2000);
  };

  const handlePlayAgain = () => {
    setUserOption(null);
    setHouseOption(null);
    setResult(null);
  }

  return (
    <div
      className="h-screen relative flex flex-col items-center justify-center bg-linear-to-b from-primary-radial to-secondary-radial p-10">
      <Score score={score} />
      { !userOption && <div className="animate-fade-in">
          <Selection selectOption={handleSelectOption} centerX={PENTAGON_RADIUS} centerY={PENTAGON_RADIUS} radius={PENTAGON_RADIUS} />
        </div>
      }
      { userOption && <Result userOption={userOption} houseOption={houseOption} /> }
      <Buttons
        result={result}
        handlePlayAgain={handlePlayAgain}
        setShowModal={setShowModal}
      />
      <Rules show={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}

export default Game;