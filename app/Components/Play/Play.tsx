import React from 'react'
import styles from "./Play.module.css";
import classNames from "classnames";
import LetterCard from '../LetterCard/LetterCard';

interface PlayProps {
  secretWord: string;
}

function Play({secretWord}: PlayProps) {

  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return (
    <>
      <div>Play {secretWord}</div>
      <div className={classNames(styles.wrapper)}>
        <div className={classNames(styles.container)}>
          {LETTERS.split("").map((letter, index) => <LetterCard key={letter} letter={letter} tabIndex={index}/>)}
        </div>
      </div>
    </>
  )
}

export default Play