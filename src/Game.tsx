import { useCallback, useState } from "react";
import { TEXTS } from "./utils/constants.ts";
import { useGame } from "./hooks/useGame.ts";
import { Rules, Score } from "./components";
import { Result, Selection } from "./views";

const Game = () => {
  const { score, state, pick, playAgain } = useGame();
  const [showRules, setShowRules] = useState(false);

  const openRules = useCallback(() => setShowRules(true), []);
  const closeRules = useCallback(() => setShowRules(false), []);

  return (
    // Normal flow (header, board, Rules), so nothing overlaps on short screens.
    <main className="relative flex min-h-dvh flex-col items-center overflow-hidden bg-radial-[at_50%_0%] from-primary-radial to-secondary-radial px-8 pt-8 pb-14 md:pt-12 md:pb-8">
      <h1 className="sr-only">{TEXTS.TITLE}</h1>
      <Score score={score} />

      <div className="flex w-full flex-1 items-center justify-center py-12 short:py-0 md:py-0">
        {state.phase === "picking" ? (
          <Selection onSelect={pick} />
        ) : (
          <Result
            userOption={state.user}
            houseOption={state.house}
            outcome={state.phase === "result" ? state.outcome : null}
            onPlayAgain={playAgain}
          />
        )}
      </div>

      <button
        type="button"
        className="h-10 w-32 shrink-0 cursor-pointer rounded-lg border border-white text-base tracking-[2.5px] text-white focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white md:self-end"
        onClick={openRules}
      >
        {TEXTS.RULES}
      </button>
      <Rules show={showRules} onClose={closeRules} />
    </main>
  );
};

export default Game;
