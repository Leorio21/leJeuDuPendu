import React, { useEffect, useRef, useState } from "react";
import styles from "./KeyboardLetter.module.css";
import classNames from "classnames/bind";
import { GameState } from "@/app/enum/enum";
import { useGameStore, verifLetter } from "@/app/Stores/GameStore";

type LetterCardProps = {
  letter: string;
  tabIndex: number;
}

const cx = classNames.bind(styles);

function KeyboardLetter({ letter, tabIndex }: LetterCardProps) {
  const letterRef = useRef<HTMLDivElement>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const { gameState, playedLetters } = useGameStore();
  
  const disableLetter = () => {
    letterRef.current!.classList.add(styles.disabled);
  };

  const onClickHandler = () => {
    if (isDisabled) return;
    console.log("click");
    if (letterRef !== null) {
      verifLetter(letter);
    }
  };

  const onKeyDownHandler = (event: any) => {
    if (event.key === " " || event.key === "Enter") {
      onClickHandler();
    }
  };

  useEffect(() => {
    if (isDisabled) {
      return;
    }
    playedLetters.has(letter) && disableLetter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playedLetters]);

  useEffect(() => {
    if (gameState === GameState.WON || gameState === GameState.LOST) {
      setIsDisabled(false);
      letterRef.current!.classList.remove(styles.disabled);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  return (
    <div
      className={cx({ card: true, disable: isDisabled })}
      onKeyDown={onKeyDownHandler}
      tabIndex={tabIndex}
      onClick={onClickHandler}
      ref={letterRef}
    >
      {letter}
    </div>
  );
}

export default KeyboardLetter;
