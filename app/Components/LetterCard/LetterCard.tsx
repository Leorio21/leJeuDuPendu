import React, { useRef, useState } from 'react';
import styles from "./LetterCard.module.css";
import classNames from "classNames";

interface LetterCardProps {
  letter: string;
}

function LetterCard({letter}: LetterCardProps) {

  const letterRef = useRef<HTMLParagraphElement>(null);

  const handleClick = () => {
    if (letterRef !== null) {
      letterRef.current!.classList.add(styles.disabled);
    }
  }

  return (
    <p className={classNames(styles.card)} onClick={() => handleClick()} ref={letterRef}>{letter}</p>
  )
}

export default LetterCard