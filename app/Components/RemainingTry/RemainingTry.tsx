import React, { ReactNode, useEffect, useState } from "react";
import styles from "./RemainingTry.module.css";
import classNames from "classnames";
import { IoHeartSharp } from "react-icons/io5";

interface RemainingTryProps {
  remainingTry: number;
  maxTry: number;
}

function RemainingTry({ remainingTry, maxTry }: RemainingTryProps) {
  const [displayRemainingTry, setDisplayRemainingTry] = useState<ReactNode[]>(
    [],
  );

  const remainingTryToDisplay = () => {
    const newDisplay: ReactNode[] = [];
    for (let i = 0; i < maxTry; i++) {
      if (i < remainingTry) {
        newDisplay.push(
          <IoHeartSharp
            className={classNames(styles.hearth)}
            key={i}
            style={{ width: "50", height: "50" }}
          />,
        );
      } else {
        newDisplay.push(
          <IoHeartSharp
            className={classNames(styles.hearthEmpty)}
            key={i}
            style={{ width: "50", height: "50" }}
          />,
        );
      }
    }
    setDisplayRemainingTry(newDisplay);
  };

  useEffect(() => {
    remainingTryToDisplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTry]);
  return (
    <div className={classNames(styles.remainingTryContainer)}>
      {displayRemainingTry}
    </div>
  );
}

export default RemainingTry;
