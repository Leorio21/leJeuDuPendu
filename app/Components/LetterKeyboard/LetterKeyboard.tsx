import React, { useRef, useState } from 'react';
import styles from "./LetterKeyboard.module.css";
import classNames from "classNames";

interface LetterCardProps {
  letter: string;
  tabIndex: number;
  verifLetter: (letter: string) => void 
}

function LetterKeyboard({ letter, tabIndex, verifLetter }: LetterCardProps) {

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

  return (
    <div className={classNames(styles.card)} onKeyDown={onKeyDownHandler} tabIndex={tabIndex + 1} onClick={() => handleClick()} ref={letterRef}>{letter}</div>
  )
}

export default LetterKeyboard;