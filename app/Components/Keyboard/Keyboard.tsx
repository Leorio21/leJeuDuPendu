import React, { useEffect, useRef } from "react";
import styles from "./Keyboard.module.css";
import classNames from "classnames";
import LetterKeyboard from "../KeyboardLetter/KeyboardLetter";
import { GameState } from "@/app/enum/enum";

interface KeyboardProps {
  game: {
    state: GameState;
    letters: string;
    lettersPlayed: string;
    verifLetter: (letter: string) => void;
  };
}

function Keyboard({ game }: KeyboardProps) {
  const keyboardRef = useRef<HTMLDivElement>(null);

  const onKeyDownHandler = (event: any) => {
    const letterPlayed: string = event.key.toUpperCase();
    if (
      game.letters.includes(letterPlayed) &&
      !game.lettersPlayed.includes(letterPlayed) &&
      game.state === GameState.PENDING
    ) {
      game.verifLetter(letterPlayed);
    }
  };

  useEffect(() => {
    keyboardRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.state]);

  return (
    <div
      tabIndex={-1}
      className={classNames(styles.container)}
      onKeyDown={onKeyDownHandler}
      ref={keyboardRef}
    >
      {game.letters.split("").map((letter) => (
        <LetterKeyboard key={letter} letter={letter} game={game} tabIndex={0} />
      ))}
    </div>
  );
}

export default Keyboard;
