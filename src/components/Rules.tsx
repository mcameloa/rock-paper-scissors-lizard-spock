import { useEffect, useRef } from "react";
// Inlined (not <img>) so its "BEATS" labels use the page's web font.
import rulesSvg from "../assets/image-rules-bonus.svg?raw";
import closeImg from "../assets/icon-close.svg";
import { TEXTS } from "../utils/constants.ts";

interface RulesProps {
  show: boolean;
  onClose: () => void;
}

const RULES_ALT =
  "Scissors beats paper and lizard. Paper beats rock and Spock. Rock beats lizard and scissors. " +
  "Lizard beats Spock and paper. Spock beats scissors and rock.";

/**
 * Rules dialog: full screen on mobile, centered card over a dimmed backdrop on desktop.
 * Closes with the close button, Escape or a click on the backdrop, and gives focus
 * back to whatever opened it.
 */
const Rules = ({ show, onClose }: RulesProps) => {
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!show) return;

    const opener = document.activeElement as HTMLElement | null;
    closeButton.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus();
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      data-testid="rules-backdrop"
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-white lg:bg-black/50"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rules-title"
        className="flex h-full w-full flex-col items-center justify-around py-20 lg:grid lg:h-auto lg:w-100 lg:grid-cols-[1fr_auto] lg:gap-y-12 lg:rounded-lg lg:bg-white lg:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="rules-title" className="text-4xl font-bold text-neutral-dark lg:self-center">
          {TEXTS.RULES}
        </h2>
        <div
          role="img"
          aria-label={RULES_ALT}
          className="w-full max-w-84 lg:col-span-2 lg:row-start-2 lg:justify-self-center [&>svg]:h-auto [&>svg]:w-full"
          // Static asset bundled with the app, not user input.
          dangerouslySetInnerHTML={{ __html: rulesSvg }}
        />
        <button
          ref={closeButton}
          type="button"
          aria-label="Close rules"
          className="cursor-pointer rounded p-2 focus-visible:outline-2 focus-visible:outline-neutral-dark lg:col-start-2 lg:row-start-1"
          onClick={onClose}
        >
          <img src={closeImg} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Rules;
