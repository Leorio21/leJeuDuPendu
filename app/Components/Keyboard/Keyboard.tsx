import React from 'react'
import styles from "./Keyboard.module.css"
import classNames from 'classnames';
import LetterKeyboard from '../KeyboardLetter/KeyboardLetter';
import { GameState } from '@/app/enum/enum';

interface KeyboardProps {
  game: {
    state: GameState;
    verifLetter: (letter: string) => void;
  }
}

function Keyboard({ game }: KeyboardProps) {

  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return (
    <div className={classNames(styles.container)}>
      {LETTERS.split("").map((letter) => (
        <LetterKeyboard key={letter} letter={letter} game={game} tabIndex={0} />
      ))}
    </div>
  )
}

export default Keyboard