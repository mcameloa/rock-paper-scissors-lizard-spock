import rulesImg from '../assets/image-rules-bonus.svg';
import closeImg from '../assets/icon-close.svg';
import {TEXTS} from "../utils/constants.ts";

interface ModalProps {
  show: boolean
  onClose: () => void
}

export const Rules = (props: ModalProps) => {
  if (!props.show) return null;

  return (
    <div data-testid="rules-modal" className="fixed top-0 left-0 w-screen h-screen bg-white bg-opacity-50 z-50 flex items-center
                    justify-center animate-fade-in lg:w-100 lg:h-120 lg:inset-x-[50%] lg:inset-y-[50%] lg:translate-[-50%]">
      <div
        className="bg-white w-80 h-80 rounded-md p-5 flex flex-col items-center justify-center lg:w-[32rem] lg:h-[32rem]">
        <h1 className="absolute top-24 text-neutral-dark font-bold text-4xl lg:left-10 lg:top-10">{TEXTS.RULES}</h1>
        <img className="w-80 h-80" src={rulesImg} alt="rules"/>

        <img src={closeImg} className="absolute bottom-16 cursor-pointer lg:top-10 lg:right-10" alt="close"
             onClick={props.onClose}/>
      </div>
    </div>
  )
};

export default Rules;
