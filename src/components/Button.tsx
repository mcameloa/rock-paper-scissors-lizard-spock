import { useMemo } from 'react';


interface ButtonProps {
  invert: boolean
  text: string
  result?: string | null;
  action?: () => void;
}

const Button = (props: ButtonProps) => {
  const { result, invert } = props;

  const styles = useMemo(() => {
    if (invert) {
      return {
        button: 'border border-white rounded-md px-16 py-4 mt-3 cursor-pointer',
        text: 'text-white text-lg',
        responsive: 'lg:right-[20%]',
      }
    }

    return {
      button: 'border border-white bg-white rounded-md px-16 py-4 mt-3 w-xs cursor-pointer',
      text: 'text-neutral-dark text-xs lg:text-2xl',
      responsive: 'lg:inset-x-[50%] lg:inset-y-[50%] lg:translate-[-50%] lg:w-full',
    }
  }, [invert])

  return (
    <div className={`absolute bottom-16 text-center mt-3 tracking-widest animate-fade-in ${styles.responsive}`}>
      { result && <h1 className="text-white font-bold text-5xl">{result}</h1> }
      <button className={styles.button} type="submit" onClick={props.action}>
        <span className={styles.text}>{props.text}</span>
      </button>
    </div>
  )
}

export default Button;