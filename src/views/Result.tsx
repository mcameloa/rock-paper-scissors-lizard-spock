import { memo } from "react";
import {Option} from "../components";
import {OptionType} from "../utils/types.ts";
import {TEXTS} from "../utils/constants.ts";

interface ResultProps {
  userOption: OptionType;
  houseOption?: OptionType | null;
}

const Result = memo((props: ResultProps) => {
  const {userOption, houseOption} = props;

  return (
    <div className="flex justify-around w-sm animate-fade-in lg:justify-between lg:w-full lg:mt-[10%]">
      <div className="flex flex-col justify-center items-center relative lg:w-120 lg:scale-[1.5]">
        <Option styles={userOption.styles} icon={userOption.icon} winner={userOption.winner}/>
        <span className="text-white mt-7 lg:text-4xl">{TEXTS.PICKED}</span>
      </div>

      <div className={`flex flex-col justify-center items-center ${houseOption && "animate-fade-in"} lg:w-120 lg:scale-[1.5]`}>
        <Option styles={houseOption?.styles} icon={houseOption?.icon} winner={houseOption?.winner}/>
        <span className="text-white mt-7 lg:text-4xl">{TEXTS.HOUSE_PICKED}</span>
      </div>
    </div>
  );
});

export default Result;