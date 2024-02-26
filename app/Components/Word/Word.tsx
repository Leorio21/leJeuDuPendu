import React from 'react';
import styles from "./Word.module.css";
import classNames from "classnames";
import WordLetter from '../WordLetter/WordLetter';

interface WordProps {
  word: string;
}

function Word({word}: WordProps) {
  return (
    <div className={classNames(styles.wordBlock)}>
      {word.split("").map((letter, index) => <WordLetter key={index} letter={letter} />)}
    </div>
  )
}

export default Word