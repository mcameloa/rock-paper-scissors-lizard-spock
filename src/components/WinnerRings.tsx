/**
 * Three faint concentric rings behind the winning pick, as in the design.
 * Sized from the option (inset), so the transform stays free for the animation.
 */
const RINGS = ["-inset-[20%]", "-inset-[45%]", "-inset-[75%]"] as const;

const WinnerRings = () => (
  <div data-testid="winner-rings" aria-hidden="true" className="absolute inset-0 lg:scale-[1.3]">
    {RINGS.map((inset, i) => (
      <span
        key={inset}
        className={`reveal-ring absolute ${inset} rounded-full bg-white/[0.04]`}
        style={{ "--ring": i } as React.CSSProperties}
      />
    ))}
  </div>
);

export default WinnerRings;
