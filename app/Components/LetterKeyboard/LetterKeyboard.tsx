import React, { useEffect, useRef, useState } from 'react';
import styles from "./LetterKeyboard.module.css";
import classNames from "classnames";

interface LetterCardProps {
  letter: string;
  tabIndex: number;
  gameIsWin: boolean;
  verifLetter: (letter: string) => void 
}

function LetterKeyboard({ letter, tabIndex, gameIsWin, verifLetter }: LetterCardProps) {

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
    setIsDisabled(false);
    letterRef.current!.classList.remove(styles.disabled);
  }, [gameIsWin]);

  return (
    <div className={classNames(styles.card)} onKeyDown={onKeyDownHandler} tabIndex={tabIndex} onClick={() => handleClick()} ref={letterRef}>{letter}</div>
  )
}

export default LetterKeyboard;