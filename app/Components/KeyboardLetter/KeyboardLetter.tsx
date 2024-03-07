import React, { useEffect, useRef, useState } from "react";
import styles from "./KeyboardLetter.module.css";
import classNames from "classnames/bind";
import { GameState } from "@/app/enum/enum";

interface LetterCardProps {
  letter: string;
  tabIndex: number;
  game: {
    state: GameState;
    letters: string;
    lettersPlayed: string;
    verifLetter: (letter: string) => void;
  };
}

const cx = classNames.bind(styles);

function KeyboardLetter({ letter, tabIndex, game }: LetterCardProps) {
  const letterRef = useRef<HTMLDivElement>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const disableLetter = () => {
    letterRef.current!.classList.add(styles.disabled);
  };

  const onClickHandler = () => {
    if (isDisabled) return;
    if (letterRef !== null) {
      game.verifLetter(letter);
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
    game.lettersPlayed.includes(letter) && disableLetter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.lettersPlayed]);

  useEffect(() => {
    if (game.state === GameState.WON || game.state === GameState.LOST) {
      setIsDisabled(false);
      letterRef.current!.classList.remove(styles.disabled);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.state]);

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
