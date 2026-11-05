interface ButtonProps {
  styles: string | undefined;
  icon: string | undefined;
  action?: () => void;
  winner?: boolean;
}

const Option = (props: ButtonProps) => {
  if (!props.styles && !props.icon) {
    return <div className="rounded-full border-none w-24 h-24 bg-secondary-radial animate-pulse lg:scale-[1.3]"/>;
  }



  return (
    <div className={`relative flex items-center justify-center
                                      rounded-full border-none w-24 h-24
                                      bg-linear-to-b shadow-object-b cursor-pointer ${props.styles}
                                      transition hover:-translate-y-1 lg:scale-[1.3] `}
         onClick={props.action}
    >
      <div
        className="flex items-center justify-center rounded-full w-18 h-18
                                    bg-white shadow-object-t shadow-neutral-300">
        <img className="w-6 h-8" src={props.icon} alt="option"/>
      </div>

      <div className={`${props.winner && "rounded-full bg-radial shadow-object-b-w shadow-white absolute animate-ping w-18 h-18"}`} />
    </div>
  )
}

export default Option;
