import React, { useEffect, useState } from "react";
import styles from "./Play.module.css";
import classNames from "classnames";
import LetterKeyboard from "../LetterKeyboard/LetterKeyboard";
import Button from "../Button/Button";
import { IoArrowUndoSharp } from "react-icons/io5";
import Word from "../Word/Word";
import Title from "../Title/Title";
import { GameState } from "@/app/enum/enum";

interface PlayProps {
  secretWord: {
    value: string | null;
    dictionary: string[] | null;
    reset: () => void;
    pick: () => void;
    newDictionary: (words: string[]) => void;
  }
}

function Play({ secretWord }: PlayProps) {
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const dialog = document.querySelector("dialog");

  const [lettersToDisplay, setLettersToDisplay] = useState<string>(secretWord.value!.split("").map((letter) => letter.match(/[A-Z]/g) ? "_" : letter).join(""));
  const [gameState, setGameState] = useState<GameState>(GameState.PENDING);

  const isWin = () => {
    if (lettersToDisplay.includes("_")) {
      return;
    }
    dialog?.showModal();
    setGameState(GameState.WON);
  }

  const nextWord = () => {
    secretWord.pick();
    dialog?.close();
    setGameState(GameState.PENDING);
  }

  const verifLetter = (letter: string) => {
    if (secretWord.value!.includes(letter)) {
      setLettersToDisplay((prev) => {
        const newValue = prev.split("");
        for (let i = 0; i < secretWord.value!.length; i++) {
          if (secretWord.value![i] === letter) {
            newValue[i] = letter;
          }
        }
        return newValue.join("");
      })
    }
  }

  useEffect(() => {
    setLettersToDisplay(secretWord.value!.split("").map((letter) => letter.match(/[A-Z]/g) ? "_" : letter).join(""));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, secretWord]);

  useEffect(() => {
    isWin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lettersToDisplay]);

  return (
    <>
    <dialog>
      <div className={classNames(styles.dialogContent)}>
        <Title name="Vous avez gagné" />
        <Button width={200} onClick={nextWord}>Continuer</Button>
        <Button width={200} onClick={secretWord.reset} href="/play">Nouvelle catégorie</Button>
        <Button width={200} color="gradient" href="/">Quitter</Button>
      </div>
    </dialog>
      <div className={classNames(styles.wrapper)}>
        <div className={styles.word}>
          {lettersToDisplay.split(" ").map((word, index) => <Word key={index} word={word} />)}
        </div>
        <div className={classNames(styles.container)}>
          {LETTERS.split("").map((letter) => (
            <LetterKeyboard key={letter} letter={letter} gameState={gameState} tabIndex={0} verifLetter={verifLetter}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default Play;
