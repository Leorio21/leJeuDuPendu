import React, { useRef, useState } from 'react';
import styles from "./LetterCard.module.css";
import classNames from "classNames";

interface LetterCardProps {
  letter: string;
  tabIndex: number;
}

function LetterCard({ letter, tabIndex }: LetterCardProps) {

  const letterRef = useRef<HTMLParagraphElement>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    if (isDisabled)
      return;
    if (letterRef !== null) {
      letterRef.current!.classList.add(styles.disabled);
      setIsDisabled(true);
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

export default LetterCard