import React, { useEffect, useRef } from "react";
import styles from "./Keyboard.module.css";
import classNames from "classnames";
import KeyboardLetter from "../KeyboardLetter/KeyboardLetter";
import { GameState } from "@/app/enum/enum";
import { LETTERS } from "@/app/Constantes/Constantes";
import { useGameStore, verifLetter } from "@/app/Stores/GameStore";

function Keyboard() {
  const keyboardRef = useRef<HTMLDivElement>(null);

  const gameState = useGameStore((state) => state.gameState);
  const playedLetters = useGameStore((state) => state.playedLetters);

  const onKeyDownHandler = (event: any) => {
    const letterPlayed: string = event.key.toUpperCase();
    if (
      LETTERS.includes(letterPlayed) &&
      !playedLetters.has(letterPlayed) &&
      gameState === GameState.PENDING
    ) {
      verifLetter(letterPlayed);
    }
  };

  useEffect(() => {
    keyboardRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  return (
    <div
      tabIndex={-1}
      className={classNames(styles.container)}
      onKeyDown={onKeyDownHandler}
      ref={keyboardRef}
    >
      {LETTERS.split("").map((letter) => (
        <KeyboardLetter key={letter} letter={letter} tabIndex={0} />
      ))}
    </div>
  );
}

export default Keyboard;
