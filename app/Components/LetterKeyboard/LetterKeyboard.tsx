import React, { useEffect, useRef, useState } from 'react';
import styles from "./LetterKeyboard.module.css";
import classNames from "classnames";
import { GameState } from '@/app/enum/enum';

interface LetterCardProps {
  letter: string;
  tabIndex: number;
  gameState: GameState;
  verifLetter: (letter: string) => void 
}

function LetterKeyboard({ letter, tabIndex, gameState, verifLetter }: LetterCardProps) {

  const letterRef = useRef<HTMLParagraphElement>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    if (isDisabled)
      return;
    if (letterRef !== null) {
      letterRef.current!.classList.add(styles.disabled);
      setIsDisabled(true);
      verifLetter(letter);
    }
  }

  const onKeyDownHandler = (event: any) => {
    if (event.key === " " || event.key === "Enter") {
      handleClick();
    }
  }

  useEffect(() => {
    if (isDisabled) {
      setIsDisabled(false);
      letterRef.current!.classList.remove(styles.disabled);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  return (
    <div className={classNames(styles.card)} onKeyDown={onKeyDownHandler} tabIndex={tabIndex} onClick={() => handleClick()} ref={letterRef}>{letter}</div>
  )
}

export default LetterKeyboard;