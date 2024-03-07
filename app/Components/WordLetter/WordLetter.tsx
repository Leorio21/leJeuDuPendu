import React from "react";
import styles from "./WordLetter.module.css";
import classNames from "classnames/bind";

interface WordLetterProps {
  letter: string;
}

const cx = classNames.bind(styles);

function WordLetter({ letter }: WordLetterProps) {
  return (
    <p className={cx({ container: true, letterFind: letter !== "_" })}>
      {letter}
    </p>
  );
}

export default WordLetter;
