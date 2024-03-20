import React from "react";
import styles from "./Answer.module.css";
import classNames from "classnames";
import { useGameStore } from "@/app/Stores/GameStore";

function Answer() {
  const secretWord = useGameStore((state) => state.secretWord);

  return (
    <>
      <p>La réponse était :</p>
      <p className={classNames(styles.answer)}>{secretWord}</p>
    </>
  );
}

export default Answer;
