interface ButtonProps {
  variant: "solid" | "outline";
  label: string;
  onClick: () => void;
  /** Optional heading shown above the button (the round's outcome). */
  heading?: string;
}

const STYLES = {
  solid: {
    wrapper: "lg:inset-x-[50%] lg:inset-y-[50%] lg:w-full lg:translate-[-50%]",
    button: "w-xs bg-white",
    text: "text-xs text-neutral-dark lg:text-2xl",
  },
  outline: {
    wrapper: "lg:right-[20%]",
    button: "",
    text: "text-lg text-white",
  },
} as const;

const Button = ({ variant, label, onClick, heading }: ButtonProps) => {
  const styles = STYLES[variant];

  return (
    <div
      className={`absolute bottom-16 mt-3 animate-fade-in text-center tracking-widest ${styles.wrapper}`}
    >
      {heading && (
        <h2 className="text-5xl font-bold text-white" aria-live="polite">
          {heading}
        </h2>
      )}
      <button
        type="button"
        className={`mt-3 cursor-pointer rounded-md border border-white px-16 py-4 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white ${styles.button}`}
        onClick={onClick}
      >
        <span className={styles.text}>{label}</span>
      </button>
    </div>
  );
};

export default Button;
