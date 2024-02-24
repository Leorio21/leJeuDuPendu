import React from 'react';
import styles from "./Keyboard.module.css";
import classNames from "classnames";
import LetterCard from '../LetterCard/LetterCard';

function Keyboard() {

  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return (
    <div className={classNames(styles.wrapper)}>
      <div className={classNames(styles.container)}>
        {LETTERS.split("").map((letter) => <LetterCard key={letter} letter={letter} />)}
      </div>
    </div>
  )
}

export default Keyboard