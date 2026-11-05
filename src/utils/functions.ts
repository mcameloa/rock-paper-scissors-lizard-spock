import {OPTIONS, TEXTS, RULES} from "./constants.ts";
import {OptionType} from "./types.ts";

export const getRandomOption = () => {
  const randomIndex = Math.floor(Math.random() * OPTIONS.length);
  return OPTIONS[randomIndex];
};

export const determineResult = (
  userOption: OptionType,
  houseOption: OptionType
): { result: string; updatedUserOption: OptionType; updatedHouseOption: OptionType } => {
  const updatedUserOption = { ...userOption, winner: false };
  const updatedHouseOption = { ...houseOption, winner: false };

  if (userOption.name === houseOption.name) {
    return { result: TEXTS.DRAW, updatedUserOption, updatedHouseOption };
  } else if (RULES[userOption.name].beats.includes(houseOption.name)) {
    updatedUserOption.winner = true;
    return { result: TEXTS.WIN, updatedUserOption, updatedHouseOption };
  } else {
    updatedHouseOption.winner = true;
    return { result: TEXTS.LOSE, updatedUserOption, updatedHouseOption };
  }
};

export const getPentagonPoints = (centerX: number, centerY: number, radius: number) => {
  const points = [];
  for (let i = 0; i < 5; i++) {
    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push({
      x,
      y,
      option: OPTIONS[i]
    });
  }
  return points;
};