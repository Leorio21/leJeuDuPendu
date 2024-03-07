import React from "react";
import styles from "./Answer.module.css";
import classNames from "classnames";

interface AnswerProps {
  secretWord: string;
}

function Answer({ secretWord }: AnswerProps) {
  return (
    <>
      <p>La réponse était :</p>
      <p className={classNames(styles.answer)}>{secretWord}</p>
    </>
  );
}

export default Answer;
