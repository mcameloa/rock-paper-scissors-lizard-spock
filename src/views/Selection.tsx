import { memo } from "react";
import {Option} from "../components";
import {OptionType} from "../utils/types.ts";
import {useMemo} from "react";
import {getPentagonPoints} from "../utils/functions.ts";

interface GameProps {
  selectOption: (option: OptionType) => void;
  radius: number;
  centerX: number;
  centerY: number;
}

const Selection = memo((props: GameProps) => {
  const {radius, centerX, centerY} = props;
  const points = useMemo(() => getPentagonPoints(centerX, centerY, radius), [radius, centerX, centerY]);

  return (
    <div className="relative animate-fade-in mt-6 lg:mt-40">
      <svg height="300" width="300">
        <polygon
          points={points.map((point) => `${point.x},${point.y}`).join(" ")}
          fill="none"
          stroke="#000"
          strokeWidth="15"
          opacity=".2"
        />
      </svg>

      {
        points.map(({x, y, option}, index) => (
          <div
            data-testid={option.name}
            key={index}
            style={{
              position: "absolute",
              left: `${x}px`,
              top: `${y}px`,
              transform: "translate(-50%, -50%)"
            }}
          >
            <Option
              styles={option.styles}
              icon={option.icon}
              action={() => props.selectOption(option)}
            />
          </div>
        ))
      }
    </div>
  )
});

export default Selection;
