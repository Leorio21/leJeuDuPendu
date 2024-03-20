import React, { ReactNode } from "react";
import styles from "./RemainingTry.module.css";
import classNames from "classnames";
import { Heart } from "../Heart/Heart";
import { MAXTRY } from "@/app/Constantes/Constantes";

function RemainingTryComponent() {

  const displayRemainingTry: ReactNode[] = [];
  for (let i = 0; i < MAXTRY; i++) {
    displayRemainingTry.push(<Heart key={i} lifeNumber={i + 1} />)
  }

  return (
    <div className={classNames(styles.remainingTryContainer)}>
      {displayRemainingTry}
    </div>
  );
}

export const RemainingTry = React.memo(RemainingTryComponent);
