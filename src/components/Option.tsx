import type { GameOption } from "../utils/types.ts";

interface OptionProps {
  /** Omit to render the empty slot shown while the house is picking. */
  option?: GameOption;
  /** When set, the option is a button; otherwise it only displays a pick. */
  onSelect?: (option: GameOption) => void;
  winner?: boolean;
}

const BASE =
  "relative flex h-24 w-24 items-center justify-center rounded-full border-none lg:scale-[1.3]";

const Option = ({ option, onSelect, winner = false }: OptionProps) => {
  if (!option) {
    return (
      <div className={`${BASE} animate-pulse bg-secondary-radial`} role="status">
        <span className="sr-only">The house is picking</span>
      </div>
    );
  }

  const content = (
    <>
      <span className="flex h-18 w-18 items-center justify-center rounded-full bg-white shadow-object-t shadow-neutral-300">
        <img className="h-8 w-6" src={option.icon} alt={onSelect ? "" : option.name} />
      </span>
      {winner && (
        <span
          data-testid="winner-glow"
          className="absolute h-18 w-18 animate-ping rounded-full bg-radial shadow-object-b-w shadow-white"
        />
      )}
    </>
  );

  const look = `${BASE} bg-linear-to-b shadow-object-b ${option.styles}`;

  if (!onSelect) return <div className={look}>{content}</div>;

  return (
    <button
      type="button"
      aria-label={`Pick ${option.name}`}
      className={`${look} cursor-pointer transition hover:-translate-y-1 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white`}
      onClick={() => onSelect(option)}
    >
      {content}
    </button>
  );
};

export default Option;
