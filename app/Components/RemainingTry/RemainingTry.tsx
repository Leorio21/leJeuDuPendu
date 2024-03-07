import React, { ReactNode } from "react";
import styles from "./RemainingTry.module.css";
import classNames from "classnames";
import Heart from "../Heart/Heart";

interface RemainingTryProps {
  remainingTry: number;
  maxTry: number;
}

function RemainingTry({ remainingTry, maxTry }: RemainingTryProps) {

    const displayRemainingTry: ReactNode[] = [];
    for (let i = 0; i < maxTry; i++) {
      displayRemainingTry.push(<Heart key={i} lifeNumber={i + 1} remainingTry={remainingTry} />)
    }

  return (
    <div className={classNames(styles.remainingTryContainer)}>
      {displayRemainingTry}
    </div>
  );
}

export default RemainingTry;
