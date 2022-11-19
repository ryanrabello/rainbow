import { FC, useLayoutEffect, useRef } from "react";
import { WaveManager } from "./waveManager";

interface Props {
  centerLine: number;
  color: string;
}

export const Wave: FC<Props> = ({ centerLine, color }) => {
  const ref = useRef<WaveManager>();
  return (
    <path
      ref={(el) => {
        if (!ref.current) {
          ref.current = new WaveManager(centerLine);
        }
        ref.current.pathEl = el;
      }}
      fill={color}
    />
  );
};
