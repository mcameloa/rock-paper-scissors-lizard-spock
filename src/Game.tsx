import { useCallback, useState } from "react";
import { TEXTS } from "./utils/constants.ts";
import { useGame } from "./hooks/useGame.ts";
import { Buttons, Rules, Score } from "./components";
import { Result, Selection } from "./views";

const Game = () => {
  const { score, state, pick, playAgain } = useGame();
  const [showRules, setShowRules] = useState(false);

  const openRules = useCallback(() => setShowRules(true), []);
  const closeRules = useCallback(() => setShowRules(false), []);

  const outcome = state.phase === "result" ? state.outcome : null;

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-linear-to-b from-primary-radial to-secondary-radial p-10">
      <h1 className="sr-only">{TEXTS.TITLE}</h1>
      <Score score={score} />

      {state.phase === "picking" ? (
        <Selection onSelect={pick} />
      ) : (
        <Result
          userOption={state.user}
          houseOption={state.phase === "result" ? state.house : null}
          outcome={outcome}
        />
      )}

      <Buttons outcome={outcome} onPlayAgain={playAgain} onShowRules={openRules} />
      <Rules show={showRules} onClose={closeRules} />
    </main>
  );
};

export default Game;
